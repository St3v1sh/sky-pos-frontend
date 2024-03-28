import pg from 'pg';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const masterClient = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: 'postgres',
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

const client = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

async function createDatabase() {
    await masterClient.connect();

    // Create the database.
    const { rows } = await masterClient.query(`
        SELECT EXISTS (
            SELECT FROM pg_database
            WHERE datname = '${process.env.PG_DATABASE}'
        );
    `);

    if (!rows[0].exists) {
        await masterClient.query(`CREATE DATABASE ${process.env.PG_DATABASE};`);
    }
    await masterClient.end();

    await client.connect();
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    // Define the database.
    await client.query(`
        CREATE TABLE IF NOT EXISTS employees (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            privilege VARCHAR(255) NOT NULL,
            activated BOOLEAN NOT NULL DEFAULT FALSE,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            activated_at TIMESTAMPTZ
        );
    `);
    await client.query(`
        CREATE TABLE IF NOT EXISTS activation_codes (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            code VARCHAR(255) UNIQUE NOT NULL,
            created_by UUID NOT NULL REFERENCES employees(id),
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            activated_at TIMESTAMPTZ
        );
    `);

    // Insert the default user.
    await client.query(`
        INSERT INTO employees (username, password, privilege, activated, activated_at)
        VALUES ('admin', '${await bcrypt.hash('password', 10)}', 'admin', TRUE, NOW())
        ON CONFLICT (username) DO NOTHING;
    `);

    // Insert the default activation code.
    await client.query(`
        INSERT INTO activation_codes (code, created_by)
        VALUES ('skypos', (SELECT id FROM employees WHERE username = 'admin'))
        ON CONFLICT (code) DO NOTHING;
    `);

    await client.end();
    console.log('Database created.');
}

createDatabase();

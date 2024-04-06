export async function loginAPI(email: string, password: string) {
  return fetch(process.env.DB_API_URL + '/login', {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.DB_API_KEY!,
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
}

export async function checkActivationCodeAPI(code: string) {
  return fetch(process.env.DB_API_URL + '/check-activation-code', {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.DB_API_KEY!,
    },
    body: JSON.stringify({ code: code }),
  });
}

export async function checkEmailAPI(email: string) {
  return fetch(process.env.DB_API_URL + '/check-email', {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.DB_API_KEY!,
    },
    body: JSON.stringify({ email: email }),
  });
}

export async function registerAPI(
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  code: string
) {
  return fetch(process.env.DB_API_URL + '/register', {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.DB_API_KEY!,
    },
    body: JSON.stringify({
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
      code: code,
    }),
  });
}

export async function loginAPI(username: string, password: string) {
  return fetch(process.env.DB_API_URL + '/login', {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.DB_API_KEY!,
    },
    body: JSON.stringify({
      username: username,
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

export async function checkUsernameAPI(username: string) {
  return fetch(process.env.DB_API_URL + '/check-username', {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.DB_API_KEY!,
    },
    body: JSON.stringify({ username: username }),
  });
}

export async function registerAPI(
  username: string,
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
      username: username,
      password: password,
      code: code,
    }),
  });
}

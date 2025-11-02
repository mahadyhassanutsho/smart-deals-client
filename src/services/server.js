const baseUrl = import.meta.env.VITE_SERVER_URL;

const request = async (url, method, body) => {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${method} ${url} failed: ${res.status}`);
  return res.json();
};

export const postUser = (user) => {
  const { email, displayName, photoURL } = user;
  return request(`${baseUrl}/users`, "POST", { email, displayName, photoURL });
};

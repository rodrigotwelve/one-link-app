export function getAuthToken(): string | null {
  return typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    'Content-Type': 'application/json',
  };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function loginUser(email: string, password: string) {
  return fetchWithAuth('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function signupUser(username: string, email: string, password: string) {
  return fetchWithAuth('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  });
}

export async function getUserLinks() {
  return fetchWithAuth('/api/links');
}

export async function createLink(title: string, url: string) {
  return fetchWithAuth('/api/links', {
    method: 'POST',
    body: JSON.stringify({ title, url }),
  });
}

export async function updateLink(linkId: string, title: string, url: string) {
  return fetchWithAuth(`/api/links/${linkId}`, {
    method: 'PUT',
    body: JSON.stringify({ title, url }),
  });
}

export async function deleteLink(linkId: string) {
  return fetchWithAuth(`/api/links/${linkId}`, {
    method: 'DELETE',
  });
}

export async function getProfile(username: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
  return fetch(`${baseUrl}/api/profile/${username}`).then(res => res.json());
}

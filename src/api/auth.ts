export interface LoginResponse {
    // Server may still return user info; token is not persisted client-side when using httpOnly cookies
    user?: {
        id: string;
        name?: string;
        email?: string;
    };
}

export interface LoginCredentials {
    email: string;
    password: string;
}

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

/**
 * Log in using credentials. The server is expected to set an httpOnly cookie
 * (Set-Cookie) on successful authentication. We send requests with
 * `credentials: 'include'` so the browser stores and sends the cookie.
 */
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Login failed: ${res.status} ${text}`);
    }

    // Server may return user info; token (if any) is expected to be set as a cookie
    const data = (await res.json()) as LoginResponse;
    return data;
}

/**
 * Logout by calling the backend logout endpoint which should clear the httpOnly cookie.
 */
export async function logout(): Promise<void> {
    try {
        await fetch(`${API_BASE}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
    } catch (e) {
        console.warn("Failed to call logout endpoint", e);
    }
}

/**
 * Placeholder kept for compatibility: when using httpOnly cookies there's no
 * client-side token to return. Other code should rely on server-side session
 * state or call a `/me` endpoint to fetch current user info.
 */
export function getAuthToken(): string | null {
    return null;
}

/**
 * A fetch wrapper that includes credentials so cookies are sent.
 */
export function authFetch(input: RequestInfo, init?: RequestInit) {
    const merged: RequestInit = { ...(init ?? {}), credentials: "include" };
    // Ensure headers are normalized
    const headers = new Headers(merged.headers ?? {});
    merged.headers = headers;
    return fetch(input, merged);
}

export default { login, logout, getAuthToken, authFetch };

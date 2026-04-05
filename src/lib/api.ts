import axios from "axios";

/**
 * Reusable Axios instance for all API calls in DevLearn.
 *
 * Usage:
 *   import { apiClient } from "@/lib/api";
 *   const data = await apiClient.get("/courses");
 */
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10_000,
});

/* ── Request interceptor ─────────────────────────────────────
   Attach auth token (or any other headers) before each request.
   Expand this when next-auth session tokens are wired up.
──────────────────────────────────────────────────────────── */
apiClient.interceptors.request.use(
  (config) => {
    // TODO: attach session token from next-auth when ready
    // const token = await getSession();
    // if (token) config.headers.Authorization = `Bearer ${token.accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

/* ── Response interceptor ────────────────────────────────────
   Centralised error handling — log, normalise, or redirect here.
──────────────────────────────────────────────────────────── */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: handle 401 → redirect to /login, 500 → toast, etc.
    console.error("[API Error]", error?.response?.status, error?.message);
    return Promise.reject(error);
  }
);

export { apiClient };

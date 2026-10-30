export interface Me {
  authenticated: boolean;
  email?: string;
  role?: "admin" | "editor";
}

export const fetchMe = (): Promise<Me> =>
  fetch("/api/auth/me", { credentials: "same-origin" }).then((r) => (r.ok ? (r.json() as Promise<Me>) : { authenticated: false }));

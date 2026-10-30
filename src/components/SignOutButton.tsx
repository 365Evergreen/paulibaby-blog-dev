/**
 * src/components/SignOutButton.tsx — sign-out button.
 *
 * Usage:
 *   <SignOutButton />
 *   <SignOutButton redirectTo="/" label="Log out" />
 */

import { useAuth } from "../lib/useAuth";

interface SignOutButtonProps {
  redirectTo?: string;
  label?: string;
}

export function SignOutButton({ redirectTo = "/", label = "Sign out" }: SignOutButtonProps) {
  const { logout } = useAuth();

  async function handleSignOut() {
    await logout();
    window.location.href = redirectTo;
  }

  return (
    <button onClick={handleSignOut} style={{ cursor: "pointer" }}>
      {label}
    </button>
  );
}

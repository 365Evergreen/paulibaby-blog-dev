import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMe, type Me } from "../../auth/me";
import styles from "./SignInPage.module.css";

export default function SignInPage() {
  const [params] = useSearchParams();
  const raw = params.get("redirect") ?? "/dashboard";
  const redirect = raw.startsWith("/") && !raw.startsWith("//") && !raw.includes("\\") ? raw : "/dashboard";
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    fetchMe().then(setMe, () => setMe({ authenticated: false }));
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <h1>Sign in</h1>
        {me === null ? (
          <p>Checking your session…</p>
        ) : me.authenticated ? (
          <>
            <p>
              Signed in as <strong>{me.email}</strong> ({me.role}).
            </p>
            <a className={styles.btn} href={redirect}>
              Continue
            </a>
            <a className={styles.link} href="/cdn-cgi/access/logout">
              Sign out
            </a>
          </>
        ) : (
          <>
            <p>Admins and editors sign in with Cloudflare Access.</p>
            {/* Access challenges this path, then the Worker redirects back into the app. */}
            <a className={styles.btn} href={`/api/admin/login?redirect=${encodeURIComponent(redirect)}`}>
              Sign in with Cloudflare
            </a>
            <p className={styles.note}>If you already signed in and still see this, your account has not been assigned a role.</p>
          </>
        )}
      </div>
    </div>
  );
}

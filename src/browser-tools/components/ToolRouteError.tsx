import styles from "../BrowserTools.module.css";

export default function ToolRouteError() {
  return (
    <section className={styles.root} role="alert">
      <h1>Browser tool unavailable</h1>
      <p>
        The tool could not load or render. Your tool input has not been
        uploaded. Reload the tools to try again; unsaved input will be
        discarded.
      </p>
      <a href="/browser-tools">Reload browser tools</a>
    </section>
  );
}

import { Link } from "react-router-dom";

export default function ToolNotFound() {
  return (
    <section>
      <h2>Tool not found</h2>
      <p>This browser utility does not exist.</p>
      <Link to="/browser-tools">Return to all tools</Link>
    </section>
  );
}

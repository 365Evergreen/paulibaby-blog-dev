import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Post } from "./pages/Post";
import { AdminGuard } from "./pages/admin/AdminGuard";
import { Dashboard } from "./pages/admin/Dashboard";
import { Login } from "./pages/admin/Login";

// The editor is only needed when editing a post.
const PostEditor = lazy(() => import("./pages/admin/PostEditor").then((m) => ({ default: m.PostEditor })));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="posts/:slug" element={<Post />} />
            <Route path="admin/login" element={<Login />} />
            <Route path="admin" element={<AdminGuard />}>
              <Route index element={<Dashboard />} />
              <Route path="posts/:id" element={<PostEditor />} />
            </Route>
            <Route path="*" element={<p>Page not found.</p>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

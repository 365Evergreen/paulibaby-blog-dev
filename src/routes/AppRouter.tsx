import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "../layouts/AppShell";
import Home from "../pages/HomePage/HomePage";
import  Archive from "../pages/Archive/Archive";
import Dashboard from "../pages/admin/Dashboard";
import PostEditor from "../pages/admin/PostEditor";
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="archive" element={<Archive />} />
          <Route path="admin" element={<Dashboard />} />
          <Route path="admin/posts/:id" element={<PostEditor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
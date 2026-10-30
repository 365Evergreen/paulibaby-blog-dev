import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "../layouts/AppShell";
import Home from "../pages/HomePage/HomePage";
import  Archive from "../pages/Archive/Archive";
import Dashboard from "../pages/admin/Dashboard";
import PostEditor from "../pages/admin/PostEditor";
import MediaLibraryPage from "../pages/MediaLibraryPage/MediaLibraryPage";
import MediaAdmin from "../components/MediaLibrary/MediaLibrary";
import  AdminPage from "../pages/AdminPage/AdminPage";
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/posts/:id" element={<PostEditor />} />
          <Route path="/admin/media-library" element={<MediaLibraryPage />} />
          <Route path="/admin/media-admin" element={<MediaAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
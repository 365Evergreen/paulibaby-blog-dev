import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "../layouts/AppShell";
import Home from "../pages/HomePage/HomePage";
import Archive from "../pages/Archive/Archive";
import Dashboard from "../pages/admin/Dashboard";
import PostEditorPage from "../pages/admin/PostEditor";
import MediaLibraryPage from "../pages/MediaLibraryPage/MediaLibraryPage";
import MediaAdmin from "../components/MediaLibrary/MediaLibrary";
import AdminPage from "../pages/AdminPage/AdminPage";
import SinglePostPage from "../pages/SinglePostPage/SinglePostPage";
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/post-editor" element={<PostEditorPage />} />
          <Route path="/admin/post-editor/:id" element={<PostEditorPage />} />
          <Route path="/admin/media-library" element={<MediaLibraryPage />} />
          <Route path="/admin/media-admin" element={<MediaAdmin />} />
          <Route path="/posts/:slug" element={<SinglePostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
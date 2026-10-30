import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "../layouts/AppShell";
import Home from "../pages/HomePage/HomePage";
import Archive from "../pages/Archive/Archive";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import DashboardOverview from "../pages/DashboardPage/DashboardOverview";
import PostsPage from "../pages/DashboardPage/PostsPage";
import PostEditorPage from "../pages/PostEditorPage/PostEditorPage";
import MediaLibraryPage from "../pages/MediaLibraryPage/MediaLibraryPage";
import MediaAdmin from "../components/MediaLibrary/MediaLibrary";
import AdminPage from "../pages/AdminPage/AdminPage";
import SinglePostPage from "../pages/SinglePostPage/SinglePostPage";
import EditorShell from "../layouts/EditorShell";
import RequireAuth from "../auth/RequireAuth";
import SignInPage from "../pages/SignInPage/SignInPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/posts/:slug" element={<SinglePostPage />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route element={<EditorShell />}>
            <Route path="admin/dashboard" element={<DashboardPage />}>
              <Route index element={<DashboardOverview />} />
              <Route path="posts" element={<PostsPage />} />
            </Route>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/post-editor" element={<PostEditorPage />} />
            <Route path="/admin/post-editor/:id" element={<PostEditorPage />} />
            <Route path="/admin/media-library" element={<MediaLibraryPage />} />
            <Route path="/admin/media-admin" element={<MediaAdmin />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

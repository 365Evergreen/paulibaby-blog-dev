import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "../layouts/AppShell";
import Home from "../pages/HomePage/HomePage";
import Archive from "../pages/Archive/Archive";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import DashboardOverview from "../pages/DashboardPage/DashboardOverview";
import PostsPage from "../pages/DashboardPage/PostsPage";
import TemplatesPage from "../pages/DashboardPage/Templates/TemplatesPage";
import TemplateEditorPage from "../pages/DashboardPage/Templates/TemplateEditorPage";
import ThemesPage from "../pages/DashboardPage/ThemesPage";
import UsersPage from "../pages/DashboardPage/UsersPage/UsersPage";
import PostEditorPage from "../pages/PostEditorPage/PostEditorPage";
import PageEditorPage from "../pages/PageEditorPage/PageEditorPage";
import MediaLibraryPage from "../pages/MediaLibraryPage/MediaLibraryPage";
import MediaAdmin from "../components/MediaLibrary/MediaLibrary";
import AdminPage from "../pages/AdminPage/AdminPage";
import SinglePostPage from "../pages/SinglePostPage/SinglePostPage";
import SinglePage from "../pages/SinglePage/SinglePage";
import EditorShell from "../layouts/EditorShell";
import RequireAuth from "../auth/RequireAuth";
import SignInPage from "../pages/SignInPage/SignInPage";
import PagesPage from "../pages/DashboardPage/Pages/PagesPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/posts/:category/:slug" element={<SinglePostPage />} />
          <Route path="/posts/:slug" element={<SinglePostPage />} />
          <Route path="/:slug" element={<SinglePage />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route element={<EditorShell />}>
            <Route path="admin/dashboard" element={<DashboardPage />}>
              <Route index element={<DashboardOverview />} />
              <Route path="posts" element={<PostsPage />} />
              <Route path="templates" element={<TemplatesPage />} />
              <Route path="templates/:id" element={<TemplateEditorPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="themes" element={<ThemesPage />} />
              <Route path="pages" element={<PagesPage />} />
            </Route>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/post-editor" element={<PostEditorPage />} />
            <Route path="/admin/post-editor/:id" element={<PostEditorPage />} />
            <Route path="/admin/page-editor" element={<PageEditorPage />} />
            <Route path="/admin/page-editor/:id" element={<PageEditorPage />} />
            <Route path="/admin/media-library" element={<MediaLibraryPage />} />
            <Route path="/admin/media-admin" element={<MediaAdmin />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

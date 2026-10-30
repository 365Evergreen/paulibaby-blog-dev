import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AppShell = lazy(() => import("../layouts/AppShell"));
const Home = lazy(() => import("../pages/HomePage/HomePage"));
const Archive = lazy(() => import("../pages/Archive/Archive"));
const DashboardPage = lazy(() => import("../pages/DashboardPage/DashboardPage"));
const DashboardOverview = lazy(() => import("../pages/DashboardPage/DashboardOverview"));
const PostsPage = lazy(() => import("../pages/DashboardPage/PostsPage"));
const TemplatesPage = lazy(() => import("../pages/DashboardPage/Templates/TemplatesPage"));
const TemplateEditorPage = lazy(() => import("../pages/DashboardPage/Templates/TemplateEditorPage"));
const ThemesPage = lazy(() => import("../pages/DashboardPage/ThemesPage"));
const UsersPage = lazy(() => import("../pages/DashboardPage/UsersPage/UsersPage"));
const PostEditorPage = lazy(() => import("../pages/PostEditorPage/PostEditorPage"));
const PageEditorPage = lazy(() => import("../pages/PageEditorPage/PageEditorPage"));
const MediaLibraryPage = lazy(() => import("../pages/MediaLibraryPage/MediaLibraryPage"));
const MediaAdmin = lazy(() => import("../components/MediaLibrary/MediaLibrary"));
const AdminPage = lazy(() => import("../pages/AdminPage/AdminPage"));
const SinglePostPage = lazy(() => import("../pages/SinglePostPage/SinglePostPage"));
const SinglePage = lazy(() => import("../pages/SinglePage/SinglePage"));
const EditorShell = lazy(() => import("../layouts/EditorShell"));
const RequireAuth = lazy(() => import("../auth/RequireAuth"));
const SignInPage = lazy(() => import("../pages/SignInPage/SignInPage"));
const PagesPage = lazy(() => import("../pages/DashboardPage/Pages/PagesPage"));

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div role="status">Loading…</div>}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;

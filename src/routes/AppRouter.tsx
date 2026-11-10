import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";

const AppShell = lazy(() => import("../layouts/AppShell"));
const Home = lazy(() => import("../pages/HomePage/HomePage"));
const Archive = lazy(() => import("../pages/Archive/Archive"));
const DashboardPage = lazy(
  () => import("../pages/DashboardPage/DashboardPage"),
);
const DashboardOverview = lazy(
  () => import("../pages/DashboardPage/DashboardOverview"),
);
const PostsPage = lazy(() => import("../pages/DashboardPage/PostsPage"));
const TemplatesPage = lazy(
  () => import("../pages/DashboardPage/Templates/TemplatesPage"),
);
const TemplateEditorPage = lazy(
  () => import("../pages/DashboardPage/Templates/TemplateEditorPage"),
);
const ThemesPage = lazy(() => import("../pages/DashboardPage/ThemesPage"));
const UsersPage = lazy(
  () => import("../pages/DashboardPage/UsersPage/UsersPage"),
);
const PostEditorPage = lazy(
  () => import("../pages/PostEditorPage/PostEditorPage"),
);
const PageEditorPage = lazy(
  () => import("../pages/PageEditorPage/PageEditorPage"),
);
const MediaLibraryPage = lazy(
  () => import("../pages/MediaLibraryPage/MediaLibraryPage"),
);
const MediaAdmin = lazy(
  () => import("../components/MediaLibrary/MediaLibrary"),
);
const AdminPage = lazy(() => import("../pages/AdminPage/AdminPage"));
const SinglePostPage = lazy(
  () => import("../pages/SinglePostPage/SinglePostPage"),
);
const SinglePage = lazy(() => import("../pages/SinglePage/SinglePage"));
const EditorShell = lazy(() => import("../layouts/EditorShell"));
const RequireAuth = lazy(() => import("../auth/RequireAuth"));
const SignInPage = lazy(() => import("../pages/SignInPage/SignInPage"));
const PagesPage = lazy(() => import("../pages/DashboardPage/Pages/PagesPage"));
const IntegratedEditorPage = lazy(
  () => import("../pages/IntegratedEditorPage"),
);
const BrowserToolsPage = lazy(
  () => import("../pages/BrowserToolsPage/BrowserToolsPage"),
);
const ToolCatalog = lazy(
  () => import("../browser-tools/components/ToolCatalog"),
);
const ToolRouteError = lazy(
  () => import("../browser-tools/components/ToolRouteError"),
);
const ToolNotFound = lazy(
  () => import("../browser-tools/components/ToolNotFound"),
);
const ThemeDesigner = lazy(
  () => import("../browser-tools/tools/ThemeDesigner"),
);
const CodeFormatter = lazy(
  () => import("../browser-tools/tools/CodeFormatter"),
);
const HtmlToMarkdown = lazy(
  () => import("../browser-tools/tools/HtmlToMarkdown"),
);
const PdfGenerator = lazy(() => import("../browser-tools/tools/PdfGenerator"));
const PublicationDesigner = lazy(
  () => import("../browser-tools/tools/PublicationDesigner"),
);
const PublisherWorkspace = lazy(
  () => import("../browser-tools/publisher/PublisherWorkspace"),
);
const PublisherLanding = lazy(
  () => import("../browser-tools/publisher/PublisherLanding"),
);
const ImageConverter = lazy(
  () => import("../browser-tools/tools/ImageConverter"),
);
const DataConverter = lazy(
  () => import("../browser-tools/tools/DataConverter"),
);
const CryptoHasher = lazy(() => import("../browser-tools/tools/CryptoHasher"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/archive/:slug" element={<Archive />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route
          path="browser-tools"
          element={<BrowserToolsPage />}
          errorElement={<ToolRouteError />}
        >
          <Route index element={<ToolCatalog />} />
          <Route path="theme-designer" element={<ThemeDesigner />} />
          <Route path="formatter" element={<CodeFormatter />} />
          <Route path="html-to-md" element={<HtmlToMarkdown />} />
          <Route path="pdf-generator" element={<PdfGenerator />} />
          <Route
            path="publication-designer"
            element={<Navigate to="/publisher" replace />}
          />
          <Route path="image-converter" element={<ImageConverter />} />
          <Route path="data-converter" element={<DataConverter />} />
          <Route path="crypto-hasher" element={<CryptoHasher />} />
          <Route path="*" element={<ToolNotFound />} />
        </Route>
        <Route path="/posts/:category/:slug" element={<SinglePostPage />} />
        <Route path="/posts/:slug" element={<SinglePostPage />} />
        <Route path="/:slug" element={<SinglePage />} />
      </Route>
      <Route path="publisher" element={<PublisherWorkspace />}>
        <Route element={<AppShell />}>
          <Route index element={<PublisherLanding />} />
        </Route>
        <Route path="editor" element={<PublicationDesigner />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route path="/admin/editor" element={<IntegratedEditorPage />} />
        <Route
          path="/admin/editor/:kind/:id"
          element={<IntegratedEditorPage />}
        />
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
    </>,
  ),
);

export function AppRouter() {
  return (
    <Suspense fallback={<div role="status">Loading…</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default AppRouter;

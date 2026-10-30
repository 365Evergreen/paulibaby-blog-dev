/**
 * src/lib/navigation.ts — navigation config with auth helpers.
 *
 * The nav items you provided, with helper functions to:
 *  - filter items by auth state (hide protected links from anonymous visitors)
 *  - check if a route requires auth
 *  - show/hide the "Sign In" link based on auth state
 */

import type { AuthUser } from "./auth";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavColumn {
  heading: string;
  links: NavLink[];
}

export interface NavItem {
  id: number;
  title: string;
  href: string;
  requiresAuth: boolean;
  hasMegaMenu: boolean;
  columns?: NavColumn[];
}

export const navigation: NavItem[] = [
  {
    id: 0,
    title: "Home",
    href: "/",
    requiresAuth: false,
    hasMegaMenu: false,
  },
  {
    id: 1,
    title: "Admin",
    href: "/admin",
    requiresAuth: true,
    hasMegaMenu: true,
    columns: [
      {
        heading: "Posts",
        links: [
          { label: "Dashboard", href: "/dashboard" },
          { label: "Edit posts", href: "/admin/post/:id" },
          { label: "Media library", href: "/admin/media-library" },
          { label: "Media admin", href: "/admin/media-admin" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Posts",
    href: "/archive",
    requiresAuth: false,
    hasMegaMenu: true,
    columns: [
      {
        heading: "Categories",
        links: [
          { label: "All", href: "/archive" },
          { label: "Music", href: "/admin/post/create" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Media Library",
    href: "/admin/media-library",
    requiresAuth: true,
    hasMegaMenu: false,
  },
  {
    id: 4,
    title: "Sign In",
    href: "/sign-in",
    requiresAuth: false,
    hasMegaMenu: false,
  },
];

/**
 * Returns the nav items visible to the current user.
 * - Hides `requiresAuth` items when not authenticated.
 * - Swaps "Sign In" for nothing when already authenticated (the SignOutButton
 *   lives in the header, not the nav).
 */
export function getVisibleNav(user: AuthUser | null): NavItem[] {
  return navigation.filter((item) => {
    // Hide "Sign In" link when already logged in
    if (item.href === "/sign-in" && user) return false;
    // Hide auth-required items when not logged in
    if (item.requiresAuth && !user) return false;
    return true;
  });
}

/** True if the given pathname requires authentication. */
export function routeRequiresAuth(pathname: string): boolean {
  return navigation.some((item) => {
    if (!item.requiresAuth) return false;
    // Match exact href or any mega-menu link href (ignoring :id params)
    if (matchRoute(item.href, pathname)) return true;
    return item.columns?.some((col) =>
      col.links.some((link) => matchRoute(link.href, pathname))
    );
  });
}

/** Matches a route pattern like /admin/post/:id against a real pathname. */
function matchRoute(pattern: string, pathname: string): boolean {
  const p = pattern.replace(/:[^/]+/g, "[^/]+");
  return new RegExp(`^${p}$`).test(pathname);
}

export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
};

export const DOMAIN_RULES = {
  main: "pyrax.dev",
  appSubdomain: "app.pyrax.dev",
};

export function isMainDomain(): boolean {
  return window.location.hostname === DOMAIN_RULES.main;
}

export function isAppSubdomain(): boolean {
  return window.location.hostname === DOMAIN_RULES.appSubdomain;
}

export function resolveRoute(hostname: string, path: string) {
  if (hostname === DOMAIN_RULES.main) {
    if (path.startsWith("/api")) return path;
    if (path === "/" || path === "") return ROUTES.HOME;
    return ROUTES.HOME;
  }

  if (hostname === DOMAIN_RULES.appSubdomain) {
    if (path === "/" || path === "") return ROUTES.DASHBOARD;
    return ROUTES.DASHBOARD;
  }

  return ROUTES.HOME;
}

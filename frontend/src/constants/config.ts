export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  PRODUCTS: "/producs",
  AUTH: "/auth",
};

export const DOMAIN_RULES = {
  main: ["pyrax.dev", "localhost"],
  appSubdomain: ["app.pyrax.dev", "app.localhost"],
};

export function isMainDomain(): boolean {
  return DOMAIN_RULES.main.includes(window.location.hostname);
}

export function isAppSubdomain(): boolean {
  return DOMAIN_RULES.appSubdomain.includes(window.location.hostname);
}

export function resolveRoute(hostname: string, path: string) {
  if (DOMAIN_RULES.main.includes(hostname)) {
    if (path.startsWith("/api")) return path;
    if (path === "/" || path === "") return ROUTES.HOME;
    return ROUTES.HOME;
  }

  if (DOMAIN_RULES.appSubdomain.includes(hostname)) {
    if (path === "/" || path === "") return ROUTES.DASHBOARD;

    if (path.startsWith("/products")) return ROUTES.PRODUCTS;

    if (path.startsWith("/auth")) return ROUTES.AUTH;

    return ROUTES.DASHBOARD;
  }

  return ROUTES.HOME;
}

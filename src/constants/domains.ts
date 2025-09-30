export const MAIN_DOMAIN = "pyrax.dev";
export const APP_SUBDOMAIN = "app.pyrax.dev";

const getBaseHostname = (): string => {
  if (typeof window === "undefined") return "";
  return window.location.hostname.split(":")[0];
};

export const isAppSubdomain = (): boolean => {
  const hostname = getBaseHostname();
  return hostname === APP_SUBDOMAIN || hostname === "app.localhost";
};

export const isMainDomain = (): boolean => {
  const hostname = getBaseHostname();
  return hostname === MAIN_DOMAIN || hostname === "localhost";
};

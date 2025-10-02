import { StrictMode, useEffect } from "react";
import * as ReactDOM from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
  useLocation,
} from "@tanstack/react-router";
import Dashboard from "./app/page";
import Home from "./home/page";
import NotFound from "./components/NotFound";
import { isAppSubdomain, isMainDomain } from "./constants/config";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./styles.css";
import ProductsDashboard from "./app/products/page";
import AuthenticationDashboard from "./app/auth/page";

const RootComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      isMainDomain() &&
      location.pathname !== "/" &&
      !location.pathname.startsWith("/api")
    ) {
      navigate({ to: "/" });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (
      isAppSubdomain() &&
      location.pathname !== "/" &&
      location.pathname !== "/products" &&
      location.pathname !== "/auth"
    ) {
      navigate({ to: "/" });
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <Outlet />
      <Analytics />
      <SpeedInsights />
    </>
  );
};

const IndexComponent = () => {
  if (isAppSubdomain()) return <Dashboard />;
  return <Home />;
};

const rootRoute = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexComponent,
});

const ProductsComponent = () => {
  if (isAppSubdomain()) return <ProductsDashboard />;
  return <NotFound />;
};

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: ProductsComponent,
});

const AuthComponent = () => {
  if (isAppSubdomain()) return <AuthenticationDashboard />;
  return <NotFound />;
};

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthComponent,
});

const routeTree = rootRoute.addChildren([indexRoute, productsRoute, authRoute]);

const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

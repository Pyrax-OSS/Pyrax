import { StrictMode, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
  useLocation,
} from '@tanstack/react-router'

import './styles.css'

import Dashboard from './pages/app/Index.tsx'
import Home from './pages/home/Home.tsx'
import NotFound from './pages/NotFound.tsx'
import { isAppSubdomain, isMainDomain } from './constants/domains'

const RootComponent = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (isMainDomain() && location.pathname !== '/') {
      navigate({ to: '/' })
    }
  }, [location.pathname, navigate])

  return <Outlet />
}

const IndexComponent = () => {
  return isAppSubdomain() ? <Dashboard /> : <Home />
}

const rootRoute = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexComponent,
})

const routeTree = rootRoute.addChildren([indexRoute])

const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}

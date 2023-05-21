import React from 'react'

import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

const Login = React.lazy(() => import('@/views/login'))
const Index = React.lazy(() => import('@/views/main'))

declare module 'react-router' {
  interface IndexRouteObject {
    meta?: {
      menu?: boolean
      title?: string
      icon?: React.ReactNode
      auth?: boolean
    }
    name?: string
  }
  interface NonIndexRouteObject {
    meta?: {
      menu?: boolean
      title?: string
      icon?: React.ReactNode
      auth?: boolean
    }
    name?: string
  }
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/main',
    name: 'main',
    // element: <Navigate to="/main/index7" />
    children: []
  }
  // {
  //   path: '/main/index7',
  //   element: <Index />
  // }
]
const main = routes.filter((item) => item.name == 'main')[0].children
// console.log(main)
export const addRoutes = (routes: any) => {
  routes.forEach((item: RouteObject) => {
    main?.push(item)
  })
}

// main?.push(
//   {
//     path: '/main',
//     element: <Navigate to="/main/index7" />
//   },
//   { path: '/main/index7', element: <Index /> }
// )
export default routes

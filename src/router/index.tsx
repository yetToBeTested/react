import React from 'react'

// import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
const Login = React.lazy(() => import('@/views/login'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Login />
  }
]

export default routes

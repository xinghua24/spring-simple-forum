import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './screens/Home/Home.tsx'
import NewPost from './screens/NewPost/NewPost.tsx';
import PostScreen from './screens/PostScreen/PostScreen.tsx';

const queryClient = new QueryClient()

import { PrimeReactProvider } from 'primereact/api';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//icon
import 'primeicons/primeicons.css';
import Layout from './components/Layout/Layout.tsx';

const router = createHashRouter([{
  path: "/",
  element: <Layout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/posts/:postId",
      element: <PostScreen />
    },
    {
      path: "/posts/new",
      element: <NewPost />
    }
  ]
}]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
)

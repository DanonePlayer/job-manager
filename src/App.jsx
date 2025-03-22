import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import JobListPage from './pages/JobListPage';
import JobFormPage from './pages/JobFormPage';
import JobDetailPage from './pages/JobDetailPage';
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/jobs",
    element: <PrivateRoute element={JobListPage} />,
  },
  {
    path: "/jobs/new",
    element: <PrivateRoute element={JobFormPage} />,
  },
  {
    path: "/jobs/:id",
    element: <PrivateRoute element={JobDetailPage} />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

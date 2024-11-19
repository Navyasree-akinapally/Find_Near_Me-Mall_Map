import { Navigate, Route, Routes } from 'react-router-dom';
import AuthRoutes from './routes/authRoutes';
import { useAuth } from './context/auth-context';
import AdminRoutes from './routes/adminRoutes';
import NotFound from './pages/not-found';
import MallAdminRoutes from './routes/mallAdminRoutes';

function App() {
  const { isAuth } = useAuth(); // Check if the user is authenticated

  return (
    <div>
      <Routes>
        {/* If the user is authenticated, allow access to admin routes */}
        <Route path='/admin/*' element={<AdminRoutes />} />
        <Route path='/malladmin/*' element={<MallAdminRoutes />} />
        {isAuth ? (
          <>
            {/* Redirect any auth-related paths to the malladmin if already logged in */}
            <Route path='/auth/*' element={<Navigate to='/admin' replace />} />
          </>
        ) : (
          <>
            {/* If not authenticated, redirect to auth login routes */}
            <Route path='/auth/*' element={<AuthRoutes />} />
            {/* Redirect all unknown paths to /auth/malladmin for login */}
            <Route path='*' element={<Navigate to='/auth/malladmin' replace />} />
          </>
        )}
        {/* Optionally handle the Not Found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

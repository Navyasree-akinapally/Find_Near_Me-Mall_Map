import { Navigate, Route, Routes } from 'react-router-dom';
import AuthRoutes from './routes/authRoutes';
import PublicRoutes from './routes/publicRoutes';
import { useAuth } from './context/auth-context';
import AdminRoutes from './routes/adminRoutes';
import useStore from './context/store-context';
import NotFound from './pages/not-found';


function App() {
  const { isAuth } = useAuth();
  return (
    <div>
      <Routes>
        <Route path='/admin/*' element={<AdminRoutes />} />
        {isAuth ? (
          <>
            <Route path='/auth/*' element={<Navigate to={'/'} replace />} />
          </>
        ) : (
          <>
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path='/admin/*' element={<Navigate to={'/auth/user'} replace />} />

          </>
        )}
        <Route path='/*' element={<PublicRoutes />} />
        <Route path='/auth' element={<NotFound />} />
        <Route path='/:stateName' element={<NotFound />} />


      </Routes>
    </div>
  );
}

export default App;

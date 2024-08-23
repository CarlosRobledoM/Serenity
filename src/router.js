import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { userContext } from './context/authContext';
import { CircularProgress } from '@mui/material';
import Layout from './layout';
import Login from './views/login';
import Register from './views/register';
import Home from './views/home';
import PreLoader from './components/PreLoader';
import Resume from './views/resume';
import History from './views/history';

const PublicRoutes = () => (
  <Layout>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route exact path="/" element={<Navigate to="/login" />} />
      <Route path="/resume" element={<Navigate to="/login" />} />
      <Route path="/history" element={<Navigate to="/login" />} />
    </Routes>
  </Layout>
);

const PritaveRoutes = () => (
  <Layout>
    <Routes>
      <Route path="/login" element={<Navigate to="/" />} />
      <Route path="/register" element={<Navigate to="/" />} />
      <Route exact path="/" element={<Home />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/history" element={<History />} />
    </Routes>
  </Layout>
);

export default function Router() {
  const { user, loading } = useContext(userContext);

  if (loading)
    return <PreLoader loading={loading} completed={loading ? false : true} />;

  if (!user) return <PublicRoutes />;

  return <PritaveRoutes />;
}

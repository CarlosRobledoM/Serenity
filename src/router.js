import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { userContext } from './context/authContext';
import { CircularProgress } from '@mui/material';
import Layout from './layout';
import Login from './views/login';
import Register from './views/register';
import Home from './views/home';

const PublicRoutes = () => (
  <Layout>
    <Routes>
      <Route exact path="/" element={<Navigate to="/login" />} />
      <Route path="/home" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Layout>
);

const PritaveRoutes = () => (
  <Layout>
    <Routes>
      <Route path="/login" element={<Navigate to="/" />} />
      <Route path="/register" element={<Navigate to="/" />} />
      <Route exact path="/" element={<Home />} />
      <Route path="/history" element={<Home />} />
    </Routes>
  </Layout>
);

export default function Router() {
  const { user, loading } = useContext(userContext);

  if (loading) return <CircularProgress />;

  if (!user) return <PublicRoutes />;

  return <PritaveRoutes />;
}

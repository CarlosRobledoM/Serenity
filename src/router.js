import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Login from './views/login';
import Registrar from './views/register';
import Home from './views/home';

const PublicRoutes = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registrar />} />
    </Routes>
  </Layout>
);

export default function Router() {
  return <PublicRoutes />;
}

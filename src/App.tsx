/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Providers } from './components/common/Providers';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/home/HomePage';
import { StudentDashboard } from './components/dashboard/StudentDashboard';

function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300 font-sans flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const AdminDashboard = () => <div className="p-12">Admin Dashboard (Protected)</div>;
const InstructorDashboard = () => <div className="p-12">Instructor Dashboard (Protected)</div>;

export default function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<div className="flex items-center justify-center py-20 px-4 min-h-[calc(100vh-16rem)]"><LoginForm /></div>} />
            <Route path="/register" element={<div className="flex items-center justify-center py-20 px-4 min-h-[calc(100vh-16rem)]"><RegisterForm /></div>} />
            
            {/* Protected Routes using React Router Component to complement middleware */}
            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/instructor/*" element={
              <ProtectedRoute allowedRoles={['admin', 'instructor']}>
                <InstructorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/*" element={
              <ProtectedRoute allowedRoles={['admin', 'instructor', 'student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    alert("You must be logged in");
    return <Navigate to="/login" replace />;
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'user':
        return <UserDashboard />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  // Hide sidebar for these routes (including invoice with dynamic orderId)
  const hideSidebar = ["/dashboard/manage-orders", "/dashboard/invoice"].some(
    (path) => location.pathname.startsWith(path)
  );

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start">
      {/* Sidebar / Header */}
      {!hideSidebar && (
        <header className="lg:w-1/5 sm:w-2/5 w-full border mt-5 print:hidden">
          {renderDashboard()}
        </header>
      )}

      {/* Main content */}
      <main
        className={`p-8 bg-white w-full border mt-5 ${
          hideSidebar ? 'md:col-span-full' : ''
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

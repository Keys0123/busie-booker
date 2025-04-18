import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import RoutesPage from './pages/Routes'; // Renamed import to avoid conflict
import Search from './pages/Search';
import Contact from './pages/Contact';
import Help from './pages/Help';
import Login from './pages/Login';
import Register from './pages/Register';
import BusListing from './pages/BusListing';
import SeatSelection from './pages/SeatSelection';
import BookingConfirmation from './pages/BookingConfirmation';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/admin/Login';
import AdminLayout from './components/admin/AdminLayout'; // Fixed import path
import Dashboard from './pages/admin/Dashboard';
import Buses from './pages/admin/Buses';
import AdminRoutes from './pages/admin/Routes';
import Bookings from './pages/admin/Bookings';
import Users from './pages/admin/Users';
import Profile from './pages/Profile';
import Report from './pages/admin/Report';
import LiveTracking from './pages/LiveTracking';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/routes" element={<RoutesPage />} /> {/* Updated component reference */}
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bus-listing" element={<BusListing />} />
        <Route path="/seat-selection/:busId" element={<SeatSelection />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/live-tracking" element={<LiveTracking />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="buses" element={<Buses />} />
          <Route path="routes" element={<AdminRoutes />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="users" element={<Users />} />
          <Route path="report" element={<Report />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

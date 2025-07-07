import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import EventDetails from './pages/EventDetails';
import LoginPage from './pages/LoginPage';
import RegisterChoicePage from './pages/RegisterChoicePage';
import RegisterUserPage from './pages/RegisterUserPage';
import RegisterOrganizationPage from './pages/RegisterOrganizationPage';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import ProfileOrganization from './pages/ProfileOrganization';
import ProvinciaPage from './pages/ProvinciaPage';

function LogOut() {
  localStorage.clear();
  return <Navigate to="/login" />;
}
/*
  AppRoutes component defines the routes for the application.
  It uses React Router to handle navigation between different pages.
  The routes include:
  - HomePage: Displays a list of events with search functionality.
  - EventDetails: Shows details of a specific event.
  - LoginPage: Allows users to log in.
  - LogOut: Clears local storage and redirects to login page.
  - RegisterChoicePage: Lets users choose between registering as a user or organization.
  - RegisterUserPage: Registration form for regular users.
  - RegisterOrganizationPage: Registration form for organizations.
  - Dashboard: Protected route for organization users to manage their events.
  - Favorites: Protected route for regular users to view their favorite events.
  - Profile: Protected route for both organization and regular users to view their profiles.
  - NotFound: Displays a 404 error page for unmatched routes.
*/
export default function AppRoutes({ events, searchText, setSearchText }) {
  return (
    <Routes>
      <Route path="/" element={
        <HomePage 
          events={events} 
          searchText={searchText} 
          setSearchText={setSearchText} 
        />} 
      />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogOut />} />
      <Route path="/register-choice" element={<RegisterChoicePage />} />
      <Route path="/register-user" element={<RegisterUserPage />} />
      <Route path="/register-organization" element={<RegisterOrganizationPage />} />
      <Route path="/province/:provincia" element={<ProvinciaPage events={events} />} />



      <Route path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['organization']}>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      <Route path="/favorites"
        element={
          <ProtectedRoute allowedRoles={['regular']}>
            <Favorites />
          </ProtectedRoute>
        } 
      />

      <Route path="/profile"
        element={
          <ProtectedRoute allowedRoles={['regular']}>
            <Profile />
          </ProtectedRoute>
        } 
      />
            <Route path="/organization/profile"
        element={
          <ProtectedRoute allowedRoles={['organization']}>
            <ProfileOrganization />
          </ProtectedRoute>
        } 
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

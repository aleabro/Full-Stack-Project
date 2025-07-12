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
import PrivacyPolicy from './pages/PrivacyPage';
import OrganizationPage from './pages/OrganizationPage';
import ProvinciaPage from './pages/ProvinciaPage';
import CategoriaPage from './pages/CategoriaPage';

function LogOut({setUser}) {
  localStorage.clear();
  setUser(null);
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
export default function AppRoutes({ events, setEvents, searchText, setSearchText, filteredEvents, user, setUser, organizations }) {
  return (
    <Routes>
      <Route path="/" element={
        <HomePage 
          events={events} 
          filteredEvents={filteredEvents}
          user={user}
          organizations={organizations}
        />
      } />
      <Route path="/events/:id" element={<EventDetails user={user} />} />
      <Route path="/login" element={<LoginPage setUser={setUser}/>} />
      <Route path="/logout" element={<LogOut setUser={setUser}/>} />
      <Route path="/register-choice" element={<RegisterChoicePage />} />
      <Route path="/register-user" element={<RegisterUserPage />} />
      <Route path="/register-organization" element={<RegisterOrganizationPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/organization/:id" element={<OrganizationPage />} />

      <Route path="/province/:provincia" element={
        <ProvinciaPage 
          events={events} 
          searchText={searchText} 
          setSearchText={setSearchText}
        />
      } />

      <Route path="/categorie/:categoria" element={
        <CategoriaPage 
          events={events} 
          searchText={searchText} 
          setSearchText={setSearchText}
        />
      } />


      <Route path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['organization']}>
            <Dashboard searchText={searchText} events={events} setEvents={setEvents} filteredEvents={filteredEvents} />
          </ProtectedRoute>
        }
      />

      <Route path="/favorites"
        element={
          <ProtectedRoute allowedRoles={['regular']}>
            <Favorites searchText={searchText} />
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

import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router";
import ProtectedRoute from "./pages/ProtectedRoute";
import Loader from "./components/Loader";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import ScrollToHash from "./components/ScrollToHash";


// lazy-loaded route components
const DashboardPage = lazy(() => import("./pages/Dashboard"));

const LoginPage = lazy(() => import("./pages/Loginpage"));
const ForgotPassword = lazy(() => import("./components/login/ForgetPassword"));
const ResetPassword = lazy(() => import("./components/login/ResetPasswordForm"));
const VerifyOtp= lazy(() => import("./components/login/VerifyOtp"));

const SectionCards = lazy(() =>
  import("./components/Section-cards").then((m) => ({ default: m.SectionCards }))
);
const DashboardHome = lazy(() => import("./pages/DashboardHome"));

const Users = lazy(() => import("./components/Users/UserTable"));
const UsersFromMember = lazy(() => import("./components/Users/UserFromMember"));
const UserDetailsAdmin = lazy(() => import("./components/Users/UserDetailsAdmin"));

// const Report= lazy(()=>import('./components/Members/DailyReport'))
const Profile = lazy(() => import("./components/Users/UserProfile"));
const IDcard = lazy(() => import("./components/IDcard/PVCIDCard"));
const NotificationCenter = lazy(() => import('./components/Notifications/NotificationCenter'));
const NotificationPreferences = lazy(() => import('./components/Notifications/NotificationPreferences'));
const AdminAnnouncements = lazy(() => import('./components/Notifications/AdminAnnouncements'));

// Phase 7: Content Moderation and Resource Hub components

// Phase 8: Admin Governance and Safety components
const AuditLogViewer = lazy(() => import("./components/Admin/AuditLogViewer"));
const SystemHealth = lazy(() => import("./components/Admin/SystemHealth"));
const PermissionMatrix = lazy(() => import("./components/Admin/PermissionMatrix"));
const SetupPassword = lazy(() => import("./components/login/SetupPassword"));

function App() {
  return (
    <>
      <PWAInstallPrompt />
      <ScrollToHash/>
 
      <Routes>
        {/* auth */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/file" element={<File />} />
   
       
     
  
 <Route path="/forgot-password" element= { <Suspense fallback={<Loader size="lg" colorClass="text-orange-600" />}><ForgotPassword /></Suspense>} />
<Route path="/verify-otp" element= { <Suspense fallback={<Loader size="lg" colorClass="text-orange-600" />}><VerifyOtp /></Suspense>} />
<Route path="/reset-password" element= { <Suspense fallback={<Loader size="lg" colorClass="text-orange-600" />}><ResetPassword /></Suspense>} />
{/* Phase 8: Invite-based password setup */}
<Route path="/setup-password" element= { <Suspense fallback={<Loader size="lg" colorClass="text-orange-600" />}><SetupPassword /></Suspense>} />
        {/* protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<Loader size="lg" colorClass="text-orange-600" />}>
                <DashboardHome />
              </Suspense>
            }
          />
        
      
          <Route path="users" element={<Suspense fallback={<Loader size="lg" colorClass="text-orange-600" />}><Users /></Suspense>} />
  <Route path="users/new" element={<Suspense fallback={<Loader size="lg" colorClass="text-orange-600" />}><UsersFromMember /></Suspense>} />
          <Route path="users/:id" element={<Suspense fallback={<Loader size="lg" colorClass="text-orange-600" />}><UserDetailsAdmin /></Suspense>} />
    <Route path="profile" element={<Suspense fallback={<Loader size="lg" colorClass="text-orange-600" />}><Profile /></Suspense>} />
  <Route path="id-card/:memberId" element={<Suspense fallback={<Loader size="lg" colorClass="text-orange-600" />}><IDcard /></Suspense>} />
  

  
  <Route path="notifications" element={<Suspense fallback={<Loader size="lg" colorClass="text-orange-600" />}><NotificationCenter /></Suspense>} />
  <Route path="notification-settings" element={<Suspense fallback={<Loader size="lg" colorClass="text-orange-600" />}><NotificationPreferences /></Suspense>} />
  <Route path="announcements" element={<Suspense fallback={<Loader size="lg" colorClass="text-orange-600" />}><AdminAnnouncements /></Suspense>} />


  {/* Phase 8: Admin Governance and Safety routes */}
  <Route path="audit-log" element={<Suspense fallback={<Loader size="lg" colorClass="text-orange-600" />}><AuditLogViewer /></Suspense>} />
  <Route path="system-health" element={<Suspense fallback={<Loader size="lg" colorClass="text-orange-600" />}><SystemHealth /></Suspense>} />
  <Route path="permissions" element={<Suspense fallback={<Loader size="lg" colorClass="text-orange-600" />}><PermissionMatrix /></Suspense>} />
        </Route>
      </Routes>
      </>

  );
}

export default App;

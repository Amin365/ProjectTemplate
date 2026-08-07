import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router";

import ProtectedRoute from "./pages/ProtectedRoute";
import Loader from "./components/Loader";
import PWAInstallPrompt from "./components/PWAInstallPrompt";
import ScrollToHash from "./components/ScrollToHash";

import { XalTechRouter } from "@/components/XalTech/xaltech.router";

// 
// Dashboard
// 

const DashboardPage = lazy(() => import("./pages/Dashboard"));
const DashboardHome = lazy(() => import("./pages/DashboardHome"));

// 
// Authentication
// 

const LoginPage = lazy(() => import("./pages/Loginpage"));

const ForgotPassword = lazy(() =>
  import("./components/login/ForgetPassword")
);

const ResetPassword = lazy(() =>
  import("./components/login/ResetPasswordForm")
);

const VerifyOtp = lazy(() =>
  import("./components/login/VerifyOtp")
);

const SetupPassword = lazy(() =>
  import("./components/login/SetupPassword")
);

// 
// Dashboard Components
// 

const SectionCards = lazy(() =>
  import("./components/Section-cards").then((module) => ({
    default: module.SectionCards,
  }))
);

// 
// Users
// 

const Users = lazy(() =>
  import("./components/Users/UserTable")
);

const UsersFromMember = lazy(() =>
  import("./components/Users/UserFromMember")
);

const UserDetailsAdmin = lazy(() =>
  import("./components/Users/UserDetailsAdmin")
);

const Profile = lazy(() =>
  import("./components/Users/UserProfile")
);

// 
// ID Card
// 

const IDcard = lazy(() =>
  import("./components/IDcard/PVCIDCard")
);

// 
// Notifications
// 

const NotificationCenter = lazy(() =>
  import("./components/Notifications/NotificationCenter")
);

const NotificationPreferences = lazy(() =>
  import("./components/Notifications/NotificationPreferences")
);

const AdminAnnouncements = lazy(() =>
  import("./components/Notifications/AdminAnnouncements")
);

// 
// Admin Governance
// 

const AuditLogViewer = lazy(() =>
  import("./components/Admin/AuditLogViewer")
);

const SystemHealth = lazy(() =>
  import("./components/Admin/SystemHealth")
);

const PermissionMatrix = lazy(() =>
  import("./components/Admin/PermissionMatrix")
);

// 
// Shared Lazy Loader
// 

const PageLoader = () => (
  <Loader
    size="lg"
    colorClass="text-orange-600"
  />
);

// 
// App
// 

function App() {
  return (
    <>
      {/* Shared application components */}
      <PWAInstallPrompt />
      <ScrollToHash />

      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* ==
              XALTECH PUBLIC WEBSITE
          == */}

          <Route path="/">
            {XalTechRouter.map((route) => (
              <Route
                key={route.path || "xaltech-home"}
                index={route.index}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>

          {/* ==
              AUTHENTICATION
          == */}

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/verify-otp"
            element={<VerifyOtp />}
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

          <Route
            path="/setup-password"
            element={<SetupPassword />}
          />

          {/* ==
              PROTECTED DASHBOARD
          == */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          >

            {/* Dashboard Home */}
            <Route
              index
              element={<DashboardHome />}
            />

            {/* 
                USERS
             */}

            <Route
              path="users"
              element={<Users />}
            />

            <Route
              path="users/new"
              element={<UsersFromMember />}
            />

            <Route
              path="users/:id"
              element={<UserDetailsAdmin />}
            />

            {/* 
                PROFILE
             */}

            <Route
              path="profile"
              element={<Profile />}
            />

            {/* 
                ID CARD
             */}

            <Route
              path="id-card/:memberId"
              element={<IDcard />}
            />

            {/* 
                NOTIFICATIONS
             */}

            <Route
              path="notifications"
              element={<NotificationCenter />}
            />

            <Route
              path="notification-settings"
              element={<NotificationPreferences />}
            />

            <Route
              path="announcements"
              element={<AdminAnnouncements />}
            />

            {/* 
                ADMIN GOVERNANCE
             */}

            <Route
              path="audit-log"
              element={<AuditLogViewer />}
            />

            <Route
              path="system-health"
              element={<SystemHealth />}
            />

            <Route
              path="permissions"
              element={<PermissionMatrix />}
            />

          </Route>

        </Routes>
      </Suspense>
    </>
  );
}

export default App;
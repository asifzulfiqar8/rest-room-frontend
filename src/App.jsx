import { Route, Routes, Navigate, Link } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/shared/Loader.jsx";
import { useGetMyProfileQuery } from "./services/auth/authApi.js";
import { userExist, userNotExist } from "./services/auth/authSlice.js";
import Button from "./components/shared/button/Button.jsx";

// Lazy-loaded components
const AllRestRooms = lazy(() =>
  import("./pages/buildings/allRestRooms/AllRestRooms.jsx")
);
const Buildings = lazy(() => import("./pages/buildings/Buildings"));
const AdminDashboard = lazy(() =>
  import("./pages/dashboard/AdminDashboard.jsx")
);
const BuildingFloors = lazy(() =>
  import("./pages/dashboard/components/buildingFloors")
);
const AllFloorList = lazy(() =>
  import("./pages/dashboard/components/buildingFloors/AllFloorList.jsx")
);
const EditBuilding = lazy(() =>
  import("./pages/dashboard/components/buildingFloors/EditBuilding.jsx")
);
const Dashboard = lazy(() => import("./pages/dashboard/components/dashboard"));
const Floor = lazy(() => import("./pages/dashboard/components/floors.jsx"));
const Plans = lazy(() => import("./pages/plans/Plans.jsx"));
const Register = lazy(() => import("./pages/auth/Register.jsx"));
const InspectorReporting = lazy(() =>
  import("./pages/reporting/InspectorReporting.jsx")
);
const UserReporting = lazy(() => import("./pages/reporting/UserReporting.jsx"));
const Sensors = lazy(() => import("./pages/sensors/Sensors"));
const ViewSensor = lazy(() => import("./pages/sensors/ViewSensor.jsx"));
const ChangePassword = lazy(() =>
  import("./pages/settings/components/ChangePassword.jsx")
);
const Subscription = lazy(() =>
  import("./pages/settings/components/Subscription.jsx")
);
const Settings = lazy(() => import("./pages/settings/Settings"));
const Signin = lazy(() => import("./pages/auth/Signin.jsx"));
const Home = lazy(() => import("./components/layout/index.jsx"));
const InspectionHome = lazy(() => import("./inspection/layout/index.jsx"));
const InspectionDashboard = lazy(() =>
  import("./inspection/pages/dashboard/InspectionDashboard.jsx")
);
const InspectionProfile = lazy(() =>
  import("./inspection/pages/settings/components/Profile.jsx")
);
const InspectionChangePassword = lazy(() =>
  import("./inspection/pages/settings/components/ChangePassword.jsx")
);
const Inspections = lazy(() =>
  import("./inspection/pages/inspection/Inspections.jsx")
);
const Configuration = lazy(() => import("./pages/settings/Configuration.jsx"));
// const ReportsList = lazy(() => import("./pages/downloadReport/ReportsList.jsx"));
const Reports = lazy(() => import("./pages/downloadReport/Reports.jsx"));
const Admin = lazy(() => import("./pages/admin/layout/index.jsx"));
const AdminProfile = lazy(() =>
  import("./pages/admin/settings/components/Profile.jsx")
);
const AdminChangePassword = lazy(() =>
  import("./pages/admin/settings/components/ChangePassword.jsx")
);
const AdminBuildings = lazy(() =>
  import("./pages/admin/buildings/Buildings.jsx")
);

const AddBuildingStepper = lazy(() =>
  import("./pages/buildings/addBuildingStepper/AddBuildingStepper.jsx")
);
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute.jsx"));

const App = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetMyProfileQuery();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (data && data?.data) dispatch(userExist(data?.data));
    if (error) dispatch(userNotExist());
  }, [data, dispatch, error]);

  return isLoading ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <ProtectedRoute user={!user} redirect="/">
              <Signin />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Main application routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute user={user} redirect="/login">
              {user?.role === "admin" ? (
                <Navigate replace to="/admin" />
              ) : user?.role === "inspectionist" ? (
                <Navigate replace to="/inspection" />
              ) : (
                <Home />
              )}
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="building-floor" element={<BuildingFloors />} />
          <Route path="update-building/:id" element={<EditBuilding />} />
          <Route path="floor/:buildingId/:floorId" element={<Floor />} />
          <Route path="buildings" element={<Buildings />} />
          <Route path="add-building" element={<AddBuildingStepper />} />
          <Route path="sensor" element={<Sensors />} />
          <Route path="view-sensor" element={<ViewSensor />} />
          <Route path="setting" element={<Settings />} />
          <Route path="reporting" element={<UserReporting />} />
          <Route path="plan" element={<Plans />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="all-floors" element={<AllFloorList />} />
          <Route path="configuration" element={<Configuration />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Inspectionist Routes */}
        <Route
          path="/inspection"
          element={
            <ProtectedRoute user={user} role="inspectionist" redirect="/login">
              <InspectionHome />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<InspectionDashboard />} />
          <Route path="history" element={<InspectorReporting />} />
          <Route path="all-inspections" element={<Inspections />} />
          <Route path="all-restrooms" element={<AllRestRooms />} />
          <Route path="profile" element={<InspectionProfile />} />
          <Route
            path="change-password"
            element={<InspectionChangePassword />}
          />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} role="admin" redirect="/login">
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="change-password" element={<AdminChangePassword />} />
          <Route path="buildings" element={<AdminBuildings />} />
        </Route>

        {/* Redirect all other routes to / */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default App;

const Unauthorized = () => {
  return (
    <section className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-semibold">Access Denied: Unauthorized</h1>
      <div className="mt-5">
        <Link to="/">
          <Button text="Go to home page" />
        </Link>
      </div>
    </section>
  );
};

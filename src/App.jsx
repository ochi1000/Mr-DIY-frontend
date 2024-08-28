import Home from "./components/pages/Home";
import PageNotFound from "./components/pages/PageNotFound";
import { Route, Routes } from "react-router-dom";
import MainDashboardLayout from "./layout/MainDashboardLayout";

import Dashboard from "./layout/dashboard";
import Login from "./components/pages/Login";

function App() {
  return (
    <>
      <Routes>
        {/* Routes for the public pages */}

        {/* <Route element={<Public />}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
           
            <Route path="/check-email" element={<CheckEmail />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/set-new-password" element={<ResetPassword />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/ui" element={<UI />} />
          </Route> */}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route element={<MainDashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />}>
            {/* <Route index element={<Navigate replace to="dashboard" />} /> */}
            <Route path="/dashboard/home-admin" element={<Dashboard />} />
            <Route path="/dashboard/order-home" element={<Dashboard />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;

import Home from "./pages/Home";

import { Navigate, Route, Routes } from "react-router-dom";
import MainDashboardLayout from "./layout/MainDashboardLayout";

// import Dashboard from "src/layout/Dashboard";
import Login from "./pages/Login";
import Public from "./Routes/Public";
import Private from "./Routes/Private";
import Register from "./pages/Register";
import Inventory from "./pages/Admin/Products/Inventory";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Categories from "./pages/Admin/Products/Categories";
import Products from "./pages/Admin/Products/Product";
import CreateProduct from "./pages/Admin/Products/CreateProduct";
import UpdateProduct from "./pages/Admin/Products/UpdateProduct";
import CreateCategory from "./pages/Admin/Products/CreateCategory";
import CategoryUpdate from "./pages/Admin/Products/CategoryUpdate";

function App() {
  return (
    <>
      <Routes>
        {/* Routes for the public pages */}

        <Route element={<Public />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* <Route path="/check-email" element={<CheckEmail />} />  
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/set-new-password" element={<ResetPassword />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/ui" element={<UI />} /> */}
        </Route>
        <Route element={<Private />}>
          <Route path="admin" element={<MainDashboardLayout />}>
            <Route path="dashboard" element={<AdminDashboard />}>
              {/* <Route index element={<Navigate replace to="dashboard" />} /> */}
              {/* <Route path="/dashboard/home-admin" element={<Dashboard />} />
              <Route path="/dashboard/order-home" element={<Dashboard />} /> */}
            </Route>
            <Route path="orders-management" element={<NotFound />}>
              <Route
                path="orders-management/orders-list"
                element={<NotFound />}
              />
              <Route
                path="orders-management/product-reviews"
                element={<NotFound />}
              />
              <Route
                path="orders-management/abandoned-cart"
                element={<NotFound />}
              />
              <Route
                path="orders-management/order-cancellation-requests"
                element={<NotFound />}
              />
              <Route
                path="orders-management/order-return-requests"
                element={<NotFound />}
              />
              <Route
                path="orders-management/wishlist-mgt"
                element={<NotFound />}
              />
              <Route
                path="orders-management/coupon-managements"
                element={<NotFound />}
              />
            </Route>

            <Route path="product" element={<Products />}>
              <Route index element={<Navigate replace to="inventory" />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="inventory/create" element={<CreateProduct />} />
              <Route path="inventory/update/:id" element={<UpdateProduct />} />

              <Route path="categories" element={<Categories />} />
              <Route path="categories/create" element={<CreateCategory />} />
              <Route
                path="categories/update/:id"
                element={<CategoryUpdate />}
              />

              {/* <Route path="dashboard/order-home" element={<Dashboard />} /> */}
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

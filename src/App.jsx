import Home from "./pages/Home";

import { Navigate, Route, Routes } from "react-router-dom";
import MainDashboardLayout from "./layout/MainDashboardLayout";

// import Dashboard from "src/layout/Dashboard";
import Login from "./pages/Login";
import Public from "./Routes/Public";
import PrivateRoute from "./Routes/PrivateRoute";
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
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import GoogleAuthCallback from "./pages/GoogleAuthCallback";
import Tags from "./pages/Admin/Products/Tags";
import Attributes from "./pages/Admin/Products/Attributes";
import AdminLogin from "./pages/AdminLogin";
import UserPrivateRoute from "./Routes/UserPrivateRoute";
import UserDashboardLayout from "./layout/UserDashboardLayout";
import UserDashboard from "./pages/User/userDashboard";
import DeliveryAddress from "./pages/User/DeliveryAddress";
import ProfileSettings from "./pages/User/ProfileSettings";
import Overview from "./pages/User/Overview";
import PaymentCallback from "./pages/PaymentCallback";
import AdminCreateOrder from "./pages/Admin/Orders/AdminCreateOrder";
import ListOrders from "./pages/Admin/Orders/ListOrders";
import OrderManagement from "./pages/Admin/Orders/OrderManagement";
import ProductListings from "./pages/ProductListings";

function App() {
  return (
    <>
      <Routes>
        {/* Routes for the public pages */}

        <Route element={<Public />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/auth/google/callback"
            element={<GoogleAuthCallback />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/product-listings" element={<ProductListings />} />
          <Route path="/payment/callback" element={<PaymentCallback />} />

          {/* <Route path="/check-email" element={<CheckEmail />} />  
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/set-new-password" element={<ResetPassword />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/ui" element={<UI />} /> */}
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="admin" element={<MainDashboardLayout />}>
            <Route path="dashboard" element={<AdminDashboard />}>
              {/* <Route index element={<Navigate replace to="dashboard" />} /> */}
              {/* <Route path="/dashboard/home-admin" element={<Dashboard />} />
              <Route path="/dashboard/order-home" element={<Dashboard />} /> */}
            </Route>
            <Route path="orders-management" element={<OrderManagement />}>
              <Route index element={<Navigate replace to="orders-list" />} />
              <Route path="orders-list" element={<ListOrders />} />
              <Route path="create-orders" element={<AdminCreateOrder />} />

              <Route path="product-reviews" element={<NotFound />} />
              <Route path="abandoned-cart" element={<NotFound />} />
              <Route
                path="order-cancellation-requests"
                element={<NotFound />}
              />
              <Route path="order-return-requests" element={<NotFound />} />
              <Route path="wishlist-mgt" element={<NotFound />} />
              <Route path="coupon-managements" element={<NotFound />} />
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
              <Route path="tags" element={<Tags />} />
              <Route path="attributes" element={<Attributes />} />
              {/* <Route path="tags/create" element={<CreateCategory />} />
              <Route path="tags/update/:id" element={<CategoryUpdate />} /> */}

              {/* <Route path="dashboard/order-home" element={<Dashboard />} /> */}
            </Route>
          </Route>
        </Route>
        <Route element={<UserPrivateRoute />}>
          <Route path="user" element={<UserDashboardLayout />}>
            <Route path="dashboard" element={<UserDashboard />}>
              {/* <Route index element={<Navigate replace to="dashboard" />} /> */}
              {/* <Route path="/dashboard/home-admin" element={<Dashboard />} /> */}
            </Route>
            <Route path="delivery-address" element={<DeliveryAddress />} />
            <Route path="profile-settings" element={<ProfileSettings />} />
            <Route path="overview" element={<Overview />} />
            {/* <Route path="orders-management" element={<NotFound />}>
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
            </Route> */}

            {/* <Route path="product" element={<Products />}>
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
              <Route path="tags" element={<Tags />} />
              <Route path="attributes" element={<Attributes />} />
            
            </Route> */}
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

import { Outlet } from "react-router-dom";

const OrderManagement = () => {
  return (
    <>
      <div className="bg-gray-50">
        <Outlet />
      </div>
    </>
  );
};

export default OrderManagement;

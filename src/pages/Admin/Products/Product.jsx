import { Outlet } from "react-router-dom";

const Products = () => {
  return (
    <>
      <div className="bg-gray-50">
        <Outlet />
      </div>
    </>
  );
};

export default Products;

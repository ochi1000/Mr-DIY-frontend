// import classNames from "classnames";
// import { useState } from "react";
// import product from "src/assets/images/product/brown-handbag-1.jpg";
import { useDispatch, useSelector } from "react-redux";
// import productData from "../../data/product";
import ProductCard from "../ui/ProductCard";
// import { addCart } from "../../Redux/shopSlice";
import { addWishlist } from "../../Redux/wishlistSlice";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../Redux/products/productsThunk";
import {
  // fetchCategory,
  fetchCategorys,
} from "../../Redux/category/categoriesThunk";
import toast from "react-hot-toast";
import { addNewCart, fetchCarts } from "../../Redux/cart/cartThunk";
const TopSelling = () => {
  // const [favorite, setFavorite] = useState(0);

  // const toggleFavorite = () => {
  //   // setFavorite(!favorite);
  //   if (favorite === 0) {
  //     setFavorite(1);
  //   } else {
  //     setFavorite(0);
  //   }
  // };

  const dispatch = useDispatch();
  const [loadingCart, setLoadingCart] = useState(false);

  const { allProducts, loadingProduct } = useSelector(
    (state) => state.products
  );
  // console.log("All products", allProducts?.data);

  const addToCart = (productId) => {
    const item = allProducts?.data?.find((product) => product.id === productId);

    const defaultAttributes = item?.attributes?.[0]
      ? [
          {
            attribute_id: item.attributes[0].id,
            value: item.attributes[0].values[0]?.value,
          },
        ]
      : [];

    // console.log("first attribute", defaultAttributes);

    const productToCart = {
      product_id: item?.id,
      quantity: 1,
      selected_attributes: defaultAttributes,
    };

    // console.log(
    //   "product data:",
    //   Array.isArray(productToCart),
    //   "data:",
    //   productToCart
    // );
    // Call `handleSubmitCart` with the product object
    handleSubmitCart(productToCart);
  };

  const handleSubmitCart = async (productToCart) => {
    setLoadingCart(true);
    try {
      const result = await dispatch(
        addNewCart({ CartData: productToCart })
      ).unwrap();
      if (result.status >= 200 && result.status <= 300) {
        // console.log("res:", result);
        dispatch(fetchCarts("user/cart/view-cart"));
        toast.success(result.message);
      }
    } catch (error) {
      if (
        // (error?.response?.data?.status >= 400 &&
        //   error?.response?.data?.status <= 499 &&
        //   error?.response?.data?.errors) ||
        // (error?.response?.data?.status_code >= 400 &&
        //   error?.response?.data?.status_code <= 499 &&
        //   error?.response?.data?.errors) ||
        error?.errors
      ) {
        const errorMessages = Object.values(error?.errors).flat().join(", ");
        toast.error(errorMessages, { duration: 6000 });
      } else {
        toast.error(error?.message, { duration: 6000 });
      }
    } finally {
      setLoadingCart(false);
    }
  };

  const addToWishlist = (id) => {
    const item = allProducts?.data?.find((item) => item.id === id);
    dispatch(addWishlist({ product: item }));
  };

  const fetchProductsHandler = () => {
    dispatch(getAllProducts());
  };
  useEffect(() => {
    fetchProductsHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const { categories } = useSelector((state) => state.category);
  // console.log("categories", categories?.data);

  const fetchCategorysHandler = () => {
    dispatch(fetchCategorys());
  };
  useEffect(() => {
    fetchCategorysHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const getProductCategory = (cat_id) => {
    return categories?.data?.find((category) => category.id === cat_id);
  };

  return (
    <div className="px-4">
      <div className="nc-Section-Heading relative flex flex-row items-center justify-between mb-6 lg:mb-8 text-neutral-800 dark:text-neutral-50">
        <div className="">
          <h2 className=" text-2xl lg:text-4xl font-semibold">Top Selling</h2>
        </div>
        <div className="mt-4 flex justify-end sm:ms-2 sm:mt-0 flex-shrink-0">
          <div className=" relative flex items-center text-slate-600 cursor-pointer dark:text-slate-400 ">
            <p>View more</p>
            <button
              className="w-10 h-10  border-slate-200 dark:border-slate-600 rounded-full flex items-center justify-center "
              title="Next"
              data-glide-dir=">"
            >
              <svg
                className="w-5 h-5 rtl:rotate-180"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.5 12H20.33"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div>
        {loadingProduct ? (
          <p>Loading....</p>
        ) : (
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4 ">
            {allProducts?.data?.slice(0, 10)?.map((product) => {
              const { id, imgs, name, discount, category_id, listing_price } =
                product;
              const image = imgs[0];
              const productCat = getProductCategory(category_id);

              return (
                <ProductCard
                  key={id}
                  image={image}
                  name={name}
                  discount={discount}
                  category={productCat?.name}
                  price={listing_price}
                  onLoadingCart={loadingCart}
                  id={id}
                  onAddToCart={() => addToCart(id)} // Passing the `addToCart` function
                  onAddToWishlist={() => addToWishlist(id)}
                />
              );
            })}
            {/* {allProducts?.data
              ?.slice(0, 10)
              ?.map(
                (
                  { id, imgs, name, discount, category_id, listing_price },
                  index
                ) => {
                  const image = imgs[0];
                  const productCat = getProductCategory(category_id);
                  // console.log("productCat: ", productCat);
                  return (
                    <ProductCard
                      key={index}
                      image={image}
                      name={name}
                      discount={discount}
                      category={productCat?.name}
                      price={listing_price}
                      id={id}
                      addToWishlist={addToWishlist}
                      addToCart={addToCart}
                    />
                  );
                }
              )} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopSelling;

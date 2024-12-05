import TabFilters from "../components/shared/TabFilters";
import ProductCard from "../components/ui/ProductCard";
import productData from "../data/product";

const ProductListings = () => {
  return (
    <div className="px-4 pt-10 lg:px-20">
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Product Listing
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              Explore our wide range of [product category] to meet your needs.
              Quality, affordability, and variety all in one place.
            </span>
          </div>
          <hr className="border-slate-200 dark:border-slate-700" />
          <main>
            <div className="">
              <TabFilters />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-x-8 gap-y-10 mt-8 lg:mt-10">
              {productData?.slice(0, 10)?.map((product) => {
                const { id, imgs, name, discount, category, listing_price } =
                  product;
                // const image = imgs[0];
                // const productCat = getProductCategory(category_id);

                return (
                  <ProductCard
                    key={id}
                    image={imgs}
                    devImages={true}
                    name={name}
                    discount={discount}
                    category={category}
                    price={listing_price}
                    // onLoadingCart={loadingCart}
                    id={id}
                    // onAddToCart={() => addToCart(id)} // Passing the `addToCart` function
                    // onAddToWishlist={() => addToWishlist(id)}
                  />
                );
              })}
              {/* <div className="nc-ProductCard relative flex flex-col bg-transparent ">
                <a className="absolute inset-0" href="/product-detail" />
                <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
                  <a className="block" href="/product-detail">
                    <div className="flex aspect-w-11 aspect-h-12 w-full h-0">
                      <img
                        alt="product"
                        loading="lazy"
                        decoding="async"
                        data-nimg="fill"
                        className="object-cover w-full h-full drop-shadow-xl"
                        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                        srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F17.fcfa959c.png&w=256&q=75 256w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2F17.fcfa959c.png&w=384&q=75 384w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2F17.fcfa959c.png&w=640&q=75 640w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2F17.fcfa959c.png&w=750&q=75 750w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2F17.fcfa959c.png&w=828&q=75 828w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2F17.fcfa959c.png&w=1080&q=75 1080w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2F17.fcfa959c.png&w=1200&q=75 1200w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2F17.fcfa959c.png&w=1920&q=75 1920w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2F17.fcfa959c.png&w=2048&q=75 2048w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2F17.fcfa959c.png&w=3840&q=75 3840w"
                        src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F17.fcfa959c.png&w=3840&q=75"
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          inset: 0,
                          color: "transparent",
                        }}
                      />
                    </div>
                  </a>
                  <div className="nc-shadow-lg rounded-full flex items-center justify-center absolute top-3 start-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                    <span className="ms-1 leading-none">New in</span>
                  </div>
                  <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 text-neutral-700 dark:text-slate-200 nc-shadow-lg absolute top-3 end-3 z-10">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                        stroke="#ef4444"
                        fill="#ef4444"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div className="absolute bottom-0 inset-x-1 gap-2 flex flex-wrap justify-center opacity-0 invisible group-hover:bottom-4 group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900">
                      XS
                    </div>
                    <div className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900">
                      S
                    </div>
                    <div className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900">
                      M
                    </div>
                    <div className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900">
                      L
                    </div>
                    <div className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900">
                      XL
                    </div>
                    <div className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900">
                      2XL
                    </div>
                    <div className="nc-shadow-lg w-10 h-10 rounded-xl bg-white hover:bg-slate-900 hover:text-white transition-colors cursor-pointer flex items-center justify-center uppercase font-semibold tracking-tight text-sm text-slate-900">
                      3XL
                    </div>
                  </div>
                </div>
                <div className="space-y-4 px-2.5 pt-5 pb-2.5">
                  <div className="flex ">
                    <div
                      className="relative w-11 h-6 rounded-full overflow-hidden z-10 border cursor-pointer border-black dark:border-slate-300"
                      title="Black"
                    >
                      <div
                        className="absolute inset-0.5 rounded-full overflow-hidden z-0 bg-cover"
                        style={{
                          backgroundImage:
                            'url("/_next/static/media/v6.8375417b.jpg")',
                        }}
                      />
                    </div>
                    <div
                      className="relative w-11 h-6 rounded-full overflow-hidden z-10 border cursor-pointer border-transparent"
                      title="White"
                    >
                      <div
                        className="absolute inset-0.5 rounded-full overflow-hidden z-0 bg-cover"
                        style={{
                          backgroundImage:
                            'url("/_next/static/media/v2.3188fafe.jpg")',
                        }}
                      />
                    </div>
                    <div
                      className="relative w-11 h-6 rounded-full overflow-hidden z-10 border cursor-pointer border-transparent"
                      title="Orange"
                    >
                      <div
                        className="absolute inset-0.5 rounded-full overflow-hidden z-0 bg-cover"
                        style={{
                          backgroundImage:
                            'url("/_next/static/media/v3.845c4d92.jpg")',
                        }}
                      />
                    </div>
                    <div
                      className="relative w-11 h-6 rounded-full overflow-hidden z-10 border cursor-pointer border-transparent"
                      title="Sky Blue"
                    >
                      <div
                        className="absolute inset-0.5 rounded-full overflow-hidden z-0 bg-cover"
                        style={{
                          backgroundImage:
                            'url("/_next/static/media/v4.0613c448.jpg")',
                        }}
                      />
                    </div>
                    <div
                      className="relative w-11 h-6 rounded-full overflow-hidden z-10 border cursor-pointer border-transparent"
                      title="Natural"
                    >
                      <div
                        className="absolute inset-0.5 rounded-full overflow-hidden z-0 bg-cover"
                        style={{
                          backgroundImage:
                            'url("/_next/static/media/v5.cb5907b2.jpg")',
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
                      Rey Nylon Backpack
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 ">
                      Brown cockroach wings
                    </p>
                  </div>
                  <div className="flex justify-between items-end ">
                    <div className="">
                      <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                        <span className="text-green-500 !leading-none">
                          $74
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center mb-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        className="w-5 h-5 pb-[1px] text-amber-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
                        4.4 (98 reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-center sm:items-center">
              {/* <nav className="nc-Pagination inline-flex space-x-1 text-base font-medium ">
                <span className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white focus:outline-none">
                  1
                </span>
                <a
                  className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                  href="/"
                >
                  2
                </a>
                <a
                  className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                  href="/"
                >
                  3
                </a>
                <a
                  className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 focus:outline-none"
                  href="/"
                >
                  4
                </a>
              </nav> */}
              <button
                disabled=""
                className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"
              >
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx={12}
                    cy={12}
                    r={10}
                    stroke="currentColor"
                    strokeWidth={3}
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Show me more
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductListings;

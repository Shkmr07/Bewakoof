import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import { getProduct } from "@/redux/reducers/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming your Skeleton component is in this path

const ITEMS_PER_PAGE = 6;

export default function ProductPage() {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product); // Corrected useSelector
  const { string } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(string === "all" ? "all" : string);
  const [priceFilter, setPriceFilter] = useState(null);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    // Ensure products is an array before filtering
    if (Array.isArray(products)) {
      let initialFilter = [...products];

      // Category Filter
      if (categoryFilter !== "all") {
        initialFilter = initialFilter.filter((item) => item.category === categoryFilter);
      }

      // Price Filter
      if (priceFilter === "low-to-high") {
        initialFilter.sort((a, b) => a.price - b.price);
      } else if (priceFilter === "high-to-low") {
        initialFilter.sort((a, b) => b.price - a.price);
      }

      setFilteredProducts(initialFilter);
      setVisibleItems(ITEMS_PER_PAGE); // Reset visible items on filter change
    }
  }, [products, categoryFilter, priceFilter]);

  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
  };

  const handlePriceChange = (filter) => {
    setPriceFilter(filter);
  };

  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleItems((prev) => prev + ITEMS_PER_PAGE);
      setLoadingMore(false);
    }, 500); // Simulate loading delay
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 && // Trigger load before reaching exact bottom
        visibleItems < filteredProducts.length &&
        !loadingMore
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleItems, filteredProducts.length, loadingMore]);

  const displayedProducts = filteredProducts.slice(0, visibleItems);

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        {/* Filter Selectors for Small Screens */}
        <div className="md:hidden mb-4 px-2.5 flex gap-2">
          <select
            className="w-full p-2 border rounded"
            value={categoryFilter}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Cover">Mobile Cover</option>
          </select>
          <select
            className="w-full p-2 border rounded"
            value={priceFilter || ""}
            onChange={(e) => handlePriceChange(e.target.value)}
          >
            <option value="">Price</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>

        <div className="flex">
          {/* Left Sidebar for Medium and Larger Screens */}
          <Sidebar
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
            
          />

          {/* Right Product Display */}
          <main className="flex-1 ml-0 md:ml-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {status === "loading" && displayedProducts.length === 0 ? (
              // Initial loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="border rounded-md p-4">
                  <Skeleton className="h-52 w-full mb-2" /> {/* Adjust height as needed */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[70%]" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[50%]" />
                  </div>
                </div>
              ))
            ) : displayedProducts.map((product) => (
              <div key={product.id} className="border rounded-md p-4">
                {status === "loading" ? (
                  <div className="space-y-2">
                    <Skeleton className="h-52 w-full mb-2" /> {/* Adjust height as needed */}
                    <Skeleton className="h-4 w-[70%]" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[50%]" />
                  </div>
                ) : (
                  <ProductCard
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    image={product.images.at(-1)}
                    onClick={()=>navigate(`/product-detail/${product._id}`)}
                  />
                )}
              </div>
            ))}

            {loadingMore && (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={`skeleton-${index}`} className="border rounded-md p-4">
                  <Skeleton className="h-52 w-full mb-2" /> {/* Adjust height as needed */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[70%]" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[50%]" />
                  </div>
                </div>
              ))
            )}

            {displayedProducts.length < filteredProducts.length && !loadingMore && (
              <div className="col-span-full text-center py-4">
                {status !== "loading" && (
                  <button onClick={loadMore} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Load More
                  </button>
                )}
              </div>
            )}

            {displayedProducts.length === 0 && status !== "loading" && (
              <div className="col-span-full text-center py-4">
                <p>No products found matching your criteria.</p>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getProduct } from "@/redux/reducers/productSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { div } from "framer-motion/client";
import ImageCard from "@/components/ImageCard";
import ProductCard from "@/components/ProductCard";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.data);
  const isLoading = useSelector((state) => state.product.status === "loading");
  const [firstCarousal, setFirstCarousal] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 3) % firstCarousal.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [firstCarousal.length]);

  useEffect(() => {
    dispatch(getProduct())
      .unwrap()
      .then((data) => {
        const filterProduct = data.filter(
          (item) => item.category === "Men" || item.category === "Women"
        );
        setFirstCarousal(filterProduct);
      });
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <main className="w-full">
        <div className="flex">
          {isLoading
            ? // Show skeleton while loading
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="w-1/3 p-2">
                  <Skeleton className="w-full h-64 rounded-md" />
                </div>
              ))
            : // Show images when loaded
              firstCarousal
                .slice(currentIndex, currentIndex + 3)
                .map((item, idx) => (
                  <div key={idx} className="w-1/3 p-2 cursor-pointer" onClick={()=>navigate("/products/all")}>
                    <img
                      src={item.images.at(-1)}
                      alt={item.name}
                      className="w-full h-auto object-contain rounded-md"
                    />
                  </div>
                ))}
        </div>

        <div className="flex flex-wrap sm:flex-nowrap mt-10">
          {isLoading
            ? // Show skeleton for ImageCard section
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="w-1/3 p-2">
                  <Skeleton className="w-full h-48 rounded-md" />
                </div>
              ))
            : // Show ImageCards
              firstCarousal.slice(0, 6).map((item, idx) => (
                <div key={idx} className="w-1/3 p-2 cursor-pointer" onClick={()=>navigate("/products/Men")}>
                  <ImageCard image={item.images.at(-1)} name={item.name} />
                </div>
              ))}
        </div>

        <div className="flex flex-wrap sm:flex-nowrap mt-10">
          {isLoading
            ? // Show skeleton for ImageCard section
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="w-1/3 p-2">
                  <Skeleton className="w-full h-48 rounded-md" />
                </div>
              ))
            : // Show ImageCards
              firstCarousal.slice(12, 18).map((item, idx) => (
                <div key={idx} className="w-1/3 p-2 cursor-pointer" onClick={()=>navigate("/products/Women")}>
                  <ImageCard image={item.images.at(-1)} name={item.name} />
                </div>
              ))}
        </div>

        <div className="flex flex-wrap-reverse p-4 mt-10">
          {isLoading
            ? // Show skeleton for ProductCard section
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="w-full sm:w-1/2 md:w-1/3 p-2">
                  <div className="rounded-lg overflow-hidden shadow-md bg-white">
                    <Skeleton className="w-full h-64 rounded-t-lg" />
                    <div className="px-6 py-4">
                      <Skeleton className="h-6 w-1/2 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-6 w-1/4" />
                    </div>
                  </div>
                </div>
              ))
            : // Show ProductCards
              firstCarousal.slice(12, 18).map((item, idx) => (
                <div key={idx} className="w-full sm:w-1/2 md:w-1/3 p-2 cursor-pointer" onClick={()=>navigate("/products/Women")}>
                  <ProductCard
                    image={item.images.at(-1)}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                  />
                </div>
              ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
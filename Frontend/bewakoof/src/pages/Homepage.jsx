import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getProduct } from "@/redux/reducers/productSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Homepage() {

  const dispatch = useDispatch()
  const products = useSelector(state=>state.product.data)
  const isLoading = useSelector(state=>state.product.status)

  useEffect(()=>{
    dispatch(getProduct())
  },[dispatch])


  return (
    <div>
      <Navbar />
        <main>

        </main>
      <Footer />
    </div>
  );
}

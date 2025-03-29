import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { getCartData } from '@/redux/reducers/cartSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function Addtocart() {

    const dispatch = useDispatch()

    // useEffect(()=>{
    //     dispatch(getCartData())
    // },[])
  return (
    <>
    <Navbar />
    <Footer />
    </>
  )
}

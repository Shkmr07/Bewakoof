import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { getProductById } from '@/redux/reducers/productSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { RiStarFill, RiStarLine, RiTruckFill } from 'react-icons/ri'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { toast } from "sonner"
import { cn } from '@/lib/utils'
import { addItemToCart } from '@/redux/reducers/cartSlice'

export default function ProductDetail() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const details = useSelector(state => state.product.userDetails)
    const status = useSelector(state => state.product.status)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        dispatch(getProductById(id))
    }, [dispatch])

    const handleImageChange = (index) => {
        setCurrentImageIndex(index);
    };

    const handleAddToCart = () => {

        dispatch(addItemToCart({productId : id, quantity : 1}))
        
        toast.success("Product added to cart!");
        navigate("/add-to-cart")
        
        // Implement your add to cart logic here
    };

    const renderRatingStars = (rating) => {
        const stars = [];
        const filledStars = Math.round(rating);
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <React.Fragment key={i}>
                    {i <= filledStars ? (
                        <RiStarFill className="h-5 w-5 text-yellow-500" />
                    ) : (
                        <RiStarLine className="h-5 w-5 text-gray-300" />
                    )}
                </React.Fragment>
            );
        }
        return stars;
    };

    return (
        <>
            <Navbar />
            <main className="container mx-auto py-8">
                {status === 'loading' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Image Skeleton */}
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 flex flex-col gap-2">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <Skeleton key={index} className="w-full h-20 rounded-md" />
                                ))}
                            </div>
                            <div className="md:w-3/4 ml-4">
                                <Skeleton className="w-full h-96 rounded-md" />
                            </div>
                        </div>
                        {/* Details Skeleton */}
                        <div>
                            <Skeleton className="w-3/4 h-8 mb-2" />
                            <Skeleton className="w-full h-20 mb-4" />
                            <Skeleton className="w-1/2 h-6 mb-2" />
                            <Skeleton className="w-1/4 h-6 mb-4" />
                            <Skeleton className="w-full h-12 mb-4" />
                            <Skeleton className="w-1/3 h-10" />
                        </div>
                    </div>
                ) : details ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Image Carousel */}
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 flex flex-col gap-2">
                                {details?.images?.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`w-full h-20 rounded-md overflow-hidden cursor-pointer border ${currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'}`}
                                        onClick={() => handleImageChange(index)}
                                    >
                                        <img src={image} alt={`Product Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                {!details?.images || details?.images?.length === 0 && (
                                    <div className="w-full h-20 rounded-md bg-gray-100 flex items-center justify-center">No Images</div>
                                )}
                            </div>
                            <div className="md:w-3/4 ml-4">
                                {details?.images && details?.images?.length > 0 ? (
                                    <div className="w-full h-96 rounded-md overflow-hidden">
                                        <img src={details.images[currentImageIndex]} alt="Product Detail" className="w-full h-full object-contain" />
                                    </div>
                                ) : (
                                    <div className="w-full h-96 rounded-md bg-gray-100 flex items-center justify-center">No Main Image</div>
                                )}
                            </div>
                        </div>

                        {/* Product Details */}
                        <div>
                            <h1 className="text-2xl font-semibold mb-2">{details?.name || 'Product Name'}</h1>
                            <p className="text-gray-600 mb-4">{details?.description || 'Product Description'}</p>
                            <div className="flex items-center mb-2">
                                <span className="font-bold text-lg mr-2">${details?.price !== undefined ? details.price : '99.99'}</span>
                                {details?.rating > 0 ? (
                                    <div className="flex items-center">
                                        {renderRatingStars(details.rating)}
                                        <span className="text-sm text-gray-500 ml-1">({details.rating.toFixed(1)})</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        {renderRatingStars(3.5)} {/* Provide a default rating */}
                                        <span className="text-sm text-gray-500 ml-1">(Not Rated Yet)</span>
                                    </div>
                                )}
                            </div>

                            {/* Delivery Information */}
                            <div className="flex items-center mb-4 text-sm text-gray-500">
                                <RiTruckFill className="mr-2" />
                                <span>Free Delivery Available</span>
                            </div>

                            {/* Static Rating Bar */}
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">Customer Rating</h3>
                                <div className="flex items-center">
                                    {renderRatingStars(4.2)} {/* Example static rating */}
                                    <span className="text-sm text-gray-500 ml-2">(Based on 150 reviews)</span>
                                </div>
                            </div>

                            {/* Review Section */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>
                                <Textarea placeholder="Write your review here..." className="mb-2" />
                                <div className="flex items-center mb-2">
                                    <label htmlFor="rating" className="mr-2 text-sm text-gray-600">Your Rating:</label>
                                    <select id="rating" className="border rounded py-1 px-2 text-sm">
                                        <option value="5">★★★★★</option>
                                        <option value="4">★★★★☆</option>
                                        <option value="3">★★★☆☆</option>
                                        <option value="2">★★☆☆☆</option>
                                        <option value="1">★☆☆☆☆</option>
                                    </select>
                                </div>
                                <Input type="text" placeholder="Your Name (Optional)" className="mb-2" />
                                <Button variant="outline" className="text-sm">Submit Review</Button>
                            </div>

                            {/* Add to Cart Button */}
                            <Button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded" onClick={handleAddToCart}>
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500">Product not found.</p>
                    </div>
                )}
            </main>
            <Footer />
        </>
    )
}
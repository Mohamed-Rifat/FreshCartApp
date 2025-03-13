import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContext/CartContext';
import { toast } from 'react-hot-toast';

export default function ProductDetails() {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);

    // function addProduct(id) {
    //     let res = addToCart(id);
    //     console.log(res);

    // }

    const handleAddToCart = (productId) => {addToCart(productId);toast.success('Product added to cart successfully!', { duration: 3000 });};
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImage, setCurrentImage] = useState(0);
    const [zoomVisible, setZoomVisible] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

    async function getProductDetails() {
        try {
            const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
            setProduct(res.data.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        getProductDetails();
    }, [id]);

    useEffect(() => {
        if (product?.images?.length > 1) {
            const interval = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % product.images.length);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [product]);

    if (loading) return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
    if (!product) return <div className="text-center mt-10 text-lg font-semibold text-red-500">Product not found</div>;

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        setZoomPosition({ x, y });
    };

    return (
        <div className="w-4/5 mx-auto my-10 bg-white p-6 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div>
                    <div
                        className="relative w-full md:w-1/2 rounded-lg shadow-md overflow-hidden border"
                        onMouseEnter={() => setZoomVisible(true)}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setZoomVisible(false)}
                    >
                        <img
                            src={product.images[currentImage]}
                            alt={product.title}
                            className="w-full h-full rounded-lg"
                        />
                        {zoomVisible && (
                            <div
                                className="absolute w-40 h-40 border-2 border-gray-400 rounded-md shadow-lg pointer-events-none"
                                style={{
                                    backgroundImage: `url(${product.images[currentImage]})`,
                                    backgroundSize: "500%",
                                    backgroundPosition: `${(zoomPosition.x / 300) * 100}% ${(zoomPosition.y / 300) * 100}%`,
                                    backgroundRepeat: "no-repeat",
                                    top: `${zoomPosition.y}px`,
                                    left: `${zoomPosition.x}px`,
                                    transform: "translate(-50%, -50%)",
                                    transition: "top 0.05s, left 0.05s",
                                }}
                            />
                        )}
                    </div>
                    <div className="flex gap-2 mt-4">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index}`}
                                className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${currentImage === index ? 'border-blue-500' : 'border-gray-300'}`}
                                onClick={() => setCurrentImage(index)}
                            />
                        ))}
                    </div>

                </div>
                <div className="md:w-1/2">
                    <h2 className="text-3xl font-bold mb-3 text-gray-900">{product.title}</h2>
                    <p className="text-gray-600 mb-4 text-lg">{product.description}</p>
                    <p className="text-xl font-semibold text-green-600">Price: {product.price} EGP</p>
                    <p className="text-yellow-500 font-semibold mt-2 text-lg">
                        Rating: {product.ratingsAverage} ⭐
                    </p>
                    <button
                        className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md"
                        onClick={() => handleAddToCart(product.id)}
                    >
                        Add to Cart 🛒
                    </button>
                </div>
            </div>
        </div>
    );
}
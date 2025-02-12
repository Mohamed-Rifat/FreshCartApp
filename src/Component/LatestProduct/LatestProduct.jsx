import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function LatestProduct() {
    const [products, setProducts] = useState([]);

    async function getProduct() {
        try {
            const res = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
            setProducts(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <div className="w-4/5 mx-auto">
            <div className="flex flex-wrap">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
                    >
                        <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img
                                src={product.imageCover}
                                alt={product.title}
                                className="w-full h-48 object-cover"
                            />
                            <small className='ps-3'>
                                {product.category?.name}
                            </small>
                            <h3 className="ps-3 text-lg font-semibold truncate">{product.title}</h3>
                            <div className="p-3 flex justify-between">
                                <p className="text-gray-600">{product.price} EGP</p>
                                <p className="text-gray-600">{product.ratingsAverage}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
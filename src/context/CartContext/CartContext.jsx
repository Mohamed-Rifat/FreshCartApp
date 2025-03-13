import axios from "axios";
import { useState, useEffect, createContext } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [cartId, setCartId] = useState(null);
    const storedToken = localStorage.getItem("token");
    const headers = { token: storedToken };

    async function getCart() {
        try {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers });
            if (response.data && response.data.status === 'success') {
                setCartItems(response.data.data.products || []);
                setNumOfCartItems(response.data.numOfCartItems || 0);
                setCartId(response.data.data._id || null);
            } else {
                console.error("Unexpected API response:", response.data);
            }
            return response.data;
        } catch (error) {
            console.error("Error fetching cart:", error.response ? error.response.data : error.message);
            return null;
        }
    }

    useEffect(() => {
        const totalItems = cartItems.reduce((acc, item) => acc + item.count, 0);
        setNumOfCartItems(totalItems);
    }, [cartItems]);

    useEffect(() => {
        if (storedToken) {
            getCart();
        }
    }, [storedToken]);

    async function addToCart(id) {
        try {
            const response = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/cart",
                { productId: id },
                { headers }
            );
            if (response.data.status === 'success') {
                await getCart(); 
            }
            return response.data;
        } catch (error) {
            console.error("Error adding to cart:", error);
            return error;
        }
    }

    async function removeFromCart(productId) {
        try {
            const response = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { headers }
            );
            if (response.data.status === 'success') {
                await getCart(); 
            }
            return response.data;
        } catch (error) {
            console.error("Error removing from cart:", error);
            return error;
        }
    }

    async function updateCartQuantity(productId, newCount) {
        try {
            const response = await axios.put(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { count: newCount },
                { headers }
            );
            if (response.data.status === 'success') {
                await getCart(); 
            }
            return response.data;
        } catch (error) {
            console.error("Error updating cart quantity:", error);
            return error;
        }
    }

    async function createCashOrder(id, values) {
        try {
            const response = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
                { shippingAddress: values },
                { headers }
            );
            if (response.data.status === 'success') {
                setNumOfCartItems(0); 
                setCartItems([]); 
            }
            return response.data;
        } catch (error) {
            console.error("Error creating cash order:", error);
            return error;
        }
    }

    async function createOnlineOrder(id, values) {
        const port = window.location.origin;
        try {
            const response = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${port}/account`,
                { shippingAddress: values },
                { headers }
            );
            if (response.data.status === 'success') {
                setNumOfCartItems(0); 
                setCartItems([]); 
                window.location.href = response.data.session.url; 
            }
            return response.data;
        } catch (error) {
            console.error("Error creating online order:", error);
            return error;
        }
    }

    return (
        <CartContext.Provider
            value={{
                addToCart,
                getCart,
                removeFromCart,
                updateCartQuantity,
                numOfCartItems,
                setNumOfCartItems,
                cartItems,
                cartId,
                createCashOrder,
                createOnlineOrder,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
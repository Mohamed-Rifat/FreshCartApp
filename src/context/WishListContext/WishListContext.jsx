import axios from "axios";
import { createContext, useState } from "react";

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
    const [wishListData, setWishListData] = useState([]);
    const headers = {
        token: localStorage.getItem("token"),
    };

    function addToWishlist(productId) {
        return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{productId,},{headers,})
            .then((res) => res)
            .catch((err) => err);
    }
    function removeWishlistItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {headers,})
            .then((res) => res)
            .catch((err) => err);
    }
    function getLoggedWishlistData() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {headers,})
            .then((res) => res.data)
            .catch((err) => err);
    }
    const isInWishlist = (productId) => {
        return wishListData?.some((item) => item == productId)
    }
    return (
        <WishlistContext.Provider value={{addToWishlist, removeWishlistItem, getLoggedWishlistData, setWishListData, wishListData, isInWishlist,}}>
            {children}
        </WishlistContext.Provider>
    );
}

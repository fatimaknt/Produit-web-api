'use client'

import { CartContextProvider } from "@/hooks/UseCart";
import React from "react";

interface CartProviderProps{
    children: React.ReactNode
}

const CartProvider: React.FC<CartProviderProps> = ({children}) => {
    return ( 
        <CartContextProvider>{children}</CartContextProvider>
    );
}
 
export default CartProvider;
import { CarProductType } from "@/app/product/ProductDetails";
import {createContext, useCallback, useContext, useEffect, useState} from "react";
import toast, { Toast } from "react-hot-toast";
type CartContextType={
    //declaration des methodes et proprietés
    cartTotalQty: number
    cartTotalAmout: number
    cartProducts: CarProductType [] | null;
    handleAddProductToCart: (product: CarProductType) =>void;
    handleRemoveProductFromCart: (product: CarProductType) =>void;
    handleCartQtyIncrement: (product: CarProductType) =>void;
    handleCartQtyDecrement: (product: CarProductType) =>void;
    handleCartClear:() =>void;
    
}
export const CartContext = createContext<CartContextType | null>(null)
 interface Props{
    [propName: string]: any
 }
 export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(10);
    const [cartTotalAmout, setCartTotalAmout] =useState(0);
    const [cartProducts, setCartProducts] = useState<CarProductType[] | null>(null);
    console.log('qty',cartTotalQty)
    console.log('amount',cartTotalAmout)

    useEffect(() => {
        const cartItems: any = localStorage.getItem('eShopCartItems');
        const cProducts: CarProductType[] | null = JSON.parse(cartItems);
        setCartProducts(cProducts);

        // Calculer la quantité totale du panier
        if (cProducts) {
            const totalQty = cProducts.reduce((total, product) => total + product.quantity, 0);
            setCartTotalQty(totalQty);
        }
    }, []);
 
    //pour le calcule du total
    useEffect(() => {
        const getTotals = () => {
            if (cartProducts) {
                const { total, qty } = cartProducts.reduce((acc, item) => {
                    const itemTotal = item.price * item.quantity;
                    acc.total += itemTotal;
                    acc.qty += item.quantity;
                    return acc;
                }, {
                    total: 0,
                    qty: 0
                });
    
                setCartTotalQty(qty);
                setCartTotalAmout(total);
            }
        };
    
        getTotals(); // Appel de la fonction getTotals
    }, [cartProducts]); // Ajout de cartProducts comme dépendance
    
    const handleAddProductToCart = useCallback((product: CarProductType) => {
        setCartProducts((prev) => {
            const updatedCart = prev ? [...prev, product] : [product];
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);
//supression du panier
    const handleRemoveProductFromCart = useCallback((product: CarProductType) => {
        if (cartProducts) {
            const filteredProducts = cartProducts.filter((item) => item.id !== product.id);
            setCartProducts(filteredProducts);
            toast.success("produit supprimé avec succès");
            localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts));
        }
    }, [cartProducts]);


//---------------------------------------------------------------
    //incrementation button
    const handleCartQtyIncrement = useCallback((product: CarProductType) => {
        if (product.quantity === 99) {
            toast.error("Oops! Vous avez dépassé la taille maximale");
            return;
        }
    
        if (cartProducts) {
            const updatedCart = cartProducts.map((item) => {
                if (item.id === product.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
    
            setCartProducts(updatedCart);
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
        }
    }, [cartProducts]);
    //-Decrementation--------------------------------------------------------------------------

const handleCartQtyDecrement = useCallback((product: CarProductType) =>{
    let updateCart;
    if (product.quantity === 1) {
        return toast.error("Opps Vous avez depasez la taille minimal")
    }
    if (cartProducts) {
        updateCart=[...cartProducts]
        const existingindex = cartProducts.findIndex((item) => item.id == product.id)
        if(existingindex > -1){
            updateCart[existingindex].quantity = -- updateCart[existingindex].quantity 
        }
        setCartProducts(updateCart)
        localStorage.setItem('eShopCartItems', JSON.stringify(updateCart))

    }
}, [cartProducts])

//---------------------------------------------------------------------------
const handleCartClear =useCallback(()=>{
    setCartProducts(null)
    setCartTotalQty(0)
    localStorage.setItem('eShopCartItems', JSON.stringify(null))

},[cartProducts])

    const value = {
        cartTotalQty,
        cartProducts,
        cartTotalAmout,
        handleAddProductToCart,
        handleRemoveProductFromCart, 
        handleCartQtyIncrement,
        handleCartQtyDecrement,
        handleCartClear,
        
    };

    return <CartContext.Provider value={value} {...props}/>;
};
 export const useCart =() =>{
    const context = useContext(CartContext);
    if (context === null) {
        throw new Error("useCart must be used within a CartContexProvider")
    }
    return context

}
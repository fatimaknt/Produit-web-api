"use client"
import { useCart } from "@/hooks/UseCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "../utils/formatPrice";

const CartClient = () => {
    const { cartProducts,handleCartClear,cartTotalAmout } = useCart();

    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Votre Panier est vide</div>
                <div>
                    <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack />
                        <span>Start Shopping</span>
                    </Link>
                </div>
            </div>
        );
    }
return(
<>
    <div>
        <Heading title="Shopping Cart" center />
    </div>
    <div className="grid grid-cols-5 text-xs gap-2 items-center mt-8">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
    </div>
    <div>
        {cartProducts && cartProducts.map((item) =>{
            return <ItemContent key={item.id} item={item} />
        })}
    </div>
    <div className="border-t-1.5 border-slate-200 py-4 flex justify-between gap-4">
        <div className="w-90">
            <Button label="Clear Cart" onClick={() => {handleCartClear();} } 
            small outLine/>
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
            <div className="flex justify-between w-full text-base font-semibold">
                <span>SubTotal</span>
                <span>{formatPrice(cartTotalAmout)}</span>
            </div>
                <p className="text-slate-500">Taxes and shopping calculate at checkout</p>
                <Button label="Checkout" onClick={() => {
                } } outLine={false}/>
                    <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack 
                        //est un composant React qui représente l'icône de flèche vers l'arrière
                        />
                        <span>Continue Shopping</span>
                    </Link>
            </div>
        </div>
</>
      
    );
}

export default CartClient;

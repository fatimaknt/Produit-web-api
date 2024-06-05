"use client";
import Link from "next/link";
import { CarProductType } from "../product/ProductDetails";
import { formatPrice } from "../utils/formatPrice";
import { truncate } from "fs";
import { TruncateText } from "../utils/Truncate.text";
import Image from "next/image";
import SetQuantity from "../products/SetQuantity";
import { useCart } from "@/hooks/UseCart";

interface ItemCotentProps{
    item:CarProductType
}

const ItemContent:React.FC<ItemCotentProps> = ({item}) => {
    //declaration dabord
    const {handleRemoveProductFromCart} = useCart()
    const {handleCartQtyIncrement} = useCart()
    const {handleCartQtyDecrement} = useCart()


    return ( 
<div className="grid grid-cols-5 text-xs md:text-sm gap-4 border border-slate-200 py-4 items-center">
        <Link href={`/product/${item.id}`}>
            <div className="relative w-[70px] aspect-square">
                <Image src={item.selectedImg.image} alt={item.name} fill className="object-contain"/>
            </div>
        </Link>
        <div className="flex flex-col justify-between">
            <Link href={`/product/${item.id}`}>{TruncateText(item.name)}</Link>
            <div>{item.selectedImg.color}</div>
            <div className="w-[70px]">
                <button className="text-slate-500 underline" onClick={() =>{
                    handleRemoveProductFromCart(item)
                }}>
                 Remove
                </button>
            </div>
            <div>

            </div>
        </div>
        <div className="justify-self-center">{formatPrice(item.price)}</div>
        <div className="justify-self-center">
            <SetQuantity 
            cartCounter={true}
            cartProduct={item}
            handleQtyIncrease={() =>{handleCartQtyIncrement(item)}}// puis l'affichage
            handleQtyDecrease={() =>{handleCartQtyDecrement(item)}}
            />
            </div>
        <div className="justify-self-end font-semibold">{formatPrice(item.price * item.quantity)}</div>
    </div> );
}
 
export default ItemContent;

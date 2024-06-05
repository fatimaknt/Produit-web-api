"use client";

import { Rating } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import SetColor from "../products/SetColor";
import SetQuantity from "../products/SetQuantity";
import Button from "../components/Button";
import ProductImage from "../products/ProductImage";
import { useCart } from "@/hooks/UseCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ProductDetailProps {
    product: any;
}

export type CarProductType = {
    id: string;
    name: string;
    description: string;
    category: string;
    brand: string;
    selectedImg: SelectedImgType;
    quantity: number;
    price: number;
};

export type SelectedImgType = {
    color: string;
    colorCode: string;
    image: string;
};

const Horizontale = () => {
    return <hr className="w-[30%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailProps> = ({ product }) => {
    // partie panier
    const { handleAddProductToCart, cartProducts, handleRemoveProductFromCart } = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);
    const { cartTotalQty } = useCart();
    const [cartProduct, setCartProduct] = useState<CarProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: product.images && product.images.length > 0 ? { ...product.images[0] } : { color: "", colorCode: "", image: "" },
        quantity: 1,
        price: product.price,
    });
    //la route pour aller au detail du pnier
    const router = useRouter()
    console.log(cartProducts)

    useEffect(() => {
        setIsProductInCart(false)

        if (cartProducts) {
            const existingindex = cartProducts.findIndex((item) => item.id == product.id)

            if (existingindex > -1) {
                setIsProductInCart(true)
            }
        }
    }, [cartProducts, product]);

    const productRating =
        product && product.reviews
            ? product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / product.reviews.length
            : 0;

    const handledColorSelect = useCallback(
        (value: SelectedImgType) => {
            setCartProduct((prev) => {
                return { ...prev, selectedImg: value };
            });
        },
        [cartProduct.selectedImg]
    );

    const handleQtyIncrease = useCallback(() => {
        if (cartProduct.quantity === 99) {
            return;
        }
        setCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity + 1 };
        });
    }, [cartProduct]);

    const handleQtyDecrease = useCallback(() => {
        if (cartProduct.quantity === 1) {
            return;
        }
        setCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity - 1 };
        });
    }, [cartProduct]);

    const handleProductAddedToCart = useCallback(() => {
        handleAddProductToCart(cartProduct);
        toast.success("Produit ajouté au panier avec succès");
    }, [handleAddProductToCart, cartProduct]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImage 
                cartProduct={cartProduct} 
                product={product} 
                handleColorSelected={handledColorSelect}
            />
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <div className="flex items-center gap-2">
                    <Rating value={productRating} readOnly />
                    {/* Afficher le nombre d'avis s'il y en a */}
                    {product.reviews && <div>{product.reviews.length} reviews</div>}
                </div>
                <Horizontale />
                {isProductInCart ? <>
                <p className="mb-2 text-slate-500 flex items-center gap-1">
                    <MdCheckCircle className="text-teal-400" size={20}/>
                    <span>Product added to Cart</span>
                </p>
                <div className="max-w-[300px]">
                <Button label="View Cart" outLine onClick={() =>{
                    router.push("/cart")
                }} 
                />
                </div>
                </> : (
                    <>
                        <div className="text-justify">{product.description}</div>
                        <Horizontale />
                        <div>
                            <span className="font-semibold">CATEGORY: </span>
                            {product.category}
                        </div>
                        <div>
                            <span className="font-semibold">BRAND: </span>
                            {product.brand}
                        </div>
                        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
                            {product.inStock ? "In Stock" : "Out of Stock"}
                        </div>
                        <Horizontale />
                        {product.images && (
                            <>
                                <SetColor 
                                    cartProduct={cartProduct} 
                                    images={product.images} 
                                    handleColorSelected={handledColorSelect} 
                                />
                                <Horizontale />
                            </>
                        )}
                        <SetQuantity 
                            cartProduct={cartProduct} 
                            handleQtyIncrease={handleQtyIncrease} 
                            handleQtyDecrease={handleQtyDecrease} 
                        />
                        <Horizontale />
                        <div className="max-w-[300px]">
                            <Button 
                                label="Add To Cart" 
                                onClick={handleProductAddedToCart} 
                                outLine={false} 
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;

"use client";
import Image from "next/image"; // Ajout de l'import de Image depuis next/image

import { CarProductType, SelectedImgType } from "../product/ProductDetails";

interface ProductImageProps {
    cartProduct: CarProductType;
    product: any;
    handleColorSelected: (value: SelectedImgType) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({ cartProduct, product, handleColorSelected }) => {
    return (
        <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
            <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
                {product.images.map((image: SelectedImgType) => {
                    return (
                        <div
                            key={image.color}
                            onClick={() => handleColorSelected(image)}
                            className={`relative w-[80%] aspect-square rounded border-teal-300 ${
                                cartProduct.selectedImg.color === image.color ? "border-[1.5px]" : "border-none"
                            }`}
                        >
                            <Image src={image.image} alt={image.color} fill className="object-contain" /> {/* Utilisation de la propriété image de l'objet image */}
                        </div>
                    );
                })}
            </div>
            <div className="col-span-5 relative aspect-square">
               <Image fill src={cartProduct.selectedImg.image} alt={cartProduct.name} className="w-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]" />
            </div>
            <div></div>
        </div>
    );
};

export default ProductImage;

import Container from "@/app/components/nav/Container";
import ProductDetails from "../ProductDetails";
import ListRatinng from "../ListRating";
import { title } from "process";
import { products } from "@/app/utils/products";

interface IPrams {
    productId?:string 
    
}

const Product = ({params}: {params: IPrams}) => {
    console.log('params', params)
    const product =products.find((item) =>item.id ===params.productId)
    //detail des produits
    return ( 
        <div className="p-8">
            <Container>
                <ProductDetails product = {product} />
                <div className="flex flex-col mt-20 gap-4">
                <div>Add Rating</div>
                <div>
                    <ListRatinng  product={product}/>
                </div>
            </div>
            </Container>
        </div>
     );
}
 
export default Product;
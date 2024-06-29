import Container from "./components/nav/Container";
import HomeBanner from "./components/nav/HomeBanner";
import ProductCard from "./products/ProductCard";
import { products } from "./utils/products";
import { TruncateText } from "./utils/Truncate.text";
import { data } from "autoprefixer";

export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap:8">
            {products.map((product: any) => {
              return <ProductCard data={product}/>}
              )}
        </div>
        <div>
        </div>
      </Container>
    </div>
  )
}

import ProductDetails from "@/components/ProductDetails";
export default async function ProductDetailsPage({ params }) {
 const {id}=await params;

  return <h1>
    <ProductDetails id={id} />
    </h1>;
}
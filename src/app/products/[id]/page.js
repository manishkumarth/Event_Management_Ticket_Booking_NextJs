import ProductDetails from "@/components/ProductDetails";
export default async function ProductDetailsPage({ params }) {
<<<<<<< HEAD
  const { id } = await params;

  return <>
    <ProductDetails id={id} />
  </>;
=======
 const {id}=await params;

  return <h1>
    <ProductDetails id={id} />
    </h1>;
>>>>>>> cdcbcdc6bb44fdf9f27407369c3a455c252af747
}
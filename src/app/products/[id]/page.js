import ProductDetails from "@/components/ProductDetails";
import Link from "next/link";
import { IoArrowBackSharp } from "react-icons/io5";
export default async function ProductDetailsPage({ params }) {
  const { id } = await params;

  return <>
    <Link className="p-5" href="/" >
        <IoArrowBackSharp />
      </Link>
    <ProductDetails id={id} />
  </>;
}
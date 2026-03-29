async function ProductDetails({ id }) {

    console.log("id is: ", id)
    const res = await fetch(`http://localhost:3000/api/get-product/${id}`);
    const data = await res.json();
    return (
        <>
            this is detials page
        </>
    )
}
export default ProductDetails
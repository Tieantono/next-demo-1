import { Product } from "@/types/ProductData"
import { GetServerSideProps } from "next"

const ProductDetail: React.FC<Product> = (props) => {

    return <div>
        <h1>Product Detail</h1>
        <div>
            <p>Product ID: {props.id}</p>
            <p>Name: {props.title}</p>
            <p>Description: {props.description}</p>
            <p>Price: {props.price}</p>
            <p>Discount: {props.discountPercentage}</p>

            <button onClick={() => console.log('Test button clicked.')}>Test</button>
        </div>
    </div>
}

const ProductDetailPage: React.FC<Product> = (props) => {
    // {...props} will pass down all objects to ProductDetail component.
    // ... is spread properties.
    return <ProductDetail {...props}></ProductDetail>
}

// To use server-side function, you must define getServerSideProps and Next.js
// will automatically process these codes.
export const getServerSideProps: GetServerSideProps<Product> = async (context) => {
    // context.query will obtain the dynamic segment, in this case: [id] (from [id].tsx).
    // So with URL: http://localhost:3000/products/12345, context.query will return 12345.
    // The deconstructed object name must have the same name with the dynamic segment,
    // so when we use [id], the object name must be id.
    const { id } = context.query;
    const response = await fetch(`https://dummyjson.com/products/${id}`);

    const data = (await response.json()) as Product;
    return {
        props: data
    }
}

export default ProductDetailPage;
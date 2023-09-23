import TableTh from "@/components/TableTh";
import CustomLayout from "@/components/layouts/CustomLayout";
import { NextPageWithLayout } from "@/components/layouts/NextPageWithLayout";
import fetcher from "@/functions/fetcher";
import { ProductData } from "@/types/ProductData";
import Link from "next/link";
import { ReactElement } from "react";
import useSWR from "swr";

const ProductIndex: React.FC = () => {
    const { data, error, isValidating } = useSWR<ProductData>('https://dummyjson.com/products', fetcher);

    // isValidating is built-in object from useSWR,
    // that will indicates whether the data is being fetched from web API or not.
    // true = when fetching.
    // false = not fetching
    if (isValidating) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Please contact admin.</p>
    }

    return <div>
        <h1 className="text-lg font-bold">Product List</h1>

        <div>
            <table className="border-collapse border border-slate-400 bg-white">
                <thead>
                    <tr>
                        <TableTh>Name</TableTh>
                        <TableTh>Description</TableTh>
                        <TableTh>Price</TableTh>
                    </tr>
                </thead>
                <tbody>
                    {
                        // product is the iterated object in the loop.
                        data?.products.map(product => {
                            return (
                                <tr key={product.id}>
                                    <td className="border border-slate-300 p-3">
                                        <Link href={`products/${product.id}`}
                                            className="no-underline hover:underline"
                                        >{product.title}</Link>
                                    </td>
                                    <td className="border border-slate-300 p-3">
                                        {product.description}
                                    </td>
                                    <td className="border border-slate-300 p-3">
                                        {product.price}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>;
}

const ProductIndexPage: NextPageWithLayout = () => {
    return <ProductIndex />;
}

ProductIndexPage.getLayout = function getLayout(page: ReactElement) {
    return <CustomLayout>
        {page}
    </CustomLayout>
}

export default ProductIndexPage;
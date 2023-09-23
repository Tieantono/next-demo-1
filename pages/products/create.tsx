import CustomLayout from "@/components/layouts/CustomLayout";
import { NextPageWithLayout } from "@/components/layouts/NextPageWithLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Create form schema, which defines all inputs that will be validated.
const ProductFormSchema = z.object({
    // This will validate the "Name" input.
    // Since "Name" input is a text, we must call string() to set the value as string.
    title: z.string()
        // Set a non-empty value rule with specific error message.
        .nonempty('Nama tidak boleh kosong.'),
    description: z.string()
        .nonempty('Deskripsi tidak boleh kosong.').min(8, 'Deskripsi harus lebih dari 8 karakter.').max(32),
    price: z.number({ invalid_type_error: 'Harga harus dalam bentuk angka.' })
        .nonnegative('Harga tidak boleh kurang dari 0.'),
    discount: z.number({ invalid_type_error: 'Diskon harus dalam bentuk angka.' })
        .max(50, 'Diskon tidak boleh melebihi dari 50%.'),
    rating: z.number({ invalid_type_error: 'Rating harus dalam bentuk angka.' })
        .max(5, 'Rating tidak boleh lebih dari 5.')
})

// Automatically convert the schema object into its own TypeScript type.
type ProductForm = z.infer<typeof ProductFormSchema>;

const CreateProduct: React.FC = () => {
    // Set parameter e so we can invoke the preventDefault() function to prevent
    // HTML form redirection on submit.
    function onFormSubmit(e: FormEvent<HTMLFormElement>) {
        console.log('nameInput: ', nameInput);
        e.preventDefault();
    }

    /**
     * Handle on validated form submission.
     * Will only get called if all validations passed.
     * form object automatically obtained when handleSubmit function call this function.
     */
    async function onFormValidationSubmit(form: ProductForm) {
        // Use try & catch statement to catch the HTTP error.
        // Only use try & catch if you can't validate it using if else
        // OR anything related to integration to another system, in this case
        // we integrate our front-end web app to dummyjson web API / BE app.
        try {
            await fetch('https://dummyjson.com/products/add', {
                method: 'POST',
                // Set Content-Type in header to application/json to tell the server
                // that we want to send a JSON data.
                headers: {'Content-Type': 'application/json'},
                // To send the JSON data, we must convert JSON object to string of JSON.
                body: JSON.stringify(form)
            });
            alert(`Product ${form.title} berhasil disimpan.`);
            reset();
        } catch (error) {
            // To make it more user friendly, you can use alert or anything that
            // contains user friendly error message.
            alert('System Error - Hubungi Admin.');
            console.error(error);
        }
    }

    // To create state object, you'll need to:
    // - Create the state object name (nameInput). This is read-only, DO NOT assign / overwrite / mutate directly.
    // - Create the set state function name (setNameInput). Always use "set" prefix when naming.
    //   This is used to set the state object.
    const [nameInput, setNameInput] = useState<string>('');

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductForm>({
        // Choose which library to read the validation schema.
        resolver: zodResolver(ProductFormSchema),
        // onBlur mode will automatically show the error message on input focus change.
        mode: "onBlur"
    })

    return <div>
        <form onSubmit={handleSubmit(onFormValidationSubmit)} className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block tracking-wide text-gray-700 font-bold mb-2">
                        Name
                    </label>

                    {/* useState example. "e" variable is provided by input element. */}
                    {/* <input onChange={(e) => setNameInput(e.target.value)} /> */}

                    <input {...register('title')} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    <p className="mb-4 text-red-500">{errors.title?.message}</p>
                </div>

                <div className="w-full px-3">
                    <label className="block tracking-wide text-gray-700 font-bold mb-2">
                        Description
                    </label>
                    <input {...register('description')} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                    <p className="mb-4 text-red-500">{errors.description?.message}</p>
                </div>

                <div className="w-full px-3">
                    <label className="block tracking-wide text-gray-700 font-bold mb-2">
                        Price
                    </label>
                    {/* 
                        Must set valueAsNumber to true, otherwise it will be detected as string,
                        and it will show the invalid data type error message to the user.
                     */}
                    <input {...register('price', { valueAsNumber: true })} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" />
                    <p className="mb-4 text-red-500">{errors.price?.message}</p>
                </div>

                <div className="w-full px-3">
                    <label className="block tracking-wide text-gray-700 font-bold mb-2">
                        Discount
                    </label>
                    <input {...register('discount', { valueAsNumber: true })} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" />
                    <p className="mb-4 text-red-500">{errors.discount?.message}</p>
                </div>

                <div className="w-full px-3">
                    <label className="block tracking-wide text-gray-700 font-bold mb-2">
                        Rating
                    </label>
                    <input {...register('rating', { valueAsNumber: true })} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" />
                    <p className="mb-4 text-red-500">{errors.rating?.message}</p>
                </div>
            </div>
            <button type="submit"
                className={'text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700'}>
                Submit
            </button>
        </form>
    </div>;
}

const CreateProductPage: NextPageWithLayout = () => {
    return <CreateProduct></CreateProduct>
}

CreateProductPage.getLayout = function (page: ReactElement) {
    return (
        <CustomLayout>
            {page}
        </CustomLayout>
    )
}

export default CreateProductPage;
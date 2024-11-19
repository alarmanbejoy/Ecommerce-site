import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const categoryList = [
    { name: "fashion" },
    { name: "shirt" },
    { name: "jacket" },
    { name: "mobile" },
    { name: "laptop" },
    { name: "shoes" },
    { name: "home" },
    { name: "books" },
];

const UpdateProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProductFunction } = context;

    const navigate = useNavigate();
    const { id } = useParams();

    // Initialize product state with all fields to avoid undefined values
    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity: 0,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }),
    });

    const getSingleProductFunction = async (productId) => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", productId));
            const product = productTemp.data();

            // Use default values for missing fields
            setProduct({
                title: product?.title || "",
                price: product?.price || "",
                productImageUrl: product?.productImageUrl || "",
                category: product?.category || "",
                description: product?.description || "",
                quantity: product?.quantity || 0,
                time: product?.time || Timestamp.now(),
                date: product?.date || new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }),
            });
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const updateProduct = async () => {
        setLoading(true);
        try {
            await setDoc(doc(fireDB, "products", id), product);
            toast.success("Product updated successfully!");
            getAllProductFunction();
            setLoading(false);
            navigate("/admin-dashboard");
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        // Clear product data and fetch the new product when `id` changes
        setProduct({
            title: "",
            price: "",
            productImageUrl: "",
            category: "",
            description: "",
            quantity: 0,
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }),
        });

        getSingleProductFunction(id);
    }, [id]); // Dependency on `id`

    return (
        <div>
            <div className="flex justify-center items-center h-screen">
                {loading && <Loader />}
                <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
                    <h2 className="text-center text-2xl font-bold text-pink-500 mb-5">
                        Update Product
                    </h2>

                    {/* Title Input */}
                    <input
                        type="text"
                        name="title"
                        value={product.title || ""}
                        onChange={(e) => setProduct({ ...product, title: e.target.value })}
                        placeholder="Product Title"
                        className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300 mb-3"
                    />

                    {/* Price Input */}
                    <input
                        type="number"
                        name="price"
                        value={product.price || ""}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        placeholder="Product Price"
                        className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300 mb-3"
                    />

                    {/* Product Image URL */}
                    <input
                        type="text"
                        name="productImageUrl"
                        value={product.productImageUrl || ""}
                        onChange={(e) =>
                            setProduct({ ...product, productImageUrl: e.target.value })
                        }
                        placeholder="Product Image URL"
                        className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300 mb-3"
                    />

                    {/* Category Select */}
                    <select
                        value={product.category || ""}
                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
                        className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none mb-3"
                    >
                        <option disabled value="">
                            Select Product Category
                        </option>
                        {categoryList.map((value, index) => (
                            <option key={index} value={value.name}>
                                {value.name}
                            </option>
                        ))}
                    </select>

                    {/* Description */}
                    <textarea
                        value={product.description || ""}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        name="description"
                        placeholder="Product Description"
                        rows="5"
                        className="w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 mb-3"
                    ></textarea>

                    {/* Update Button */}
                    <button
                        onClick={updateProduct}
                        type="button"
                        className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
                    >
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductPage;

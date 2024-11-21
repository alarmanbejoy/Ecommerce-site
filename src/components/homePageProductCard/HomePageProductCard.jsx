import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";

// HomePageProductCard কম্পোনেন্ট
const HomePageProductCard = () => {
  const navigate = useNavigate(); // রাউটিংয়ের জন্য useNavigate হুক ব্যবহার করা হচ্ছে

  const context = useContext(myContext); // কনটেক্সট থেকে প্রোডাক্ট ডাটা নেয়ার জন্য useContext
  const { getAllProduct } = context; // কনটেক্সট থেকে 'getAllProduct' ফাংশন ডিস্ট্রাকচারিং করা

  const cartItems = useSelector((state) => state.cart); // রিডাক্স স্টোর থেকে কার্ট আইটেম গুলি নেয়া হচ্ছে
  const dispatch = useDispatch(); // রিডাক্স ডিসপ্যাচ ফাংশনটি ব্যবহার করা হচ্ছে

  // কার্টে প্রোডাক্ট যোগ করার ফাংশন
  const addCart = (item) => {
    // console.log(item) // এখানে আইটেম লগ করা হয়েছে
    dispatch(addToCart(item)); // রিডাক্স অ্যাকশন dispatch করা হচ্ছে আইটেমটি কার্টে যোগ করতে
    toast.success("Add to cart"); // টোস্ট মেসেজ দেখানো হচ্ছে
  };

  // কার্ট থেকে প্রোডাক্ট মুছে ফেলার ফাংশন
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item)); // রিডাক্স অ্যাকশন dispatch করা হচ্ছে আইটেমটি কার্ট থেকে মুছতে
    toast.success("Delete cart"); // টোস্ট মেসেজ দেখানো হচ্ছে
  };

  // useEffect হুকটি ব্যবহার করা হচ্ছে কার্ট আইটেমগুলি localStorage-এ সেভ করতে
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems)); // কার্ট আইটেমগুলি localStorage-এ সেভ করা
  }, [cartItems]); // যখন কার্ট আইটেম পরিবর্তিত হবে, তখন এই কোডটি রান করবে

  return (
    <div className="mt-10">
      {/* Heading  */}
      <div className="">
        <h1 className=" text-center mb-5 text-2xl font-semibold">
          Bestselling Products
        </h1>
      </div>

      {/* main section where products are displayed */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            {/* পণ্য তালিকা দেখানোর জন্য map করা হচ্ছে */}
            {getAllProduct.slice(0, 8).map((item, index) => {
              const { id, title, price, productImageUrl } = item; // পণ্যের আইডি, শিরোনাম, দাম এবং ইমেজ নেয়া
              return (
                <div key={index} className="p-4 w-full md:w-1/4">
                  <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                    {/* প্রোডাক্ট ইমেজ, ক্লিক করলে বিস্তারিত পেজে নিয়ে যাবে */}
                    <img
                      onClick={() => navigate(`/productinfo/${id}`)} // প্রোডাক্টের বিস্তারিত পেজে নেভিগেট করা
                      className="lg:h-80  h-96 w-full"
                      src={productImageUrl} // ইমেজ ইউআরএল
                      alt="blog"
                    />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        E-bharat
                      </h2>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {title.substring(0, 25)}{" "}
                        {/* শিরোনাম থেকে প্রথম ২৫টি ক্যারেক্টার দেখানো */}
                      </h1>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        ₹{price} {/* দাম দেখানো */}
                      </h1>

                      {/* কার্টে পণ্য যুক্ত বা মুছে ফেলার বোতাম */}
                      <div className="flex justify-center ">
                        {cartItems.some((p) => p.id === item.id) ? (
                          // যদি পণ্যটি কার্টে থাকে, তাহলে 'Delete to Cart' বোতাম দেখাবে
                          <button
                            onClick={() => deleteCart(item)} // ডিলিট ফাংশন কল করা
                            className=" bg-red-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                          >
                            Delete To Cart
                          </button>
                        ) : (
                          // যদি পণ্যটি কার্টে না থাকে, তাহলে 'Add to Cart' বোতাম দেখাবে
                          <button
                            onClick={() => addCart(item)} // অ্যাড ফাংশন কল করা
                            className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                          >
                            Add To Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageProductCard;

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// কনটেক্সট ইম্পোর্ট করা হয়েছে।
import toast from "react-hot-toast"; // নোটিফিকেশন দেখানোর জন্য টোস্ট।
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase Authentication থেকে সাইন আপ ফাংশন।
import { addDoc, collection, Timestamp } from "firebase/firestore"; // Firestore এ ডাটা যুক্ত করার জন্য।

import { auth, fireDB } from "../../firebase/FirebaseConfig"; // Firebase এর কনফিগারেশন ফাইল থেকে ইম্পোর্ট।
import Loader from "../../components/loader/Loader"; // লোডার কম্পোনেন্ট।
import MyContext from "../../context/myContext";

const Signup = () => {
  const { loading, setLoading } = useContext(MyContext); // কনটেক্সট থেকে লোডিং স্টেট।
  const navigate = useNavigate(); // রাউটিংয়ের জন্য নেভিগেশন।

  // সাইনআপ ফর্মের ইনপুট ডেটার জন্য স্টেট ডিফাইন।
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // ডিফল্ট রোল 'user'।
  });

  /**
   * ==================== ব্যবহারকারীর সাইনআপ ফাংশন ====================
   */
  const userSignupFunction = async () => {
    // ফর্মের ভ্যালিডেশন।
    if (
      userSignup.name === "" || // নাম ফাঁকা থাকলে।
      userSignup.email === "" || // ইমেইল ফাঁকা থাকলে।
      userSignup.password === "" // পাসওয়ার্ড ফাঁকা থাকলে।
    ) {
      return toast.error("সকল ঘর পূরণ করতে হবে"); // এরর দেখানো।
    }

    // ইমেইল ফরম্যাট যাচাই।
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // বৈধ ইমেইল ফরম্যাট চেক করার জন্য Regex।
    if (!emailRegex.test(userSignup.email)) {
      return toast.error("সঠিক ইমেইল প্রদান করুন"); // যদি ইমেইল অবৈধ হয়।
    }

    setLoading(true); // লোডিং শুরু করা।
    try {
      // Firebase Authentication দিয়ে ব্যবহারকারী তৈরি করা।
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );

      // ব্যবহারকারীর তথ্য স্ট্রাকচার করা।
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(), // Firestore টাইমস্ট্যাম্প।
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }), // ব্যবহারকারীর সাইনআপের তারিখ।
      };

      // Firestore এ ব্যবহারকারীর ডেটা যুক্ত করা।
      const userReference = collection(fireDB, "user");
      await addDoc(userReference, user);

      // ফর্ম রিসেট করা।
      setUserSignup({ name: "", email: "", password: "" });

      toast.success("সাইনআপ সফল হয়েছে!"); // সফল মেসেজ।
      navigate("/login"); // লগইন পেজে নেভিগেট।
    } catch (error) {
      console.error(error); // কনসোলে এরর লগ করা।
      toast.error("কিছু ভুল হয়েছে!"); // ব্যবহারকারীর জন্য এরর মেসেজ।
    } finally {
      setLoading(false); // লোডিং বন্ধ করা।
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />} {/* লোডার দেখানো */}
      <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-pink-500 ">Signup</h2>
        </div>
        {/* নাম ইনপুট */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Full Name"
            value={userSignup.name}
            onChange={(e) =>
              setUserSignup({ ...userSignup, name: e.target.value })
            }
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>
        {/* ইমেইল ইনপুট */}
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email Address"
            value={userSignup.email}
            onChange={(e) =>
              setUserSignup({ ...userSignup, email: e.target.value })
            }
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>
        {/* পাসওয়ার্ড ইনপুট */}
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            value={userSignup.password}
            onChange={(e) =>
              setUserSignup({ ...userSignup, password: e.target.value })
            }
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>
        {/* সাইনআপ বাটন */}
        <div className="mb-5">
          <button
            type="button"
            onClick={userSignupFunction}
            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
          >
            Signup
          </button>
        </div>
        {/* লগইন লিংক */}
        <div>
          <h2 className="text-black">
            Have an account{" "}
            <Link className=" text-pink-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;


/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react"; // রিয়াক্ট থেকে useContext এবং useState ইম্পোর্ট করা হয়েছে।
import { Link, useNavigate } from "react-router-dom"; // রাউটিংয়ের জন্য react-router-dom এর Link এবং useNavigate ব্যবহার করা হয়েছে।
import myContext from "../../context/myContext"; // কাস্টম কনটেক্সট ইম্পোর্ট করা।
import toast from "react-hot-toast"; // ব্যবহারকারীর জন্য নোটিফিকেশন দেখানোর জন্য।
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase Authentication ব্যবহার করে লগইনের জন্য।
import { auth, fireDB } from "../../firebase/FirebaseConfig"; // Firebase এর কনফিগারেশন ফাইল থেকে auth এবং fireDB ইম্পোর্ট।
import Loader from "../../components/loader/Loader"; // লোডার কম্পোনেন্ট।
import { collection, onSnapshot, query, where } from "firebase/firestore"; // Firestore থেকে ডাটা ফেচ করার জন্য প্রয়োজনীয় মডিউলগুলো।

const Login = () => {
  // কনটেক্সট থেকে loading এবং setLoading ফাংশন নেয়া হচ্ছে।
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate(); // ব্যবহারকারীর নেভিগেশনের জন্য।

  // লগইন ইনপুটের জন্য স্টেট ম্যানেজমেন্ট।
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  /**========================================================================
   *                          User Login Function 
   *========================================================================**/
  const userLoginFunction = async () => {
    // ইনপুট ভ্যালিডেশন (যদি ইমেইল বা পাসওয়ার্ড ফাঁকা থাকে)
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("All fields are required"); // এরর দেখানো হবে।
      return;
    }

    setLoading(true); // লোডিং শুরু করা।
    try {
      // Firebase Authentication দিয়ে ব্যবহারকারী লগইন করা।
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );

      // Firestore ডাটাবেস থেকে ব্যবহারকারীর ডিটেইলস ফেচ করা।
      const q = query(
        collection(fireDB, "user"), // "user" কালেকশন থেকে ডাটা খুঁজে আনা।
        where("uid", "==", users?.user?.uid) // কুয়েরি করে নির্দিষ্ট uid মিলিয়ে।
      );
      onSnapshot(q, (querySnapshot) => {
        let user;
        querySnapshot.forEach((doc) => {
          user = doc.data(); // ডাটাবেস থেকে ফেচ করা ডাটা user ভেরিয়েবলে রাখা।
        });

        if (user) {
          // ব্যবহারকারীর ডাটা লোকাল স্টোরেজে সংরক্ষণ করা।
          localStorage.setItem("users", JSON.stringify(user));

          // ইনপুট ফর্ম রিসেট করা।
          setUserLogin({
            email: "",
            password: "",
          });

          // সফল লগইন মেসেজ দেখানো।
          toast.success("Login successfully!");
          setLoading(false);

          // রোল অনুযায়ী নেভিগেট করা (ইউজার বা অ্যাডমিন ড্যাশবোর্ডে)।
          if (user.role === "user") {
            navigate("/user-dashboard"); // ইউজার ড্যাশবোর্ড।
          } else {
            navigate("/admin-dashboard"); // অ্যাডমিন ড্যাশবোর্ড।
          }
        } else {
          // যদি ব্যবহারকারীর ডাটা না পাওয়া যায়, এরর দেখানো।
          toast.error("User not found!");
          setLoading(false);
        }
      });
    } catch (error) {
      console.error(error); // এরর লগ করা।
      toast.error("Login failed!"); // লগইন ব্যর্থ হলে এরর দেখানো।
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* যদি লোডিং সক্রিয় থাকে, তাহলে Loader দেখানো হবে */}
      {loading && <Loader />}
      {/* লগইন ফর্ম */}
      <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
        {/* ফর্মের শিরোনাম */}
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-pink-500">
            Login
          </h2>
        </div>

        {/* ইমেইল ইনপুট */}
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email Address"
            value={userLogin.email}
            onChange={(e) =>
              setUserLogin({ ...userLogin, email: e.target.value }) // স্টেট আপডেট করা।
            }
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>

        {/* পাসওয়ার্ড ইনপুট */}
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            value={userLogin.password}
            onChange={(e) =>
              setUserLogin({ ...userLogin, password: e.target.value }) // স্টেট আপডেট করা।
            }
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>

        {/* লগইন বাটন */}
        <div className="mb-5">
          <button
            type="button"
            onClick={userLoginFunction} // লগইন ফাংশন কল করা।
            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
          >
            Login
          </button>
        </div>

        {/* সাইনআপ লিংক */}
        <div>
          <h2 className="text-black">
            Don't have an account?{" "}
            <Link className="text-pink-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;


// alternative easy code for login

// /* eslint-disable react/no-unescaped-entities */
// import { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import toast from "react-hot-toast";
// import MyContext from "../../context/MyContext";
// import { auth } from "../../firebase/FirebaseConfig";
// import Loader from "../../components/loader/Loader";

// const Login = () => {
//   const context = useContext(MyContext);
//   const { loading, setLoading } = context;

//   const navigate = useNavigate();

//   // State for user login inputs
//   const [userLogin, setUserLogin] = useState({
//     email: "",
//     password: "",
//   });

//   // Function to handle login
//   const userLoginFunction = async () => {
//     if (userLogin.email === "" || userLogin.password === "") {
//       return toast.error("All fields are required");
//     }

//     setLoading(true);
//     try {
//       // Sign in the user using Firebase
//       await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
//       toast.success("Login successful!");
//       setLoading(false);

//       // Navigate to user dashboard
//       navigate("/user-dashboard");
//     } catch (error) {
//       toast.error("Invalid email or password!"); 
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       {/* Show loader if loading */}
//       {loading && <Loader />}

//       {/* Login Form */}
//       <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">
//         {/* Top Heading */}
//         <div className="mb-5">
//           <h2 className="text-center text-2xl font-bold text-pink-500 ">
//             Login
//           </h2>
//         </div>

//         {/* Email Input */}
//         <div className="mb-3">
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={userLogin.email}
//             onChange={(e) =>
//               setUserLogin({ ...userLogin, email: e.target.value })
//             }
//             className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
//           />
//         </div>

//         {/* Password Input */}
//         <div className="mb-5">
//           <input
//             type="password"
//             placeholder="Password"
//             value={userLogin.password}
//             onChange={(e) =>
//               setUserLogin({ ...userLogin, password: e.target.value })
//             }
//             className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
//           />
//         </div>

//         {/* Login Button */}
//         <div className="mb-5">
//           <button
//             type="button"
//             onClick={userLoginFunction}
//             className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
//           >
//             Login
//           </button>
//         </div>

//         {/* Signup Link */}
//         <div>
//           <h2 className="text-black">
//             Don't Have an account?{" "}
//             <Link className="text-pink-500 font-bold" to={"/signup"}>
//               Signup
//             </Link>
//           </h2>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

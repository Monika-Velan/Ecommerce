// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../style/authpage.css";

// const AuthPage = () => {
//   const [isSignup, setIsSignup] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const navigate = useNavigate();

//   // 🟢 Check if user already logged in
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("currentUser"));
//     const token = localStorage.getItem("token");
//     if (user && token) {
//       navigate("/profile");
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (isSignup) {
//         const res = await axios.post("http://localhost:5000/api/auth/register", {
//           name,
//           phone,
//           email,
//           password,
//         });
//         alert("Signup successful! Please log in.");
//         setIsSignup(false);
//       } else {
//         const res = await axios.post("http://localhost:5000/api/auth/login", {
//           email,
//           password,
//         });
//         alert("Login successful!");
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("currentUser", JSON.stringify(res.data.user));
//         navigate("/profile");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   // 🟡 Quick Demo Login
//   const handleDemoLogin = async () => {
//     try {
//       const demoEmail = "monikavelan2003@gmail.com";
//       const demoPassword = "123";

//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email: demoEmail,
//         password: demoPassword,
//       });

//       alert("Logged in as Demo User!");
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("currentUser", JSON.stringify(res.data.user));
//       navigate("/profile");
//     } catch (error) {
//       alert("Demo login failed. Please check backend connection.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-wrapper">
//         <div className="auth-card">
//           <h2>{isSignup ? "Sign Up" : "Login"}</h2>
//           <form onSubmit={handleSubmit}>
//             {isSignup && (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//                 <input
//                   type="tel"
//                   placeholder="Phone Number"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//               </>
//             )}
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               required
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               required
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
//           </form>

//           <p className="toggle-text">
//             {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
//             <span onClick={() => setIsSignup(!isSignup)}>
//               {isSignup ? "Login here" : "Sign up here"}
//             </span>
//           </p>
//         </div>

//         {/* 🟣 Demo Card BELOW the main login card */}
//         {!isSignup && (
//           <div className="demo-card below">
//             <h4>💡 Demo Login (For Testing)</h4>
//             <p><strong>Email:</strong> monikavelan2003@gmail.com</p>
//             <p><strong>Password:</strong> 123</p>
//             <button onClick={handleDemoLogin}>Login as Demo User</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthPage;




















import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/authpage.css";

// 🔹 Render Backend Base URL
const BASE_URL = "https://ecommerce-backend-zkqa.onrender.com";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  // 🟢 Redirect if already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = localStorage.getItem("token");
    if (user && token) {
      navigate("/profile");
    }
  }, [navigate]);

  // 🟢 Handle Login or Signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        // 🟢 Signup request
        await axios.post(`${BASE_URL}/api/auth/register`, {
          name,
          phone,
          email,
          password,
        });
        alert("Signup successful! Please log in.");
        setIsSignup(false);
      } else {
        // 🟢 Login request
        const res = await axios.post(`${BASE_URL}/api/auth/login`, {
          email,
          password,
        });
        alert("Login successful!");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
        navigate("/profile");
      }
    } catch (err) {
      console.error("❌ Auth Error:", err);
      alert(err.response?.data?.message || "Something went wrong. Try again!");
    }
  };

  // 🟣 Demo Login (for testing)
  const handleDemoLogin = async () => {
    try {
      const demoEmail = "monikavelan2003@gmail.com";
      const demoPassword = "123";

      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        email: demoEmail,
        password: demoPassword,
      });

      alert("✅ Logged in as Demo User!");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      navigate("/profile");
    } catch (error) {
      console.error("❌ Demo Login Error:", error);
      alert("Demo login failed. Please check your backend connection.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <h2>{isSignup ? "Sign Up" : "Login"}</h2>

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
          </form>

          <p className="toggle-text">
            {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
            <span onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? "Login here" : "Sign up here"}
            </span>
          </p>
        </div>

        {/* 🟣 Demo Login Card */}
        {!isSignup && (
          <div className="demo-card below">
            <h4>💡 Demo Login (For Testing)</h4>
            <p>
              <strong>Email:</strong> monikavelan2003@gmail.com
            </p>
            <p>
              <strong>Password:</strong> 123
            </p>
            <button onClick={handleDemoLogin}>Login as Demo User</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;

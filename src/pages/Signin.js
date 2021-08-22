import { Link } from "react-router-dom";
import Logo from "../assets/LogoSlack.png";
import Google from "../assets/google.webp";
import { useState } from "react";
import { auth, provider } from "../firebase";
// import Apple from "../assets/apple.png";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    if (!email && !password) return alert("Please enter the valid details..");
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  };

  const signInWithGoogle = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="lg:h-screen">
      <div className="lg:w-[30%] lg:ml-auto lg:mr-auto">
        <div className="flex flex-col">
          <div className="flex justify-center p-3">
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
          </div>
          <div className="flex flex-col space-y-3">
            <h1 className="text-center text-4xl font-bold">
              Sign in to Memento
            </h1>
            <p className="text-center tracking-wider">
              We suggest using the email address you use at class.
            </p>
          </div>

          <div className="px-6">
            <div
              onClick={signInWithGoogle}
              className="flex justify-center mt-6 px-10 cursor-pointer hover:border-blue-700 hover:shadow-2xl py-2 rounded-md border-2 border-blue-600"
            >
              <div className="flex items-center">
                <img src={Google} alt="" className="h-5" />
                <p className="ml-2 text-blue-800 font-semibold">
                  Sign in with Google
                </p>
              </div>
            </div>

            <p className="text-center mt-2 font-bold mb-1">OR</p>
            <form className="flex flex-col">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-2 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-lg border border-gray-800 rounded-md"
                placeholder="name@gmail.com"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="py-2 p-2 mt-5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-lg border border-gray-800 rounded-md"
                placeholder="password"
              />
              <div className="mt-5">
                <button
                  onClick={signIn}
                  className="w-full bg-[#611F69] focus:outline-none focus:ring-2 focus:ring-bg-[#611F69] py-2 text-white font-bold rounded-md"
                >
                  Sign in
                </button>
              </div>
              <div className="mt-5 flex justify-center items-center">
                <p>Create new Account?</p>
                <Link to="/signup">
                  <p className="ml-3 text-[#611F69] text-lg font-semibold cursor-pointer">
                    signup
                  </p>
                </Link>
              </div>
            </form>
          </div>
          <div className="px-6 flex items-center mt-4">
            <input type="checkbox" />
            <p className="ml-2">It’s okay to send me emails about Memento.</p>
          </div>
          <div className="px-6 mt-4">
            <p className="items-start">
              By creating account, you’re agreeing to our Customer Terms of
              Service, Privacy Policy, and Cookie Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;

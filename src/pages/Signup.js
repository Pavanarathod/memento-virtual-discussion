import Logo from "../assets/LogoSlack.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "../firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();

    if (!email && !password && !username)
      return alert("Please enter the valid details..");

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) =>
        authUser.user.updateProfile({
          displayName: username,
        })
      )
      .catch((error) => alert(error.message));

    setEmail("");
  };

  return (
    <div className="h-screen">
      <div className="lg:w-[30%] lg:ml-auto lg:mr-auto">
        <div className="flex flex-col">
          <div className="flex justify-center p-3">
            <Link to="/">
              <img src={Logo} alt="" className="object-contain" />
            </Link>
          </div>
          <div className="flex flex-col space-y-3">
            <h1 className="text-center text-4xl font-bold">
              First, enter your email
            </h1>
            <p className="text-center tracking-wider">
              We suggest using the email address you use at class.
            </p>
          </div>
          <div className="px-6">
            <form className="flex flex-col">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-2 p-2 mt-5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-lg border border-gray-800 rounded-md"
                placeholder="name@gmail.com"
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="py-2 p-2 mt-5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-lg border border-gray-800 rounded-md"
                placeholder="Username"
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
                  onClick={signUp}
                  className="w-full bg-[#611F69] focus:outline-none focus:ring-2 focus:ring-bg-[#611F69] py-2 text-white font-bold rounded-md"
                >
                  Create Account
                </button>
              </div>
              <div className="mt-5 flex justify-center items-center">
                <p>Already have an Account?</p>
                <Link to="/signin">
                  <p className="ml-3 text-[#611F69] text-lg font-semibold cursor-pointer">
                    Login
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
          <div className="px-6 absolute bottom-0">
            <div className="flex">
              <p>2021@memento copyrights</p>
              <p className="ml-5">contact us</p>
              <p className="ml-5">India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

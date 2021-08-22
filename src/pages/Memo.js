import Header from "../components/Header";
import Google from "../assets/google.webp";
import { auth, provider } from "../firebase";
import { Link } from "react-router-dom";
const Memo = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <div className="bg-[#4A154B] h-[150vh]">
      <div className="sm:w-[80%] sm:ml-auto sm:mr-auto">
        <div>
          <Header />
        </div>
        <div className="sm:w-[80%] sm:ml-auto sm:mr-auto text-gray-100 mt-5 lg:mt-16">
          <h1 className="lg:text-6xl text-center font-bold ">
            Memento makes it{" "}
            <span className="text-yellow-400 pb-3">pleasant to study</span>{" "}
            together
          </h1>
        </div>

        <div className="lg:flex lg:justify-center space-y-2 lg:space-y-0 lg:items-center lg:space-x-3 lg:mt-14">
          <Link to="/signin">
            <p className="px-10 shadow-2xl rounded-sm py-4 bg-white text-[#791984] font-semibold cursor-pointer focus:outline-none">
              Try for free
            </p>
          </Link>

          <div
            onClick={signIn}
            className="flex items-center cursor-pointer rounded-sm shadow-2xl px-10 py-2 space-x-1 bg-white"
          >
            <img src={Google} alt="" className="h-10 p-3 object-contain" />
            <p className=" text-blue-700 font-semibold uppercase ">
              Sign up with google
            </p>
          </div>
        </div>

        <div className="sm:w-[80%] lg:h-[50vh] shadow-2xl sm:ml-auto sm:mr-auto text-gray-100 mt-5 lg:mt-16">
          <div className="">
            <div className="flex items-center bg-[#2B092B] py-2 pl-4">
              <span>🔴</span>
              <span>🟡</span>
              <span>🟢</span>
            </div>
            <div className="flex h-[50vh]">
              <div className="bg-[#791984] flex-[0.3]"></div>
              <div className="bg-white  flex-[0.7]">
                <div className="p-3 space-y-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://i.giphy.com/media/pPhyAv5t9V8djyRFJH/giphy.webp"
                      alt=""
                      className="h-14 rounded-sm"
                    />
                    <p className="text-gray-800 text-3xl animate-pulse">
                      Wait... what is Memento?
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <p className="text-gray-800 text-3xl">
                      It’s a new way to communicate – faster than email and more
                      focused than chat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memo;

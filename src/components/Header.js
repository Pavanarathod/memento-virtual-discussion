import Logo from "../assets/LogoWhite1.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-2">
      <div>
        <img src={Logo} alt="" className=" h-16 object-contain" />
      </div>
      <div className="flex items-center mr-2">
        <Link to="/signup">
          <p className=" text-white hover:underline text-center cursor-pointer font-bold text-base mr-10">
            Sign Up
          </p>
        </Link>

        <Link to="/signin">
          <button className="px-3 py-1 bg-[#791984] text-white focus:outline-none border border-[#4A154B]  shadow-2xl">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;

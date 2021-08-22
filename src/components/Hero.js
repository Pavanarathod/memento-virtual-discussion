import Logo from "../assets/LogoSlack.png";
import Boy from "../assets/boy.svg";
const Hero = () => {
  return (
    <div className="h-screen">
      <div>
        <div className=" flex justify-end p-4">
          <img src={Logo} alt="" className="object-contain" />
        </div>

        <div className="lg:flex lg:justify-around lg:items-center p-4 mt-5">
          <div className="lg:flex-[0.5]">
            <img src={Boy} alt="" className="object-contain h-[50vh]" />
          </div>

          <div className="lg:flex-[0.5]">
            <h1 className="text-8xl lg:text-right font-extrabold text-[#791984]">
              Start Here
            </h1>
            <div className="">
              <p className="font-bold text-base text-right text-[#4A154B]">
                Select available free classes and you'r good to go...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

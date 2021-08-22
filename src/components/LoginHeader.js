import { auth } from "../firebase";

const LoginHeader = ({ toLink }) => {
  return (
    <div className="bg-[#2B092B]">
      <div>
        <div className="flex justify-between items-center p-3">
          <div className="flex items-center">
            <div></div>
          </div>

          <div className="flex items-center space-x-7">
            <div>
              <button
                onClick={() => auth.signOut()}
                className="bg-gray-300 text-base font-bold px-4 py-1 focus:outline-none"
              >
                Signout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;

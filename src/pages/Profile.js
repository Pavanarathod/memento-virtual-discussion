import { useAuthState } from "react-firebase-hooks/auth";
import LoginHeader from "../components/LoginHeader";
import { auth } from "../firebase";
import Avatar from "../assets/avatar.png";

const Profile = () => {
  const [user] = useAuthState(auth);
  return (
    <div>
      <div>
        <div>
          <LoginHeader />
        </div>

        <div className="w-3/4 ml-auto mr-auto mt-5">
          <div className=" flex justify-center">
            {user?.photoURL ? (
              <img src={user?.photoURL} alt="" className=" h-36 rounded-full" />
            ) : (
              <img src={Avatar} alt="" className=" h-36 rounded-full" />
            )}
          </div>

          <div className="mt-7">
            <div className="bg-[#4A154B] p-5 flex  flex-col rounded-md shadow-2xl">
              <h1 className="text-center text-gray-200 text-lg tracking-wider">
                {user?.displayName}
              </h1>
              <h2 className="text-center text-base text-white">
                {user?.email}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

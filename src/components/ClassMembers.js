import { useAuthState } from "react-firebase-hooks/auth";
import database, { auth } from "../firebase";
import Avatar from "../assets/avatar.png";
import { useParams } from "react-router-dom";

const ClassMembers = ({ image, name, email, delteId, userId }) => {
  const { id } = useParams();
  const [user] = useAuthState(auth);

  const leveMembership = (delteId) => {
    database
      .collection("class")
      .doc(id)
      .collection("members")
      .doc(delteId)
      .delete();
  };

  return (
    <div>
      <div>
        <div className="flex items-center">
          <div>
            {image ? (
              <img src={image} alt="" className="h-16" />
            ) : (
              <img src={Avatar} alt="" className="h-16" />
            )}
          </div>
          <div className="ml-4 p-2 flex justify-between w-full items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
              <p className="text-lg font-semibold text-gray-900">{email}</p>
            </div>
            <div>
              {user.uid === userId && (
                <button
                  onClick={() => leveMembership(delteId)}
                  className="py-1 rounded-sm px-4 bg-red-400 focus:outline-none text-white"
                >
                  Leave
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassMembers;

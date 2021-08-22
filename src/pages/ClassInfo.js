import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import ChatHeader from "../components/ChatHeader";
import database, { auth } from "../firebase";
import useClass from "../hooks/useClass";
import useMembers from "../hooks/useMembers";

const ClassInfo = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [classInfo] = useClass("class", id);
  const [members] = useMembers("class", id, "members");

  const deleteSession = () => {
    database.collection("class").doc(id).delete();
  };

  return (
    <div className="">
      <div>
        <div>
          <ChatHeader toLink={`/join/session/id/${id}`} />
        </div>
        <div className="p-3">
          <h1 className="text-7xl text-[#4A154B] font-extrabold text-right mr-2">
            {classInfo?.name}
          </h1>
        </div>

        <div className="w-3/4 ml-auto mr-auto mt-5 bg-[#4A154B] rounded-md shadow-2xl">
          <div className="flex justify-between p-3 w-full">
            <img src={classInfo?.profileImg} alt="" className="rounded-full" />
            <div className="ml-4 space-y-1">
              <h1 className="text-lg font-bold text-white">
                <span className=" text-green-400 mr-2">HOSTED BY:</span>{" "}
                {classInfo?.user}
              </h1>

              <h1 className=" text-yellow-300">
                {" "}
                <span>Total Students:</span> {members.length}
              </h1>
              {user.uid === classInfo?.uuid && (
                <div className="flex justify-end">
                  <button
                    onClick={deleteSession}
                    className="bg-red-500 px-4 py-2 rounded-md shadow-2xl text-white font-bold"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassInfo;

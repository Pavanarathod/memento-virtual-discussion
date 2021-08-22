import { useParams } from "react-router-dom";
import ChatHeader from "../components/ChatHeader";
import ClassMembers from "../components/ClassMembers";

import useMembers from "../hooks/useMembers";
import "../styles/Custom.css";

const Members = () => {
  const { id } = useParams();
  const [members] = useMembers("class", id, "members");

  return (
    <div>
      <div className="">
        <div className="sticky top-0">
          <ChatHeader toLink={`/join/session/id/${id}`} />
        </div>
        <div className="custom__style overflow-y-scroll">
          <div className="mt-4">
            <h1 className="text-gray-900 font-extrabold text-2xl text-center">
              Members
            </h1>
          </div>
          <div className="w-3/4 ml-auto mr-auto mt-5">
            <div className=" space-y-3">
              {members.map((doc) => (
                <ClassMembers
                  key={doc.id}
                  delteId={doc.id}
                  image={doc.data?.memberImage}
                  name={doc.data?.memberName}
                  email={doc.data?.memberEmail}
                  userId={doc.data?.uuid}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;

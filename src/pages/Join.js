import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth } from "../firebase";
import useCheck from "../hooks/useCheck";

const { default: ChatRoom } = require("../components/ChatRoom");
const { default: JoinSession } = require("../components/JoinSession");

const Join = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);

  const [userExists] = useCheck("class", id, "members", user.uid);

  return (
    <div className="h-screen">
      <div>
        {userExists.length ? (
          <div>
            <ChatRoom />
          </div>
        ) : (
          <div>
            <JoinSession />
          </div>
        )}
      </div>
    </div>
  );
};

export default Join;

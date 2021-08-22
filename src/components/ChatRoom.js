import Chat from "./Chat";
import ChatHeader from "./ChatHeader";
import MessageSender from "./MessageSender";
import "../styles/Custom.css";
import useDocs from "../hooks/useDocs";
import { useDispatch, useSelector } from "react-redux";
import {
  disableWebcam,
  selectRoomDa,
  selectWebcam,
} from "../features/roomSlice";
import { useEffect, useRef } from "react";
import WebCamComponent from "./WebCamComponent";
import CancelIcon from "@material-ui/icons/Cancel";
import CallIcon from "@material-ui/icons/Call";
import CloseIcon from "@material-ui/icons/Close";
import { useParams } from "react-router-dom";

const ChatRoom = () => {
  const { id } = useParams();
  const divRef = useRef(null);
  const dispatch = useDispatch();
  const rooms = useSelector(selectRoomDa);
  const web = useSelector(selectWebcam);
  const [messages, loading] = useDocs("class", id, "messages");

  useEffect(() => {
    divRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [rooms?.docId, loading]);

  const disable = () => {
    dispatch(disableWebcam());
  };

  return (
    <div className="h-screen flex flex-col  flex-[0.7] custom__style">
      <div className="sticky top-0">
        <ChatHeader toLink="/" />
      </div>

      {web && (
        <div className="absolute right-10 top-14 bg-gray-200 border border-gray-400 rounded-md shadow-2xl p-3">
          <div>
            <div className="flex justify-end p-3">
              <CloseIcon
                onClick={disable}
                className="bg-gray-100 text-black cursor-pointer"
              />
            </div>
          </div>

          <div>
            <WebCamComponent />
            <div>
              <div className="flex justify-center py-3 space-x-4">
                <div>
                  <CallIcon
                    className="text-green-700 cursor-pointer"
                    fontSize="large"
                  />
                </div>
                <div>
                  <CancelIcon
                    className="text-red-600 cursor-pointer"
                    fontSize="large"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white flex-1 custom__style">
        {messages.map((doc) => (
          <Chat
            key={doc.id}
            messageId={doc.id}
            userImage={doc.data?.userImage}
            message={doc.data?.message}
            username={doc.data?.username}
            image={doc.data?.messageImage}
            timestamp={doc.data?.timestamp}
            messageAudio={doc.data?.messageAudio}
            userId={doc.data?.userId}
          />
        ))}
        <div ref={divRef} className="pb-[200px]" />
      </div>
      <div className=" mb-3 bg-white px-5">
        <MessageSender divRef={divRef} />
      </div>
    </div>
  );
};

export default ChatRoom;

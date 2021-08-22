import {
  PhotographIcon,
  MicrophoneIcon,
  EmojiHappyIcon,
} from "@heroicons/react/solid";
import { useRef, useState } from "react";
import database, { auth, storage } from "../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "react-responsive-modal/styles.css";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import useRecorder from "../hooks/useRecorder";
import Picker from "emoji-picker-react";
import { useParams } from "react-router-dom";
import useClass from "../hooks/useClass";

const MessageSender = ({ divRef }) => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState("");
  const [showRecorder, setShowRecorder] = useState(false);
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  const [showEmoji, setShowEmoji] = useState(false);
  const [name] = useClass("class", id);

  const filePickerRef = useRef(null);
  const [imageToMessage, setImageToMessage] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setMessage(emojiObject);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    database
      .collection("class")
      .doc(id)
      .collection("messages")
      .add({
        username: user.displayName,
        userImage: user.photoURL,
        userId: user.uid,
        message: message,
        messageAudio: audioURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (imageToMessage) {
          const uploadTask = storage
            .ref(`messages/${doc.id}`)
            .putString(imageToMessage, "data_url");

          setImageToMessage(null);

          uploadTask.on(
            "STATE_CHANGED",
            null,
            (error) => alert(error.message),
            () => {
              storage
                .ref("messages")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  database
                    .collection("class")
                    .doc(id)
                    .collection("messages")
                    .doc(doc.id)
                    .set(
                      {
                        messageImage: url,
                      },
                      { merge: true }
                    );
                });
            }
          );
        }
      });

    divRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
    setMessage("");
  };

  const addImageToMessage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToMessage(readerEvent.target.result);
    };
  };

  return (
    <div>
      <div>
        {showRecorder && (
          <div className="w-24 border border-gray-400 bg-gray-100 h-20 m-3 absolute right-4 bottom-14 shadow-2xl rounded-lg">
            <div className="flex justify-center space-x-3 mt-7">
              <div>
                <PlayCircleOutlineIcon
                  onClick={startRecording}
                  className="text-green-500 cursor-pointer"
                />
              </div>
              <div>
                <HighlightOffIcon
                  onClick={stopRecording}
                  className="text-red-400 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {showEmoji && (
          <div className="w-24 border border-gray-400 bg-gray-100 h-20 m-3 absolute right-52 bottom-80 shadow-2xl rounded-lg">
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )}

        <div className="w-full">
          <div className="">
            <form className=" w-full flex items-center" onSubmit={sendMessage}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                className="w-full py-2 focus:outline-none border-2 rounded-sm text-[#4A154B] text-base font-semibold border-[#4A154B] p-2 placeholder-[#4A154B]"
                placeholder={`Message #${name?.name}`}
              />
              <input
                type="file"
                accept="image/gif, image/jpeg, image/png"
                id="file"
                onChange={addImageToMessage}
                ref={filePickerRef}
                className="hidden"
              />

              <div className="flex items-center space-x-2">
                <div>
                  <EmojiHappyIcon
                    onClick={() => setShowEmoji(!showEmoji)}
                    className="h-7 text-[#4A154B] cursor-pointer"
                  />
                </div>
                <label htmlFor="file" className="ml-1">
                  <PhotographIcon className="h-7 text-[#4A154B] cursor-pointer" />
                </label>

                <div>
                  <MicrophoneIcon
                    className="h-7 text-[#4A154B] cursor-pointer"
                    onClick={() => setShowRecorder(!showRecorder)}
                  />
                </div>
                <div>
                  <SendOutlinedIcon
                    onClick={sendMessage}
                    className="text-[#4A154B] cursor-pointer"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageSender;

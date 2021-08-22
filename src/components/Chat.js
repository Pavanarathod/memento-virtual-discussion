import * as timeago from "timeago.js";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
import Avatar from "../assets/avatar.png";
import { useParams } from "react-router-dom";
import "../styles/Custom.css";
import database, { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Chat = ({
  userImage,
  username,
  message,
  image,
  timestamp,
  messageAudio,
  messageId,
  userId,
}) => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [deleteModel, setDeleteModal] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const openModal = () => setDeleteModal(true);
  const closeModal = () => setDeleteModal(false);

  const deleteMessage = () => {
    database
      .collection("class")
      .doc(id)
      .collection("messages")
      .doc(messageId)
      .delete();
  };

  return (
    <div className="p-3">
      <div className="flex items-center cursor-pointer">
        {message && (
          <>
            {userImage ? (
              <img
                src={userImage}
                alt={username}
                className="h-[50px] w-10 object-contain rounded-md"
              />
            ) : (
              <img
                src={Avatar}
                alt=""
                className="h-[50px] w-10 object-contain rounded-md"
              />
            )}

            <div className="ml-4 flex flex-col" onClick={openModal}>
              <div className="flex items-center">
                <p className="text-base font-bold text-gray-900">{username}</p>
                <span className="text-sm text-gray-900 ml-5">
                  {timeago.format(new Date(timestamp?.toDate()))}
                </span>
              </div>
              <div>
                <p className="text-base font-medium text-gray-700">{message}</p>
              </div>
            </div>
          </>
        )}
      </div>
      {messageAudio && (
        <div className="flex mt-1">
          {userImage ? (
            <img
              src={userImage}
              alt={username}
              className="h-[50px] w-10 object-contain rounded-md"
            />
          ) : (
            <img
              src={Avatar}
              alt=""
              className="h-[50px] w-10 object-contain rounded-md"
            />
          )}

          <div className="ml-4 flex flex-col">
            <div className="flex items-center">
              <p className="text-base font-bold text-gray-900">{username}</p>
              <span className="text-sm text-gray-900 ml-5">
                {timeago.format(new Date(timestamp?.toDate()))}
              </span>
            </div>
            <div className="mt-3">
              <audio src={messageAudio} controls="controls" />
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="">
          {image && (
            <div className="pt-4 flex ">
              {userImage ? (
                <img
                  src={userImage}
                  alt={username}
                  className="h-[50px] w-10 object-contain rounded-md"
                />
              ) : (
                <img
                  src={Avatar}
                  alt=""
                  className="h-[50px] w-10 object-contain rounded-md"
                />
              )}
              <div className="ml-4 flex flex-col">
                <div className="flex items-center">
                  <p className="text-base font-bold text-gray-900">
                    {username}
                  </p>
                  <span className="text-sm text-gray-900 ml-5">
                    {timeago.format(new Date(timestamp?.toDate()))}
                  </span>
                </div>
                <div>
                  <p className="text-base font-medium text-gray-700">
                    {message}
                  </p>
                </div>
                <div className="mt-2 cursor-pointer bg-[#2B092B] rounded-lg shadow-2xl p-3">
                  <img
                    onClick={onOpenModal}
                    src={image}
                    alt=""
                    className=" h-52 w-52 object-contain"
                  />
                </div>
              </div>
            </div>
          )}

          <Modal open={open} onClose={onCloseModal} center>
            <div>
              <div>
                {image && (
                  <img
                    src={image}
                    alt=""
                    className="h-[700px] object-contain"
                  />
                )}

                {user.uid === userId && (
                  <div className=" flex justify-end">
                    <button
                      onClick={deleteMessage}
                      className=" px-5 py-2 focus:outline-none shadow-2xl bg-red-500 text-white"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Modal>

          {user.uid === userId && (
            <Modal open={deleteModel} onClose={closeModal} center>
              <div className="">
                <div>
                  {message && user.uid === userId && (
                    <div
                      style={{
                        backgroundColor: "#2B092B",
                        height: "30vh",
                        maxWidth: "100%",
                        padding: "2rem",
                      }}
                    >
                      <div>
                        <p className=" text-gray-300">
                          Are you sure that you wanna delete the message..? once
                          deleted can't be done again
                        </p>
                      </div>
                      <h1 className="text-white mt-3 text-lg">{message}</h1>

                      <div className=" flex justify-end">
                        <button
                          onClick={deleteMessage}
                          className=" px-5 py-2 focus:outline-none shadow-2xl bg-red-500 text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;

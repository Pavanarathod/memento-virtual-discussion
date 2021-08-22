import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import database, { auth } from "../firebase";
import firebase from "firebase";

const CustomModal = ({ open, close }) => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createClassSession = (e) => {
    e.preventDefault();
    if (!name) return alert("Please enter the name?");

    database
      .collection("class")
      .add({
        user: user.displayName,
        uuid: user.uid,
        profileImg: user.photoURL,
        name: name,
        description: description,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((error) => alert(error.message));

    setName("");
    setDescription("");
  };

  return (
    <div className="">
      <Modal open={open} onClose={close} center>
        <div>
          <div className="">
            <h1 className="text-2xl font-bold text-[#791984]">
              Enter the details of Session
            </h1>
            <p className="mt-3">
              First fill up the name of the class and the detailed description
              of the class
            </p>
          </div>
          <div className="px-4 mt-3">
            <form className="flex flex-col">
              <label className="p-1 mb-1 text-base text-gray-800">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="py-2 p-1 border border-[#791984] focus:ring-1 focus:ring-[#791984] focus:outline-none placeholder-[#791984] bg-transparent"
                type="text"
                placeholder="enter the name..."
              />
              <label className="p-1 mt-2 text-base text-gray-800">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="py-2 p-1 border focus:ring-1 focus:ring-[#791984] border-[#791984] focus:outline-none placeholder-[#791984] bg-transparent"
                name=""
                id=""
                cols="30"
                rows="5"
              ></textarea>

              <div
                className={` ${
                  name ? "bg-[#791984]" : "bg-white"
                }  mt-3 flex justify-center cursor-pointer`}
              >
                <button
                  onClick={createClassSession}
                  className="py-2 w-full text-white text-base focus:outline-none"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CustomModal;

import Logo from "../assets/LogoWhite1.png";

import useCollection from "../hooks/useCollection";
import { ArrowCircleLeftIcon, LinkIcon } from "@heroicons/react/solid";
import { Link, useParams } from "react-router-dom";
import database, { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
import { CopyToClipboard } from "react-copy-to-clipboard";

const JoinSession = () => {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [data] = useCollection("class", id);

  const joinLink = window.location.href;

  const joinMember = () => {
    database
      .collection("class")
      .doc(id)
      .collection("members")
      .add({
        memberName: user.displayName,
        memberImage: user.photoURL,
        memberEmail: user.email,
        uuid: user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="bg-[#2B092B] h-screen flex justify-center">
      <div className="w-[50%] h-[50vh] mt-20 bg-[#4A154B] top-0 p-3 shadow-2xl rounded-md">
        <div className="">
          <div className="flex justify-between cursor-pointer">
            <Link to="/">
              <ArrowCircleLeftIcon className="h-10 text-gray-400" />
            </Link>
            <img src={Logo} alt="" className="h-10" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-wider text-gray-100 text-center">
              {data.data?.name}
            </h1>
          </div>

          <div className="mt-5">
            <p className="text-center text-base text-gray-300">
              By: {data.data?.user}
            </p>
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={joinMember}
              className="py-2 px-14 bg-[#791984] text-gray-200 font-bold text-base shadow-2xl rounded-md focus:outline-none"
            >
              Join
            </button>
          </div>
          <div className="flex justify-center mt-10">
            <CopyToClipboard text={joinLink}>
              <button className="py-2 flex px-14 bg-[#791984] text-gray-200 font-bold text-base shadow-2xl rounded-md focus:outline-none">
                Get Link
                <span>
                  <LinkIcon className="h-7 ml-3 text-whites" />
                </span>
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinSession;

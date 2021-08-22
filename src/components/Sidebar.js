import { Avatar } from "@material-ui/core";
import Logo from "../assets/LogoWhite1.png";
import { PlusIcon } from "@heroicons/react/solid";
import ClassRooms from "./ClassRooms";
import "../styles/Custom.css";
import "react-responsive-modal/styles.css";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import CustomModal from "./CustomModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const createNewClass = () => {
    onOpenModal(true);
  };
  const [data] = useFetch("class");

  return (
    <div className="w-full">
      <div className="sticky top-0">
        <div className="p-2 bg-[#791984] flex justify-start border border-gray-800">
          <Link to="/">
            <img src={Logo} alt="" className="h-10" />
          </Link>
        </div>
        <div className="p-2 shadow-2xl bg-[#4A154B] mt-2">
          <div className="flex justify-between">
            <Link to="/profile">
              <div className="flex items-center">
                <Avatar src={user.photoURL} className=" cursor-pointer" />
                <h1 className="text-base font-extrabold text-gray-300 ml-2">
                  {user.displayName}
                </h1>
              </div>
            </Link>

            <div className="flex items-center">
              <p className="mr-2">🟢</p>
              <p className="text-base font-extrabold text-gray-300">Active</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-2 shadow-lg bg-[#4A154B]">
          <div
            onClick={createNewClass}
            className="flex items-center cursor-pointer"
          >
            <p className="mr-2 text-base font-bold text-gray-400">Create</p>
            <PlusIcon className="h-10 bg-gray-300 rounded-full" />
          </div>
        </div>
        <div>
          <CustomModal open={open} close={onCloseModal} />
        </div>
      </div>

      <div className="sidebar__section max-h-[70vh]">
        <div className="">
          {data?.map((doc) => (
            <ClassRooms key={doc.id} title={doc.data.name} id={doc.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

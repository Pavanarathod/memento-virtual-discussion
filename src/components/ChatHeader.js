import {
  ArrowCircleLeftIcon,
  UserGroupIcon,
  VideoCameraIcon,
  QuestionMarkCircleIcon,
  LinkIcon,
} from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { enableWebcam } from "../features/roomSlice";
import useClass from "../hooks/useClass";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ChatHeader = ({ toLink }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [name] = useClass("class", id);

  const joinLink = window.location.href;

  const openWebCam = () => {
    dispatch(enableWebcam());
  };
  return (
    <div className="bg-[#2B092B]">
      <div>
        <div className="flex justify-between items-center p-3">
          <div className="flex items-center">
            <div>
              <Link to={toLink}>
                <ArrowCircleLeftIcon className="h-7 text-gray-200 cursor-pointer hover:text-white" />
              </Link>
            </div>
            <div className="ml-4">
              <h1 className="text-gray-200 font-semibold text-base">
                {name?.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-7">
            <div>
              <CopyToClipboard text={joinLink}>
                <LinkIcon className="h-7 text-gray-200 cursor-pointer hover:text-white" />
              </CopyToClipboard>
            </div>
            <div>
              <Link to={`/members/mem/${id}`}>
                <UserGroupIcon className="h-7 text-gray-200 cursor-pointer hover:text-white" />
              </Link>
            </div>
            <div>
              <VideoCameraIcon
                onClick={openWebCam}
                className="h-7 text-gray-200 cursor-pointer hover:text-white"
              />
            </div>
            <div>
              <Link to={`/classInfo/${id}`}>
                <QuestionMarkCircleIcon className="h-7 text-gray-200 cursor-pointer hover:text-white" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;

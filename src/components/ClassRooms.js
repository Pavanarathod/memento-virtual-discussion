import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getRoomData } from "../features/roomSlice";

const ClassRooms = ({ title, id }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const getRoomId = () => {
    dispatch(
      getRoomData({
        docId: id,
        name: title,
      })
    );

    history.push(`/join/session/id/${id}`);
  };

  return (
    <div onClick={getRoomId}>
      <div className="flex items-center py-2 hover:bg-blue-700 cursor-pointer ml-10">
        <div className=" px-4">
          <p className="text-4xl text-gray-400 hover:text-white italic">#</p>
        </div>
        <div className="ml-2">
          <h1 className="text-lg font-semibold text-gray-100 ">{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default ClassRooms;

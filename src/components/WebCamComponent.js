import { useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};
const WebCamComponent = () => {
  const webcamRef = useRef(null);
  return (
    <div>
      <>
        <Webcam
          audio={false}
          height={500}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={500}
          videoConstraints={videoConstraints}
        />
      </>
    </div>
  );
};

export default WebCamComponent;

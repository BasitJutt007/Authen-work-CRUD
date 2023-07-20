import React, {useState} from "react";
import MyFileUploader from "./Filepond";

const UploadButton = () => {
  const [showFileUpload, setShowFileUpload] = useState(false);

  const handleButtonClick = () => {
    setShowFileUpload(true);
  };

  const handleFileUpload = (file) => {
    // Handle the uploaded file here
    console.log("Uploaded file:", file);
    // You can perform additional actions with the uploaded file, such as sending it to the server

    // Reset the state to hide the FileUpload component
    setShowFileUpload(false);
  };

  return (
    <div>
      {!showFileUpload && (
        <button onClick={handleButtonClick}>Get Started</button>
      )}
      {showFileUpload && <MyFileUploader />}
    </div>
  );
};

export default UploadButton;

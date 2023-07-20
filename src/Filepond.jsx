import React, {useState, useRef, useEffect, createContext} from "react";
import {FilePond, registerPlugin} from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const MyFileUploader = () => {
  const [files, setFiles] = useState([]);
  const pond = useRef(null);

  useEffect(() => {
    if (pond.current) {
      console.log("FilePond instance has initialized", pond.current);
    }
  }, []);

  const handleInit = () => {
    console.log("FilePond instance has initialized");
  };

  const handleFileChange = (fileItems) => {
    setFiles(fileItems.map((fileItem) => fileItem.file));
  };
  const handleLocalUpload = async (file) => {
    const formData = new FormData();
    formData.append("filepond", file);

    try {
      const response = await fetch("http://localhost:8000/uploadToLocal", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("File successfully uploaded to local storage");
    } catch (error) {
      console.log(error);
    }
  };

  //File Upload to Cloudinary Method after storing in local storage
  const handleFileUpload = async () => {
    if (!files.length) {
      alert("No file selected!");
      return;
    }

    const file = files[0]; // Assuming there is only one file
    console.log("THIS IS FILE NAME IN REACT: ", file.name);

    try {
      // First, check if the file exists in local storage
      const checkResponse = await fetch(
        `http://localhost:8000/checkFile/${file.name}`
      );
      if (!checkResponse.ok) {
        throw new Error(`HTTP error! status: ${checkResponse.status}`);
      }

      const checkData = await checkResponse.json();
      if (!checkData.exists) {
        throw new Error("File not found in local storage");
      }

      // If the file exists, then upload it to Cloudinary
      const uploadResponse = await fetch(
        `http://localhost:8000/upload/${file.name}`,
        {
          method: "POST",
        }
      );

      if (!uploadResponse.ok) {
        throw new Error(`HTTP error! status: ${uploadResponse.status}`);
      }

      const uploadData = await uploadResponse.json();

      const {fileUrl} = uploadData;
      console.log("File uploaded to Cloudinary:", fileUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileRemove = async () => {
    try {
      if (!files.length) {
        console.log("No file to delete!");
        return;
      }

      const file = files[0];
      const response = await fetch(
        `http://localhost:8000/deleteFile/${file.name}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Clear the file from state
      setFiles([]);

      console.log("File successfully deleted from local storage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <FilePond
        ref={pond}
        // name="filepond"
        files={files}
        instantUpload={false}
        allowMultiple={true}
        allowReorder={true}
        maxFiles={3}
        server={{
          process: {
            url: "http://localhost:8000/uploadToLocal",
            method: "POST",
          },
        }}
        oninit={() => handleInit()}
        onupdatefiles={handleFileChange}
        onprocessfile={async (error, file) => {
          if (!error && file.serverId === 0) {
            await handleLocalUpload(file.file);
          }
          console.log("File uploaded to Local Storage: ", file.serverId);
        }}
      />
      <button onClick={handleFileUpload}>Proceed</button>
      <button onClick={handleFileRemove}>Delete</button>
    </div>
  );
};

export default MyFileUploader;

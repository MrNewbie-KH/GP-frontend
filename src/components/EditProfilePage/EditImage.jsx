import React, { useState } from "react";
import axios from "axios";
function EditImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token")
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    
    console.log(formData);
    try {
      const response = await axios.post(
        "https://e-learning-platform-uwoj.onrender.com/user/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:`Bearer ${token}`
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred.");
    }
  };
  return (
    <div className="add-image-button">
      <form encType="multipart/form-data">
        <label htmlFor="file-upload" className="custom-file-upload">
          <input id="file-upload" type="file" onChange={handleFileChange} />
        </label>
        <button className="add-button" type="button" onClick={handleUpload}>
          +
        </button>
      </form>
    </div>
  );
}
export default EditImage;

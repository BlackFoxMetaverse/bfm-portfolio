// components/ImageModal.js
import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
const ImageModal = ({ imageUrl, closeModal }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50">
      <div className="bg-white p-4 rounded-lg">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={closeModal}
        >
          <IoMdCloseCircleOutline className="w-12 h-12 text-white" />
        </button>
        <img src={imageUrl} alt="Preview" className="max-w-full max-h-screen" />
      </div>
    </div>
  );
};

export default ImageModal;

import React, { useState } from "react";
import { FaShare } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

const Navbar = ({ userData }) => {
  const [showModal, setShowModal] = useState(false);
  const uid = useSearchParams(window.location.search);

  async function handleShare() {
    try {
      if (navigator.canShare) {
        await navigator.share({
          title: document.title,
          text: "My Portfolio on BFM",
          url: window.location.href.split("?")[0],
        });
      } else {
        const url = window.location.href.split("?")[0];
        const el = document.createElement("textarea");
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
      window.alert(error?.message);
    }
  }

  return (
    <nav className="bg-black text-white">
      <div className="w-11/12 mx-auto flex justify-between py-2 pt-10 items-center">
        <img src="/white_fox.svg" alt="" className="aspect-video w-24" />
        {uid[0].toString() &&
          uid[0].get("uid").toString() === userData?.uid && (
            <div className="flex items-center gap-3">
              <button
                type="share"
                onClick={handleShare}
                className="w-full bg-white text-black px-5 font-semibold flex gap-2 justify-center items-center py-1 rounded-md"
              >
                Share
                <FaShare className="text-xs" />
              </button>
            </div>
          )}
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Link Copied Successfully
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        The link has been copied to your clipboard.
                      </p>
                      <p className="text-sm text-gray-500">
                        You can now paste it wherever you like.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

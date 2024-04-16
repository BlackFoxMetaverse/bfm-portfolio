import React from "react";
import { FaShare } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

const Navbar = ({ userData }) => {
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
    </nav>
  );
};

export default Navbar;

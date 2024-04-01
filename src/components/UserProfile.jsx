"use client";

import React, { useEffect, useState } from "react";
import {
  FaAngleRight,
  FaBehance,
  FaDribbble,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
  FaShare,
} from "react-icons/fa6";
import { BsStarFill } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";
import ImageModal from "./ImageModal";
import { getSellerProfile } from "../../utils/userData";

const SocialTypes = [
  {
    name: "LinkedIn",
    icon: <FaLinkedinIn />,
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
  },
  {
    name: "Behance",
    icon: <FaBehance />,
  },
  {
    name: "Dribble",
    icon: <FaDribbble />,
  },
  {
    name: "Github",
    icon: <FaGithub />,
  },
];

const ImageComponent = ({ src, alt, className, onClick }) => (
  <img
    loading="eager"
    src={src}
    alt={alt}
    onClick={onClick}
    className={className}
  />
);

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [showImage, setShowImage] = useState(true);
  const [modalImage, setModalImageUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openImageModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
  };

  const closeImageModal = () => {
    setModalImageUrl(null);
  };

  const uid = useSearchParams(window.location.search);

  useEffect(() => {
    const username = window.location.href.split("profile/")[1];
    getSellerProfile(username)
      .then((data) => setUserData(data?.data))
      .catch((err) => console.error(err));
  }, []);

  function getIconByName(name) {
    const socialType = SocialTypes.find(
      (social) => social.name.toLowerCase() === name?.toLowerCase()
    );
    return socialType ? socialType.icon : null;
  }

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
    <div
      id="userProfile"
      className="flex lg:flex-row flex-col w-11/12 justify-between max-w-[1920px] gap-14 py-5 mx-auto"
    >
      <div className="flex gap-7 xl:w-[40%] w-full items-start xl:sticky static inset-y-14 h-full">
        <div className="space-y-5 w-full">
          <div className="w-full flex flex-col overflow-hidden gap-8 rounded-lg justify-center bg-white p-7 items-center">
            <div className="w-full h-full items-start shrink-0 gap-[22.29px] flex">
              <div className="w-1/3 aspect-square rounded-2xl shrink-0 overflow-hidden relative bg-stone-300">
                <img
                  src={
                    userData?.image
                      ? userData?.image
                      : "https://i.pinimg.com/564x/70/dd/61/70dd612c65034b88ebf474a52ccc70c4.jpg"
                  }
                  alt=""
                  className="size-full object-cover shrink-0"
                />
              </div>
              <div className="flex-col w-2/3 justify-between h-full items-start 3xl:gap-2 gap-1 inline-flex">
                <div className="text-black 3xl:text-2xl 2xl:text-xl lg:text-lg text-lg font-bold whitespace-nowrap">
                  {userData?.name}
                </div>
                <div className="flex-col justify-start items-start gap-[4.68px] flex">
                  <div className="text-stone-500 3xl:text-lg 2xl:text-base text-sm font-normal">
                    {userData?.userName
                      ? userData?.userName
                      : window.location.href.split("profile/")[1]}
                  </div>
                  <div className="text-stone-500 3xl:text-lg 2xl:text-base text-sm font-normal">
                    {userData?.profession}
                  </div>
                </div>
                <div className="px-2 py-1 bg-black rounded-xl justify-center items-center gap-1 inline-flex">
                  <div className="text-white text-base font-normal whitespace-nowrap">
                    {userData?.city}
                  </div>
                  <IoLocationOutline className="text-white" />
                </div>
                <div className="justify-start items-start gap-2 inline-flex">
                  <BsStarFill className="w-[21.14px] h-[20.25px] text-orange-500 relative" />
                  <div className=" text-black text-base leading-normal">
                    {Number(userData?.rating?.value).toFixed(1)}
                  </div>
                  <div className=" text-black text-base leading-normal">
                    ({userData?.rating?.count})
                  </div>
                </div>
              </div>
            </div>
            {/* {showDetails && ( */}
            <div className="w-full flex-col justify-start items-start gap-7 flex">
              <div className="flex-col w-full justify-start items-start gap-0.5 flex">
                <div className="text-black text-xl font-bold">
                  Phones Number
                </div>
                <div className="text-stone-500 3xl:text-lg 2xl:text-base text-sm font-normal flex justify-between items-center w-full">
                  {userData?.phone_number}
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-0.5 flex">
                <div className="text-black text-xl font-bold">
                  Email Address
                </div>
                <div className="text-stone-500 3xl:text-lg 2xl:text-base text-sm font-normal">
                  {userData?.email}
                </div>
              </div>
              <div className="w-full text-3xl justify-start items-start gap-[18px] inline-flex">
                {userData?.socialMediaLinks?.map((link, index) => (
                  <Link to={link.link} key={index} className="text-black">
                    {getIconByName(link.platformType)}
                  </Link>
                ))}
              </div>
            </div>
            {/* )} */}
          </div>
          {uid[0].toString() &&
            uid[0].get("uid").toString() === userData?.uid && (
              <button
                type="share"
                onClick={handleShare}
                className="w-full bg-black text-white flex gap-2 justify-center items-center py-2 rounded-md"
              >
                Share
                <FaShare className="text-xs" />
              </button>
            )}
          <div className="space-y-5">
            {userData?.services.length > 0 && (
              <div className="space-y-2">
                <div className="max-w-[295px] text-stone-500 text-base font-normal leading-[27px]">
                  Service Provided
                </div>
                <div className="flex items-center flex-wrap gap-2">
                  {userData?.services?.map((service, index) => (
                    <div
                      key={index}
                      className="px-[12.95px] pt-[4.35px] pb-[3.52px] rounded-[20.03px] border border-stone-950 justify-center items-center inline-flex"
                    >
                      <p className="text-stone-950 text-sm leading-normal">
                        {service}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {userData?.skills.length > 0 && (
              <div className="space-y-2">
                <div className="max-w-[295px] text-stone-500 text-base font-normal leading-[27px]">
                  Skills
                </div>
                <div className="flex items-center flex-wrap gap-2">
                  {userData?.skills?.map((skill, index) => (
                    <div
                      key={index}
                      className="px-[12.95px] pt-[4.35px] pb-[3.52px] rounded-[20.03px] border border-stone-950 justify-center items-center inline-flex"
                    >
                      <p className="text-stone-950 text-sm leading-normal">
                        {skill}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded-xl w-full">
        {userData?.videos[0] ? (
          <video
            src={userData?.videos[0]}
            alt=""
            controls
            className="object-cover size-full rounded-xl"
            autoPlay
          />
        ) : null}
        <div>
          <h2 className="mt-8 w-full text-3xl font-bold text-neutral-800 max-md:max-w-full">
            About {userData?.userName}
          </h2>
          <p className="mt-2.5 w-full text-lg leading-7 text-neutral-600 max-md:max-w-full">
            {userData?.description}
          </p>
        </div>
        {/* Experience */}
        {userData?.experienceDetails.length > 0 && (
          <div className="flex-col justify-start items-start gap-2.5 mt-7 inline-flex">
            <div className="text-neutral-800 text-[32px] font-bold">
              Experience
            </div>
            <div className="flex-col justify-start items-start gap-5 w-full flex">
              {userData?.experienceDetails?.map((exp, index) => (
                <div
                  key={index}
                  className="px-[30px] py-5 rounded-[10px] border w-full border-zinc-300 flex-col justify-start items-start gap-2.5 flex"
                >
                  <div className="text-indigo-500 text-2xl leading-[27px]">
                    {exp?.title}
                  </div>
                  <div className="self-stretch text-neutral-600 text-lg font-normal leading-[27px]">
                    {exp?.content}
                  </div>
                  <Link
                    href={exp?.link}
                    target="_blank"
                    type="button"
                    className="px-7 py-2.5 rounded border border-black justify-center items-center gap-2.5 inline-flex"
                  >
                    <div className="text-black text-lg font-bold font-['Helvetica Neue'] leading-7">
                      Look At the Project
                    </div>
                    <FaAngleRight />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
        {showImage ? (
          <div
            style={{
              margin: 0,
            }}
            className="grid grid-cols-1 justify-center py-7 items-center w-full gap-2"
          >
            {userData?.videos?.slice(1)?.map((data, i) =>
              data ? (
                <div key={i} className={`relative`}>
                  <video
                    loading="lazy"
                    className="size-full cursor-pointer object-cover rounded-xl"
                    src={data}
                    alt=""
                    controls
                  />
                </div>
              ) : null
            )}
            {userData?.images?.map((data, i) =>
              data ? (
                <div key={i} className={`relative`}>
                  <ImageComponent
                    loading="lazy"
                    className="size-full cursor-pointer object-cover rounded-xl"
                    src={data}
                    alt=""
                    onClick={() => openImageModal(data)}
                  />
                </div>
              ) : null
            )}

            {modalImage && (
              <ImageModal imageUrl={modalImage} closeModal={closeImageModal} />
            )}
          </div>
        ) : null}
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
    </div>
  );
};

export default UserProfile;

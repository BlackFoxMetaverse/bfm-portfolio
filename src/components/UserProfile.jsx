"use client";

import React, { useEffect, useState } from "react";
import {
  FaAngleRight,
  FaBehance,
  FaDribbble,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaShare,
} from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useRoutes, useSearchParams } from "react-router-dom";
import ImageModal from "./ImageModal";
import { getSellerProfile } from "../../utils/userData";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
  const [modalImage, setModalImageUrl] = useState(null);
  const [showImage, setShowImage] = useState(true);

  const openImageModal = (imageUrl) => {
    setModalImageUrl(imageUrl);
  };

  const closeImageModal = () => {
    setModalImageUrl(null);
  };

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

  return (
    <div className="bg-black">
      <Navbar userData={userData} />
      <div
        id="userProfile"
        className="flex lg:flex-row flex-col justify-between max-w-[1920px] w-11/12 mx-auto gap-14 py-10 text-white"
      >
        <div className="flex gap-7 xl:w-[40%] w-full items-start lg:sticky static inset-y-10 h-full">
          <div className="space-y-5 w-full">
            <div className="w-full flex flex-col overflow-hidden gap-8 rounded-lg justify-center bg-[#E0FF00] p-7 items-center">
              <div className="w-full h-full items-start shrink-0 gap-[22.29px] flex">
                <div className="w-1/3 aspect-square rounded-2xl shrink-0 overflow-hidden relative bg-[#E0FF00]">
                  <img
                    src={
                      userData?.image ? userData?.image : "/default_male.svg"
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
                  <div className="rounded-xl justify-center items-center gap-1 inline-flex">
                    <div className="text-black text-base font-normal whitespace-nowrap">
                      {userData?.city}
                    </div>
                    <IoLocationOutline className="text-black" />
                  </div>
                </div>
              </div>
            </div>
            {/* {showDetails && ( */}
            <div className="w-full flex-col justify-start items-start gap-7 flex">
              <div className="flex-col w-full justify-start items-start gap-0.5 flex">
                <div className="text-xl font-bold">Phones Number</div>
                <div className="text-white/50 3xl:text-lg 2xl:text-base text-sm font-normal flex justify-between items-center w-full">
                  {userData?.phone_number}
                </div>
              </div>
              <div className="flex-col justify-start items-start gap-0.5 flex">
                <div className="text-xl font-bold">Email Address</div>
                <div className="text-white/50 3xl:text-lg 2xl:text-base text-sm font-normal">
                  {userData?.email}
                </div>
              </div>
              <div className="w-full text-3xl justify-start items-start gap-[18px] inline-flex">
                {userData?.socialMediaLinks?.map((link, index) => (
                  <Link to={link.link} key={index} className="text-white">
                    {getIconByName(link.platformType)}
                  </Link>
                ))}
              </div>
            </div>
            {/* )} */}
            <div className="space-y-5">
              {userData?.services.length > 0 && (
                <div className="space-y-2">
                  <div className="max-w-[295px] text-base font-normal leading-[27px]">
                    Service Provided
                  </div>
                  <div className="flex items-center flex-wrap gap-2">
                    {userData?.services?.map((service, index) => (
                      <div
                        key={index}
                        className="px-2 py-1 rounded-[20.03px] bg-[#2f4f90] justify-center items-center inline-flex"
                      >
                        <p className="text-sm leading-normal">{service}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {userData?.skills.length > 0 && (
                <div className="space-y-2">
                  <div className="max-w-[295px]  text-base font-normal leading-[27px]">
                    Skills
                  </div>
                  <div className="flex items-center flex-wrap gap-2">
                    {userData?.skills?.map((skill, index) => (
                      <div
                        key={index}
                        className="px-2 py-1 rounded-[20.03px] bg-red-500 justify-center items-center inline-flex"
                      >
                        <p className=" text-sm leading-normal">{skill}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-xl w-full">
          {userData?.images[0] === null ? null : userData?.images[0]?.endsWith(
              ".mp4" ||
                ".avi" ||
                ".wmv" ||
                ".mov" ||
                ".mkv" ||
                ".flv" ||
                ".webm" ||
                ".avchd"
            ) ? (
            <video
              src={userData?.images[0]}
              alt=""
              controls
              className="sm:object-contain object-cover sm:aspect-video size-full rounded-xl"
              autoPlay
            />
          ) : (
            <img
              src={userData?.images[0]}
              alt=""
              className="object-cover size-full rounded-xl"
            />
          )}
          <div>
            <h2 className="mt-8 w-full text-3xl font-bold max-md:max-w-full">
              About {userData?.userName}
            </h2>
            <p className="mt-2.5 w-full text-lg leading-7 max-md:max-w-full">
              {userData?.description}
            </p>
          </div>
          {/* Experience */}
          {userData?.experienceDetails.length > 0 && (
            <div className="flex-col justify-start items-start gap-2.5 mt-7 inline-flex">
              <div className="text-[32px] font-bold">Experience</div>
              <div className="flex-col justify-start items-start gap-5 w-full flex">
                {userData?.experienceDetails?.map((exp, index) => (
                  <div
                    key={index}
                    className="px-[30px] py-5 rounded-[10px] border w-full border-zinc-300 flex-col justify-start items-start gap-2.5 flex"
                  >
                    <div className="text-indigo-500 text-2xl leading-[27px]">
                      {exp?.title}
                    </div>
                    <div className="self-stretch text-lg font-normal leading-[27px]">
                      {exp?.content}
                    </div>
                    <Link
                      to={exp?.link}
                      target="_blank"
                      type="button"
                      className="px-7 py-2.5 rounded border border-white justify-center items-center gap-2.5 inline-flex"
                    >
                      <div className="text-lg font-bold font-['Helvetica Neue'] leading-7">
                        Look At the Project
                      </div>
                      <FaAngleRight />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          {userData?.images !== null ? (
            <div
              style={{
                margin: 0,
              }}
              className="grid grid-cols-1 justify-center py-7 items-center w-full gap-2"
            >
              {userData?.images
                ?.slice(1, userData?.images?.length)
                ?.map((data, i) =>
                  data ? (
                    data?.endsWith(
                      ".mp4" ||
                        ".avi" ||
                        ".wmv" ||
                        ".mov" ||
                        ".mkv" ||
                        ".flv" ||
                        ".webm" ||
                        ".avchd"
                    ) ? (
                      <video
                        src={data}
                        key={i}
                        alt=""
                        controls
                        className="sm:object-contain object-cover sm:aspect-video size-full rounded-xl"
                      />
                    ) : (
                      <div key={i} className={`relative`}>
                        <ImageComponent
                          loading="lazy"
                          className="size-full cursor-pointer object-cover rounded"
                          src={data}
                          alt=""
                          onClick={() => openImageModal(data)}
                        />
                      </div>
                    )
                  ) : null
                )}

              {modalImage && (
                <ImageModal
                  imageUrl={modalImage}
                  closeModal={closeImageModal}
                />
              )}
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;

import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const socials = [
  {
    icon: <FaLinkedinIn />,
    link: "",
  },
  {
    icon: <FaInstagram />,
    link: "",
  },
  {
    icon: <FaTwitter />,
    link: "",
  },
];

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="w-11/12 mx-auto py-10 pt-10 border-t-2 border-white/50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <p className="text-white/50 m-0">Designed and Style By</p>
          <img src="/white_fox.svg" alt="" className="aspect-video w-20" />
        </div>
        <div className="flex gap-4 items-center">
          {socials?.map((social, index) => (
            <Link
              to={social.link}
              target="_blank"
              key={index}
              className="border-white/50 border-2 rounded-full p-2"
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

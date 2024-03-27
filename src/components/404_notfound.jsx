"use client";

import React from "react";

function BackButton({ children }) {
  return (
    <button
      onClick={() => window.history.back()}
      className="justify-center px-8 py-3.5 mt-12 text-lg leading-5 text-white capitalize whitespace-nowrap bg-indigo-500 rounded font-[450] max-md:px-5 max-md:mt-10"
    >
      {children}
    </button>
  );
}

function NotFound() {
  return (
    <main className="flex flex-col justify-center h-screen w-full items-center pb-12 bg-white">
      <header>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/abe696ef62399b74a44851969264d94578bec58efabf7e1c0a1f3bf48fb72bb3?apiKey=91ddce01d5c046adbb0d93d1184c8d50&"
          alt="Page Not Found"
          className="mt-48 max-w-full aspect-[1.96] w-[454px] max-md:mt-10"
        />
      </header>
      <section>
        <h1 className="mt-16 text-5xl whitespace-nowrap text-center text-slate-800 max-md:mt-10 max-md:text-4xl">
          Oh No! Error 404
        </h1>
        <p className="mt-6 text-2xl font-light text-center text-gray-400 max-w-[538px] max-md:max-w-full">
          Oops! That page seems to have taken a detour. Let us guide you back to
          your destination.
        </p>
      </section>
      <footer>
        <BackButton>Back</BackButton>
      </footer>
    </main>
  );
}

export default NotFound;

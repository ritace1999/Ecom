import React from "react";
import styles from "@/styles/layout.module.css";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-blue-400 container">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 h-4/5 grid lg:grid-cols-2">
        <div className={styles.imgStyle}>
          <div className={styles.imgBg}>
            <div className="mt-16 text-center cursor-default font-black text-cyan-600	 ">
              <h1 className="text-6xl pb-2">WELCOME TO</h1>
              <h1 className="text-3xl pb-2 animate-pulse ">ACE BAZZAR</h1>
              <p className="text-2xl ">IT IS JUST MORE THAN SALES </p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="text-center py-6 ">{children}</div>
        </div>
      </div>
    </div>
  );
}

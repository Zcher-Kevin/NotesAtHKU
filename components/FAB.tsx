"use client";

import { REPO } from "@/constants";
import { AnimatePresence, motion } from "framer-motion";
import { PenLine, X } from "lucide-react";
import { useState } from "react";
import styles from "./FAB.module.css";
import Giscus from "./Giscus";

export default function FAB({
  currentCourseCode,
}: {
  currentCourseCode: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleView = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`${styles.overlay} dark:bg-black bg-white`}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-0 right-0 z-40 flex flex-col w-full p-4 pt-12 text-center lg:text-right lg:p-12 lg:w-2/5"
            >
              <p className="mb-2 text-xl font-semibold">
                Suggest changes for {currentCourseCode}
              </p>
              <div className="w-full h-[1px] bg-gray-500 mb-12" />
              <Giscus courseCode={currentCourseCode} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpen && (
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 10 }}
            onClick={() =>
              window.open(
                REPO + `/tree/master/content/notes/${currentCourseCode}`,
                "_blank"
              )
            }
            className="fixed z-50 flex px-4 py-3 text-white bg-black rounded-full dark:bg-white dark:text-black bottom-28 lg:bottom-32 right-4 lg:right-8"
          >
            <PenLine size={20} className="mr-2" />
            <span>Edit note on Github</span>
          </motion.button>
        )}
      </AnimatePresence>
      <motion.button
        whileTap={{ scale: 0.8 }}
        className="fixed z-50 p-4 bg-black rounded-full shadow-lg lg:p-6 dark:bg-white bottom-4 right-4 lg:bottom-8 lg:right-8"
        onClick={toggleView}
      >
        {isOpen ? (
          <X
            size={28}
            className="text-white scale-80 dark:text-black lg:scale-100"
          />
        ) : (
          <PenLine
            size={28}
            className="text-white scale-80 dark:text-black lg:scale-100"
          />
        )}
      </motion.button>
    </>
  );
}

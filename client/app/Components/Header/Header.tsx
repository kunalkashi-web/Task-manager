"use client";

import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import { github } from "@/utils/Icons";
import MiniSidebar from "../MiniSidebar/MiniSidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Header() {
  const { user } = useUserContext();
  const { openModalForAdd, activeTasks } = useTasks();
  const router = useRouter();
  const { logoutUser } = useUserContext();
  const { name } = user;
  const userId = user._id;

  return (
    <header className="relative px-4 md:px-6 py-4 w-full bg-[#f9f9f9]">
      <div className="md:hidden flex justify-between gap-2 mb-4">
        {userId && (
          <button
            className="mt-auto mb-6 py-2 px-8 bg-[#EB4E31] text-white rounded-[50px] hover:bg-[#3aafae] transition duration-200 ease-in-out"
            onClick={logoutUser}
          >
            Sign Out
          </button>
        )}
        <div className="flex justify-between gap-2 mb-4">
          <Link
            href="https://github.com/kunalkashi-web/Task-manager"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[36px] w-[36px] text-purple-500 rounded-full flex items-center justify-center text-lg border border-[#E6E6E6]"
          >
            {github}
          </Link>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 items-start">
        <div className="flex flex-col items-start text-left">
          <h1 className="text-lg font-medium">
            <span role="img" aria-label="wave">
              👋
            </span>{" "}
            {userId ? `Welcome, ${name}!` : "Welcome to Task manager"}
          </h1>
          <p className="text-sm ml-2">
            {userId ? (
              <>
                You have{" "}
                <span className="font-bold text-[#3aafae]">
                  {activeTasks.length}
                </span>{" "}
                active tasks
              </>
            ) : (
              "Please login or register to view your tasks"
            )}
          </p>
        </div>

        <div className="w-full md:w-auto flex flex-col sm:flex-row sm:items-center gap-4 md:gap-[10rem]">
          <button
            className="w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 lg:px-8 py-3 bg-[#3aafae] text-white rounded-[50px]
              hover:bg-[#00A1F1] transition-all duration-200 ease-in-out"
            onClick={() => {
              if (userId) {
                openModalForAdd();
              } else {
                router.push("/login");
              }
            }}
          >
            {userId ? "Add a new Task" : "Login / Register"}
          </button>
          <div className="block sm:hidden w-full">
            <MiniSidebar />
          </div>
          {/* Icons (Visible only on md+ screens) */}
          <div className="hidden md:flex gap-3 items-center">
            <Link
              href="https://github.com/kunalkashi-web/Task-manager"
              target="_blank"
              rel="noopener noreferrer"
              className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border border-[#E6E6E6]"
            >
              {github}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

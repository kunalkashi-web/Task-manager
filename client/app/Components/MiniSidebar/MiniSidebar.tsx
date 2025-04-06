"use client";
import IconCheck from "@/public/icons/IconCheck";
import IconDeleteAll from "@/public/icons/IconDeleteAll";
import IconFileCheck from "@/public/icons/IconFileCheck";
import IconGrid from "@/public/icons/IconGrid";
import IconStopwatch from "@/public/icons/IconStopwatch";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useTasks } from "@/context/taskContext";

function MiniSidebar() {
  const pathname = usePathname();
  const { deleteAllTasks } = useTasks();

  const handleDeleteAll = () => {
    const confirmed = confirm("Are you sure you want to delete ALL tasks?");
    if (confirmed) {
      deleteAllTasks();
    }
  };

  const getStrokeColor = (link: string) => {
    return pathname === link ? "#3aafae" : "#71717a";
  };

  const navItems = [
    {
      icon: <IconGrid strokeColor={getStrokeColor("/")} />,
      title: "All",
      link: "/",
    },
    {
      icon: <IconFileCheck strokeColor={getStrokeColor("/completed")} />,
      title: "Completed",
      link: "/completed",
    },
    {
      icon: <IconCheck strokeColor={getStrokeColor("/pending")} />,
      title: "Pending",
      link: "/pending",
    },
    {
      icon: <IconStopwatch strokeColor={getStrokeColor("/overdue")} />,
      title: "Overdue",
      link: "/overdue",
    },
  ];
  return (
    <div className="w-full flex bg-[#f9f9f9] sm:basis-[5rem] sm:flex-col sm:pt-8 sm:px-4">
      <div className="flex w-full justify-between items-center px-4 sm:flex-col sm:justify-between sm:items-center sm:mt-8">
        <ul className="flex w-full justify-evenly sm:flex-col sm:gap-10 sm:items-center">
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <Link href={item.link}>{item.icon}</Link>

              {/* Hover Tooltip - only on desktop */}
              <span className="hidden sm:block u-triangle absolute top-[50%] translate-y-[-50%] left-8 text-xs pointer-events-none text-white bg-[#3aafae] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.title}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 sm:mt-14 mb-4 sm:mb-[1.5rem] flex justify-center sm:justify-start">
          <button
            onClick={handleDeleteAll}
            className="w-12 h-12 flex justify-center items-center border-2 border-[#EB4E31] p-2 rounded-full"
          >
            <IconDeleteAll strokeColor="#EB4E31" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MiniSidebar;

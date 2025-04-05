import { useTasks } from "@/context/taskContext";
import { edit, star, trash } from "@/utils/Icons";
import { Task } from "@/utils/types";
import { formatTime } from "@/utils/utilities";
import React from "react";
import { motion } from "framer-motion";
import { item } from "@/utils/animations";

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-red-500";
    }
  };

  const { getTask, openModalForEdit, deleteTask } = useTasks();

  return (
    <motion.div
      className="min-h-[12rem] sm:min-h-[14rem] md:min-h-[16rem] p-4 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white transition-all"
      variants={item}
    >
      {/* Task Title & Description */}
      <div className="overflow-hidden">
        <h4 className="font-bold text-lg sm:text-xl md:text-2xl break-words">
          {task.title}
        </h4>
        <p className="text-sm sm:text-base break-words">{task.description}</p>
      </div>

      {/* Footer: Date / Priority / Actions */}
      <div className="mt-auto flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-4">
        <p className="text-xs sm:text-sm text-gray-400">
          {formatTime(task.createdAt)}
        </p>
        <p
          className={`text-sm font-semibold ${getPriorityColor(task.priority)}`}
        >
          {task.priority}
        </p>
        <div className="flex items-center gap-3 text-gray-400 text-[1.2rem]">
          <button
            className={`${
              task.completed ? "text-yellow-400" : "text-gray-400"
            }`}
          >
            {star}
          </button>
          <button
            className="text-[#00A1F1]"
            onClick={() => {
              getTask(task._id);
              openModalForEdit(task);
            }}
          >
            {edit}
          </button>
          <button
            className="text-[#F65314]"
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            {trash}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default TaskItem;

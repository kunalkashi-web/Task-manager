"use client";
import { useTasks } from "@/context/taskContext";
import useDetectOutside from "@/hooks/useDetectOutside";
import React, { useEffect } from "react";

function Modal() {
  const {
    task,
    handleInput,
    createTask,
    isEditing,
    closeModal,
    modalMode,
    activeTask,
    updateTask,
  } = useTasks();
  const ref = React.useRef(null);

  useDetectOutside({
    ref,
    callback: () => {
      if (isEditing) {
        closeModal();
      }
    },
  });

  useEffect(() => {
    if (modalMode === "edit" && activeTask) {
      handleInput("setTask")(activeTask);
    }
  }, [modalMode, activeTask]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (modalMode === "edit") {
      updateTask(task);
    } else if (modalMode === "add") {
      createTask(task);
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4 sm:px-6">
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-xl p-5 sm:p-6 md:p-8 flex flex-col gap-4"
      >
        <h2 className="text-xl font-semibold text-center mb-2">
          {modalMode === "edit" ? "Edit Task" : "New Task"}
        </h2>

        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            className="bg-gray-100 p-2 rounded-md border"
            type="text"
            id="title"
            name="title"
            placeholder="Task Title"
            value={task.title}
            onChange={(e) => handleInput("title")(e)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            className="bg-gray-100 p-2 rounded-md border resize-none"
            id="description"
            name="description"
            placeholder="Task Description"
            rows={4}
            value={task.description}
            onChange={(e) => handleInput("description")(e)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="priority">Priority</label>
          <select
            className="bg-gray-100 p-2 rounded-md border cursor-pointer"
            id="priority"
            name="priority"
            value={task.priority}
            onChange={(e) => handleInput("priority")(e)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="dueDate">Due Date</label>
          <input
            className="bg-gray-100 p-2 rounded-md border"
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={(e) => handleInput("dueDate")(e)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="completed">Completed</label>
          <select
            className="bg-gray-100 p-2 rounded-md border cursor-pointer"
            id="completed"
            name="completed"
            value={task.completed ? "true" : "false"}
            onChange={(e) => handleInput("completed")(e)}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white transition duration-200 ${
              modalMode === "edit" ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {modalMode === "edit" ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Modal;

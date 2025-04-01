import React, { useState, useEffect } from "react";
import {
  FaRegFileAlt,
  FaCheck,
  FaPlus,
  FaBriefcase,
  FaBook,
  FaHeartbeat,
  FaUser,
  FaEllipsisH,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "motion/react";

const Card = ({
  data,
  priority,
  category,
  isCompleted,
  id,
  onRemove,
  onToggleComplete,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile devices on component mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get category icon based on category type
  const getCategoryIcon = () => {
    switch (category) {
      case "Personal":
        return <FaUser className="text-blue-400 text-xl" />;
      case "Work":
        return <FaBriefcase className="text-amber-400 text-xl" />;
      case "Study":
        return <FaBook className="text-purple-400 text-xl" />;
      case "Health":
        return <FaHeartbeat className="text-green-400 text-xl" />;
      case "Others":
        return <FaEllipsisH className="text-gray-400 text-xl" />;
      default:
        return <FaRegFileAlt className="text-gray-400 text-xl" />;
    }
  };

  // Get priority badge color
  const getPriorityColor = () => {
    switch (priority) {
      case "High":
        return "bg-red-900 text-red-100";
      case "Medium":
        return "bg-amber-900 text-amber-100";
      case "Low":
        return "bg-green-900 text-green-100";
      default:
        return "bg-gray-700 text-gray-100";
    }
  };

  return (
    <motion.div
      className={`relative w-full sm:w-80 h-auto rounded-xl p-4
        ${
          isCompleted
            ? "bg-green-800/20 border border-green-800/40"
            : "bg-zinc-900/60 border border-zinc-800/40"
        } 
        overflow-hidden text-white backdrop-blur-sm shadow-md`}
      drag={!isMobile}
      dragConstraints={
        !isMobile ? { left: 0, right: 0, top: 0, bottom: 0 } : false
      }
      dragElastic={!isMobile ? 0.5 : 0}
      whileDrag={!isMobile ? { scale: 1.03, zIndex: 10 } : {}}
      whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          {getCategoryIcon()}
          <span className="text-sm font-medium text-gray-300">{category}</span>
        </div>
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor()}`}
        >
          {priority}
        </span>
      </div>

      <div className="my-3 border-t border-zinc-800/50"></div>

      <p
        className={`text-sm leading-relaxed mb-8 text-gray-200 min-h-24
        ${isCompleted ? "line-through opacity-50" : ""}`}
      >
        {data}
      </p>

      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors duration-200"
          onClick={() => onToggleComplete(id)}
          aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
        >
          {isCompleted ? (
            <IoMdClose className="text-gray-300" />
          ) : (
            <FaCheck className="text-gray-300" />
          )}
        </button>
        <button
          className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-red-900 flex items-center justify-center transition-colors duration-200"
          onClick={() => onRemove(id)}
          aria-label="Remove task"
        >
          <IoMdClose className="text-gray-300" />
        </button>
      </div>

      {isCompleted && (
        <div className="absolute top-0 right-0 m-2">
          <FaCheck className="text-green-500 text-sm" />
        </div>
      )}
    </motion.div>
  );
};

const AddTaskForm = ({ onAddTask, onClose }) => {
  const [taskData, setTaskData] = useState({
    data: "",
    priority: "Medium",
    category: "Work",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskData.data.trim()) {
      onAddTask(taskData);
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.form
        className="bg-zinc-900 text-white p-6 rounded-xl w-full max-w-md border border-zinc-800/50"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-medium mb-6">New Task</h2>

        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-1">
            Description
          </label>
          <textarea
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 
              bg-zinc-800 border-none text-white text-sm resize-none"
            rows="3"
            placeholder="What needs to be done?"
            value={taskData.data}
            onChange={(e) => setTaskData({ ...taskData, data: e.target.value })}
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Priority</label>
            <select
              className="w-full p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500
                bg-zinc-800 border-none text-white text-sm"
              value={taskData.priority}
              onChange={(e) =>
                setTaskData({ ...taskData, priority: e.target.value })
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Category</label>
            <select
              className="w-full p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500
                bg-zinc-800 border-none text-white text-sm"
              value={taskData.category}
              onChange={(e) =>
                setTaskData({ ...taskData, category: e.target.value })
              }
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Study">Study</option>
              <option value="Health">Health</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 rounded-lg text-gray-300 hover:bg-zinc-800 transition-colors text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Add Task
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
};

const CategoryFilter = ({ activeFilter, onFilterChange }) => {
  const categories = [
    { id: "All", label: "All" },
    { id: "Personal", label: "Personal", icon: FaUser, color: "text-blue-400" },
    { id: "Work", label: "Work", icon: FaBriefcase, color: "text-amber-400" },
    { id: "Study", label: "Study", icon: FaBook, color: "text-purple-400" },
    {
      id: "Health",
      label: "Health",
      icon: FaHeartbeat,
      color: "text-green-400",
    },
    {
      id: "Others",
      label: "Others",
      icon: FaEllipsisH,
      color: "text-gray-400",
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => onFilterChange(category.id)}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors ${
              activeFilter === category.id
                ? "bg-zinc-800 text-white"
                : "bg-transparent text-gray-400 hover:bg-zinc-800/50"
            }`}
          >
            {category.icon && <Icon className={category.color} />}
            {category.label}
          </button>
        );
      })}
    </div>
  );
};

const App = () => {
  const initialCardData = [
    {
      id: 1,
      data: "Add tasks",
      priority: "Low",
      category: "Personal",
      isCompleted: false,
    },
  ];

  // Load tasks from localStorage or use initial data
  const [cardData, setCardData] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialCardData;
  });

  const [filter, setFilter] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [completedFilter, setCompletedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Save tasks to localStorage when they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(cardData));
  }, [cardData]);

  // Handle removing a task
  const handleRemove = (id) => {
    setCardData(cardData.filter((card) => card.id !== id));
  };

  // Handle toggling task completion
  const handleToggleComplete = (id) => {
    setCardData(
      cardData.map((card) =>
        card.id === id ? { ...card, isCompleted: !card.isCompleted } : card
      )
    );
  };

  // Handle adding a new task
  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      isCompleted: false,
    };
    setCardData([...cardData, newTask]);
  };

  // Filter tasks based on category, completion status, and search query
  const filteredCards = cardData.filter((card) => {
    const categoryMatch = filter === "All" || card.category === filter;
    const completionMatch =
      completedFilter === "All" ||
      (completedFilter === "Completed" && card.isCompleted) ||
      (completedFilter === "Active" && !card.isCompleted);
    const searchMatch =
      !searchQuery ||
      card.data.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && completionMatch && searchMatch;
  });

  return (
    <div className="w-full min-h-screen bg-zinc-950 overflow-x-hidden relative text-white">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black opacity-80 pointer-events-none"></div>

      {/* Main Container */}
      <div className="relative z-10 container mx-auto px-4 pb-20">
        {/* Header */}
        <header className="py-8 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-medium">Noteee</h1>
            <div className="flex items-center gap-4">
              <select
                className="px-3 py-2 rounded-lg bg-zinc-900 text-white text-sm border border-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={completedFilter}
                onChange={(e) => setCompletedFilter(e.target.value)}
              >
                <option value="All">All Tasks</option>
                <option value="Active">Active Only</option>
                <option value="Completed">Completed Only</option>
              </select>

              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md text-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowAddForm(true)}
              >
                <FaPlus size={12} /> New Task
              </motion.button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <CategoryFilter activeFilter={filter} onFilterChange={setFilter} />

            <div className="relative">
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full md:w-64 pl-4 pr-8 py-2 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  onClick={() => setSearchQuery("")}
                >
                  <IoMdClose />
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Task Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredCards.length > 0 ? (
            filteredCards.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                data={item.data}
                priority={item.priority}
                category={item.category}
                isCompleted={item.isCompleted}
                onRemove={handleRemove}
                onToggleComplete={handleToggleComplete}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="text-gray-500 mb-2 text-5xl">
                <FaRegFileAlt />
              </div>
              <p className="text-xl text-gray-400 mb-2">No tasks found</p>
              <p className="text-sm text-gray-500">
                {searchQuery
                  ? "Try changing your search query."
                  : "Add your first task to get started."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Task Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <AddTaskForm
            onAddTask={handleAddTask}
            onClose={() => setShowAddForm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

import { useState } from "react";

function Dashboard() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[500px]">

        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Task Manager
        </h1>

        <div className="flex gap-2 mb-6">

          <input
            type="text"
            placeholder="Enter Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 border p-3 rounded-lg"
          />

          <button
            onClick={addTask}
            className="bg-green-600 text-white px-5 rounded-lg"
          >
            Add
          </button>

        </div>

        <div>

          {tasks.map((t, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-3"
            >
              <p>{t}</p>

              <button
                onClick={() => deleteTask(index)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
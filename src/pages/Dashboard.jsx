import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const token = localStorage.getItem("token");

  // GET TASKS
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTasks(res.data);

    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // ADD TASK
  const addTask = async () => {
    if (!text) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        {
          text,
          priority,
          dueDate,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTasks([...tasks, res.data]);

      setText("");
      setPriority("Medium");
      setDueDate("");

      toast.success("Task Added");

    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // TOGGLE COMPLETE
  const toggleComplete = async (id) => {
    try {
      const task = tasks.find(
        (t) => t._id === id
      );

      const res = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        {
          completed: !task.completed,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTasks(
        tasks.map((t) =>
          t._id === id ? res.data : t
        )
      );

      toast.success("Task Updated");

    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // UPDATE TASK
  const updateTask = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        {
          text: editText,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTasks(
        tasks.map((task) =>
          task._id === id ? res.data : task
        )
      );

      setEditingId(null);
      setEditText("");

      toast.success("Task Updated");

    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTasks(
        tasks.filter(
          (task) => task._id !== id
        )
      );

      toast.success("Task Deleted");

    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-10 bg-gray-200 min-h-screen">

      <div className="max-w-2xl mx-auto bg-white p-5 rounded shadow">

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="bg-black text-white px-4 py-2 rounded mb-4"
        >
          Logout
        </button>

        <h1 className="text-3xl font-bold text-center mb-5">
          Task Manager
        </h1>

        <div className="flex gap-2 mb-5 flex-wrap">

          <input
            type="text"
            placeholder="Enter task"
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            className="border p-2 flex-1 rounded"
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
            className="border p-2 rounded"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
            className="border p-2 rounded"
          />

          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>

        </div>

        {tasks.map((task) => (

          <div
            key={task._id}
            className="flex justify-between items-center bg-gray-100 p-3 mb-3 rounded"
          >

            <div>

              {editingId === task._id ? (

                <input
                  type="text"
                  value={editText}
                  onChange={(e) =>
                    setEditText(e.target.value)
                  }
                  className="border p-1 rounded"
                />

              ) : (

                <>
                  <h2
                    className={
                      task.completed
                        ? "line-through text-gray-500 font-semibold"
                        : "font-semibold"
                    }
                  >
                    {task.text}
                  </h2>

                  <p className="text-sm text-gray-600">
                    Priority: {task.priority}
                  </p>

                  <p className="text-sm text-gray-600">
                    Due: {task.dueDate?.substring(0, 10)}
                  </p>
                </>

              )}

            </div>

            <div className="flex gap-2 flex-wrap">

              <button
                onClick={() =>
                  toggleComplete(task._id)
                }
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                {task.completed
                  ? "Undo"
                  : "Done"}
              </button>

              <button
                onClick={() => {
                  setEditingId(task._id);
                  setEditText(task.text);
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              {editingId === task._id && (
                <button
                  onClick={() =>
                    updateTask(task._id)
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
              )}

              <button
                onClick={() =>
                  deleteTask(task._id)
                }
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>
          </div>

        ))}
      </div>
    </div>
  );
}

export default Dashboard;
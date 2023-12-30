import { useContext, useState } from "react";
import { FaStopCircle } from "react-icons/fa";
import { RiTaskFill } from "react-icons/ri";
import { AuthContext } from "../../router/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const TaskNav = () => {
    const { user } = useContext(AuthContext);
    // console.log(user?.email);

    const [menuToggle, setMenuToggle] = useState(false);

    const [taskPriority, setTaskPriority] = useState();

    const handleTask = (e) => {
        e.preventDefault();
        const form = e.target;
        const taskName = form.taskName.value;
        const taskDescription = form.taskDescription.value;
        const taskDeadline = form.taskDeadline.value;
        const email = user?.email;

        // console.log(taskName, taskPriority);
        const taskData = {
            email,
            taskName,
            taskPriority,
            taskDeadline,
            taskDescription,
        };
        console.log(taskData);

        fetch("http://localhost:2900/taskData", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(taskData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.insertedId) {
                    toast.success("Successfully added task");
                }

                form.reset();
            });
    };

    const [hoverText, setHoverText] = useState(false);

    const handleHoverTextMouseOver = () => {
        setHoverText(true);
    };
    const handleHoverTextMouseOut = () => {
        setHoverText(false);
    };

    return (
        <div className="bg-slate-100 pt-10 h-screen">
            <div className="flex justify-around items-center mb-2">
                <div className="bg-slate-100 text-center text-2xl font-semibold">
                    Tasks
                </div>
                <button onClick={() => setMenuToggle(!menuToggle)}>
                    <RiTaskFill
                        onMouseOver={handleHoverTextMouseOver}
                        onMouseOut={handleHoverTextMouseOut}
                        className="text-2xl font-bold border-[2px] text-text-800 border-teal-800 p-[1px] drop-shadow-md"
                    />
                </button>

                {hoverText && (
                    <div className="absolute left-40 top-[90px] bg-teal-800 text-white text-xs px-2 py-1 rounded-br-md rounded-tr-md rounded-tl-md">
                        <p>Add Task</p>
                    </div>
                )}

                {menuToggle ? (
                    <form
                        onSubmit={handleTask}
                        className="card-body absolute bg-slate-700 top-36 left-40 rounded-md"
                    >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">
                                    Task Name
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="Task Name"
                                name="taskName"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">
                                    Task description
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="Task Description"
                                name="taskDescription"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">
                                    Deadline
                                </span>
                            </label>
                            <input
                                type="date"
                                placeholder="Task Deadline"
                                name="taskDeadline"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="">
                            <label className="label">
                                <span className="label-text text-white">
                                    Task Priority
                                </span>
                            </label>
                            <div className="flex justify-start space-x-10">
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text mr-5 text-white">
                                            High
                                        </span>
                                        <input
                                            onChange={(e) =>
                                                setTaskPriority(e.target.value)
                                            }
                                            type="radio"
                                            name="taskPriority"
                                            value="high"
                                            className="radio  radio-sm "
                                        />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text text-white">
                                            Medium
                                        </span>
                                        <input
                                            onChange={(e) =>
                                                setTaskPriority(e.target.value)
                                            }
                                            type="radio"
                                            name="taskPriority"
                                            value="medium"
                                            className="ml-5 radio radio-sm "
                                        />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text text-white">
                                            Low
                                        </span>
                                        <input
                                            onChange={(e) =>
                                                setTaskPriority(e.target.value)
                                            }
                                            type="radio"
                                            name="taskPriority"
                                            value="low"
                                            className="ml-5 radio radio-sm "
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-control ">
                            <button className="bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700">
                                Add Task
                            </button>
                        </div>
                    </form>
                ) : (
                    ""
                )}
            </div>
            <div className="ml-10 space-y-2">
                <div className="flex items-center">
                    <FaStopCircle className="text-red-600" />
                    <p className="ml-3 text-sm">High</p>
                </div>
                <div className="flex items-center">
                    <FaStopCircle className="text-yellow-500" />
                    <p className="ml-3 text-sm">Medium</p>
                </div>
                <div className="flex items-center">
                    <FaStopCircle className="text-green-500" />
                    <p className="ml-3 text-sm">Low</p>
                </div>
            </div>
            <div className="flex justify-center mt-2">
                <div className="border-2 border-teal-800 w-full "></div>
            </div>
            <div className="ml-10 mt-10">
                <Link to="/">
                    <li className="list-none border-2 px-3 py-1 w-20 text-center cursor-pointer border-teal-800">
                        Home
                    </li>
                </Link>
            </div>
        </div>
    );
};

export default TaskNav;

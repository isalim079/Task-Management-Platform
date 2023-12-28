/* eslint-disable no-unsafe-optional-chaining */
import { useContext, useEffect, useState } from "react";
import { RiTaskFill } from "react-icons/ri";
import { AuthContext } from "../../router/AuthProvider";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaStopCircle } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";


const TaskManagementDashboard = () => {
  const { user } = useContext(AuthContext);
  // console.log(user?.email);

  const [menuToggle, setMenuToggle] = useState(false);

  const [taskPriority, setTaskPriority] = useState();
  // console.log(taskPriority);

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

  const axiosPublic = useAxiosPublic();

  const [taskData, setTaskData] = useState([]);
  const [completedTaskData, setCompletedTaskData] = useState([]);

  console.log(taskData);

  useEffect(() => {
    axiosPublic
      .get("/taskData")
      .then((res) => setTaskData(res?.data))
      .catch((error) => console.log("fetching error", error));
  }, [axiosPublic]);
  // console.log(taskData);

  const handleCompleteTick = (id) => {
    // console.log(id);

    const selectedTask = taskData?.find((tasks) => tasks?._id === id);
    const { email, taskDeadline, taskDescription, taskName, taskPriority } =
      selectedTask;

    const taskDataBase = {
      email,
      taskName,
      taskPriority,
      taskDeadline,
      taskDescription,
    };
    // console.log(taskDataBase);

    axiosPublic
      ?.post("/completedTaskData", taskDataBase)
      .then((res) => {
        console.log(res?.data);
        if (res?.data?.insertedId) {
          axiosPublic
            ?.delete(`/taskData/${id}`)
            .then((res) => {
              if (res?.data?.deletedCount > 0) {
                setTaskData(
                  taskData?.filter((findTask) => findTask?._id !== id)
                );
                toast.success("Task completed");
              }
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axiosPublic
      .get("/completedTaskData")
      .then((res) => setCompletedTaskData(res?.data))
      .catch((error) => console.log("fetching error", error));
  }, [axiosPublic]);
  // console.log(completedTaskData);

  const handleDragDrop = (result) => {
    // console.log("clicked eh", result);
    const { source, destination, type } = result;
    if (!destination) {
      return;
    }
    if (
      source?.droppableId === destination?.droppableId &&
      source?.index === destination?.index
    ) {
      return;
    }
    if (type === "group") {
      const reorderOngoingTask = [...taskData];
      // console.log(reorderOngoingTask);
      const sourceIndex = source?.index;
      const destinationIndex = destination?.index;
      const [removeStore] = reorderOngoingTask?.splice(sourceIndex, 1);
      reorderOngoingTask.splice(destinationIndex, 0, removeStore);
      return setTaskData(reorderOngoingTask);
    }
  };

  return (
    <div>
      <div className="pr-5">
        <div className="grid grid-cols-8 gap-5 h-screen">
          {/* 1st column section */}
          <div className="bg-slate-100 pt-10">
            <div className="flex justify-around items-center mb-2">
              <div className="bg-slate-100 text-center text-2xl font-semibold">
                Tasks
              </div>
              <button onClick={() => setMenuToggle(!menuToggle)}>
                <RiTaskFill className="text-2xl font-bold border-[2px] text-text-800 border-teal-800 p-[1px]" />
              </button>
              {menuToggle ? (
                <form
                  onSubmit={handleTask}
                  className="card-body absolute bg-slate-700 top-36 left-40 rounded-md"
                >
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Task Name</span>
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
                      <span className="label-text text-white">Deadline</span>
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
                            onChange={(e) => setTaskPriority(e.target.value)}
                            type="radio"
                            name="taskPriority"
                            value="high"
                            className="radio  radio-sm "
                          />
                        </label>
                      </div>
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text text-white">Medium</span>
                          <input
                            onChange={(e) => setTaskPriority(e.target.value)}
                            type="radio"
                            name="taskPriority"
                            value="medium"
                            className="ml-5 radio radio-sm "
                          />
                        </label>
                      </div>
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text text-white">Low</span>
                          <input
                            onChange={(e) => setTaskPriority(e.target.value)}
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
            <div className="ml-5 space-y-2">
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
          </div>
          {/* 2nd column section */}

          <div className="col-span-7 mt-5">
            <div className="grid grid-cols-3 gap-5">
              {/* Ongoing priority */}
              <DragDropContext onDragEnd={handleDragDrop}>
                <div className="bg-slate-100 p-4 col-span-2">
                  <div className="flex justify-around items-center mb-4">
                    <h1 className="text-center text-xl font-semibold">
                      Ongoing Task
                    </h1>
                  </div>
                  <Droppable droppableId="ongoingTask" type="group">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {taskData?.map((task, index) => (
                          <Draggable
                            draggableId={task?._id || `task-${index}`}
                            key={task?._id}
                            index={parseInt(index)}
                          >
                            {(provided) => (
                              <div
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                className="border-l-4 border-teal-900 bg-slate-200 p-2 mb-4 grid-cols-5 grid"
                              >
                                <div className="">
                                  <h3 className="font-semibold">
                                    {task?.taskName}
                                  </h3>
                                  <p>Task {index + 1}</p>
                                </div>
                                <div className="col-span-3 flex justify-center items-center">
                                  <p>{task?.taskDescription}</p>
                                </div>
                                <div className="flex justify-center items-center h-full gap-8">
                                  <div className="">
                                    {task?.taskPriority === "high" ? (
                                      <FaStopCircle className="text-2xl text-red-600" />
                                    ) : (
                                      ""
                                    )}
                                    {task?.taskPriority === "medium" ? (
                                      <FaStopCircle className="text-2xl text-yellow-500" />
                                    ) : (
                                      ""
                                    )}
                                    {task?.taskPriority === "low" ? (
                                      <FaStopCircle className="text-2xl text-green-500" />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div>
                                    <button
                                      onClick={() =>
                                        handleCompleteTick(task?._id)
                                      }
                                    >
                                      <TiTick className="text-2xl text-green-500" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </DragDropContext>
              {/* Medium Priority */}
              {/*  <div className="bg-slate-100 p-4 mb-4">
                                <div className="flex justify-around items-center mb-4">
                                    <h1 className="text-center text-xl font-semibold">
                                        Medium Priority
                                    </h1>
                                </div>
                                <div className="border-l-4 border-teal-900 bg-slate-200 p-2 mb-4">
                                    <h3 className="font-semibold">
                                        Implement Responsive Design for Landing
                                        Page
                                    </h3>
                                    <p>Task 1</p>
                                </div>
                                <div className="border-l-4 border-teal-900 bg-slate-200 p-2">
                                    <h3 className="font-semibold">
                                        Implement Responsive Design for Landing
                                        Page
                                    </h3>
                                    <p>Task 2</p>
                                </div>
                            </div> */}
              {/* Low Priority */}
              {/* <div className="bg-slate-100 p-4 mb-4">
                                <div className="flex justify-around items-center mb-4">
                                    <h1 className="text-center text-xl font-semibold">
                                        Low Priority
                                    </h1>
                                </div>
                                <div className="border-l-4 border-teal-900 bg-slate-200 p-2 mb-4">
                                    <h3 className="font-semibold">
                                        Implement Responsive Design for Landing
                                        Page
                                    </h3>
                                    <p>Task 1</p>
                                </div>
                                <div className="border-l-4 border-teal-900 bg-slate-200 p-2">
                                    <h3 className="font-semibold">
                                        Implement Responsive Design for Landing
                                        Page
                                    </h3>
                                    <p>Task 2</p>
                                </div>
                            </div> */}
              {/* Completed */}
              <div className="bg-slate-100 p-4">
                <div className="mb-4">
                  <h1 className="text-center text-xl font-semibold">
                    Completed Task
                  </h1>
                </div>
                <div>
                  {completedTaskData?.map((completedTask, index) => (
                    <div
                      key={completedTask?._id}
                      className="border-l-4 border-teal-900 bg-slate-200 p-2 mb-4"
                    >
                      <h3 className="font-semibold">
                        {completedTask?.taskName}
                      </h3>
                      <p>Task {index + 1}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagementDashboard;

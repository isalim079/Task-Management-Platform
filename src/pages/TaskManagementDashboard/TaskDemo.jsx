import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import CompletedTask from "./CompletedTask";
import OngoingTask from "./OngoingTask";
import TaskNav from "./TaskNav";

const TaskDemo = () => {
    const axiosPublic = useAxiosPublic();

    const [completedTask, setCompletedTask] = useState([]);
    const [incompleteTask, setIncompleteTask] = useState([]);

    // console.log(completedTask);
    // console.log(incompleteTask);

    useEffect(() => {
        axiosPublic.get("/taskList").then((res) => {
            const completedList = res?.data?.filter(
                (completeList) => completeList?.taskStatus === "completed"
            );
            setCompletedTask(completedList);
            const inCompletedList = res?.data?.filter(
                (inCompleteList) => inCompleteList?.taskStatus !== "completed"
            );
            setIncompleteTask(inCompletedList);
        });
    }, [axiosPublic]);

    return (
        <div className="grid grid-cols-8 h-screen gap-10">
            <div>
                <TaskNav />
            </div>
            {/* Task Container */}
            <div className="col-span-7">
                <div className="grid grid-cols-5 gap-5 mt-10 mr-10">
                    {/* Ongoing task */}
                    <div className="col-span-3 border h-96 overflow-auto p-4 border-teal-600">
                        <div>
                            <h1 className="text-center text-2xl font-semibold uppercase">
                                Ongoing
                            </h1>
                            {/* Underline */}
                            <div className="flex justify-center">
                                <div className="border-2 border-teal-900 w-52"></div>
                            </div>
                            {/* -------------- */}
                        </div>
                        {completedTask?.map((task, index) => (
                            <OngoingTask
                                key={task?._id}
                                task={task}
                                index={index}
                            />
                        ))}
                    </div>
                    {/* Completed task */}
                    <div className="col-span-2 border h-96 overflow-auto p-4 border-teal-600 ">
                        <CompletedTask />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDemo;

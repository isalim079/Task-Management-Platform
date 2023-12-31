/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import CompletedTask from "./CompletedTask";
import OngoingTask from "./OngoingTask";
import TaskNav from "./TaskNav";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

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

    const handleDragDrop = (result) => {
        console.log(result);
        const { destination, source } = result;
        if (!destination) {
            return;
        }
        if (
            source?.droppableId === destination?.droppableId &&
            source?.index === destination?.index
        ) {
            return;
        }

        if (destination.droppableId === "ongoing") {
            const reorderOngoingTask = [...incompleteTask];
            // console.log(reorderOngoingTask);
            const sourceIndex = source?.index;
            const destinationIndex = destination?.index;
            const [removeStore] = reorderOngoingTask?.splice(sourceIndex, 1);
            reorderOngoingTask.splice(destinationIndex, 0, removeStore);
            return setIncompleteTask(reorderOngoingTask);
        }
        if (destination.droppableId === "completed") {
            const reorderOngoingTask = [...completedTask];
            // console.log(reorderOngoingTask);
            const sourceIndex = source?.index;
            const destinationIndex = destination?.index;
            const [removeStore] = reorderOngoingTask?.splice(sourceIndex, 1);
            reorderOngoingTask.splice(destinationIndex, 0, removeStore);
            return setCompletedTask(reorderOngoingTask);
        }
        
    };

    return (
        <DragDropContext onDragEnd={handleDragDrop}>
            <div className="grid grid-cols-8 h-screen gap-10">
                <div>
                    <TaskNav />
                </div>
                {/* Task Container */}
                <div className="col-span-7">
                    <div className="grid grid-cols-5 gap-5 mt-10 mr-10">
                        {/* Ongoing task */}
                        <Droppable droppableId="ongoing" type="ongoing">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="col-span-3 border h-96 overflow-auto p-4 border-teal-600"
                                >
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
                                    {incompleteTask?.map((task, index) => (
                                        <OngoingTask
                                            key={task?._id}
                                            task={task}
                                            index={index}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        {/* Completed task */}
                        <Droppable droppableId="completed" type="completed">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="col-span-2 border h-96 overflow-auto p-4 border-teal-600 "
                                >
                                    <div>
                                        <h1 className="text-center text-2xl font-semibold uppercase">
                                            Completed
                                        </h1>
                                        {/* Underline */}
                                        <div className="flex justify-center">
                                            <div className="border-2 border-teal-900 w-52"></div>
                                        </div>
                                        {/* -------------- */}
                                    </div>
                                    {completedTask?.map((task, index) => (
                                        <CompletedTask
                                            key={task?._id}
                                            task={task}
                                            index={index}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            </div>
        </DragDropContext>
    );
};

export default TaskDemo;

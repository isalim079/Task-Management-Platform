/* eslint-disable react/prop-types */
const CompletedTask = ({ task, index }) => {
    return (
        <div className="grid grid-cols-8 ">
            <div className="mb-4 mt-4 bg-teal-100 p-3 border-l-4 border-teal-900 col-span-7">
                <h1>
                    <span className="font-semibold">Task Name:</span>{" "}
                    {task?.taskName}
                </h1>
                <p>
                    <span className="font-semibold">Description:</span>{" "}
                    {task?.taskDescription}
                </p>
                <p className="capitalize">
                    <span className="font-semibold">Priority:</span>{" "}
                    {task?.taskPriority}
                </p>
            </div>
            <div className="col-span-1 mt-4 bg-teal-100 mb-4 flex items-center justify-center">
                <p>#{index + 1}</p>
            </div>
        </div>
    );
};

export default CompletedTask;

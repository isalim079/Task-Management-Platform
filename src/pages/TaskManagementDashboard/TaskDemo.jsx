import TaskNav from "./TaskNav";


const TaskDemo = () => {
    return (
        <div className="grid grid-cols-8 h-screen">
            <div>
                <TaskNav />
            </div>
            {/* Task Container */}
            <div className="col-span-7">

            </div>
        </div>
    );
};

export default TaskDemo;
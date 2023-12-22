const TaskManagementDashboard = () => {
    return (
        <div>
            <div className="pr-5">
                <div className="grid grid-cols-8 gap-5 h-screen">
                    {/* 1st column section */}
                    <div className="bg-slate-100">
                        <div className="bg-slate-100 text-center pt-10 text-xl font-semibold">
                            Tasks
                        </div>
                        <div className="flex justify-center">
                            <div className="border-2 border-teal-800 w-1/2 "></div>
                        </div>
                    </div>
                    {/* 2nd column section */}
                    <div className="col-span-7 mt-5">
                        <div className="grid grid-cols-4 gap-5">
                            {/* High priority */}
                            <div className="bg-slate-100 p-4">
                                <div>
                                    <h1 className="text-center mb-4 text-xl font-semibold">
                                        High Priority
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
                            </div>
                            {/* Medium Priority */}
                            <div className="bg-slate-100 p-4">
                                <div>
                                    <h1 className="text-center mb-4 text-xl font-semibold">
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
                            </div>
                            {/* Low Priority */}
                            <div className="bg-slate-100 p-4">
                                <div>
                                    <h1 className="text-center mb-4 text-xl font-semibold">
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
                            </div>
                            {/* Completed */}
                            <div className="bg-slate-100 p-4">
                                <div>
                                    <h1 className="text-center mb-4 text-xl font-semibold">
                                        Completed
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskManagementDashboard;

const TopBanner = () => {


    return (
        <div className="bg-topBannerBackground bg-cover h-[calc(100vh-68px)]">
            <div className="bg-gradient-to-b from-black to-black/25 h-[calc(100vh-68px)]">
                <div className="flex justify-center items-center h-[calc(100vh-68px)]">
                    <div>
                        <h1 className="text-slate-100 font-bold uppercase text-5xl">
                            Your ultimate task manager
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBanner;

const ChannelStatistics = () => {
    let ratingRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className="bg-white mt-4 p-4">
            <h2 className="font-bold text-center text-2xl">Statistics</h2>
            <hr></hr>
            <div className="flex">
                <div className="basis-1/2 p-4">
                    <div>
                        {ratingRange.map((value) => {
                            return (
                                <div
                                    className="w-100 flex justify-center items-center mt-2"
                                    key={value}
                                >
                                    <span className="w-1/12">{value}:</span>
                                    <div className="bg-slate-300 w-11/12 text-center">
                                        <p>0</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="basis-1/2 p-4">
                    <p>Recent Reviews:</p>
                </div>
            </div>
        </div>
    );
};

export default ChannelStatistics;

interface stats {
    channels: number;
    tags: number;
    users: number;
    reviews: number;
}

const Statistics = ({ channels, tags, users, reviews }: stats) => {
    return (
        <div className="bg-white mt-4 p-2">
            <div className="flex flex-col">
                <h2 className="font-bold text-2xl text-center">Statistics</h2>
                <hr></hr>
                <p>Channels: {channels}</p>
                <p>Tags: {tags}</p>
                <p>Users: {users}</p>
                <p>Reviews: {reviews}</p>
            </div>
        </div>
    );
};

export default Statistics;

interface stats {
    channels: number;
    tags: number;
    users: number;
    reviews: number;
}

const Statistics = ({ channels, tags, users, reviews }: stats) => {
    return (
        <div className="bg-white p-4 h-full">
            <div>
                <h2 className="font-bold text-2xl text-center">Statistics</h2>
                <hr></hr>
                <p className="mt-4">Channels: {channels}</p>
                <p className="mt-4">Tags: {tags}</p>
                <p className="mt-4">Users: {users}</p>
                <p className="mt-4">Reviews: {reviews}</p>
            </div>
        </div>
    );
};

export default Statistics;

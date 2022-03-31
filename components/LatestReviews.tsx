interface reviewData {
    _id: string;
    channelid: {
        _id: string;
        name: string;
    };
    raterid: {
        username: string;
        _id: string;
    };
    rating: number;
    review: string;
}

interface Props {
    reviews: reviewData[];
}

const LatestReviews = ({ reviews }: Props) => {
    return (
        <div className="h-full bg-white p-4">
            <h2 className="text-center font-bold text-2xl">Latest Reviews</h2>
            <hr></hr>
            {reviews.map((value) => {
                return (
                    <p key={value._id} className="mt-4">
                        {value.channelid.name} - {value.rating}/10
                    </p>
                );
            })}
        </div>
    );
};

export default LatestReviews;

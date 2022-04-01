import { Dispatch, SetStateAction, useEffect } from "react";

interface rater {
    _id: string;
    username: string;
}

interface rating {
    rating: number;
    _id: string;
    raterid: rater;
    date: string;
    review: string;
}

interface Props {
    review: rating;
    setShowReview: Dispatch<SetStateAction<Boolean>>;
}

const ReviewModal = ({ review, setShowReview }: Props) => {
    const exitReview = (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.preventDefault();
        setShowReview(false);
    };
    return (
        <div
            onClick={(e) => exitReview(e)}
            className="fixed w-full h-full bg-stone-900/75 top-0 left-0  flex flex-col justify-center items-center "
        >
            <div
                className="bg-white md:w-2/6 m-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4">
                    <p className="font-bold text-3xl">
                        {review.raterid.username}
                        {"'s"} review
                    </p>
                    <p>Rating: {review.rating}/10</p>
                </div>
                <hr className="mt-1 mb-4"></hr>
                <p className="p-4">{review.review}</p>
                <hr className="mt-4 mb-1"></hr>
                <p
                    className="float-right cursor-pointer text-red-600 font-bold mt-4 p-4"
                    onClick={(e) => setShowReview(false)}
                >
                    Close
                </p>
            </div>
        </div>
    );
};

export default ReviewModal;

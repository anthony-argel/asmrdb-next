import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

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
    api: string;
    id: string | string[] | undefined;
    loggedIn: Boolean;
    setShowReviewForm: Dispatch<SetStateAction<Boolean>>;
    userRating?: rating;
    requestRefresh: () => void;
}

const ReviewFormModal = ({
    api,
    id,
    loggedIn,
    setShowReviewForm,
    userRating,
    requestRefresh,
}: Props) => {
    const [rating, setRating] = useState<number>(-1);
    const [review, setReview] = useState<string>("");

    useEffect(() => {
        if (userRating) {
            setRating(userRating.rating);
            setReview(userRating.review);
        }
    }, [userRating]);

    function postReview(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (rating < 0 || rating > 10 || loggedIn === false) {
            return;
        }
        fetch(api + "/channelrating/" + id, {
            method: "POST",
            body: JSON.stringify({
                rating: rating,
                review: review,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            mode: "cors",
        }).then((res) => {
            if (res.ok) {
                requestRefresh();
                setShowReviewForm(false);
            }
        });
    }

    return (
        <div
            className="fixed w-full h-full bg-stone-900/75 top-0 left-0  flex flex-col justify-center items-center"
            onClick={(e) => setShowReviewForm(false)}
        >
            <div
                className="bg-white md:w-2/6 m-4 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <p
                    className="absolute text-4xl p-2 right-0 top-0 text-red-600 cursor-pointer"
                    onClick={(e) => setShowReviewForm(false)}
                >
                    <MdClose></MdClose>
                </p>
                <h2 className="p-4 text-center text-3xl">Review</h2>
                <hr></hr>
                <form
                    className="flex flex-col p-4"
                    onSubmit={(e) => postReview(e)}
                >
                    <label htmlFor="rating">Rating: (0-10)</label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        className="border p-2"
                        placeholder="0 - 10"
                        min={0}
                        max={10}
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                        required
                    ></input>
                    <label htmlFor="review">Review:</label>
                    <textarea
                        className="border p-2"
                        id="review"
                        name="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        rows={5}
                        placeholder="(optional)"
                    ></textarea>
                    <button
                        type="submit"
                        className="p-4 mt-4 bg-purple-600 text-white"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewFormModal;

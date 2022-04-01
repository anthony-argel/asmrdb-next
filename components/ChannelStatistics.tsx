import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { FaTrashAlt } from "react-icons/fa";
import ReviewModal from "./ReviewModal";
import ReviewFormModal from "./ReviewFormModal";
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
}

const ChannelStatistics = ({ api, id, loggedIn }: Props) => {
    const [latestReviews, setLatestReviews] = useState<rating[]>([]);
    const [highestNumTallies, setHighestNumTallies] = useState<number>(0);
    const [ratingsTally, setRatingsTally] = useState<number[]>([]);
    const [averageRating, setAverageRating] = useState<number>(0);
    const [numberOfRaters, setNumberOfRaters] = useState<number>(0);
    const [showReview, setShowReview] = useState<Boolean>(false);
    const [selectedReview, setSelectedReview] = useState<rating>();
    const [loggedInUserReview, setLoggedInUserReview] = useState<rating>();
    const [showReviewForm, setShowReviewForm] = useState<Boolean>(false);
    const [refresh, setRefresh] = useState<Boolean>(false);

    useEffect(() => {
        fetch(api + "/channel/" + id + "/all")
            .then((res) => {
                if (res.ok) return res.json();
            })
            .then((res) => {
                if (res) {
                    let reviews = res.ratings;
                    let avgRating = 0;
                    let newRatingsArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    let userId: string | null = "";
                    let foundUserRating = false;
                    if (loggedIn && localStorage.getItem("id")) {
                        userId = localStorage.getItem("id");
                    }
                    for (let i = 0; i < reviews.length; i++) {
                        if (userId === reviews[i].raterid._id) {
                            setLoggedInUserReview(reviews[i]);
                            foundUserRating = true;
                        }
                        avgRating += reviews[i].rating;
                        newRatingsArray[reviews[i].rating]++;
                    }
                    if (foundUserRating === false) {
                        setLoggedInUserReview(undefined);
                    }

                    let highestTallies = 0;
                    for (let j = 0; j < newRatingsArray.length; j++) {
                        if (highestTallies < newRatingsArray[j]) {
                            highestTallies = newRatingsArray[j];
                        }
                    }

                    setHighestNumTallies(highestTallies);

                    reviews.sort((a: rating, b: rating) => {
                        return (
                            DateTime.fromISO(b.date).toMillis() -
                            DateTime.fromISO(a.date).toMillis()
                        );
                    });
                    if (reviews.length > 10) {
                        setLatestReviews(reviews.slice(0, 10));
                    } else {
                        setLatestReviews(reviews);
                    }
                    setRatingsTally(newRatingsArray);
                    if (reviews.length > 0) {
                        setAverageRating(avgRating / reviews.length);
                    } else {
                        setAverageRating(0);
                    }
                    setNumberOfRaters(reviews.length);
                }
            });
    }, [api, id, loggedIn, refresh]);

    const requestRefresh = () => {
        setRefresh((prev) => !prev);
    };

    function selectReview(review: rating) {
        setSelectedReview(review);
        setShowReview(true);
    }

    function deleteReview() {
        fetch(api + "/channelrating/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            mode: "cors",
        }).then((res) => {
            if (res.ok) {
                requestRefresh();
            }
        });
    }

    return (
        <div className="bg-white mt-4 p-4">
            {showReview && selectedReview ? (
                <ReviewModal
                    review={selectedReview}
                    setShowReview={setShowReview}
                ></ReviewModal>
            ) : null}
            {showReviewForm ? (
                <ReviewFormModal
                    api={api}
                    loggedIn={loggedIn}
                    id={id}
                    setShowReviewForm={setShowReviewForm}
                    userRating={
                        loggedInUserReview ? loggedInUserReview : undefined
                    }
                    requestRefresh={() => requestRefresh()}
                ></ReviewFormModal>
            ) : null}
            <h2 className="font-bold text-center text-2xl">Statistics</h2>
            <hr></hr>
            <div className="flex flex-col md:flex-row">
                <div className="basis-1/2 p-4">
                    <div>
                        {ratingsTally.map((value, index) => {
                            return (
                                <div
                                    className=" w-100 flex justify-center items-center mt-2"
                                    key={index}
                                >
                                    <span className="w-1/12">{index}:</span>
                                    <div className="bg-slate-300 w-11/12 text-center">
                                        <p
                                            className={`${
                                                value > 0
                                                    ? "w-[" +
                                                      (value /
                                                          highestNumTallies) *
                                                          1000 +
                                                      "%] text-white"
                                                    : "w-0 text-black ml-2"
                                            } bg-purple-600`}
                                        >
                                            {value}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="text-center">
                            <p>
                                Average Rating: {averageRating}/10{" "}
                                {"(# of ratings: " + numberOfRaters + ")"}
                            </p>
                            {loggedIn ? (
                                <p className=" mb-1 ">
                                    Your Rating:{" "}
                                    {loggedInUserReview &&
                                    loggedInUserReview.rating >= 0
                                        ? loggedInUserReview.rating
                                        : "-"}
                                    {loggedInUserReview &&
                                    loggedInUserReview.rating >= 0 ? (
                                        <span
                                            className=" ml-1 inline text-xl text-red-600 cursor-pointer"
                                            onClick={(e) => deleteReview()}
                                        >
                                            <FaTrashAlt className="inline"></FaTrashAlt>
                                        </span>
                                    ) : null}
                                </p>
                            ) : null}
                            {loggedIn &&
                            loggedInUserReview &&
                            loggedInUserReview.rating >= 0 ? (
                                <button
                                    className="text-white p-4 bg-purple-600"
                                    onClick={(e) => setShowReviewForm(true)}
                                >
                                    Edit Rating
                                </button>
                            ) : (
                                <button
                                    className="text-white p-4 bg-purple-600"
                                    onClick={(e) => setShowReviewForm(true)}
                                >
                                    Add Rating
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="basis-1/2 p-4">
                    <p>Recent Reviews:</p>
                    <div className="flex">
                        {latestReviews.length <= 0
                            ? null
                            : latestReviews.map((value) => {
                                  return (
                                      <div
                                          key={value._id}
                                          className="p-4 border m-2 basis-1/2 md:basis-1/3 cursor-pointer flex justify-around items-center"
                                          onClick={(e) => selectReview(value)}
                                      >
                                          <p className="text-blue-600 text-2xl">
                                              {value.raterid.username}
                                          </p>
                                          <p>
                                              {value.rating}
                                              /10
                                          </p>
                                      </div>
                                  );
                              })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChannelStatistics;

import { useEffect, useState } from "react";
import { DateTime } from "luxon";
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
}

const ChannelStatistics = ({ api, id }: Props) => {
    const [ratings, setRatings] = useState<rating[]>([]);
    const [reviews, setReviews] = useState<rating[]>([]);
    const [highestNumTallies, setHighestNumTallies] = useState<number>(0);
    const [ratingsTally, setRatingsTally] = useState<number[]>([]);
    const [averageRating, setAverageRating] = useState<number>(0);
    const [numberOfRaters, setNumberOfRaters] = useState<number>(0);

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
                    for (let i = 0; i < reviews.length; i++) {
                        avgRating += reviews[i].rating;
                        newRatingsArray[reviews[i].rating]++;
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
                        setReviews(reviews.slice(0, 10));
                    } else {
                        setReviews(reviews);
                    }
                    setRatingsTally(newRatingsArray);
                    setRatings(res.ratings);
                    if (reviews.length > 0) {
                        setAverageRating(avgRating / reviews.length);
                    }
                    setNumberOfRaters(reviews.length);
                }
            });
    }, [api, id]);

    return (
        <div className="bg-white mt-4 p-4">
            <h2 className="font-bold text-center text-2xl">Statistics</h2>
            <hr></hr>
            <div className="flex">
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
                                                      "%]"
                                                    : "w-0"
                                            } bg-emerald-200`}
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
                        </div>
                    </div>
                </div>
                <div className="basis-1/2 p-4">
                    <p>Recent Reviews:</p>
                    {ratings.length <= 0
                        ? null
                        : ratings.map((value) => {
                              return (
                                  <p key={value._id}>
                                      {value.raterid.username} - {value.rating}
                                      /10
                                  </p>
                              );
                          })}
                </div>
            </div>
        </div>
    );
};

export default ChannelStatistics;

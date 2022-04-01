import { useEffect, useState } from "react";
import { DateTime } from "luxon";

interface commentAuthor {
    _id: string;
    username: string;
}

interface commentData {
    _id: string;
    authorid: commentAuthor;
    comment: string;
    date: string;
}

interface Props {
    id: string | string[] | undefined;
    api: string;
}

const ChannelComments = ({ id, api }: Props) => {
    const [comments, setComments] = useState<commentData[]>([]);

    useEffect(() => {
        fetch(api + "/comment/" + id, {
            method: "GET",
            mode: "cors",
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                }
            })
            .then((res) => {
                setComments(res.comments);
            });
    }, [api, id]);

    return (
        <div className="mt-4 p-4 bg-white">
            <h2 className="text-center text-2xl font-bold">Comments</h2>
            <hr className="mb-4"></hr>

            <form>
                <textarea className="w-full border-2" rows={3}></textarea>
                <button className="text-white bg-emerald-900 p-3">
                    Submit
                </button>
            </form>
            {comments.length === 0 ? (
                <p>No comments</p>
            ) : (
                comments.map((value, index) => {
                    return (
                        <div key={value._id} className="">
                            <hr></hr>
                            <p>
                                <span className="font-bold text-xl">
                                    {value.authorid.username}
                                </span>{" "}
                                -{" "}
                                <span>
                                    {DateTime.fromISO(value.date).toFormat(
                                        "yyyy LLL dd"
                                    )}
                                </span>
                            </p>
                            <p>{value.comment}</p>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default ChannelComments;

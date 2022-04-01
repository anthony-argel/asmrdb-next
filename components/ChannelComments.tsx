import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { FaTrashAlt } from "react-icons/fa";

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
    loggedIn: Boolean;
}

const ChannelComments = ({ id, api, loggedIn }: Props) => {
    const [comments, setComments] = useState<commentData[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [refreshComments, setRefreshComments] = useState<Boolean>(false);
    const [userID, setUserID] = useState<string | null>("");

    useEffect(() => {
        if (loggedIn) {
            setUserID(localStorage.getItem("id"));
        }
    }, [loggedIn]);

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
    }, [api, id, refreshComments]);

    function submitComment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        fetch(api + "/comment", {
            method: "POST",
            body: JSON.stringify({ channelid: id, comment: newComment }),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            mode: "cors",
        }).then((res) => {
            if (res.ok) {
                setRefreshComments((prev) => !prev);
                setNewComment("");
            }
        });
    }

    function deleteComment(
        e: React.MouseEvent<SVGElement, MouseEvent>,
        commentid: string
    ) {
        e.preventDefault();
        fetch(api + "/comment", {
            method: "DELETE",
            body: JSON.stringify({
                authorid: userID,
                commentid: commentid,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            mode: "cors",
        }).then((res) => {
            if (res.ok) {
                setRefreshComments((prev) => !prev);
            }
        });
    }

    return (
        <div className="mt-4 p-4 bg-white">
            <h2 className="text-center text-2xl font-bold">Comments</h2>
            <hr className="mb-4"></hr>

            <form onSubmit={(e) => submitComment(e)}>
                <textarea
                    className="w-full border-2"
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <button className="text-white bg-emerald-900 p-3">
                    Submit
                </button>
            </form>
            {comments.length === 0 ? (
                <p>No comments</p>
            ) : (
                comments.map((value, index) => {
                    return (
                        <div key={value._id} className="mt-2 mb-2">
                            <hr></hr>
                            <p className="mb-2">
                                <span className="font-bold text-xl">
                                    {value.authorid.username}
                                </span>{" "}
                                -{" "}
                                <span>
                                    {DateTime.fromISO(value.date).toFormat(
                                        "yyyy LLL dd"
                                    )}
                                    {userID !== "" &&
                                    loggedIn &&
                                    value.authorid._id == userID ? (
                                        <FaTrashAlt
                                            className="text-red-600 text-xl inline cursor-pointer"
                                            onClick={(e) =>
                                                deleteComment(e, value._id)
                                            }
                                        ></FaTrashAlt>
                                    ) : null}
                                </span>
                            </p>
                            <p className="whitespace-pre-wrap">
                                {value.comment}
                            </p>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default ChannelComments;

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { DateTime } from "luxon";
import Link from "next/link";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";

interface threadData {
    _id: string;
    title: string;
    author: author;
    comment: string;
    date: string;
}

interface boardData {
    _id: string;
    name: string;
    description: string;
}

interface author {
    _id: string;
    username: string;
}

interface commentAuthor {
    _id: string | null;
    username: string;
}

interface commentData {
    _id: string | null;
    authorid: commentAuthor;
    author?: commentAuthor;
    comment: string | undefined;
    date: string;
}

interface Props {
    thread: threadData;
    comments: commentData[];
    api: string;
    loggedIn: boolean;
}

const Thread = ({ thread, comments, api, loggedIn }: Props) => {
    const [comment, setComment] = useState<string>();
    const [commentsState, setCommentsState] = useState<commentData[]>([
        ...comments,
    ]);
    const router = useRouter();
    const { id } = router.query;

    function deleteComment(
        e: React.MouseEvent<SVGElement, MouseEvent>,
        commentId: string | null
    ) {
        e.preventDefault();
        fetch(api + "/thread/" + id + "/comment/" + commentId, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then((res) => {
            if (res.ok) {
                let editedComments = [...commentsState];
                for (let i = 0; i < editedComments.length; i++) {
                    if (editedComments[i]._id === commentId) {
                        editedComments.splice(i, 1);
                        setCommentsState(editedComments);
                        return;
                    }
                }
            }
        });
    }

    function postComment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        fetch(api + "/thread/" + id + "/comment", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ comment: comment }),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then((res) => {
            if (res.ok) {
                let userData: commentData = {
                    _id: localStorage.getItem("id"),
                    comment: comment,
                    date: DateTime.now().toISO().toString(),
                    authorid: {
                        _id: localStorage.getItem("id"),
                        username: "(YOU)",
                    },
                };
                setCommentsState([...comments, userData]);
                setComment("");
            }
        });
    }

    return (
        <div className="bg-white p-4">
            <h1 className="font-bold text-3xl">{thread.title}</h1>
            <p>
                Posted by {thread.author.username} on{" "}
                {DateTime.fromISO(thread.date).toFormat("yyyy LLL dd")}
            </p>
            <p className="mt-2 mb-2 p-4 border whitespace-pre-wrap">
                {thread.comment}
            </p>
            <p className="text-center font-bold text-2xl">Comments</p>
            <form onSubmit={(e) => postComment(e)}>
                <textarea
                    className="border w-full p-2"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                ></textarea>

                <button className="text-white bg-emerald-900 p-3">
                    Submit
                </button>
            </form>
            {commentsState.map((value) => {
                return (
                    <div key={value._id} className="bg-gray-100 mt-2 mb-2 p-4">
                        <p>
                            Posted by{" "}
                            {value.authorid
                                ? value.authorid.username
                                : value.author && value.author.username}{" "}
                            on{" "}
                            {DateTime.fromISO(thread.date).toFormat(
                                "yyyy LLL dd"
                            )}{" "}
                            ID: {value._id}
                            {loggedIn ? (
                                (value.authorid &&
                                    value.authorid._id ===
                                        localStorage.getItem("id")) ||
                                (value.author &&
                                    value.author._id ===
                                        localStorage.getItem("id")) ? (
                                    <MdClose
                                        className="inline-block text-red-600 text-xl cursor-pointer"
                                        onClick={(e) =>
                                            deleteComment(e, value._id)
                                        }
                                    ></MdClose>
                                ) : null
                            ) : null}
                        </p>
                        <hr className="mt-2 mb-2 "></hr>
                        <p className="whitespace-pre-wrap">{value.comment}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default Thread;

export const getServerSideProps: GetServerSideProps = async (context) => {
    let thread: threadData | undefined = undefined;
    let comments: commentData[] = [];
    let id: string | undefined | string[] = context.params?.id;

    let url = "https://dry-hollows-28901.herokuapp.com/thread/" + id;
    await fetch(url)
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((res) => {
            if (res) {
                console.log(res);
                thread = res.threaddata;
                comments = res.comments;
            }
        });

    return {
        props: {
            thread: thread,
            comments: comments,
        },
    };
};

import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { MdClose } from "react-icons/md";

interface Props {
    setShowThreadModal: Dispatch<SetStateAction<Boolean>>;
    setWindowMessage: Dispatch<SetStateAction<string>>;
    boardId: string | string[] | undefined;
    api: string;
}

const ThreadModal = ({
    setShowThreadModal,
    boardId,
    api,
    setWindowMessage,
}: Props) => {
    const router = useRouter();
    const [title, setTitle] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [error, setError] = useState<Boolean>(false);

    function submitThread(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let requestData = {
            title: title,
            comment: comment,
            boardid: boardId,
        };
        fetch(api + "/thread", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(requestData),
            mode: "cors",
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    setError(true);
                }
            })
            .then((res) => {
                if (res) {
                    router.push("/thread/" + res.id);
                    setShowThreadModal(false);
                    setWindowMessage("Thread created!");
                }
            });
    }

    return (
        <>
            <div
                onClick={(e) => setShowThreadModal(false)}
                className="fixed w-full h-full bg-stone-900/75 z-50 top-0 left-0 flex flex-col justify-center items-center"
            >
                <div
                    className="bg-white max-w-[90%] w-11/12 md:w-2/6 m-4 relative text-black relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <p
                        className="absolute text-4xl p-2 right-0 top-0 text-red-600 cursor-pointer"
                        onClick={(e) => setShowThreadModal(false)}
                    >
                        <MdClose></MdClose>
                    </p>
                    <p className="font-bold text-2xl text-center p-4">
                        Create Thread
                    </p>
                    <hr></hr>
                    <form
                        className="flex flex-col p-4 gap-2"
                        onSubmit={(e) => submitThread(e)}
                    >
                        <label htmlFor="title">Title:</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={title}
                            className="border p-2"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        ></input>
                        <label htmlFor="comment">Comment:</label>
                        <textarea
                            id="comment"
                            name="comment"
                            value={comment}
                            className="border p-2"
                            placeholder="(Optional)"
                            onChange={(e) => setComment(e.target.value)}
                            rows={3}
                        ></textarea>

                        <button
                            type="submit"
                            className="p-3 bg-purple-600 text-white"
                        >
                            Create Thread
                        </button>

                        {error ? (
                            <p className="font-bold text-red-600">
                                Something went wrong while creating the thread.
                            </p>
                        ) : null}
                    </form>
                </div>
            </div>
        </>
    );
};

export default ThreadModal;

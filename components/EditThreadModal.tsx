import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { MdClose } from "react-icons/md";

interface Props {
    setShowThreadModal: Dispatch<SetStateAction<Boolean>>;
    setWindowMessage: Dispatch<SetStateAction<string>>;
    id: string | string[] | undefined;
    api: string;
    setThreadAuthorComment: Dispatch<SetStateAction<string>>;
}

const EditThreadModal = ({
    setShowThreadModal,
    id,
    api,
    setWindowMessage,
    setThreadAuthorComment,
}: Props) => {
    const [comment, setComment] = useState<string>("");
    const [error, setError] = useState<Boolean>(false);

    function updateOriginalThread(e: React.FormEvent<HTMLFormElement>) {
        fetch(api + "/thread/" + id, {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify({ comment: comment }),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then((res) => {
            if (res.ok) {
                setThreadAuthorComment(comment);
                setWindowMessage("Updated Post!");
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
                    className="bg-white md:w-2/6 m-4 relative text-black relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <p
                        className="absolute text-4xl p-2 right-0 top-0 text-red-600 cursor-pointer"
                        onClick={(e) => setShowThreadModal(false)}
                    >
                        <MdClose></MdClose>
                    </p>
                    <p className="font-bold text-2xl text-center p-4">
                        Edit Thread
                    </p>
                    <hr></hr>
                    <form
                        className="flex flex-col p-4 gap-2"
                        onSubmit={(e) => updateOriginalThread(e)}
                    >
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
                            Edit Thread
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

export default EditThreadModal;

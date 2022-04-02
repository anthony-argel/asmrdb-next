import React, { Dispatch, SetStateAction, useState } from "react";
import { MdClose } from "react-icons/md";
import MessageWindow from "./MessageWindow";

interface errorObj {
    msg: string;
    param: string;
}

interface Props {
    api: string;
    setShowTagModal: Dispatch<SetStateAction<Boolean>>;
    setWindowMessage: Dispatch<SetStateAction<string>>;
}

const AddTagModal = ({ api, setShowTagModal, setWindowMessage }: Props) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [reason, setReason] = useState<string>("");
    const [errors, setErrors] = useState<errorObj[]>([]);

    function submitRequest(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        fetch(api + "/tag", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                description: description,
                reason: reason,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            mode: "cors",
        })
            .then((res) => {
                if (res.ok) {
                    setShowTagModal(false);
                    setWindowMessage("Request Sent!");
                } else {
                    return res.json();
                }
            })
            .then((res) => {
                if (res) {
                    setErrors(res.errors.errors);
                }
            });
    }

    return (
        <div>
            <div
                onClick={(e) => setShowTagModal(false)}
                className="fixed w-full h-full bg-stone-900/75 z-50 top-0 left-0 flex flex-col justify-center items-center"
            >
                <div
                    className="bg-white md:w-2/6 m-4 relative text-black relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <p
                        className="absolute text-4xl p-2 right-0 top-0 text-red-600 cursor-pointer"
                        onClick={(e) => setShowTagModal(false)}
                    >
                        <MdClose></MdClose>
                    </p>
                    <p className="font-bold text-2xl text-center p-4">
                        Request Tag
                    </p>
                    <hr></hr>
                    <form
                        onSubmit={(e) => submitRequest(e)}
                        className="p-4 flex flex-col gap-2"
                    >
                        <label htmlFor="tagname">Name:</label>
                        <input
                            type="text"
                            id="tagname"
                            name="tagname"
                            className="border p-2"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            min={3}
                            max={40}
                        ></input>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            className="border p-2"
                            id="description"
                            name="description"
                            rows={5}
                            placeholder="(What does the tag encapsulate?)"
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            value={description}
                            minLength={3}
                            maxLength={200}
                        ></textarea>
                        <label htmlFor="reason">Reason for wanting tag:</label>
                        <textarea
                            className="border p-2"
                            id="reason"
                            name="reason"
                            rows={5}
                            placeholder="(optional)"
                            onChange={(e) => setReason(e.target.value)}
                            value={reason}
                        ></textarea>
                        <button
                            type="submit"
                            className="p-3 bg-purple-600 text-white"
                        >
                            Send Request
                        </button>
                        <ul className="text-red-600 font-bold">
                            {errors.length > 0
                                ? errors.map((value, index) => {
                                      return (
                                          <p key={index}>
                                              {value.param}: {value.msg}
                                          </p>
                                      );
                                  })
                                : null}
                        </ul>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTagModal;

import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { MdClose } from "react-icons/md";
import MessageWindow from "./MessageWindow";

interface errorObj {
    msg: string;
    param: string;
}

interface Props {
    api: string;
    setShowChannelModal: Dispatch<SetStateAction<Boolean>>;
    setWindowMessage: Dispatch<SetStateAction<string>>;
}

const AddChannelModal = ({
    api,
    setShowChannelModal,
    setWindowMessage,
}: Props) => {
    const router = useRouter();
    const [youtube, setYoutube] = useState<string>("");
    const [niconico, setNicoNico] = useState<string>("");
    const [twitter, setTwitter] = useState<string>("");
    const [errors, setErrors] = useState<Boolean>(false);
    const [aliases, setAliases] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("active");

    function addChannel(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let status = "Active";
        if (selectedStatus === "not active") {
            status = "Inactive";
        }
        fetch(api + "/channel", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                status,
                niconico,
                youtube,
                twitter,
                aliases,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                if (res.status !== 400) {
                    return res.json();
                } else {
                    setErrors(true);
                }
            })
            .then((res) => {
                if (res) {
                    setWindowMessage("Redirecting to channel.");
                    router.push("/channel/" + res.channelid[0]._id);
                    setShowChannelModal(false);
                }
            });
    }

    return (
        <div>
            <div
                onClick={(e) => setShowChannelModal(false)}
                className="fixed w-full h-full bg-stone-900/75 z-50 top-0 left-0 flex flex-col justify-center items-center"
            >
                <div
                    className="bg-white md:w-2/6 m-4 relative text-black relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <p
                        className="absolute text-4xl p-2 right-0 top-0 text-red-600 cursor-pointer"
                        onClick={(e) => setShowChannelModal(false)}
                    >
                        <MdClose></MdClose>
                    </p>
                    <p className="font-bold text-2xl text-center p-4">
                        Add Channel
                    </p>
                    <hr></hr>
                    <form
                        onSubmit={(e) => addChannel(e)}
                        className="p-4 flex flex-col gap-2"
                    >
                        <label htmlFor="youtube">YouTube URL:</label>
                        <div className="flex">
                            <p className="p-2 border bg-gray-200">
                                www.youtube.com/channel/
                            </p>
                            <input
                                type="text"
                                id="youtube"
                                name="youtube"
                                className="border p-2"
                                onChange={(e) => setYoutube(e.target.value)}
                                value={youtube}
                                required
                                min={0}
                                max={100}
                            ></input>
                        </div>
                        <label htmlFor="status">YouTube status:</label>
                        <div>
                            <select
                                id="status"
                                name="status"
                                value={selectedStatus}
                                className="p-2 bg-white border"
                                onChange={(e) =>
                                    setSelectedStatus(e.target.value)
                                }
                            >
                                <option key="active" value="active">
                                    active
                                </option>
                                <option key="not active" value="not active">
                                    not active
                                </option>
                            </select>
                        </div>
                        <hr></hr>
                        <p className="text-xl text-center font-bold">
                            Optional
                        </p>
                        <label htmlFor="twitter">Twitter:</label>
                        <div className="flex">
                            <span className="p-2 border bg-gray-200">@</span>
                            <input
                                type="text"
                                id="twitter"
                                name="twitter"
                                className="border p-2"
                                onChange={(e) => setTwitter(e.target.value)}
                                value={twitter}
                                min={0}
                                max={100}
                            ></input>
                        </div>
                        <label htmlFor="niconico">NicoNico:</label>
                        <div className="flex">
                            <span className="p-2 border bg-gray-200">
                                https://ch.nicovideo.jp/
                            </span>
                            <input
                                type="text"
                                id="niconico"
                                name="niconico"
                                className="border p-2"
                                onChange={(e) => setNicoNico(e.target.value)}
                                value={niconico}
                                min={0}
                                max={100}
                            ></input>
                        </div>
                        <label htmlFor="aliases">Aliases:</label>
                        <textarea
                            id="aliases"
                            name="aliases"
                            className="border p-2"
                            onChange={(e) => setAliases(e.target.value)}
                            value={aliases}
                            rows={3}
                            minLength={0}
                            maxLength={400}
                        ></textarea>
                        <button
                            type="submit"
                            className="p-3 bg-purple-600 text-white"
                        >
                            Add Channel
                        </button>
                        <ul className="text-red-600 font-bold text-center">
                            {errors ? (
                                <li>Something went wrong. Please try again.</li>
                            ) : null}
                        </ul>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddChannelModal;

import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { MdClose } from "react-icons/md";
import MessageWindow from "./MessageWindow";

interface tagData {
    _id: string;
    name: string;
}

interface channelData {
    status: string;
    _id: string;
    name: string;
    aliases: string;
    imageurl: string;
    youtube: string;
    twitter: string;
    lastytrefresh: string;
    viewcount: number;
    videocount: number;
    __v: number;
    startdate: string;
    tags: tagData[];
    niconico: string;
}

interface Props {
    api: string;
    setShowChannelModal: Dispatch<SetStateAction<Boolean>>;
    setWindowMessage: Dispatch<SetStateAction<string>>;
    editingChannel: Boolean;
    channel?: channelData;
    setChannelState?: Dispatch<SetStateAction<channelData>>;
}

const AddChannelModal = ({
    api,
    setShowChannelModal,
    setWindowMessage,
    editingChannel,
    channel,
    setChannelState,
}: Props) => {
    const router = useRouter();
    const [youtube, setYoutube] = useState<string>(
        channel ? channel.youtube : ""
    );
    const [niconico, setNicoNico] = useState<string>(
        channel && channel.niconico ? channel.niconico : ""
    );
    const [twitter, setTwitter] = useState<string>(
        channel && channel.twitter ? channel.twitter : ""
    );
    const [errors, setErrors] = useState<Boolean>(false);
    const [aliases, setAliases] = useState<string>(
        channel ? channel.aliases : ""
    );
    const [selectedStatus, setSelectedStatus] = useState<string>(
        channel && channel.status ? channel.status : "Active"
    );

    function processFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (editingChannel) {
            editChannel();
        } else {
            addChannel();
        }
    }

    function editChannel() {
        if (!channel) {
            return;
        }
        fetch(api + "/channel/" + channel._id, {
            method: "PUT",
            body: JSON.stringify({
                youtube: youtube,
                status: selectedStatus,
                niconico: niconico,
                twitter: twitter,
                aliases: aliases,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            mode: "cors",
        }).then((res) => {
            if (res.ok) {
                if (typeof setChannelState !== "undefined") {
                    let newChannel = channel;
                    newChannel.youtube = youtube;
                    newChannel.status = selectedStatus;
                    newChannel.niconico = niconico;
                    newChannel.twitter = twitter;
                    newChannel.aliases = aliases;
                    setChannelState(newChannel);
                }
                setWindowMessage("Channel Updated.");
                setShowChannelModal(false);
            }
        });
    }

    function addChannel() {
        fetch(api + "/channel", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                status: selectedStatus,
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
                        {editingChannel ? "Edit Channel" : "Add Channel"}
                    </p>
                    <hr></hr>
                    <form
                        onSubmit={(e) => processFormSubmit(e)}
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
                                <option key="Active" value="Active">
                                    Active
                                </option>
                                <option key="Inactive" value="Inactive">
                                    Inactive
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
                            {editingChannel ? "Edit Channel" : "Add Channel"}
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

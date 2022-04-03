import { FaTwitter, FaYoutube } from "react-icons/fa";
import { SiNiconico } from "react-icons/si";
import { AiOutlinePlus } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GoPencil } from "react-icons/go";
import TagModal from "./TagModal";
import AddChannelModal from "./AddChannelModal";
import MessageWindow from "./MessageWindow";

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

interface tagData {
    _id: string;
    name: string;
}

interface Props {
    channel: channelData;
    api: string;
    loggedIn: boolean;
    id: string | string[] | undefined;
    imgsize: string;
    infosize: string;
    allTags?: tagData[] | undefined;
    allowTagEditing: Boolean;
}

const ChannelInfo = ({
    channel,
    api,
    loggedIn,
    id,
    imgsize,
    infosize,
    allTags,
    allowTagEditing,
}: Props) => {
    const [tags, setTags] = useState<tagData[]>([...channel.tags]);
    const [showTagMenu, setShowTagMenu] = useState<Boolean>(false);
    const [showChannelMenu, setShowChannelMenu] = useState<Boolean>(false);
    const [windowMessage, setWindowMessage] = useState<string>("");
    const [channelState, setChannelState] = useState(channel);

    return (
        <div className="flex flex-col md:flex-row bg-white p-4">
            <div className={imgsize}>
                <Link href={"/channel/" + channel._id}>
                    <a>
                        <Image
                            src={channel.imageurl}
                            className=""
                            layout="responsive"
                            alt=""
                            width={1}
                            height={1}
                        ></Image>
                    </a>
                </Link>
            </div>
            <div
                className={`${infosize} p-4 flex flex-col justify-between gap-2`}
            >
                {windowMessage !== "" ? (
                    <MessageWindow
                        message={windowMessage}
                        setWindowMessage={setWindowMessage}
                    ></MessageWindow>
                ) : null}
                {allowTagEditing && loggedIn && showChannelMenu && channel ? (
                    <AddChannelModal
                        api={api}
                        setShowChannelModal={setShowChannelMenu}
                        setWindowMessage={setWindowMessage}
                        editingChannel={true}
                        channel={channel}
                        setChannelState={setChannelState}
                    ></AddChannelModal>
                ) : null}
                {allowTagEditing &&
                loggedIn &&
                showTagMenu &&
                typeof allTags !== "undefined" ? (
                    <TagModal
                        tags={tags}
                        api={api}
                        loggedIn={loggedIn}
                        id={id}
                        setShowTagMenu={setShowTagMenu}
                        allTags={allTags}
                        setTags={setTags}
                        allowTagEditing={true}
                    ></TagModal>
                ) : null}
                <div className="leading-9">
                    <div className="flex  items-center">
                        <h1 className="font-bold text-3xl">
                            <Link href={"/channel/" + channel._id}>
                                <a>{channel.name}</a>
                            </Link>
                        </h1>
                        {loggedIn && allowTagEditing ? (
                            <span
                                className="inline-block ml-2 text-blue-600 bg-gray-200 p-1 cursor-pointer"
                                onClick={(e) => setShowChannelMenu(true)}
                            >
                                Edit?
                            </span>
                        ) : null}
                    </div>
                    <h2 className="">Aliases: {channel.aliases}</h2>
                    <hr></hr>
                    <div>
                        <p>Status: {channel.status}</p>
                        <p>Channel Views: {channel.viewcount}</p>
                        <p>Videos: {channel.videocount}</p>
                        <div className="flex">
                            {channel.twitter && channel.twitter != "" ? (
                                <a
                                    href={
                                        "https://twitter.com/" + channel.twitter
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaTwitter
                                        className="text-3xl"
                                        color="#0d6efd"
                                    ></FaTwitter>
                                </a>
                            ) : null}
                            {channel.youtube && channel.youtube != "" ? (
                                <a
                                    href={
                                        "https://www.youtube.com/channel/" +
                                        channel.youtube
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaYoutube
                                        className="text-3xl"
                                        color="red"
                                    ></FaYoutube>
                                </a>
                            ) : null}
                            {channel.niconico && channel.niconico != "" ? (
                                <a
                                    href={
                                        "https://ch.nicovideo.jp/" +
                                        channel.niconico
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <SiNiconico
                                        className="text-3xl"
                                        color="gray"
                                    ></SiNiconico>
                                </a>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div>
                    <hr></hr>
                    <div className="p-2">
                        <span>Tags:</span>
                        {tags &&
                            tags.map((value, index) => (
                                <button
                                    key={value._id}
                                    className="m-1 border  p-1 bg-gray-200"
                                >
                                    <Link href={"/tag/" + value._id + "/1"}>
                                        <a className="text-blue-600 ">
                                            {value.name}
                                        </a>
                                    </Link>
                                </button>
                            ))}
                        {loggedIn && allowTagEditing ? (
                            <button
                                className="m-1 border rounded-full p-2 bg-gray-200"
                                onClick={(e) => setShowTagMenu(true)}
                            >
                                <AiOutlinePlus></AiOutlinePlus>
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChannelInfo;

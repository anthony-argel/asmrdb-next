import { FaTwitter, FaYoutube } from "react-icons/fa";
import { SiNiconico } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";

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
    tagname: string;
}

interface Props {
    channel: channelData;
    api: string;
    loggedIn: boolean;
    id: string | string[] | undefined;
}

const ChannelInfo = ({ channel, api, loggedIn, id }: Props) => {
    const [requestedYTUpdate, setRequestedYTUpdate] = useState<boolean>(false);
    const [YTUpdateError, setYTUpdateError] = useState<string>("");
    const [allTags, setAllTags] = useState([]);

    function refreshYTStats(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (loggedIn === false) {
            return;
        }
        fetch(api + "/channel/" + id + "/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            mode: "cors",
        }).then((res) => {
            if (res.status === 200) {
                setRequestedYTUpdate(true);
            } else {
                setYTUpdateError(
                    "This channel has already been refreshed in the last 24 hours."
                );
            }
        });
    }

    return (
        <div className="flex flex-col md:flex-row bg-white p-4">
            <div className="basis-1/3">
                <Image
                    src={channel.imageurl}
                    className=""
                    layout="responsive"
                    alt=""
                    width={1}
                    height={1}
                ></Image>
            </div>
            <div className="basis-2/3 p-4 flex flex-col justify-between gap-2">
                <div className="leading-9">
                    <h1 className="font-bold text-3xl">{channel.name}</h1>
                    <h2 className="">Aliases: {channel.aliases}</h2>
                    <hr></hr>
                    <div>
                        <p>Status: {channel.status}</p>
                        <p>Channel Views: {channel.viewcount}</p>
                        <p>Videos: {channel.videocount}</p>
                        <div className="flex">
                            {channel.twitter && channel.twitter != "" ? (
                                <FaTwitter
                                    className="text-3xl"
                                    color="#0d6efd"
                                ></FaTwitter>
                            ) : null}
                            {channel.youtube && channel.youtube != "" ? (
                                <FaYoutube
                                    className="text-3xl"
                                    color="red"
                                ></FaYoutube>
                            ) : null}
                            {channel.niconico && channel.niconico != "" ? (
                                <SiNiconico
                                    className="text-3xl"
                                    color="gray"
                                ></SiNiconico>
                            ) : null}
                        </div>
                        {loggedIn ? (
                            <button
                                type="button"
                                className="mt-2 bg-emerald-900 text-white p-2 rounded"
                                onClick={(e) => refreshYTStats(e)}
                            >
                                Refresh YouTube Stats
                            </button>
                        ) : null}
                        {YTUpdateError !== "" ? (
                            <p className="text-red-600">{YTUpdateError}</p>
                        ) : null}
                    </div>
                </div>
                <div>
                    <hr></hr>
                    <p>
                        Tags:
                        {channel.tags &&
                            channel.tags.map((value, index) => (
                                <span key={value._id}>
                                    <Link href={"/tag/" + value._id}>
                                        <a className="text-blue-600 underline">
                                            {value.tagname}
                                        </a>
                                    </Link>
                                    {index === channel.tags.length - 1
                                        ? null
                                        : ", "}
                                </span>
                            ))}
                    </p>
                    {loggedIn ? (
                        <form>
                            <input
                                className="p-1 border"
                                type="text"
                                id="tag"
                                name="tag"
                                placeholder="tag"
                            />
                            <button
                                type="button"
                                className="bg-emerald-900 text-white p-1"
                                onClick={(e) => refreshYTStats(e)}
                            >
                                Add Tag
                            </button>
                        </form>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default ChannelInfo;

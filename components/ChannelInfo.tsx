import { FaTwitter, FaYoutube } from "react-icons/fa";
import { SiNiconico } from "react-icons/si";
import { AiOutlinePlus } from "react-icons/ai";
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
    imgsize: string;
    infosize: string;
}

const ChannelInfo = ({
    channel,
    api,
    loggedIn,
    id,
    imgsize,
    infosize,
}: Props) => {
    const [allTags, setAllTags] = useState([]);

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
                <div className="leading-9">
                    <h1 className="font-bold text-3xl">
                        <Link href={"/channel/" + channel._id}>
                            <a>{channel.name}</a>
                        </Link>
                    </h1>
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
                    </div>
                </div>
                <div>
                    <hr></hr>
                    <div className="p-2">
                        <span>Tags:</span>
                        {channel.tags &&
                            channel.tags.map((value, index) => (
                                <button
                                    key={value._id}
                                    className="m-1 border  p-1 bg-gray-200"
                                >
                                    <Link href={"/tag/" + value._id + "/1"}>
                                        <a className="text-blue-600 ">
                                            {value.tagname}
                                        </a>
                                    </Link>
                                </button>
                            ))}
                        <button className="m-1 border rounded-full p-2 bg-gray-200">
                            <AiOutlinePlus></AiOutlinePlus>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChannelInfo;

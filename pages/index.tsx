import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import LatestChannels from "../components/LatestChannels";
import Statistics from "../components/Stats";

interface tagData {
    _id: string;
    name: string;
}

interface reviewData {
    channelid: {
        _id: string;
        name: string;
    };
    raterid: {
        username: string;
        _id: string;
    };
    rating: number;
    review: string;
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

interface stats {
    channels: number;
    tags: number;
    users: number;
    reviews: number;
}

interface Props {
    latestChannels: channelData[];
    stats: stats;
    tags: tagData[];
}

const Home: NextPage<Props> = ({ latestChannels, stats, tags }: Props) => {
    return (
        <>
            <div className="bg-white p-2 text-center">
                <h1 className="font-bold text-3xl text-center">
                    ASMR Database
                </h1>
                <hr></hr>
                <p>A place for ASMR enthusiasts to share information.</p>
            </div>
            <LatestChannels latestChannels={latestChannels}></LatestChannels>
            <Statistics
                channels={stats.channels}
                tags={stats.tags}
                users={stats.users}
                reviews={stats.reviews}
            ></Statistics>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    let latestChannels: channelData[] = [];
    let stats: stats = {
        channels: -1,
        tags: -1,
        users: -1,
        reviews: -1,
    };
    let tags: tagData[] = [];
    let reviews: reviewData[] = [];

    const res = await fetch(
        "https://dry-hollows-28901.herokuapp.com/channel/latest"
    )
        .then((res) => {
            if (res.status === 200 || res.status === 304) return res.json();
        })
        .then((res) => {
            if (typeof res !== "undefined") {
                latestChannels = res.channels;
            }
        });

    const res2 = await fetch(
        "https://dry-hollows-28901.herokuapp.com/statistics"
    )
        .then((res) => {
            if (res.status === 200 || res.status === 304) return res.json();
        })
        .then((res) => {
            if (typeof res !== "undefined") {
                stats = {
                    channels: res.channels,
                    tags: res.tags,
                    users: res.users,
                    reviews: res.reviews,
                };
            }
        });

    const res3 = await fetch(
        "https://dry-hollows-28901.herokuapp.com/tag/latest"
    )
        .then((res) => {
            if (res.status === 200 || res.status === 304) return res.json();
        })
        .then((res) => {
            if (typeof res !== "undefined") {
                tags = res.tags;
            }
        });

    //
    const res4 = await fetch(
        "https://dry-hollows-28901.herokuapp.com/channelrating/latest "
    )
        .then((res) => {
            if (res.status === 200 || res.status === 304) return res.json();
        })
        .then((res) => {
            if (typeof res !== "undefined") {
                reviews = res.reviews;
            }
        });

    return {
        props: {
            latestChannels,
            stats,
            tags,
            reviews,
        },
    };
};

export default Home;

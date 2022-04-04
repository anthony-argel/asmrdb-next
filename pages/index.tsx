import type { NextPage, GetStaticProps, GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import LatestChannels from "../components/LatestChannels";
import LatestReviews from "../components/LatestReviews";
import LatestTags from "../components/LatestTags";
import Statistics from "../components/Stats";

interface tagData {
    _id: string;
    name: string;
}

interface reviewData {
    _id: string;
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
    reviews: reviewData[];
}

const Home: NextPage<Props> = ({
    latestChannels,
    stats,
    tags,
    reviews,
}: Props) => {
    return (
        <>
            <Head>
                <title>Home - ASMRdb</title>
            </Head>
            <div className="bg-white p-4 text-center">
                <h1 className="font-bold text-3xl text-center">
                    ASMR Database
                </h1>
                <hr></hr>
                <p>A place for ASMR enthusiasts to share information.</p>
            </div>
            <LatestChannels latestChannels={latestChannels}></LatestChannels>

            <div className="md:grid md:grid-cols-3 md:gap-4 md:grid-rows-1">
                <div className="mt-4 md:row-auto">
                    <Statistics
                        channels={stats.channels}
                        tags={stats.tags}
                        users={stats.users}
                        reviews={stats.reviews}
                    ></Statistics>
                </div>
                <div className="mt-4 md:row-auto">
                    <LatestTags tags={tags}></LatestTags>
                </div>
                <div className="mt-4 md:row-auto">
                    <LatestReviews reviews={reviews}></LatestReviews>
                </div>
            </div>

            <div className="flex flex-col md:flex-row mt-4 gap-4 ">
                <div className="md:basis-1/2 bg-white p-4">
                    <p className="text-center font-bold text-xl">
                        Microphone Recommendation
                    </p>
                    <hr></hr>
                    <p>
                        This is THE clickbait microphone of Japan. If you search{" "}
                        <a
                            className="text-blue-600 underline"
                            href="https://en-de.neumann.com/ku-100"
                        >
                            KU100
                        </a>{" "}
                        on YouTube right now you will see all a bunch of
                        Japanese ASMR videos. Note: (Check out the price){" "}
                    </p>
                    <Image
                        src="/images/ku100.png"
                        alt="mic recommendation"
                        width={1}
                        height={1}
                        layout="responsive"
                    ></Image>
                </div>
                <div className="basis-1/2 bg-white p-4">
                    <p className="text-center font-bold text-xl">
                        Headphone Recommendations
                    </p>
                    <hr></hr>
                    <p>
                        I honestly do not know much about headphones but I would
                        recommend the{" "}
                        <a
                            className="text-blue-600 underline"
                            href="https://www.amazon.com/Sony-Mdr-cd900st-Studio-Monitor-Headphones/dp/B000UPEJCU/ref=sr_1_9?crid=2HATYN65T3BDH&keywords=mdr&qid=1649035885&sprefix=mdr%2Caps%2C229&sr=8-9"
                        >
                            Sony MDR-CD900ST
                        </a>
                        . My favorite YouTuber uses them and their audio quality
                        is amazing.
                    </p>
                    <Image
                        src="/images/mdr.png"
                        alt="headphone recommendation"
                        width={1}
                        height={1}
                        layout="responsive"
                    ></Image>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
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

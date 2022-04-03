import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChannelInfo from "../components/ChannelInfo";

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
    channels: channelData[];
    api: string;
    loggedIn: boolean;
    pages: string;
}

const Search = ({ channels, api, loggedIn, pages }: Props) => {
    const router = useRouter();
    const { query, page } = router.query;
    const [strQuery, setStrQuery] = useState<string>(
        query && typeof query === "string" && query !== ""
            ? query.replaceAll("-", " ")
            : ""
    );

    useEffect(() => {
        setStrQuery(
            query && typeof query === "string" && query !== ""
                ? query.replaceAll("-", " ")
                : ""
        );
    }, [query]);

    return (
        <div className="bg-white" key={strQuery}>
            <Head>
                <title>
                    {strQuery ? strQuery : "Search"} - Page {page} - ASMRdb
                </title>
            </Head>
            <h1 className="text-center text-3xl font-bold p-4">
                Search: {strQuery}{" "}
                <span className="text-xl">
                    ~{channels && channels.length} Results Found
                </span>
            </h1>
            <hr></hr>
            {channels
                ? channels.map((value) => {
                      return (
                          <ChannelInfo
                              allowTagEditing={false}
                              key={value._id}
                              channel={value}
                              api={api}
                              loggedIn={loggedIn}
                              id={value._id}
                              imgsize="basis-1/4"
                              infosize="basis-3/4"
                          ></ChannelInfo>
                      );
                  })
                : null}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    let channels: channelData[] = [];
    let totalResults: number = 0;
    let query: string | undefined | string[] = context.query?.query;
    let estimatedPages: number = 0;
    if (query && typeof query === "string") {
        const regex = "/-/g";
        query = query.replace(regex, " ");
    }
    const page: string | undefined | string[] = context.query?.page;

    let url =
        "https://dry-hollows-28901.herokuapp.com/channel/" +
        page +
        "/search?query=" +
        query;
    await fetch(url)
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((res) => {
            if (res) {
                channels = res.channels;
                totalResults = res.totalChannels;

                estimatedPages = totalResults / 40.0;
                if (estimatedPages <= 0) {
                    estimatedPages = 1;
                }
            }
        });

    return {
        props: {
            pages: estimatedPages,
            channels: channels,
        },
    };
};

export default Search;

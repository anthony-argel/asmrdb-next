import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import ChannelComments from "../../components/ChannelComments";
import ChannelInfo from "../../components/ChannelInfo";
import ChannelStatistics from "../../components/ChannelStatistics";

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

interface rater {
    _id: string;
    username: string;
}

interface rating {
    rating: number;
    _id: string;
    raterid: rater;
    date: string;
    review: string;
}

interface Props {
    channel: channelData;
    api: string;
    loggedIn: boolean;
    ratings: rating[];
    allTags?: tagData[];
}

function Channel({ channel, loggedIn, api, ratings, allTags }: Props) {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div>
            <Head>
                <title>{channel.name + " - ASMRdb"}</title>
            </Head>
            <ChannelInfo
                allowTagEditing={true}
                channel={channel}
                api={api}
                loggedIn={loggedIn}
                id={id}
                imgsize="basis-1/3"
                infosize="basis-2/3"
                allTags={allTags}
            ></ChannelInfo>
            <ChannelStatistics
                id={id}
                api={api}
                loggedIn={loggedIn}
            ></ChannelStatistics>
            <ChannelComments
                loggedIn={loggedIn}
                id={id}
                api={api}
            ></ChannelComments>
        </div>
    );
}

export default Channel;

export const getStaticProps: GetStaticProps = async (context) => {
    const id: string | undefined | string[] = context.params?.id;

    if (typeof id != "string") {
        return {
            notFound: true,
        };
    }

    // refresh youtube data
    await fetch(
        "https://dry-hollows-28901.herokuapp.com/channel/" + id + "/refresh",
        {
            method: "Post",
        }
    );

    let channel: channelData | null = null;
    let allTags: tagData[] = [];

    let url = "https://dry-hollows-28901.herokuapp.com/channel/" + id + "/all";

    await fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((res) => {
            if (res) {
                channel = res.channel;
                allTags = res.allTags;
            }
        });

    return {
        props: { channel: channel, allTags: allTags },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    let url = "https://dry-hollows-28901.herokuapp.com";
    let channels: channelData[] = [];

    await fetch(url + "/channels/all", {
        method: "GET",
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((res) => {
            if (res) {
                channels = res.channels;
            }
        });

    const paths = channels.map((channel) => ({
        params: {
            id: channel._id,
        },
    }));

    return {
        paths,
        fallback: "blocking",
    };
};

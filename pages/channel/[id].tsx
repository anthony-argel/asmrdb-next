import { GetStaticPaths, GetStaticProps } from "next";
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
    tagname: string;
}
interface Props {
    channel: channelData;
    api: string;
    loggedIn: boolean;
}

function Channel({ channel, loggedIn, api }: Props) {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div>
            <ChannelInfo
                channel={channel}
                api={api}
                loggedIn={loggedIn}
                id={id}
                imgsize="basis-1/3"
                infosize="basis-2/3"
            ></ChannelInfo>
            <ChannelStatistics></ChannelStatistics>
            <ChannelComments id={id} api={api}></ChannelComments>
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
    let channel: channelData | null = null;

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
            }
        });

    return {
        props: { channel: channel },
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

import { GetStaticPaths, GetStaticProps } from "next";

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
}

function Channel({ channel }: Props) {
    console.log(channel);
    return (
        <div className="bg-white p-4">
            <h1 className="text-3xl font-bold text-center">Channel</h1>
            <hr></hr>
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
                console.log(res);
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

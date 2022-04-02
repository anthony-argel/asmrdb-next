import { GetServerSideProps } from "next";
import ChannelInfo from "../../../components/ChannelInfo";

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
    tagname: string;
}

const Tag = ({ channels, api, loggedIn, tagname }: Props) => {
    return (
        <div className="min-h-[90vh] bg-white p-4">
            <h1 className="text-3xl font-bold text-center">
                {tagname !== "" ? tagname : "Tag"}{" "}
                <span className="text-xl">
                    ~{channels.length} Results Found
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
    let page: string | undefined | string[] = context.params?.page;
    let tagid: string | undefined | string[] = context.params?.tagid;
    let tagname: string = "";
    let url =
        "https://dry-hollows-28901.herokuapp.com/tag/" +
        tagid +
        "/channels/" +
        page;

    console.log(url);
    await fetch(url)
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((res) => {
            if (res) {
                channels = res.channels;
                tagname = res.tag.name;
            }
        });

    return {
        props: {
            channels: channels,
            tagname: tagname,
        },
    };
};

export default Tag;

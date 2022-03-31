import Image from "next/image";

interface tagData {
    _id: string;
    name: string;
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

interface Props {
    latestChannels: channelData[];
}

function LatestChannels({ latestChannels }: Props) {
    return (
        <div className="bg-white mt-4 p-4 text-center">
            <h2 className=" font-bold text-2xl">Latest Channels</h2>
            <hr></hr>
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 m-2">
                {latestChannels.map((channel) => {
                    return (
                        <div key={channel._id} className="">
                            <div>
                                <Image
                                    src={channel.imageurl}
                                    alt=""
                                    layout="responsive"
                                    width={4}
                                    height={4}
                                ></Image>
                            </div>
                            <p>{channel.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default LatestChannels;

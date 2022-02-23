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
    <div className="bg-white m-5 p-5">
      <p className="text-center">Latest Channels</p>
      <hr></hr>
      <div className="flex gap-5 m-2">
        {latestChannels.map((channel) => {
          return (
            <div key={channel._id} className="flex flex-col basis-1/3">
              <div>
                <Image
                  src={channel.imageurl}
                  alt=""
                  layout="responsive"
                  width={4}
                  height={4}
                ></Image>
              </div>
              {channel.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LatestChannels;

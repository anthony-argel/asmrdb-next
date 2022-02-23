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
  console.log(tags);
  return (
    <div>
      <div className="bg-white m-5 p-5">
        <h1 className="text-2xl font-bold">ASMR Database</h1>
        <hr></hr>
        <p>
          The goal of ASMRdb.net is to document all ASMR YouTubers.<br></br> By
          collecting them all in one place, ASMR enthusiasts will have an easier
          time looking for new channels to listen to. This website is built as a
          wiki, so feel free to add channels, tags, and join in on discussions.
        </p>
      </div>
      <LatestChannels latestChannels={latestChannels}></LatestChannels>

      <div>
        {tags.map((tag) => {
          return (
            <div key={tag._id}>
              <Link href={"/tag/" + tag._id}>
                <a>{tag.name}</a>
              </Link>
            </div>
          );
        })}
      </div>
      <Statistics
        channels={stats["channels"]}
        tags={stats["tags"]}
        users={stats["users"]}
        reviews={stats["reviews"]}
      ></Statistics>
    </div>
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

  const res2 = await fetch("https://dry-hollows-28901.herokuapp.com/statistics")
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

  const res3 = await fetch("https://dry-hollows-28901.herokuapp.com/tag/latest")
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

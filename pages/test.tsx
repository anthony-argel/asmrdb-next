// import type { NextPage, GetStaticProps } from "next";
// import Head from "next/head";
// import Image from "next/image";
// import { useEffect } from "react";

// interface tagData {
//   _id: string;
//   tagid: string;
//   tagname: string;
// }

// interface channelData {
//   status: string;
//   _id: string;
//   name: string;
//   aliases: string;
//   imageurl: string;
//   youtube: string;
//   twitter: string;
//   lastytrefresh: string;
//   viewcount: number;
//   videocount: number;
//   __v: number;
//   startdate: string;
//   tags: tagData[];
//   niconico: string;
// }

// interface Props {
//   channels: channelData[];
//   totalChannels: number;
// }

// const Home: NextPage<Props> = ({ channels, totalChannels }) => {
//   return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
// };

// export const getStaticProps: GetStaticProps = async () => {
//   let totalChannels: number = -1;
//   let channels: channelData[] = [];

//   const res = await fetch(
//     "https://dry-hollows-28901.herokuapp.com/channel/latest"
//   )
//     .then((res) => {
//       if (res.status === 200 || res.status === 304) return res.json();
//     })
//     .then((res) => {
//       if (typeof res !== "undefined") {
//         totalChannels = res.totalchannels;
//         channels = res.channels;
//       }
//     });

//   const res2 = await fetch(
//     "https://dry-hollows-28901.herokuapp.com/channel/latest"
//   )
//     .then((res) => {
//       if (res.status === 200 || res.status === 304) return res.json();
//     })
//     .then((res) => {
//       if (typeof res !== "undefined") {
//         totalChannels = res.totalchannels;
//         channels = res.channels;
//       }
//     });

//   return {
//     props: {
//       channels,
//       totalChannels,
//     },
//   };
// };

// export default Home;

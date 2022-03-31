// import { GetStaticPaths, GetStaticProps } from "next";

// interface channelData {
//     status: string;
//     _id: string;
//     name: string;
//     aliases: string;
//     imageurl: string;
//     youtube: string;
//     twitter: string;
//     lastytrefresh: string;
//     viewcount: number;
//     videocount: number;
//     __v: number;
//     startdate: string;
//     tags: tagData[];
//     niconico: string;
// }

// function Channels() {
//     return (
//         <div className="bg-white p-4">
//             <h1 className="text-3xl font-bold text-center">Channels</h1>
//             <hr></hr>
//         </div>
//     );
// }

// export default Channels;

// export const getStaticProps: GetStaticProps = async (context) => {
//     const page: string | undefined | string[] = context.params?.page;
//     if (typeof page != "string") {
//         return {
//             notFound: true,
//         };
//     }

//     return {
//         props: {},
//     };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//     let url = "https://dry-hollows-28901.herokuapp.com";
//     let channels: channelData[] = [];

//     await fetch(url + "/channels/all", {
//         method: "GET",
//     })
//         .then((res) => {
//             if (res.ok) {
//                 return res.json();
//             }
//         })
//         .then((res) => {
//             if (res) {
//                 channels = res.channels;
//             }
//         });

//     const paths = channels.map(page)
// };

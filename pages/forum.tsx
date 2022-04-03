import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";

interface boardData {
    name: string;
    _id: string;
    description: string;
}

interface User {
    username: string;
}

interface commentData {
    authorid: User;
    comment: string;
}

interface Props {
    boards: boardData[];
}

const forum = ({ boards }: Props) => {
    return (
        <div className="bg-white">
            <Head>
                <title>Boards - ASMRdb</title>
            </Head>
            <h1 className="text-center font-bold text-3xl p-4">Boards</h1>
            <hr></hr>
            <div className="p-4">
                {boards && boards.length > 0
                    ? boards.map((value) => {
                          return (
                              <Link
                                  key={value._id}
                                  href={"/board/" + value._id}
                              >
                                  <a className="m-2 bg-gray-200 p-4 inline-block">
                                      {value.name}
                                  </a>
                              </Link>
                          );
                      })
                    : null}
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    let boards: boardData[] = [];

    let url = "https://dry-hollows-28901.herokuapp.com/board";
    await fetch(url)
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((res) => {
            if (res) {
                boards = res.boards;
            }
        });

    return {
        props: {
            boards: boards,
        },
    };
};

export default forum;

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { DateTime } from "luxon";
import Link from "next/link";
import { useState } from "react";
import ThreadModal from "../../components/ThreadModal";
import MessageWindow from "../../components/MessageWindow";
import Head from "next/head";

interface threadData {
    _id: string;
    title: string;
    author: author;
    comment: string;
    date: string;
}

interface boardData {
    _id: string;
    name: string;
    description: string;
}

interface author {
    _id: string;
    username: string;
}

interface Props {
    threads: threadData[];
    board: boardData;
    loggedIn: Boolean;
    api: string;
}

const Board = ({ threads, board, loggedIn, api }: Props) => {
    const router = useRouter();
    const { id } = router.query;
    const [showThreadModal, setShowThreadModal] = useState<Boolean>(false);
    const [windowMessage, setWindowMessage] = useState<string>("");

    return (
        <div className="bg-white p-4">
            <Head>
                <title>{board.name + " - ASMRdb"}</title>
            </Head>
            {windowMessage !== "" ? (
                <MessageWindow
                    message={windowMessage}
                    setWindowMessage={setWindowMessage}
                ></MessageWindow>
            ) : null}
            {showThreadModal ? (
                <ThreadModal
                    setWindowMessage={setWindowMessage}
                    setShowThreadModal={setShowThreadModal}
                    boardId={id}
                    api={api}
                ></ThreadModal>
            ) : null}
            <div className="p-4 text-center">
                <h1 className="text-3xl font-bold">{board.name}</h1>
                <h2>{board.description}</h2>
                {loggedIn ? (
                    <button
                        className="p-4 bg-purple-600 text-white m-2"
                        onClick={(e) => setShowThreadModal(true)}
                    >
                        Create a Thread
                    </button>
                ) : null}
            </div>
            {threads && threads.length > 0 ? (
                threads.map((value) => {
                    return (
                        <div key={value._id}>
                            <hr></hr>
                            <div className="m-4">
                                <Link href={"/thread/" + value._id}>
                                    <a className="font-bold text-xl text-blue-600">
                                        {value.title}
                                    </a>
                                </Link>
                                <p>Author: {value.author.username}</p>
                                <p>
                                    Posted:{" "}
                                    {DateTime.fromISO(value.date).toFormat(
                                        "yyyy LLL dd"
                                    )}
                                </p>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div>
                    <hr />
                    <p className="text-center mt-4">No threads found</p>
                </div>
            )}
        </div>
    );
};

export default Board;

export const getServerSideProps: GetServerSideProps = async (context) => {
    let threads: threadData[] = [];
    let board: boardData | undefined = undefined;
    let id: string | undefined | string[] = context.params?.id;

    let url = "https://dry-hollows-28901.herokuapp.com/board/" + id;
    await fetch(url)
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((res) => {
            if (res) {
                threads = res.threads;
                board = res.board;
            }
        });

    return {
        props: {
            threads: threads,
            board: board,
        },
    };
};

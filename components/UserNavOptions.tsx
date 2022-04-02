import { useState } from "react";
import AddTagModal from "./AddTagModal";
import MessageWindow from "./MessageWindow";

interface Props {
    api: string;
}

const UserNavOptions = ({ api }: Props) => {
    const [showMenu, setShowMenu] = useState<Boolean>(false);
    const [showTagModal, setShowTagModal] = useState<Boolean>(false);
    const [windowMessage, setWindowMessage] = useState("");

    return (
        <div className="relative md:ml-3">
            {windowMessage !== "" ? (
                <MessageWindow
                    message={windowMessage}
                    setWindowMessage={setWindowMessage}
                ></MessageWindow>
            ) : null}
            <div>
                {showTagModal ? (
                    <AddTagModal
                        api={api}
                        setShowTagModal={setShowTagModal}
                        setWindowMessage={setWindowMessage}
                    ></AddTagModal>
                ) : null}
            </div>
            <button className="" onClick={(e) => setShowMenu((prev) => !prev)}>
                User
            </button>
            {showMenu ? (
                <div className="absolute top-[100%] left-[-50%] bg-black text-white">
                    <ul>
                        <li
                            className="p-3 cursor-pointer"
                            onClick={(e) => setShowTagModal(true)}
                        >
                            Request Tag
                        </li>
                        <li className="p-3">Add Channel</li>
                    </ul>
                </div>
            ) : null}
        </div>
    );
};

export default UserNavOptions;

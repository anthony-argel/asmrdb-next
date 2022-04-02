import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
    message: string;
    setWindowMessage: Dispatch<SetStateAction<string>>;
}

const MessageWindow = ({ message, setWindowMessage }: Props) => {
    const [messageTimer, setMessageTimer] = useState(2);

    useEffect(() => {
        const interval = setInterval(() => {
            if (messageTimer >= 0) {
                setMessageTimer((prev) => prev - 1);
            }
        }, 1000);
        return () => {
            clearInterval(interval);
            if (messageTimer <= 0) {
                setWindowMessage("");
            }
        };
    }, [messageTimer, setWindowMessage]);

    return (
        <div className="fixed bottom-0 right-0 m-2 bg-purple-600 text-white p-4">
            <p>{message}</p>
        </div>
    );
};

export default MessageWindow;

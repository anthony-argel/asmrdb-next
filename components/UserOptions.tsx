import { useState } from "react";

interface Props {
    loggedIn: Boolean;
    api: string;
    id: string;
}

const UserOptions = ({ loggedIn, api, id }: Props) => {
    const [requestedYTUpdate, setRequestedYTUpdate] = useState<boolean>(false);
    const [YTUpdateError, setYTUpdateError] = useState<string>("");

    function refreshYTStats(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (loggedIn === false) {
            return;
        }
        fetch(api + "/channel/" + id + "/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            mode: "cors",
        }).then((res) => {
            if (res.status === 200) {
                setRequestedYTUpdate(true);
            } else {
                setYTUpdateError(
                    "This channel has already been refreshed in the last 24 hours."
                );
            }
        });
    }
    return (
        <div>
            <p>dpo staolsdfkj</p>
            {loggedIn ? (
                <button
                    type="button"
                    className="mt-2 bg-emerald-900 text-white p-2 rounded"
                    onClick={(e) => refreshYTStats(e)}
                >
                    Refresh YouTube Stats
                </button>
            ) : null}
            {YTUpdateError !== "" ? (
                <p className="text-red-600">{YTUpdateError}</p>
            ) : null}
            {loggedIn ? (
                <form>
                    <input
                        className="p-1 border"
                        type="text"
                        id="tag"
                        name="tag"
                        placeholder="tag"
                    />
                    <button
                        type="button"
                        className="bg-emerald-900 text-white p-1"
                        onClick={(e) => refreshYTStats(e)}
                    >
                        Add Tag
                    </button>
                </form>
            ) : null}
        </div>
    );
};

export default UserOptions;

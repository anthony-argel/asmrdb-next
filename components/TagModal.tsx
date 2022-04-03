import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

interface tagData {
    _id: string;
    name: string;
}

interface Props {
    tags: tagData[];
    api: string;
    loggedIn: boolean;
    id: string | string[] | undefined;
    setShowTagMenu: Dispatch<SetStateAction<Boolean>>;
    setTags: Dispatch<SetStateAction<tagData[]>>;
    allTags: tagData[];
    allowTagEditing: Boolean;
}

const TagModal = ({
    tags,
    api,
    loggedIn,
    id,
    setShowTagMenu,
    allTags,
    setTags,
    allowTagEditing,
}: Props) => {
    const [selectedTag, setSelectedTag] = useState<string>(allTags[0].name);
    const [errorMessage, setErrorMessage] = useState<string>("");

    function deleteTag(
        e: React.MouseEvent<HTMLButtonElement>,
        idToDelete: string
    ) {
        fetch(api + "/channel/" + id + "/tag", {
            method: "DELETE",
            body: JSON.stringify({
                tagid: idToDelete,
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            mode: "cors",
        }).then((res) => {
            let tagsCopy = [...tags];
            for (let i = 0; i < tagsCopy.length; i++) {
                if (tagsCopy[i]._id === idToDelete) {
                    tagsCopy.splice(i, 1);
                    setTags(tagsCopy);
                    return;
                }
            }
        });
    }

    function addTag(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        for (let k = 0; k < tags.length; k++) {
            if (tags[k].name === selectedTag) {
                setErrorMessage("This tag is has already been added");
                return;
            }
        }

        let tagID = "";
        let tagToAdd: tagData;
        for (let i = 0; i < allTags.length; i++) {
            if (allTags[i].name === selectedTag) {
                tagID = allTags[i]._id;
                tagToAdd = allTags[i];
                break;
            }
        }

        if (tagID !== "") {
            fetch(api + "/channel/" + id + "/tag", {
                method: "POST",
                body: JSON.stringify({
                    tagid: tagID,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                mode: "cors",
            }).then((res) => {
                if (res.ok) {
                    setTags([...tags, tagToAdd]);
                } else {
                    setErrorMessage(
                        "Something went wrong while trying to add the tag."
                    );
                }
            });
        }
    }

    return (
        <div
            onClick={(e) => setShowTagMenu(false)}
            className="fixed w-full h-full bg-stone-900/75 top-0 left-0 flex flex-col justify-center items-center "
        >
            <div
                className="bg-white max-w-[90%] w-11/12 md:w-2/6 m-4 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <p
                    className="absolute text-4xl p-2 right-0 top-0 text-red-600 cursor-pointer"
                    onClick={(e) => setShowTagMenu(false)}
                >
                    <MdClose></MdClose>
                </p>
                <p className="p-4 text-center font-bold text-2xl">Edit Tags</p>
                <hr></hr>
                <div className="p-4">
                    {tags &&
                        tags.map((value, index) => (
                            <button
                                key={value._id}
                                className="m-1 border p-1 bg-gray-200 text-blue-600 hover:text-red-600"
                                onClick={(e) => deleteTag(e, value._id)}
                            >
                                <p>
                                    {value.name}{" "}
                                    <span>
                                        <MdClose className="inline text-red-600 text-2xl"></MdClose>
                                    </span>
                                </p>
                            </button>
                        ))}
                </div>
                <hr></hr>
                <div className="p-4">
                    <form className="flex flex-col" onSubmit={(e) => addTag(e)}>
                        <label htmlFor="tagToAdd">To Add:</label>
                        <select
                            id="tagToAdd"
                            name="tags"
                            className="p-2 max-w-[100%]"
                            value={selectedTag}
                            onChange={(e) => setSelectedTag(e.target.value)}
                        >
                            {allTags.map((value) => {
                                return (
                                    <option key={value._id} value={value.name}>
                                        {value.name}
                                    </option>
                                );
                            })}
                        </select>
                        <button
                            type="submit"
                            className=" bg-purple-600 p-2 text-white mt-4"
                        >
                            Add Tag
                        </button>
                        {errorMessage !== "" ? (
                            <p className="text-red-600 text-center font-bold mt-4">
                                {errorMessage}
                            </p>
                        ) : null}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TagModal;

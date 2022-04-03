import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, Dispatch, SetStateAction } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import UserNavOptions from "./UserNavOptions";

interface Props {
    loggedIn: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
    api: string;
}

function Nav({ loggedIn, setLoggedIn, api }: Props) {
    const links = [
        ["Channels", "/channels/1"],
        ["Tags", "/tags"],
        ["Forum", "/forum"],
    ];
    const router = useRouter();
    const [showMenu, setShowMenu] = useState<Boolean>(false);
    const [search, setSearch] = useState<string>("");

    const logOut = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
    };

    const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch("");
        router.push("/search?query=" + search.replaceAll(" ", "-") + "&page=1");
    };

    return (
        <nav className="bg-black text-white p-3 md:flex md:justify-between">
            <ul className={`flex flex-col gap-3 md:flex-row md:items-center `}>
                <li className="flex justify-between ">
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                    <p className="text-2xl">
                        <GiHamburgerMenu
                            className="cursor-pointer md:hidden"
                            onClick={() => setShowMenu((prevMenu) => !prevMenu)}
                        ></GiHamburgerMenu>
                    </p>
                </li>
                {links.map((value, index) => {
                    return (
                        <li
                            className={`${
                                showMenu ? "" : "hidden"
                            } md:flex flex-row`}
                            key={index}
                        >
                            <Link href={value[1]}>
                                <a>{value[0]}</a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <div
                className={`${
                    showMenu ? "" : "hidden "
                } flex flex-col mt-3 md:mt-0 md:flex md:flex-row md:justify-center md:items-center md:ml-3`}
            >
                <form onSubmit={(e) => submitSearch(e)}>
                    <input
                        className="p-1 border text-black"
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit">
                        <p className="p-1 border box-border hover:text-black hover:bg-white">
                            Search
                        </p>
                    </button>
                </form>
                {loggedIn ? (
                    <p
                        className="mt-3 md:mt-0 md:ml-3 cursor-pointer"
                        onClick={(e) => logOut()}
                    >
                        Log out
                    </p>
                ) : (
                    <Link href="/login">
                        <a className="mt-3 md:mt-0 md:ml-3 ">Log in</a>
                    </Link>
                )}
                <UserNavOptions api={api}></UserNavOptions>
            </div>
        </nav>
    );
}

export default Nav;

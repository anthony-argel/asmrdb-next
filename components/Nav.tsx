import Link from "next/link";
import React, { useState, Dispatch, SetStateAction } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";

interface Props {
    loggedIn: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

function Nav({ loggedIn, setLoggedIn }: Props) {
    const links = [
        ["Channels", "/channels/1"],
        ["Tags", "/tags"],
        ["Forum", "/forum"],
    ];
    const [showMenu, setShowMenu] = useState<Boolean>(false);

    const logOut = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
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
                    showMenu ? "" : "hidden"
                } flex md:flex md:justify-center md:items-center md:ml-3`}
            >
                <form>
                    <input
                        className="p-1 border"
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Search..."
                    />
                    <button>
                        <p className="p-1 border box-border hover:text-black hover:bg-white">
                            Search
                        </p>
                    </button>
                </form>
                {loggedIn ? (
                    <p className="md:ml-3" onClick={(e) => logOut()}>
                        Log out
                    </p>
                ) : (
                    <Link href="/login">
                        <a className="md:ml-3">Log in</a>
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Nav;

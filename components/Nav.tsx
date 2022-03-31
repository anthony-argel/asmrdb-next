import Link from "next/link";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";

function Nav() {
    const links = [
        ["Channels", "/channels/1"],
        ["Tags", "/tags"],
        ["Forum", "/forum"],
    ];
    const [showMenu, setShowMenu] = useState<Boolean>(false);
    return (
        <nav className="bg-black text-white p-3 md:flex md:justify-between">
            <ul className={`flex flex-col gap-3 md:flex-row md:items-center `}>
                <li className="flex justify-between ">
                    <p>Home</p>
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
                            {value[0]}
                        </li>
                    );
                })}
            </ul>
            <div className={`${showMenu ? "" : "hidden"} md:flex md:ml-3`}>
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
            </div>
        </nav>
    );
}

export default Nav;

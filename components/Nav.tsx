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
        <nav className="bg-black text-white p-3">
            <div className="flex justify-between items-center">
                <p>Home</p>
                <p className="text-2xl">
                    <GiHamburgerMenu
                        className="cursor-pointer"
                        onClick={() => setShowMenu((prevMenu) => !prevMenu)}
                    ></GiHamburgerMenu>
                </p>
            </div>
            <ul className={`${showMenu ? "" : "hidden"}`}>
                {links.map((value, index) => {
                    return (
                        <li className={`mt-1 mb-1`} key={index}>
                            {value[0]}
                        </li>
                    );
                })}
            </ul>
            <div className={`${showMenu ? "" : "hidden"}`}>
                <form>
                    <input
                        className="p-1"
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Search..."
                    />
                    <button>
                        <p className="p-1 border hover:text-black hover:bg-white">
                            Search
                        </p>
                    </button>
                </form>
            </div>
        </nav>
    );
}

export default Nav;

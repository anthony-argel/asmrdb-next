const { default: Footer } = require("./Footer");
const { default: Nav } = require("./Nav");
import React, { Dispatch, SetStateAction } from "react";

interface Props {
    loggedIn: Boolean;
    setLoggedIn: Dispatch<SetStateAction<Boolean>>;
    children: any;
    api: string;
}

function Layout({ loggedIn, setLoggedIn, children, api }: Props) {
    return (
        <div style={{ backgroundColor: "#023430" }}>
            <div className="bg-black flex justify-center">
                <div className="w-full md:w-2/3">
                    <Nav
                        loggedIn={loggedIn}
                        setLoggedIn={setLoggedIn}
                        api={api}
                    ></Nav>
                </div>
            </div>
            <main className="flex justify-center min-h-[98vh]">
                <div className="w-full m-4 md:w-2/3">{children}</div>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Layout;

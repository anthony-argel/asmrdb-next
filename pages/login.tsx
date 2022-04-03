import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, Dispatch, SetStateAction } from "react";

interface Props {
    api: string;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Login = ({ api, setLoggedIn }: Props) => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const login = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();

        fetch(api + "/user/login", {
            method: "POST",
            body: JSON.stringify({ email: email, password: password }),
            headers: { "Content-Type": "application/json" },
            mode: "cors",
        })
            .then((res) => {
                if (res.ok == false) {
                    setError(true);
                } else {
                    return res.json();
                }
            })
            .then((res) => {
                if (res) {
                    localStorage.setItem("token", res.token);
                    localStorage.setItem("id", res.id);
                    setLoggedIn(true);
                    router.push("/");
                }
            });
        setEmail("");
        setPassword("");
    };

    return (
        <div className="min-h-[90vh] flex flex-col items-center">
            <Head>
                <title>Log in - ASMRdb</title>
            </Head>
            <div className="bg-white p-4  md:w-[50%]">
                <h1 className="text-3xl font-bold text-center">Login</h1>
                <form
                    className="border flex flex-col p-4 mt-4"
                    onSubmit={(e) => login(e)}
                >
                    <label htmlFor="email">Email:</label>
                    <input
                        className="border p-2"
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    ></input>

                    <label className="mt-4" htmlFor="password">
                        Password:
                    </label>
                    <input
                        className="border p-2"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    ></input>
                    <button
                        type="submit"
                        className="p-2 mt-4 border bg-purple-700 text-white"
                    >
                        Log in
                    </button>
                    {error ? (
                        <p className="mt-4 text-center text-red-600">
                            Something went wrong while trying to log in. Please
                            try again.
                        </p>
                    ) : null}
                </form>
                <hr className="mt-4 mb-4"></hr>
                <div className="text-center">
                    <Link href="/signup">
                        <a className="text-xl underline text-blue-600">
                            Create an account
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;

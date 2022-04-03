import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

interface Props {
    api: string;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Signup = ({ api, setLoggedIn }: Props) => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordRepeat, setPasswordRepeat] = useState<string>("");
    const [errorList, setErrorList] = useState<string[]>([]);
    const [accountCreated, setAccountCreated] = useState<boolean>(false);

    useEffect(() => {
        setErrorList([]);
    }, [email, username, password, passwordRepeat]);

    useEffect(() => {
        if (accountCreated) {
            router.push("/login");
        }
    }, [accountCreated, router]);

    function signup(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (passwordRepeat === password) {
            fetch(api + "/user", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                    passwordRepeat: passwordRepeat,
                }),
                headers: { "Content-Type": "application/json" },
                mode: "cors",
            })
                .then((res) => {
                    if (res.ok) {
                        setAccountCreated(true);
                        return;
                    }
                    return res.json();
                })
                .then((res) => {
                    if (typeof res === "undefined") {
                        return;
                    }
                    if (
                        typeof res.errors !== "undefined" ||
                        res.errors.length > 0
                    ) {
                        setErrorList(res.errors);
                    } else {
                        setAccountCreated(true);
                    }
                });
        } else {
            setErrorList(["Passwords do not match."]);
        }
    }

    return (
        <div>
            <Head>
                <title>Sign up - ASMRdb</title>
            </Head>
            <div className="min-h-[90vh] flex flex-col items-center">
                <div className="bg-white p-4  md:w-[50%]">
                    <h1 className="text-3xl font-bold text-center">Login</h1>
                    <form
                        className="border flex flex-col p-4 mt-4"
                        onSubmit={(e) => signup(e)}
                    >
                        <label htmlFor="username">Username:</label>
                        <input
                            className="border p-2"
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        ></input>
                        <label htmlFor="email" className="mt-4">
                            Email:
                        </label>
                        <input
                            className="border p-2"
                            type="email"
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

                        <label className="mt-4" htmlFor="passwordRepeat">
                            Password:
                        </label>
                        <input
                            className="border p-2"
                            type="password"
                            id="passwordRepeat"
                            name="passwordRepeat"
                            value={passwordRepeat}
                            onChange={(e) => setPasswordRepeat(e.target.value)}
                            required
                        ></input>
                        <button
                            type="submit"
                            className="p-2 mt-4 border bg-purple-700 text-white"
                        >
                            Log in
                        </button>
                    </form>

                    <div
                        className={`mt-4 text-red-600 p-4 ${
                            errorList.length > 0 ? "" : "hidden"
                        }`}
                    >
                        <ol className="list-disc">
                            {errorList.length > 0
                                ? errorList.map((value, index) => {
                                      return <li key={index}>{value}</li>;
                                  })
                                : null}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;

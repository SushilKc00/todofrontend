"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetch(
      "https://todo-dlza.onrender.com/api/auth/register",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );
    const res = await data.json();
    if (res.success) {
      alert("register successful");
      router.push("/login");
    } else {
      alert(res.message);
    }
  };

  return (
    <section>
      <div className="w-full h-[90vh] flex justify-center items-center ">
        <form
          method="post"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="bg-slate-300 w-[90%] md:min-h-[20rem] md:max-w-[30rem]  rounded-2xl px-3"
        >
          <h1 className="text-center font-bold text-xl">Register user</h1>
          <div className="flex flex-col gap-4 mt-2">
            <input
              type="text"
              name="username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="enter username"
              className="outline-none px-2 py-3 rounded-sm  "
            />
            <input
              type="text"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="password"
              className="outline-none px-2 py-3 rounded-sm"
            />
          </div>
          <button className="btn bg-blue-500 px-4 py-2 mt-2 rounded">
            register
          </button>
        </form>
      </div>
    </section>
  );
};

export default page;

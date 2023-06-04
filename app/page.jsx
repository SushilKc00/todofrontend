"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "react-modal";

export default function Home() {
  const [value, setValue] = useState("");
  const [updateWork, setUpdateWork] = useState("");
  const [updateId, setUpdateID] = useState("");
  const [status, changeStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [arr, setArr] = useState([]);
  const router = useRouter();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    checkAuth();
    getWorks();
  }, []);

  const checkAuth = () => {
    const userid = JSON.parse(localStorage.getItem("userid"));
    if (!userid) {
      router.push("/login");
    }
  };

  const getWorks = async () => {
    if (JSON.parse(localStorage.getItem("userid"))) {
      const data = await fetch(
        `https://todo-dlza.onrender.com/todo/get/${JSON.parse(
          localStorage.getItem("userid")
        )}`
      );
      const res = await data.json();
      if (res.success) {
        setLoading(false);
        setArr([...res.works]);
      }
    }
  };

  // modal function
  function openModal(e) {
    setUpdateID(e);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleDelete = async (e) => {
    setLoading(true);
    const data = await fetch(
      `https://todo-dlza.onrender.com/todo/delete/${e}`,
      {
        method: "post",
      }
    );
    const res = await data.json();
    if (res.success) {
      setLoading(false);
      changeStatus(true);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    closeModal();
    const data = await fetch(
      `https://todo-dlza.onrender.com/todo/update/${updateId}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          works: updateWork,
        }),
      }
    );
    const res = await data.json();
    changeStatus(true);
  };

  const handleChagne = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value) {
      alert("please enter value");
    } else {
      setLoading(true);
      const data = await fetch("https://todo-dlza.onrender.com/todo/create", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: JSON.parse(localStorage.getItem("userid")),
          works: value,
        }),
      });
      const res = await data.json();
      if (res.success) {
        setLoading(false);
        changeStatus(true);
      }
      setValue("");
    }
  };

  if (status) {
    return <Home />;
  }
  return (
    <main className="w-screen h-[90vh] md:mt-2 mt-1 bg-red-100 md:py-3">
      <div className="md:flex justify-center">
        <div className="bg-slate-100 md:min-w-[60%] max-h-[40rem] min-h-[40rem] rounded-xl flex flex-col gap-3 overflow-auto shadow-xl py-2 px-1 relative">
          <h2 className="text-center font-bold text-xl pt-4">All Work</h2>
          <button
            className="absolute right-1 bg-green-400 py-0 px-2 rounded-md"
            onClick={() => {
              localStorage.clear();
              router.push("/login");
            }}
          >
            Logout
          </button>

          <form
            action=""
            className="flex md:gap-5 justify-center"
            onSubmit={handleSubmit}
          >
            <textarea
              rows={1}
              placeholder="enter text....."
              onChange={(e) => {
                handleChagne(e);
              }}
              name="text"
              value={value}
              className="md:w-[65%] w-[90%] p-4 outline-none rounded-full border border-yellow-500 resize-none"
            />
            <button className="btn bg-yellow-500 px-6 md:px-16 py-1 rounded-2xl text-sm font-semibold text-gray-800 hover:bg-yellow-300 duration-200">
              Add {loading && "Loading......."}
            </button>
          </form>
          <div className="flex flex-col gap-2">
            {arr.length > 0 ? (
              arr.map((e, index) => {
                return (
                  <div
                    className="  md:flex md:flex-row flex flex-col w-[65%] mx-auto gap-2"
                    key={index}
                  >
                    <div
                      className={`${
                        index % 2 == 0
                          ? "bg-pink-100 rounded-md md:max-w-[25rem] md:min-w-[25rem] max-h-[10rem] min-h-[10rem] overflow-auto px-2 py-4 shadow-lg"
                          : "bg-orange-200 rounded-md md:max-w-[25rem] md:min-w-[25rem] max-h-[10rem] min-h-[10rem] overflow-auto px-2 py-4 shadow-lg"
                      } `}
                    >
                      <p className="w-[90%] text-gray-800 leading-6 text-sm">
                        {e.works}
                      </p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <button
                        className="btn px-6 py-1 rounded-sm bg-green-400 font-medium text-xs hover:bg-green-500 duration-200"
                        onClick={() => {
                          handleDelete(e._id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="btn px-6 py-1 bg-blue-300 rounded-sm font-medium text-xs hover:bg-blue-500 duration-200"
                        onClick={(ele) => {
                          openModal(e._id);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="font-semibold text-center text-gray-500">
                No Works.....
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Moeal section  */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} className="font-bold text-slate-600">
          X
        </button>

        <h3 className="font-semibold text-center">Update</h3>

        <form
          onSubmit={(e) => {
            handleUpdate(e);
          }}
        >
          <textarea
            rows={1}
            placeholder="enter text....."
            onChange={(e) => {
              setUpdateWork(e.target.value);
            }}
            name="text"
            value={updateWork}
            className="md:w-[100%] w-[90%] p-4 outline-none rounded-full border border-yellow-500 resize-none mt-3"
          />
          <button className="btn bg-yellow-500 px-6 md:px-16 py-1 rounded-2xl text-sm font-semibold text-gray-800 hover:bg-yellow-300 duration-200">
            update {loading && "Loading......."}
          </button>
        </form>
      </Modal>
    </main>
  );
}

import { useState } from "react";
import { checkAuth } from "../Lib/CheckAuth";
import Alert from "./Alert";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import useSWR, { useSWRConfig } from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Comments({ id }) {
  const [comment, setComment] = useState("");
  const [viewAlert, setViewAlert] = useState(false);

  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(`/api/post/${id}`, fetcher);

  const handelPost = async (e) => {
    e.preventDefault();
    setComment("");

    const user = checkAuth();

    if (!user) {
      setViewAlert(true);

      setTimeout(() => {
        setViewAlert(false);
      }, 2000);

      return;
    }

    if (comment && user) {
      const docData = {
        userName: user.name,
        userImage: user.photo,
        comment: comment,
        date: Timestamp.now(),
        userId: user.uid,
      };

      const ref = collection(db, "posts", id, "comments");
      const docRef = await addDoc(ref, docData);
      mutate(`/api/post/${id}`);
    }
  };

  return (
    <>
      <Alert show={viewAlert} type="error" message="Please SignIn to comment" />
      <div className="flex flex-wrap mb-6 mt-6 mx-auto max-w-screen-md">
        <div className="relative container p-1 appearance-none label-floating">
          <form>
            <textarea
              className="autoexpand tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-100 border border-gray-100 dark:bg-gray-800 dark:border-gray-800 rounded  focus:outline-none focus:bg-white focus:border-gray-300 dark:focus:bg-gray-900 dark:focus:border-gray-700"
              id="message"
              type="text"
              placeholder="What are your thoughts..?"
              rows="3"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <div className="text-right">
              <button
                className="bg-indigo-500 dark:bg-indigo-600 text-white px-3 py-1.5 rounded text-sm font-semibold mr-5"
                onClick={(e) => {
                  e.preventDefault();
                  setComment("");
                }}
              >
                Reset
              </button>
              <button
                className="bg-indigo-500 dark:bg-indigo-600 text-white px-3 py-1.5 rounded text-sm font-semibold"
                onClick={handelPost}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mx-auto max-w-screen-md">
        <div className="m-2 md:m-0">
          {data &&
            data.comments &&
            data.comments.map((comment) => (
              <div className="space-y-4 py-3" key={comment.id}>
                <div className="flex">
                  <div className="flex-shrink-0 mr-1.5 md:mr-3">
                    <img
                      className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                      src={comment.userImage}
                      alt={comment.userName}
                    />
                  </div>
                  <div className="flex-1 border border-gray-300 dark:border-gray-500 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                    <strong className="text-gray-700 dark:text-gray-200">
                      {comment.userName}
                    </strong>{" "}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {comment.date.split(" ").slice(1, 4).join("-")}
                    </span>
                    {comment.comment.split("\n").map((com, index) => (
                      <p
                        className="text-sm text-gray-600 dark:text-gray-300"
                        key={index}
                      >
                        {com}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Comments;

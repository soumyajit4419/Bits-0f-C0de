import { useState } from "react";
import { useTheme } from "next-themes";
import useSWR, { useSWRConfig } from "swr";
import { AiOutlineHeart, AiFillHeart, AiOutlineLoading } from "react-icons/ai";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function LikeBtn({ id }) {
  const { theme } = useTheme();

  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(`/api/likes/${id}`, fetcher);

  const handelClick = async () => {
    setLoading(true);
    const response = await fetch("/api/like-blog", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      mutate(`/api/likes/${id}`);
      setLoading(false);
    }
  };

  return (
    <div className="justify-center pt-16 pb-6 flex flex-row items-center">
      {loading ? (
        <AiOutlineLoading
          className="animate-spin"
          style={{ fontSize: "1.5rem" }}
        />
      ) : (
        <>
          <button onClick={handelClick} disabled={loading ? true : false}>
            {data && data.hasUserLiked ? (
              <AiFillHeart
                style={{ fontSize: "2rem", color: "rgba(220, 38, 38)" }}
              />
            ) : (
              <AiOutlineHeart style={{ fontSize: "2rem" }} />
            )}
          </button>
          <span style={{ fontSize: "1rem", paddingLeft: "16px" }}>
            {data && data.totalLikes}
          </span>
        </>
      )}
    </div>
  );
}

export default LikeBtn;

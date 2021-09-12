import { VscInfo } from "react-icons/vsc";
import { HiOutlineEmojiHappy } from "react-icons/hi";

function Alert({ show, type, message }) {
  return show ? (
    <div
      className={
        type === "success"
          ? "fixed bottom-10 z-50 rounded-lg max-w-sm text-white bg-purple-500 dark:bg-purple-600 font-medium inset-x-0 mx-auto"
          : "fixed bottom-10 z-50 rounded-lg max-w-sm text-white bg-red-500 font-medium inset-x-0 mx-auto"
      }
    >
      <div className="px-4 py-3 leading-normal flex items-center justify-center">
        <div className="flex justify-center">
          {type && type == "error" && <VscInfo className="text-xl" />}
          {type && type == "success" && (
            <HiOutlineEmojiHappy className="text-xl" />
          )}
        </div>
        <p className="ml-6 text-center">{message}</p>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Alert;

import { Plus } from "lucide-react";
import Post from "./post";
import { useState } from "react";

export default function CreatePost() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex justify-center items-center w-full fixed left-0 right-0 bottom-9">
        <div onClick={handleClick}>
          <div
            style={{
              padding: "0.5em",
              width: "4em",
              height: "4em",
              borderRadius: "50%",
              backgroundColor: "white",
              boxShadow: "0.2em 0.2em 0.2em rgba(0, 0, 0, 20% )",
            }}
          >
            <Plus size={"3em"} color="#686868" />
          </div>
        </div>
        <div
          style={{
            position: "fixed",
            top: "0",
            pointerEvents: isOpen ? "auto" : "none",
          }}
        >
          <Post isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </>
  );
}

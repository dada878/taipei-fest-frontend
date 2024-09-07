"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import style from "./use.module.css";
import Image from "next/image";

import {
  getDataFromElement,
  sendPostRequest,
  getFileDataURL,
} from "./createPostRequest";
import { X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function Post({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const titleElement = useRef(null);
  const descriptionElement = useRef(null);
  const fileInputElement = useRef(null);
  const tagElement = useRef<HTMLSelectElement | null>(null);
  const imgRef = useRef(null);

  const [count, setCount] = useState(0);

  const queryClient = useQueryClient();

  const [textareaContent, setTextareaContent] = useState("");

  useEffect(function () {
    if (!descriptionElement.current) return;
    var currentElement: HTMLTextAreaElement = descriptionElement.current;

    currentElement.oninput = function () {
      setTextareaContent(currentElement.value);
      currentElement.style.height = "";
      currentElement.style.height =
        Math.min(currentElement.scrollHeight) + "px";
    };
  }, []);

  async function handleChange() {
    if (!fileInputElement.current) return;
    if (!imgRef.current) return;

    const base64 = await getFileDataURL(fileInputElement.current);
    var currentImage: HTMLImageElement = imgRef.current;
    currentImage.src = base64;
    var currentInput: HTMLInputElement = fileInputElement.current;
    currentInput.classList.add("hidden");
  }

  async function handleClick() {
    console.log("click");
    if (!titleElement.current) return;
    console.log("click", 2);
    if (!descriptionElement.current) return;
    console.log("click", 3);
    if (!fileInputElement.current) return;
    console.log("click", 4);
    if (!tagElement.current) return;
    console.log("click", 5);

    let lng = 0;
    let lat = 0;
    if (!navigator || !navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }
    console.log("click", 6);
    navigator.geolocation.getCurrentPosition(async (position) => {
      lng = position.coords.longitude;
      lat = position.coords.latitude;

      if (!titleElement.current) return;
      console.log("click", 7);
      if (!descriptionElement.current) return;
      console.log("click", 8);
      if (!fileInputElement.current) return;
      console.log("click", 9);

      let postData = await getDataFromElement(
        titleElement.current,
        descriptionElement.current,
        fileInputElement.current,
        "user"
      );

      await sendPostRequest(postData, lng, lat, "#global");

      queryClient.invalidateQueries({
        queryKey: ["markers"],
      });
      setIsOpen(false);
      setTimeout(() => {
          setCount(count + 1);
      }, 450);
    });
  }

  return (
    <div
      className={style.all}
      style={{
        opacity: isOpen ? "1" : "0",
        backgroundColor: isOpen ? "rgba(0, 0, 0, 0.55)" : "rgba(0, 0, 0, 0)",
      }}
    >
      <div
        key={count}
        className={style.bg}
        style={{ bottom: isOpen ? "0" : "-60vh" }}
      >
        <div className={style.title}>
          <input
            ref={titleElement}
            type="text"
            placeholder="請輸入標題..."
            name="title"
          ></input>
        </div>
        <div className={style.des}>
          <textarea
            ref={descriptionElement}
            placeholder="請輸入描述..."
            name="description"
          ></textarea>
        </div>
        <select name="tag" className={style.tags} ref={tagElement}>
          <option value="#good #global">好康</option>
          <option value="#daily #global">日常</option>
          <option value="#view #global">景點</option>
          <option value="#activity #global">活動</option>
          <option value="#road-conditions #global">路況</option>
          <option value="#report #global">檢舉</option>
          <option value="#car-accident #global">車禍</option>
        </select>
        <input
          onChange={handleChange}
          ref={fileInputElement}
          type="file"
          accept="image/png, image/gif, image/jpeg"
        />
        <div className={style.pic}>
          <img ref={imgRef} src="" alt="" />
        </div>
        <div className={style.butt}>
          <button onClick={handleClick}>發布動態</button>
        </div>
      </div>

      <span
        style={{
          position: "absolute",
          top: "0.5em",
          right: "0.5em",
          color: "white",
        }}
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <X size={"2.5em"} />
      </span>
    </div>
  );
}

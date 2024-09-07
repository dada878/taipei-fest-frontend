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
import { LoaderCircle, Upload, X } from "lucide-react";
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
  const [imageUploaded, setImageUploaded] = useState(false);
  const imgRef = useRef(null);

  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const parentElement = useRef(null);

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
    setImageUploaded(true);
    var currentInput: HTMLInputElement = fileInputElement.current;
    currentInput.classList.add("hidden");
  }

  async function handleClick() {
    setIsLoading(true);
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
        setImageUploaded(false);
      }, 450);
      setIsLoading(false);
    });
  }

  return (
    <div
      className={style.all}
      ref={parentElement}
      onClickCapture={(e) => {
        if (e.target === parentElement.current) {
          setIsOpen(false);
        }
      }}
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
        <div className={style.title}>
          <input
            ref={descriptionElement}
            type="text"
            placeholder="請輸入描述..."
            name="description"
          ></input>
        </div>
        <select
          name="tag"
          className="bg-gray-100 rounded-md p-3"
          ref={tagElement}
        >
          <option value="#good #global">好康</option>
          <option value="#daily #global">日常</option>
          <option value="#view #global">景點</option>
          <option value="#activity #global">活動</option>
          <option value="#road-conditions #global">路況</option>
          <option value="#report #global">檢舉</option>
          <option value="#car-accident #global">車禍</option>
        </select>
        <div
          className={
            "bg-gray-100 rounded-md" +
            " " +
            (imageUploaded ? "hidden" : "relative")
          }
        >
          <input
            onChange={handleChange}
            ref={fileInputElement}
            type="file"
            className="p-2 opacity-0"
            accept="image/png, image/gif, image/jpeg"
          />
          <div className="flex px-3 gap-3 absolute top-1/2 -translate-y-1/2 items-center pointer-events-none">
            <Upload />
            <span>上傳圖片</span>
          </div>
        </div>
        <div className={style.img + " " + (imageUploaded ? "rounded-md" : "hidden")}>
          <img ref={imgRef} src="" alt="" />
        </div>
        <div className={style.butt}>
          <button onClick={handleClick} disabled={isLoading}
            className={
              "transition-all duration-300 ease-in-out " +
              (isLoading ? "pointer-events-none opacity-50" : "")
            }
          >
            {
              isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <LoaderCircle  className="animate-spin" />
                  處理中
                </div>
              ) : "發布動態"
            }
          </button>
        </div>
      </div>
    </div>
  );
}

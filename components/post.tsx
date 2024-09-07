'use client';
import React, { useEffect, useRef } from "react";
import { Dispatch, SetStateAction } from 'react';
import style from "./use.module.css"
import Image from "next/image";

import { getDataFromElement, sendPostRequest } from './createPostRequest'



export default function Post({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) {
    const titleElement = useRef(null)
    const descriptionElement = useRef(null);
    const fileInputElement = useRef(null)

    const [textareaContent, setTextareaContent] = React.useState("");

    useEffect(function () {
        if (!descriptionElement.current) return;
        var currentElement: HTMLTextAreaElement = descriptionElement.current;

        currentElement.oninput = function () {
            console.log(currentElement.scrollHeight);
            setTextareaContent(currentElement.value);
            currentElement.style.height = "";
            currentElement.style.height = Math.min(currentElement.scrollHeight) + "px";
        }
    }, [])

    async function handleClick() {
        if (!titleElement.current) return
        if (!descriptionElement.current) return
        if (!fileInputElement.current) return

        var postData = await getDataFromElement(titleElement.current, descriptionElement.current, fileInputElement.current, 'user')
        await sendPostRequest(postData, 123.456, 456.789, "#global #A #B");
    }

    return (
        <div className={style.all} style={{ display: (isOpen ? 'flex' : 'none') }}>
            <div className={style.bg}>
                <div className={style.title}>
                    <input ref={titleElement} type="text" placeholder="請輸入標題..." name="title"></input>
                </div>
                <div className={style.des}>
                    <textarea ref={descriptionElement} placeholder="請輸入描述..." name="description"></textarea>
                </div>
                <select name="tag" className={style.tags}>
                    <option value="car-accident">車禍</option>
                    <option value="activity">活動</option>
                    <option value="report">檢舉</option>
                    <option value="daily">日常</option>
                    <option value="view">景點</option>
                    <option value="road-conditions">路況</option>
                    <option value="good">好康</option>
                </select>
                <input ref={fileInputElement} type="file" accept="image/png, image/gif, image/jpeg" />
                <div className={style.pic}>
                    <Image src="/qq.png" alt="" width={300} height={300} />
                </div>
                <div className={style.butt}>
                    <button onClick={handleClick}>發布動態</button>
                </div>
            </div>
        </div>
    )
}
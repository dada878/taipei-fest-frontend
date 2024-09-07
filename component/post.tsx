'use client';
import React, { useEffect, useRef } from "react";
import style from "../public/use.module.css"
import "./test"
import {submit} from "./test"
// import qq from "../public/qq.png"
import Image from "next/image";
export default function Pinsheet() {
    const textareaElement = useRef(null);
    const [textareaContent, setTextareaContent] = React.useState("");

    useEffect(function(){
        if(!textareaElement.current) return; 
        var currentElement: HTMLTextAreaElement = textareaElement.current;
        
        currentElement.oninput = function(){
            console.log(currentElement.scrollHeight)
            setTextareaContent(currentElement.value);
            currentElement.style.height = "";
            currentElement.style.height = Math.min(currentElement.scrollHeight) + "px";
        }
    }, [])
    
    return(
        <div className={style.all}>
            <div className={style.bg}>
                <div className={style.title}>
                    <input type="text" placeholder="請輸入標題..."  name="title"></input>
                </div>
                <div className={style.des}>
                    <textarea ref={textareaElement} placeholder="請輸入描述..." name="description"></textarea>
                </div>
                <div className={style.pic}>
                    <Image src="/../public/qq.png" alt="" width={300} height={300} />
                </div>
                <div className={style.butt}>
                    <button onClick={submit}>發布動態</button>
                </div>
            </div>
        </div>
    )
}
'use client';
import React, { useEffect, useRef } from "react";
import style from "../public/use.module.css"
import "./test"
import {submit} from "./test"
import qq from "../public/qq.png"
import Image from "next/image";
export default function Pinsheet() {
    const textareaElement = useRef(null);

    useEffect(function(){
        if(!textareaElement.current) return; 
        var currentElement: HTMLTextAreaElement = textareaElement.current;
        // textareaElement.addEventListener('input', (e) => {
        //     textareaElement.style.height = '100px';
        //     textareaElement.style.height = e.target.scrollHeight + 'px';
        // });
        currentElement.addEventListener('input', function(e) {
            if (!e.target) return;
            if (!(e.target instanceof HTMLTextAreaElement)) return;
            currentElement.style.height = '100px';
            currentElement.style.height = e.target.scrollHeight + 'px';
        });
    }, [textareaElement])
    
    return(
        <div className={style.all}>
            <div className={style.bg}>
                <div className={style.bar}>

                </div>
                <div className={style.title}>
                    <input type="text" placeholder="請輸入標題..."  name="title"></input>
                </div>
                <div className={style.des}>
                    <textarea placeholder="請輸入描述..." name="description"></textarea>
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
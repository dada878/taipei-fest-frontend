'use client';
import React, { useEffect, useRef } from "react";
import style from "./use.module.css"
import "./test"
import {submit} from "./test"
export default function Pinsheet() {
    /*const textareaElement = useRef(null);

    useEffect(()=>{
        if(textareaElement) { 
            textareaElement.addEventListener('input', (e) => {
            textareaElement.style.height = '100px';
            textareaElement.style.height = e.target.scrollHeight + 'px';
    });
        }
    }, [textareaElement])
    */
    return(
        <div>
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
                    <img src=""></img>
                </div>
                <div className={style.butt}>
                    <button onClick={submit}>發布動態</button>
                </div>
            </div>
        </div>
    )
}
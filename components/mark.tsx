import style from './mark.module.css'

export default function Mark({ src, scale }: { src: string, scale: number }) {
    return <>
        <div >
        <div className={style.re}>
            <div className={style.img} style={{ backgroundImage: `url('${src}'` }}></div>
            <div className={style.adv}></div>
        </div>
        </div>
    </>
}
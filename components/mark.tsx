import style from "./mark.module.css";

export default function Mark({
  src,
  scale = 1,
}: {
  src: string;
  scale?: number;
}) {
  return (
    <div className={style.re} style={{ transform: `scale(${scale})` }}>
      <div
        className={style.img}
        style={{ backgroundImage: `url('${src}'` }}
      ></div>
      <div className={style.adv}></div>
    </div>
  );
}

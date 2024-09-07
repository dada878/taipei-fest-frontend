"use client";

import Image from "next/image";
import {
  MessageCircle,
  Send,
  Share2,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";

export default function DetailCard({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <>
      {isOpen && (
        <div className="absolute left-0 right-0 bottom-0 top-0 w-full z-10 bg-white p-6 flex flex-col gap-4 pt-10">
          <div className="flex gap-3 items-end">
            <h2 className="text-3xl font-bold">是孔雀欸！</h2>
            <p className="text-gray-600">5 分鐘之前・起O哥</p>
          </div>
          <p className="text-gray-600">
            孔雀！孔雀！孔雀！孔雀！孔雀！孔雀！孔雀！孔雀！孔雀！孔雀！孔雀！孔雀！孔雀！孔雀！孔雀！孔雀！孔雀！孔雀！孔雀...
          </p>
          <Image
            src="https://unsplash.it/640/425?random"
            width={200}
            height={300}
            alt="image"
            className="w-full rounded-md"
          />
          <ActionButtons />
          <CommentBox />
          <div className="flex flex-col gap-3">
            <Comment name="起O哥" content="羽毛怎麼掉了 QAQ" />
            <Comment name="小明" content="羽毛怎麼掉了 QAQ" />
            <Comment name="小華" content="羽毛怎麼掉了 QAQ" />
          </div>
          <X size={24} className="absolute top-4 right-4 text-gray-500" onClick={() => {
            setIsOpen(false);
          }} />
        </div>
      )}
    </>
  );
}

function CommentBox() {
  return (
    <div className="flex gap-1 items-end pr-2 my-2">
      <input
        type="text"
        placeholder="說點什麼吧..."
        className="flex-1 border-b border-gray-500 placeholder:pl-1"
      />
      <Send size={24} className="text-gray-500" />
    </div>
  );
}

function Comment({ name, content }: { name: string; content: string }) {
  return (
    <div className="flex gap-3 items-center bg-gray-100 rounded-lg p-3">
      <div>
        <p className="font-bold">{name}</p>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="flex justify-around">
      <ActionButton
        icon={<ThumbsUp size={24} className="text-gray-600" />}
        number={5}
        onClick={() => {}}
      />
      <ActionButton
        icon={<ThumbsDown size={24} className="text-gray-600" />}
        number={5}
        onClick={() => {}}
      />
      <ActionButton
        icon={<Share2 size={24} className="text-gray-600" />}
        number={5}
        onClick={() => {}}
      />
      <ActionButton
        icon={<MessageCircle size={24} className="text-gray-600" />}
        number={5}
        onClick={() => {}}
      />
    </div>
  );
}

function ActionButton({
  icon,
  number,
  onClick,
}: {
  icon: React.ReactNode;
  number: number;
  onClick: () => void;
}) {
  return (
    <button className="flex gap-1 items-center" onClick={onClick}>
      {icon}
      <span>{number}</span>
    </button>
  );
}

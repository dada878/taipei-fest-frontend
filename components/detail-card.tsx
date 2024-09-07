"use client";

import Image from "next/image";
import TimeAgo from "javascript-time-ago";
import zhHant from "javascript-time-ago/locale/zh-Hant";

import {
  MessageCircle,
  Send,
  Share2,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import { Marker } from "./googleMap";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function DetailCard({
  isOpen,
  setIsOpen,
  marker,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  marker: Marker;
}) {
  TimeAgo.addDefaultLocale(zhHant);
  const timeAgo = new TimeAgo("zh-Hant");

  return (
    <>
      {isOpen && (
        <div className="absolute left-0 right-0 bottom-0 top-0 w-full z-10 bg-white p-6 flex flex-col gap-4 pt-10">
          <div className="flex gap-3 items-end">
            <h2 className="text-3xl font-bold">{marker.title}</h2>
            <p className="text-gray-600">
              {timeAgo.format(new Date(marker.time))}
            </p>
          </div>
          <p className="text-gray-600">
            {marker.description ?? "(沒有任何描述)"}
          </p>
          <Image
            src="https://unsplash.it/640/425?random"
            width={200}
            height={300}
            alt="image"
            className="w-full rounded-md"
          />
          <ActionButtons marker={marker} />
          <CommentBox />
          <div className="flex flex-col gap-3">
            <Comment name="起O哥" content="羽毛怎麼掉了 QAQ" />
            <Comment name="小明" content="羽毛怎麼掉了 QAQ" />
            <Comment name="小華" content="羽毛怎麼掉了 QAQ" />
          </div>
          <X
            size={24}
            className="absolute top-4 right-4 text-gray-500"
            onClick={() => {
              setIsOpen(false);
            }}
          />
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

interface VoteStatus {
  vote: 1 | -1 | 0;
}

function ActionButtons({ marker }: { marker: Marker }) {
  const {
    data: numberVoteStatus,
  } = useQuery<VoteStatus>({
    queryKey: ["voteStatus", marker._id],
    queryFn: async () => {
      const result = await fetch(
        `https://taipei.codingbear.mcloudtw.com/api/warp_event/${marker._id}/vote?userId=user`,
      );
      return result.json();
    },
  });

  const voteStatus = numberVoteStatus?.vote === 1 ? "up" : numberVoteStatus?.vote === -1 ? "down" : "none";
  const queryClient = useQueryClient();

  function updateVoteStatus(status: "up" | "down" | "none") {
    fetch(
      `https://taipei.codingbear.mcloudtw.com/api/warp_event/${marker._id}/vote`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "user",
          vote: status === "up" ? 1 : status === "down" ? -1 : 0,
        }),
      }
    ).then(() => {
      queryClient.invalidateQueries({
        queryKey: ["markers"],
      });
      queryClient.invalidateQueries({
        queryKey: ["voteStatus", marker._id],
      });
    });
  }

  return (
    <div className="flex justify-around">
      <ActionButton
        icon={
          <ThumbsUp
            size={24}
            className="text-gray-600"
            fill={voteStatus === "up" ? "currentColor" : "none"}
          />
        }
        number={marker.upvotes}
        onClick={() => {
          updateVoteStatus("up");
        }}
      />
      <ActionButton
        icon={
          <ThumbsDown
            size={24}
            className="text-gray-600"
            fill={voteStatus === "down" ? "currentColor" : "none"}
          />
        }
        number={marker.downvotes}
        onClick={() => {
          updateVoteStatus("down");
        }}
      />
      <ActionButton
        icon={<Share2 size={24} className="text-gray-600" />}
        number={marker.sharedCount}
        onClick={() => {}}
      />
      <ActionButton
        icon={<MessageCircle size={24} className="text-gray-600" />}
        number={marker.comments?.length ?? 0}
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

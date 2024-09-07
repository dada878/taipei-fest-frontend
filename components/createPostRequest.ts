import React from "react";
import axios from "axios"
import exp from "constants";

function getFileDataURL(fileInputElement: HTMLInputElement): Promise<string> {
  if (fileInputElement && fileInputElement.files && fileInputElement.files.length > 0) {
    const reader = new FileReader();
    const file = fileInputElement.files[0];

    return new Promise<string>((resolve, reject) => {
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error("Error reading file"));
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  } else {
    return Promise.reject(new Error("No file selected"));
  }
}

interface PostData {
  title: string;
  description: string;
  imageBase64: string;
}

export async function getDataFromElement(titleElement: HTMLInputElement, descriptionElement: HTMLInputElement, FileInputElement: HTMLInputElement, userId: string) : Promise<PostData> {
  var title = titleElement.value;
  var description = descriptionElement.value;
  var imageBase64 = await getFileDataURL(FileInputElement);
  alert("title: " + title);
  alert("description: " + description);
  alert("imageBase64: " + imageBase64);
  return {
    title,
    description,
    imageBase64
  };
}

export async function sendPostRequest(data: PostData, lng: number, lat: number, category: string) {
  const response = await axios.post("/api/post", {
    title: data.title,
    description: data.description,
    base64image: data.imageBase64,
    lng,
    lat,
    category
  });
  return response.data;
}
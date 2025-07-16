"use client";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
export default function Home() {
  const [message, setMessage] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState(null);
  const [theme, setTheme] = useState("light");
  const [Error, setError] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  // require('dotenv').config();
  const MODEL_NAME = "gemini-1.0-pro";

  // const genAi = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
  const genAi = new GoogleGenerativeAI('AIzaSyCcDplqD2zG25o4JCOSi1sPYjKTNLOmZn8');


  const generationCOnfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const saftySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = genAi
          .getGenerativeModel({ model: MODEL_NAME })
          .startChat({
            generationCOnfig,
            saftySettings,
            history: message.map((msg) => ({
              text: msg.text,
              role: msg.role,
            })),
          });
        setChat(newChat);
      } catch (error) {
        console.log(error);
        setError("Failed to Initialize the chat. Please try again");
      }
    };
    initChat();
  }, []);

  const handleSendMessage = async () => {
    setLoading(true);
    try {
      if (selectedImage !== null) {
        const userMessage = {
          images: selectedImage,
          role: "user",
          timestamp: new Date(),
        };

        setMessage((prevMessages) => [...prevMessages, userMessage]);
        setSelectedImage(null);
      } else {
        const userMessage = {
          text: userInput,
          role: "user",
          timestamp: new Date(),
        };
        setMessage((prevMessages) => [...prevMessages, userMessage]);
        setUserInput("");
      }

      if (chat) {
        var result = await chat.sendMessage(userInput);
        // if (selectedImage !== null) {
        //   result = await chat.sendMessage(selectedImage);
        //   setSelectedImage(null);
        // } else {
          // result = await chat.sendMessage(userInput);
        // }

        // console.log(result);
        const botMessage = {
          text: result.response.text(),
          role: "bot",
          timestamp: new Date(),
        };
        setLoading(false);
        setMessage((prevMessages) => [...prevMessages, botMessage]);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      setError("Failed to send message. Please try again");
    }
  };

  // Handle theme Change

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const getThemeColor = () => {
    switch (theme) {
      case "light":
        return {
          primary: "",
          secondry: "bg-gray-100",
          accent: "bg-blue-500",
          text: "text-gray-800",
        };
      case "dark":
        return {
          primary: "bg-gray-900",
          secondry: "bg-gray-800",
          accent: "bg-yellow-500",
          text: "text-gray-100",
        };
      default:
        return {
          primary: "bg-gray-100",
          secondry: "bg-gray-100",
          accent: "bg-gray-100",
          text: "text-gray-800",
        };
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { primary, secondry, accent, text } = getThemeColor();

  return (
    <div className={`flex flex-col h-screen p-4 ${primary}`}>
      <div className={` flex justify-between items-center mb-4`}>
        <h1 className={` text-2xl font-bold ${text}`}>PromptGPT Chat</h1>
        <div className=" flex space-x-2">
          <label htmlFor="theme" className={`text-sm ${text}`}>
            Theme:
          </label>
          <select
            id="theme"
            value={theme}
            onChange={handleThemeChange}
            className={`p-1 overflow-y-auto ${secondry} rounded-md p-2`}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <br />
        </div>
      </div>
      {/* {console.log("Imgs are = ", message)} */}
      {message.map((msg, index) => (
        <div
          key={index}
          className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}
        >
          {msg.role === "user" && msg.images ? (
            <span
            >
              {" "}
              <img
                style={{
                  maxWidth: "100%",
                  maxHeight: "150px",
                  marginBottom: "10px",
                  float:"right"
                }}
                src={msg.images}
                alt="Img"
              />{" "}
            </span>
          ) : (
            <span
              className={`p-2 rounded-lg ${
                msg.role === "user"
                  ? `${accent} text-white`
                  : `${primary} ${text}`
              }`}
            >
              {msg.text}
            </span>
          )}

          {msg.role === "bot" && (
            <p className={`text-xs ${text} mt-1`}>
              Prompt GPT {msg.timestamp.toLocaleString()}
            </p>
          )}
        </div>
      ))}
      {Loading && (
        <div className="flex items-center flex-col justify-center">
          <img
            width="100px"
            src="https://cdnl.iconscout.com/lottie/premium/thumb/confused-robot-5647510-4703493.gif"
            alt="Thinking....."
          />
        </div>
      )}
      {Error && <div className={` text-red-500 text-sm mb-4`}>{Error}</div>}
      <div className="flex flex-col h-screen ">
        <div className="mt-auto flex border-2 border-black rounded-tl-lg rounded-br-lg">
          {" "}
          <input
            type="text"
            placeholder="Message Prompt GPT"
            value={userInput}
            onChange={(e) =>{
              setUserInput(e.target.value);
              setSelectedImage(null);
            }}
            onKeyDown={handleKeyPress}
            className="flex-1 p-2 rounded-md border-b border-1 focus:outline-none focus:border-blue-500"
          />
          {/* <input
  type="file"
  accept="image/*"
  
/> */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="fileInput"
            onChange={handleImageChange}
          />
          <label
            htmlFor="fileInput"
            className="p-2 bg-blue-500 text-white rounded-md ml-2 hover:bg-blue-600 cursor-pointer"
          >
            Select Image
          </label>
          <button
            onClick={() => {
              userInput.length !== 0 || selectedImage !== null
                ? handleSendMessage()
                : Swal.fire("Input Field Can not be Empty.");
              // selectedImage !== null && handleSendImage(selectedImage)
              // console.log(selectedImage);
              selectedImage !== null && Swal.fire("Please note that the Gemini Free API does not provide a response based on images.");
            }}
            className="p-2 bg-blue-500 text-white rounded-md ml-2 hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

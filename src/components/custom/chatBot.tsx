"use client";
import * as React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { SheetTitle } from "../ui/sheet";

const messages = [
  "asdasdsa-start",
  "asdasdsa",
  "asdreretrete ret ert ert ert er ter t ert reterterasdsa",
  "asdasdsa",
  "asdasdsa",
  "asdasdsa",
  "asdasdsa",
  "nbghjkujhng",
  "ghkjbhjj",
];

export function ChatBot() {
  type conversationSender = "user" | "bot"; // or your enum/type

  const [conversationMessages, setConversationMessages] = React.useState<
    { message: string; source: conversationSender }[]
  >([{ message: "Hello, how can I help you?", source: "bot" }]);
  const [userInput, setUserInput] = React.useState("");

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [conversationMessages]);

  return (
    <>
      <SheetTitle>
        Not seeing what you are looking for? Ask the chatbot
      </SheetTitle>

      <div
        className="left-0 right-0 bottom-0 p-4 bg-gray overflow-auto"
        ref={messagesEndRef}
      >
        {conversationMessages.map((msg, idx) => (
          <p
            key={idx}
            className={`w-3/5 block px-4 py-2 mb-2 rounded-2xl shadow-md  ${
              msg.source === "user"
                ? "ml-auto bg-blue-100 text-right"
                : "bg-white"
            }`}
          >
            {msg.message}
          </p>
        ))}
      </div>
      <Textarea
        placeholder="Type your message here."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <Button
        className="mt-2"
        onClick={() => {
          const userMessage = document.querySelector("textarea")?.value;
          if (userMessage) {
            setConversationMessages((prev) => [
              ...prev,
              { message: userMessage, source: "user" },
            ]);
            setUserInput(""); // Clear the input field after sending
            setConversationMessages((prev) => [
              ...prev,
              { message: "default response", source: "bot" },
            ]);
          }
        }}
      >
        Send
      </Button>
    </>
  );
}

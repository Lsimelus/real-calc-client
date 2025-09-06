"use client";
import * as React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { SheetTitle } from "../ui/sheet";
import { fetchAiResponse } from "@/api/fetchAiResponse";
import { Loader } from "lucide-react";

export function ChatBot() {
  type conversationSender = "user" | "bot"; // or your enum/type

  const [conversationMessages, setConversationMessages] = React.useState<
    { message: string; source: conversationSender, success:boolean }[]
  >([{ message: "Hello I am chat bot, how can I help you?", source: "bot", success: true }]);
  const [userInput, setUserInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

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
            } ${msg.temp === 10 ? "text-red-600" : ""}`}
          >
            {msg.message}
          </p>
        ))}
        {loading && <Loader className="animate-opacity-pulse"/>}
      </div>
      <Textarea
        placeholder="Type your message here."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        disabled={loading}
      />
      <Button
        className="mt-2"
        disabled={loading}
        onClick={async () => {
          const userMessage = document.querySelector("textarea")?.value;
          if (userMessage) {
            setConversationMessages((prev) => [
              ...prev,
              { message: userMessage, source: "user", success: true },
            ]);
            setLoading(true);
            const response = (await fetchAiResponse(userInput));
            setLoading(false);
            setUserInput(""); // Clear the input field after sending
            setConversationMessages((prev) => [
              ...prev,
              response,
            ]);
          }
        }}
      >
        Send
      </Button>
    </>
  );
}

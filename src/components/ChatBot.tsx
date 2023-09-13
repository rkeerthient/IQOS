import {
  MessageSource,
  useChatActions,
  useChatState,
} from "@yext/chat-headless-react";
import * as React from "react";
import { useState } from "react";

interface Message {
  text: string;
  user: "user" | "bot";
}

const Chatbot: React.FC = () => {
  const messages = useChatState((s) => s.conversation.messages);
  const [input, setInput] = useState<string>("");
  const actions = useChatActions();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleError = React.useCallback(
    (e: unknown) => {
      console.error(e);
      actions.addMessage({
        text: "Sorry, I'm unable to respond at the moment. Please try again later!",
        source: MessageSource.BOT,
        timestamp: new Date().toISOString(),
      });
    },
    [actions]
  );

  const handleSubmit = React.useCallback(async () => {
    console.log("inn 2");
    actions.getNextMessage(input).catch((e) => handleError(e));
    setInput("");
  }, [actions, handleError, input]);

  const handleRestart = () => {
    actions.restartConversation();
    setInput("");
  };

  return (
    <div className="bg-white w-72 border border-gray-300 shadow-lg rounded">
      <div className="bg-blue-500 text-white py-2 px-4 rounded-t">
        <h2 className="text-lg font-semibold">Chatbot</h2>
      </div>
      <div className="h-48 overflow-y-auto px-4 py-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.source.toString() === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`py-2 px-4 rounded ${
                message.source.toString() !== "BOT"
                  ? "bg-gray-200"
                  : "bg-blue-500 text-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex px-4 py-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 py-2 px-3 border rounded-l border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
          value={input}
          onChange={handleInputChange}
        />
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-r hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>
      <div className="flex justify-center py-2">
        <button
          className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleRestart}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

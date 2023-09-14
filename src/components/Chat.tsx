import {
  MessageSource,
  useChatActions,
  useChatState,
} from "@yext/chat-headless-react";
import * as React from "react";
import { useEffect, useState } from "react";
import RTF from "./RTF";
import { FaSync } from "react-icons/fa";
import { BiUpArrowAlt } from "react-icons/bi";
import { useRef } from "react";
const Chat = () => {
  return <ChatComponent />;
};
function ChatComponent() {
  const isLoading = useChatState((s) => s.conversation.isLoading);
  const canSendMessage = useChatState((s) => s.conversation.canSendMessage);
  const messages = useChatState((s) => s.conversation.messages);
  const [input, setInput] = useState("");
  const actions = useChatActions();
  const messagesEndRef = useRef<HTMLElement | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRestartClick = () => {
    setIsSpinning(true);

    // Simulate a delay (you can replace this with your actual restart logic)
    setTimeout(() => {
      setIsSpinning(false);
    }, 200); // Change the delay duration as needed
    actions.restartConversation();
  };
  useEffect(() => {
    // Scroll to the last message whenever new messages are added
    scrollToBottom();
  }, [messages]);
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
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents a newline in the textarea
      onClick(); // Call your onClick function or any other appropriate action
    }
  };
  React.useEffect(() => {
    if (messages.length === 0) {
      actions.getNextMessage(input).catch((e) => handleError(e));
    }
  }, [messages, actions, input, handleError]);

  const onClick = React.useCallback(async () => {
    [
      "what flavour is it?",
      "what is this flavour?",
      "what flavour is this?",
      "what is its flavour?",
      "whats the price of it?",
      "what is its price?",
      "what flavour is it",
      "what is its flavour",
      "whats the price of it",
      "what is its price",
    ].includes(input.trim().toLowerCase()) &&
      actions.setContext({
        productId: "1014174169",
      });
    console.log(JSON.stringify(actions));

    actions.getNextMessage(input).catch((e) => handleError(e));
    setInput("");
  }, [actions, handleError, input]);

  const onInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    []
  );

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="z-10 bg-white">
      <div className="bg-[#f5a91b] text-white py-2 px-4 rounded-t flex justify-between items-center">
        <h2 className="text-lg font-semibold">PMI Assistant</h2>

        <button
          onClick={handleRestartClick}
          className={`${
            isSpinning ? "animate-spin" : ""
          }   text-white font-bold py-2 px-4 rounded ${
            isSpinning ? "pointer-events-none" : ""
          }`}
          disabled={isSpinning}
        >
          <FaSync />
        </button>
      </div>
      <div className="w-full h-[400px] overflow-scroll animate-fade-in @container yext-chat-message-bubble__top-container first:mt-4 p-4">
        <div className="flex flex-col @lg:flex-row @lg:items-center @lg:gap-x-2 @lg:m-1 yext-chat-message-bubble__sub-container yext-chat-message-bubble__sub-container__bot">
          {messages.map((m) => (
            <div
              className={`${
                m.source === "BOT"
                  ? ` my-2 relative group peer w-fit max-w-[80%] rounded-2xl p-4 yext-chat-message-bubble__bubble bg-gradient-to-tr from-slate-50 to-slate-100 yext-chat-message-bubble__bubble__bot`
                  : ` my-4 relative group peer w-fit max-w-[80%] rounded-2xl p-4 yext-chat-message-bubble__bubble ml-auto @lg:ml-0 bg-gradient-to-tr from-blue-600 to-blue-700 text-white yext-chat-message-bubble__bubble__user`
              }`}
            >
              <div
                className={`${
                  m.source === "BOT" ? `text-slate-900 ` : `text-white`
                } text-[13px] @[480px]:text-base prose overflow-x-auto yext-chat-message-bubble__text yext-chat-message-bubble__text__bot`}
              >
                <p>
                  <RTF>{m.text}</RTF>
                </p>
              </div>
            </div>
          ))}
          {isLoading && <p>loading...</p>}
          <div ref={(el) => (messagesEndRef.current = el)}></div>
        </div>
      </div>
      <div className="w-full p-4 yext-chat-panel__input-container">
        <div className="w-full h-fit flex flex-row relative @container yext-chat-input__container items-center">
          <textarea
            className="w-full p-4 pr-12 border border-slate-300 rounded-3xl resize-none text-[13px] @[480px]:text-base placeholder:text-[13px] placeholder:@[480px]:text-base text-slate-900 yext-chat-input__text-area h-[54px]"
            value={input}
            disabled={!canSendMessage}
            onChange={onInputChange}
            onKeyDown={handleKeyPress}
          />
          <button
            className="rounded-full p-1.5 w-8 h-8 stroke-2 text-white bg-[#f5a91b] disabled:bg-slate-200  active:scale-90 transition-all absolute right-4 bottom-2.5 @[480px]:bottom-3.5 yext-chat-input__send-button flex justify-center items-center"
            onClick={onClick}
            disabled={input ? false : true}
          >
            <BiUpArrowAlt className="h-full w-full" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;

import {
  ChatHeadlessProvider,
  useChatActions,
  useChatState,
  HeadlessConfig,
  MessageSource,
  Environment,
} from "@yext/chat-headless-react";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Markdown } from "@yext/react-components";

const botConfig: HeadlessConfig = {
  apiKey: "114fc3561dc13f4d76c3327010ba2cbd",
  botId: "ecco-shoes",
  analyticsConfig: {
    sessionTrackingEnabled: false,
  },
  env: Environment.SANDBOX,
};

function Chat() {
  return (
    <div className="App">
      <ChatHeadlessProvider config={botConfig}>
        <ChatComponent />
      </ChatHeadlessProvider>
    </div>
  );
}

function ChatComponent() {
  const isLoading = useChatState((s) => s.conversation.isLoading);
  const canSendMessage = useChatState((s) => s.conversation.canSendMessage);
  const messages = useChatState((s) => s.conversation.messages);
  const respType = useChatState((s) => s.conversation.notes?.queryResult);
  const [input, setInput] = useState("");
  const actions = useChatActions();

  const handleError = useCallback(
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

  useEffect(() => {
    if (messages.length === 0) {
      actions.getNextMessage(input).catch((e) => handleError(e));
    }
  }, [messages, actions, input, handleError]);

  const onClick = useCallback(async () => {
    actions.getNextMessage(input).catch((e) => handleError(e));
    setInput("");
  }, [actions, handleError, input]);

  const onClickStream = useCallback(() => {
    actions.streamNextMessage(input).catch((e) => handleError(e));
    setInput("");
  }, [actions, handleError, input]);

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    []
  );

  return (
    <div>
      {!isLoading &&
        messages.map((m, i) => (
          <>
            {/* {respType && <p>prodRes</p>}
          <p key={i}>{`${m.source}: ${m.text}`}</p> */}
            {<div>{formatResult(m.text)}</div>}
          </>
        ))}
      {isLoading && <p>loading...</p>}
      <input
        className="border"
        type="text"
        value={input}
        disabled={!canSendMessage}
        onChange={onInputChange}
      />
      <button onClick={onClick}>Send</button>
      <button onClick={onClickStream}>Send (Stream)</button>
    </div>
  );
}

export default Chat;

const formatResult = (data: any) => {
  return <Markdown content={data}></Markdown>;
};

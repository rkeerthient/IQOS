import * as React from "react";
import Site from "../types/Site";
import Header from "./header";
import Footer from "./footer";
import { IoChatbubblesSharp, IoCaretDownOutline } from "react-icons/io5";
import {
  ChatHeadlessProvider,
  HeadlessConfig,
} from "@yext/chat-headless-react";
import "@yext/chat-ui-react/bundle.css";
import { useState } from "react";
import Chat from "./Chat";
type Props = {
  _site?: Site;
  children?: React.ReactNode;
};
const config: HeadlessConfig = {
  botId: "pmi-chat-assistant",
  apiKey: "2231e2d10f42dc48679cff41b254ee7f",
};
const PageLayout = ({ _site, children }: Props) => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className=" ">
      <Header _site={_site} />
      {children}
      <Footer _site={_site}></Footer>
      {showChat && (
        <div
          className="w-1/5 h-[600] mb-8"
          style={{ bottom: "20px", right: "20px", position: "fixed" }}
        >
          <ChatHeadlessProvider config={config}>
            <Chat></Chat>
          </ChatHeadlessProvider>
        </div>
      )}
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        {!showChat ? (
          <IoChatbubblesSharp
            onClick={() => setShowChat(!showChat)}
            style={{
              fontSize: "1.875rem",
              color: "#f5a91b",
              lineHeight: "2.25rem",
            }}
          />
        ) : (
          <IoCaretDownOutline
            onClick={() => setShowChat(!showChat)}
            style={{
              fontSize: "1.875rem",
              color: "#f5a91b",
              lineHeight: "2.25rem",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PageLayout;

import { styled } from "@macaron-css/solid";
import { Index, Match, Switch, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { zork } from "~/modules/zork/zMachine";
import { style } from "@macaron-css/core";
import { hcl } from "~/modules/color";
import { theme } from "~/theme";
import { ChevronLeftIcon } from "~/icons/radix";
import { generateChain } from "~/modules/markov";
import {
  CLARENCE_CLARITY_MODEL,
  JOCKSTRAP_MODEL,
} from "~/modules/markov/models";
import { ChatBubbleIcon } from "~/icons/material";

type Message = { text: string; options: any; side: "left" | "right" };

function createMessages() {
  const [messages, setMessages] = createStore<Message[]>([]);

  function addMessage(message: Message) {
    setMessages(messages.length, message);
  }

  return [messages, addMessage] as const;
}

type Page = "" | "zork" | "jockstrap" | "clarence";

const [page, setPage] = createSignal<Page>("zork");

export default function ChatWidget() {
  const [show, setShow] = createSignal(false);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={show() ? "true" : "false"}
        data-state={show() ? "open" : "closed"}
        onClick={() => setShow((s) => !s)}
        css={{
          position: "fixed",
        }}
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          width: "48px",
          height: "48px",
          "border-radius": "24px",
          "background-color": "var(--color-brand)",
          color: "white",
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
        }}
      >
        <ChatBubbleIcon />
      </button>
      {show() && (
        <Root role="dialog">
          <Switch
            fallback={
              <>
                <div
                  style={{
                    height: "64px",
                    "background-color": "var(--color-brand)",
                    color: "white",
                    "text-align": "center",
                    "font-size": "16px",
                    "font-weight": 600,
                    "line-height": "64px",
                  }}
                >
                  Messages
                </div>
                <ChatRow onClick={() => setPage("zork")}>
                  <p>Zack</p>
                  <p style={{ color: theme.text2 }}>Zork</p>
                </ChatRow>
                <div
                  class={style({
                    borderTop: `1px solid ${theme.separator}`,
                    margin: "0 20px",
                  })}
                />
                <ChatRow onClick={() => setPage("jockstrap")}>
                  <p>Georgia</p>
                  <p style={{ color: theme.text2 }}>Jockstrap Markov-chain</p>
                </ChatRow>
                <div
                  class={style({
                    borderTop: `1px solid ${theme.separator}`,
                    margin: "0 20px",
                  })}
                />
                <ChatRow onClick={() => setPage("clarence")}>
                  <p>Clarence</p>
                  <p style={{ color: theme.text2 }}>
                    Clarence Clarity Markov-chain
                  </p>
                </ChatRow>
              </>
            }
          >
            <Match when={page() === "zork"}>
              <ZorkPage />
            </Match>
            <Match when={page() === "jockstrap"}>
              <JockstrapPage />
            </Match>
            <Match when={page() === "clarence"}>
              <ClarencePage />
            </Match>
          </Switch>
        </Root>
      )}
    </>
  );
}

const Root = styled("div", {
  base: {
    position: "fixed",
    bottom: 16 + 48 + 16,
    right: 16,
    width: 400,
    height: 704,
    boxShadow: "0 0 3px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
  },
});

const ChatRow = styled("button", {
  base: {
    padding: "16px 20px",
    textAlign: "left",
    fontSize: 14,
    lineHeight: "16px",
    // borderBottomWidth: 1,
    // borderColor: theme.separator,
  },
});

// ZORK
const [zorkMessages, addZorkMessage] = createMessages();
const [zorkLocation, setZorkLocation] = createSignal("");
zork.listen((text, options) => {
  addZorkMessage({ text, options, side: "left" });
});
zork.hudListen(({ location }) => {
  setZorkLocation(location);
});
zork.perform("LOOK");

function ZorkPage() {
  return (
    <>
      <ChatHeader
        title="Zack"
        subTitle={zorkLocation()}
        onPressBack={() => setPage("")}
      />
      <MessagesScrollArea messages={zorkMessages} />
      <ChatInput
        onValueCommit={(value) => {
          addZorkMessage({
            text: value,
            options: {},
            side: "right",
          });
          zork.go(value);
        }}
      />
    </>
  );
}

// JOCKSTRAP
const [jockstrapMessages, addJockstrapMessage] = createMessages();

function JockstrapPage() {
  return (
    <>
      <ChatHeader title="Georgia" onPressBack={() => setPage("")} />
      <MessagesScrollArea messages={jockstrapMessages} />
      <ChatInput
        onValueCommit={(value) => {
          addJockstrapMessage({
            text: value,
            options: {},
            side: "right",
          });
          setTimeout(() => {
            addJockstrapMessage({
              text: generateChain(JOCKSTRAP_MODEL),
              options: {},
              side: "left",
            });
          }, 1000);
        }}
      />
    </>
  );
}

// CLARENCE CLARITY
const [clarenceMessages, addClarenceMessage] = createMessages();

function ClarencePage() {
  return (
    <>
      <ChatHeader title="Clarence" onPressBack={() => setPage("")} />
      <MessagesScrollArea messages={clarenceMessages} />
      <ChatInput
        onValueCommit={(value) => {
          addClarenceMessage({
            text: value,
            options: {},
            side: "right",
          });
          setTimeout(() => {
            addClarenceMessage({
              text: generateChain(CLARENCE_CLARITY_MODEL),
              options: {},
              side: "left",
            });
          }, 1000);
        }}
      />
    </>
  );
}

// COMPONENTS

function ChatHeader(props: {
  title: string;
  subTitle?: string;
  onPressBack?: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        "align-items": "center",
        "padding-left": "6px",
        "padding-right": "6px",
        height: "64px",
        padding: "0 8px 0",
        "background-color": "var(--color-brand)",
        color: "white",
        "font-size": "14px",
        "line-height": "20px",
      }}
    >
      <button
        style={{
          height: "48px",
          width: "48px",
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
          "margin-right": "8px",
        }}
        onClick={props.onPressBack}
      >
        <ChevronLeftIcon />
      </button>
      <div>
        <div style={{ "font-weight": 600 }}>{props.title}</div>
        <div>{props.subTitle}</div>
      </div>
    </div>
  );
}

function MessagesScrollArea(props: { messages: Message[] }) {
  let scrollArea: HTMLDivElement = null!;
  createEffect(() => {
    props.messages.length;
    scrollArea?.scrollTo({ top: scrollArea.scrollHeight });
  });
  return (
    <div
      ref={scrollArea}
      class={style({
        flex: 1,
        overflow: "auto",
        padding: "16px",
      })}
    >
      <Index each={props.messages}>
        {(message, i) => (
          <div
            class={style({
              display: "flex",
            })}
            style={{
              "justify-content": message().side === "right" ? "end" : "start",
              margin: message().side === "right" ? "16px 0" : "0",
            }}
          >
            <div
              style={{
                "font-weight": message().options.bold ? 600 : 400,
                "white-space": "pre-wrap",
                "max-width": "80%",
                padding: "8px 12px",
                "font-size": "14px",
                "background-color":
                  message().side === "right"
                    ? "var(--color-brand)"
                    : hcl(0, 0, 95),
                color: message().side === "right" ? "white" : theme.text1,
                "margin-top": "2px",
                "border-radius": "20px",
                "border-top-left-radius":
                  message().side === "left" &&
                  props.messages[i - 1]?.side === "left"
                    ? "4px"
                    : undefined,
                "border-bottom-left-radius":
                  message().side === "left" &&
                  props.messages[i + 1]?.side === "left"
                    ? "4px"
                    : undefined,
              }}
            >
              {message().text}
            </div>
          </div>
        )}
      </Index>
    </div>
  );
}

function ChatInput(props: { onValueCommit: (value: string) => void }) {
  const [prompt, setPrompt] = createSignal("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.onValueCommit(prompt());
        setPrompt("");
      }}
    >
      <div
        style={{
          margin: "0 16px",
          height: "1px",
          "background-color": theme.separator,
        }}
      />
      <input
        value={prompt()}
        placeholder="Aa"
        class={style({
          width: "100%",
          padding: "12px 16px 12px",
          outline: "none !important",
          selectors: {
            "&::placeholder": {
              color: theme.text2,
            },
          },
        })}
        onChange={(e) => setPrompt(e.currentTarget.value)}
      />
      <button hidden />
    </form>
  );
}

import { styled } from "@macaron-css/solid";
import { For, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { zork } from "~/modules/zork/zMachine";
import { style } from "@macaron-css/core";

export function ChatWidget() {
  const [show, setShow] = createSignal(false);
  const [prompt, setPrompt] = createSignal("");
  const [messages, setMessages] = createStore<
    Array<{ text: string; options: any }>
  >([]);
  zork.listen((text, options) => {
    setMessages(messages.length, { text, options });
  });
  zork.perform("LOOK");
  return (
    <>
      <button
        onClick={() => setShow(true)}
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          width: "64px",
          height: "64px",
          "border-radius": "16px",
          "background-color": "#ff1a55",
          color: "white",
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      {show() && (
        <Root>
          <div
            style={{
              display: "flex",
              "align-items": "center",
              "justify-content": "space-between",
              "padding-left": "6px",
              "padding-right": "6px",
            }}
          >
            <div>Chat</div>
            <button onClick={() => setShow(false)}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            class={style({
              flex: 1,
              overflow: "auto",
            })}
          >
            <For each={messages}>
              {(message) => (
                <div
                  style={{
                    "font-weight": message.options.bold ? 600 : 400,
                    "white-space": "pre-wrap",
                  }}
                >
                  {message.text}
                </div>
              )}
            </For>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setMessages(messages.length, {
                text: "\n> " + prompt(),
                options: {},
              });
              zork.go(prompt());
              setPrompt("");
            }}
          >
            <input
              style={{ border: "1px solid black" }}
              value={prompt()}
              class={style({
                width: "100%",
              })}
              onChange={(e) => setPrompt(e.currentTarget.value)}
            />
            <button hidden />
          </form>
        </Root>
      )}
    </>
  );
}

const Root = styled("div", {
  base: {
    position: "fixed",
    bottom: 16,
    right: 16,
    width: 320,
    height: (320 * 3) / 2,
    boxShadow: "0 0 3px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
});

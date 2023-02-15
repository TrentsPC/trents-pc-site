import { style } from "@macaron-css/core";
import { styled } from "@macaron-css/solid";
import { For, JSX, createEffect, createSignal } from "solid-js";
import { theme } from "~/theme";

export const Description = styled("p", {
  base: {
    fontSize: 22,
    marginTop: "-16px !important",
    lineHeight: "28px",
    color: theme.text2,
  },
});

export function Pre(props: { children: string; language?: string }) {
  return (
    <pre
      class={style({
        maxHeight: "80vh",
        padding: 16,
        borderRadius: 8,
        overflow: "auto",
        fontSize: 13,
        lineHeight: "21px",
        position: "relative",
        backgroundColor: "rgb(28, 30, 40)",
        color: "white",
      })}
    >
      <code>{props.children}</code>
    </pre>
  );
}

export function Highlights({ features }: { features: JSX.Element[] }) {
  return (
    <div
      class={style({
        marginTop: 48,
      })}
    >
      <div
        class={style({
          marginBottom: 24,
          marginRight: 24,
        })}
      >
        <h2>Features</h2>
        <ul>
          <For each={features}>
            {(feature) => (
              <li
                class={style({
                  display: "flex",
                  marginTop: 12,
                  fontSize: 14,
                  lineHeight: "20px",
                })}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  class={style({ marginRight: 12, marginTop: 2 })}
                >
                  <path
                    fill="var(--color-brand)"
                    d="M 12 0 L 24 12 L 12 24 L 0 12 Z"
                  />
                </svg>
                <span>{feature}</span>
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
}

export const HeroContainer = styled("div", {
  base: {
    background:
      "linear-gradient(150deg, var(--color-brand), var(--color-brand2), var(--color-brand3), var(--color-brand4), var(--color-brand5), var(--color-brand6), var(--color-brand7))",
    position: "relative",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: "100px",
    paddingBottom: "100px",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});

export type PropsTableProps = {
  data: Array<{
    name: string;
    required?: boolean;
    type: "string" | "boolean" | "number";
    default: string;
    description: string;
  }>;
};

export function PropsTable(props: PropsTableProps) {
  return (
    <div class={style({ marginBottom: 16 })}>
      <table
        class={style({
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        })}
      >
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <For each={props.data}>
            {(prop) => (
              <tr>
                <td>{prop.name}</td>
                <td>{prop.type}</td>
                <td>{prop.default}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}

export type HeroCodeBlockProps = {
  files: Array<{
    title: string;
    cssLib?: string;
    source: string;
  }>;
};
export function HeroCodeBlock(props: HeroCodeBlockProps) {
  const [isCodeExpanded, setIsCodeExpanded] = createSignal(false);
  const [currentTabValue, setCurrentTabValue] = createSignal(
    props.files[0].title
  );

  createEffect(() => {
    // Reset tab if the current one isn't available
    const tabExists = props.files.find(
      (tab) => tab.title === currentTabValue()
    );
    if (!tabExists) setCurrentTabValue(props.files[0]?.title);
  });

  return (
    <div>
      <CodeBlock>
        <code>{props.files[0].source}</code>
      </CodeBlock>
    </div>
  );
}

const CodeBlock = styled("pre", {
  base: {
    maxHeight: "80vh",
    padding: 16,
    borderRadius: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    overflow: "auto",
    fontSize: 13,
    lineHeight: "21px",
    position: "relative",
    backgroundColor: "rgb(28, 30, 40)",
    color: "white",
  },
});

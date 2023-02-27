import { style } from "@macaron-css/core";
import { styled } from "@macaron-css/solid";
import { css } from "vite-plugin-inline-css-modules";
import {
  Description,
  HeroCodeBlock,
  HeroContainer,
  Highlights,
  Pre,
  PropsTable,
} from "~/components/docs";
import { Label } from "~/modules/solid-radix";

export default function Page() {
  return (
    <>
      <h1>Label</h1>
      <Description>
        Renders an accessible label associated with controls.
      </Description>
      <HeroContainer>
        <LabelDemo />
      </HeroContainer>
      <HeroCodeBlock
        files={[
          {
            title: "index.jsx",
            source: `import { Label } from 'solid-radix';
import './styles.css';

const LabelDemo = () => (
  <div
    style={{ display: 'flex', padding: '0 20px', 'flex-wrap': 'wrap', gap: "15px", 'align-items': 'center' }}
  >
    <Label class="label" for="firstName">
      First name
    </Label>
    <input class="input" type="text" id="firstName" value="Pedro Duarte" />
  </div>
);

export default LabelDemo;`,
          },
        ]}
      />
      <Highlights
        features={[
          "Text selection is prevented when double clicking label.",
          "Supports nested controls.",
        ]}
      />
      <h2>Anatomy</h2>
      <p>Import the component.</p>
      <Pre
        children={`import { Label } from 'solid-radix';

export default () => <Label />;`}
      />

      <h2>API Reference</h2>

      <h3>Root</h3>

      <p>Contains the content for the label.</p>

      <PropsTable
        data={[
          {
            name: "asChild",
            required: false,
            type: "boolean",
            default: "false",
            description:
              "Change the component to the HTML tag or custom component of the only child. This will merge the original component props with the props of the supplied element/component and change the underlying DOM node.",
          },
          {
            name: "for",
            type: "string",
            default: "",
            description: "The id of the element the label is associated with.",
          },
        ]}
      />
      <h2>Accessibility</h2>
      <p>
        This component is based on the native <code>label</code> element, it
        will automatically apply the correct labelling when wrapping controls or
        using the <code>for</code> attribute. For your own custom controls to
        work correctly, ensure they use native elements such as{" "}
        <code>button</code> or <code>input</code> as a base.
      </p>
      <QuickNav>Quick nav</QuickNav>
    </>
  );
}

const QuickNav = styled("div", {
  base: {
    position: "fixed",
    top: 0,
    right: 0,
    width: 250,
    padding: "68px 25px",
  },
});

function LabelDemo() {
  return (
    <div
      style={{
        display: "flex",
        padding: "0 20px",
        "flex-wrap": "wrap",
        gap: "15px",
        "align-items": "center",
      }}
    >
      <Label
        class={style({
          fontSize: 15,
          fontWeight: 500,
          lineHeight: "35px",
          color: "white",
        })}
        for="firstName"
      >
        First name
      </Label>
      <input
        class={style({
          width: 200,
          borderRadius: 4,
          padding: "0 10px",
          height: 35,
          fontSize: 15,
          lineHeight: 1,
          color: "white",
          background: "transparent",
          boxShadow: "0 0 0 1px white",
        })}
        type="text"
        id="firstName"
        value="Pedro Duarte"
      />
    </div>
  );
}

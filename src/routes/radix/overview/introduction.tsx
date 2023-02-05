import { globalStyle } from "@macaron-css/core";
import { styled } from "@macaron-css/solid";
import { Description } from "~/components/docs";
import { theme } from "~/theme";

export default function Introduction() {
  return (
    <>
      <h1>Introduction</h1>
      <Description>
        Solid Radix is an unofficial port of{" "}
        <a href="https://radix-ui.com">Radix UI Primitives</a> for{" "}
        <a href="https://solidjs.com">Solid</a>.
      </Description>
      <h2>Key features</h2>
      <h3>Accessible</h3>
      <p>
        Components follow the WAI-ARIA Authoring Practices whenever possible.
        Solid Radix handle accessibility implementation details like ARIA
        attributes, focus management, and keyboard navigation.
      </p>
      <h3>Composable</h3>
      <p>
        Solid Radix provides granular access to each component parts, so you can
        wrap them and add your own event listeners, props, etc.
      </p>
      <h3>Unstyled</h3>
      <p>
        Components are shipped with zero styles, allowing you to completely
        customize the look and feel. Bring your preferred styling solution
        (vanilla CSS, Tailwind, CSS-in-JS libraries, etc...).
      </p>
      <h2>Acknowledgments</h2>
      <p>
        Large portions of the codebase for <code>solid-radix</code> and the
        writing for the documentation you are reading right now is ripped
        wholesale from Radix UI, and thats a good thing. Radix UI has better DX
        than anything in the Solid ecosystem, and any deviation would make this
        library actively worse. All credit goes to the Radix team, any mistakes
        are my own.
      </p>
      <h2>Limitations</h2>
      {/* <p>
          I am a dumb bitch<sup>[citation needed]</sup>. This is my first
          library written using Solid and as such I make no promises as to its
          performance or stability. If you're a less dumb bitch, feel free to
          send in a PR for anything wonky.
        </p> */}
      {/* <p>PRs will be prioritized by:</p>
        <ol>
          <li>Getting closer to 1:1 feature parity to Radix UI</li>
          <li>Bug fixes</li>
          <li>performance boosts</li>
        </ol> */}
      <QuickNav>Quick nav</QuickNav>
    </>
  );
}

const Prose = styled("div", {
  base: {
    width: "100%",
    maxWidth: 780,
    padding: "65px 16px",
    margin: "0 auto",
  },
});
globalStyle(`${Prose} h1`, {
  fontSize: "2.25em",
  marginTop: "0",
  marginBottom: "0.8888889em",
  lineHeight: "1.1111111",
});
globalStyle(`${Prose} h2`, {
  fontSize: "1.5em",
  marginTop: "2em",
  marginBottom: "1em",
  lineHeight: "1.3333333",
});

globalStyle(`${Prose} p`, {
  marginTop: "1.25em",
  marginBottom: "1.25em",
});
globalStyle(`${Prose} p.lead`, {
  fontSize: 22,
  marginTop: -16,
  lineHeight: "28px",
  color: theme.text2,
});

const QuickNav = styled("div", {
  base: {
    position: "fixed",
    top: 0,
    right: 0,
    width: 250,
    padding: "68px 25px",
  },
});

import { style } from "@macaron-css/core";
import { styled } from "@macaron-css/solid";
import { Cross2Icon } from "solid-radix-icons";
import { Description, HeroContainer, Highlights } from "~/components/docs";
import { Dialog } from "~/modules/radix";
import { theme } from "~/theme";

export default function Introduction() {
  return (
    <>
      <h1>Dialog</h1>
      <Description>
        A window overlaid on either the primary window or another dialog window,
        rendering the content underneath inert.
      </Description>
      <HeroContainer>
        <Dialog.Root>
          <Dialog.Trigger
            class={style({
              all: "unset",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 99,
              padding: "0 24px",
              fontSize: 14,
              lineHeight: 1,
              fontWeight: 500,
              height: 40,
              background: "white",
              color: theme.text1,
            })}
          >
            Edit profile
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay
              class={style({
                // zIndex: 9999,
                backgroundColor: "hsla(0deg, 0%, 20%, 0.4)",
                position: "fixed",
                inset: 0,
                // animation: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
              })}
            />
            <Dialog.Content
              class={style({
                backgroundColor: "white",
                borderRadius: "6px",
                boxShadow:
                  "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "90vw",
                maxWidth: "450px",
                maxHeight: "85vh",
                padding: "25px",
              })}
            >
              <Dialog.Title />
              <Dialog.Description />
              <Dialog.Close
                class={style({
                  fontFamily: "inherit",
                  borderRadius: "100%",
                  height: "25px",
                  width: "25px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--violet11)",
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                })}
              >
                <Cross2Icon />
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </HeroContainer>
      <Highlights
        features={[
          "Supports modal and non-modal modes.",
          "Focus is automatically trapped when modal.",
          "Can be controlled or uncontrolled.",
          <>
            Manages screen reader announcements with <code>Title</code> and{" "}
            <code>Description</code> components.
          </>,
          "Esc closes the component automatically.",
        ]}
      />
      <h2>Anatomy</h2>
      <p>Import all parts and piece them together.</p>
      <pre>
        <code
          textContent={`import { Dialog } from 'solid-radix';

export default () => (
  <Dialog.Root>
    <Dialog.Trigger />
    <Dialog.Portal>
      <Dialog.Overlay />
      <Dialog.Content>
        <Dialog.Title />
        <Dialog.Description />
        <Dialog.Close />
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);`}
        />
      </pre>
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

// const Button = styled('button', {
//   all: 'unset',
//   display: 'inline-flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   borderRadius: 4,
//   padding: '0 15px',
//   fontSize: 15,
//   lineHeight: 1,
//   fontWeight: 500,
//   height: 35,

//   variants: {
//     variant: {
//       violet: {
//         backgroundColor: 'white',
//         color: violet.violet11,
//         boxShadow: `0 2px 10px ${blackA.blackA7}`,
//         '&:hover': { backgroundColor: mauve.mauve3 },
//         '&:focus': { boxShadow: `0 0 0 2px black` },
//       },
//       green: {
//         backgroundColor: green.green4,
//         color: green.green11,
//         '&:hover': { backgroundColor: green.green5 },
//         '&:focus': { boxShadow: `0 0 0 2px ${green.green7}` },
//       },
//     },
//   },

//   defaultVariants: {
//     variant: 'violet',
//   },
// });

import { globalStyle, style } from "@macaron-css/core";
import { styled } from "@macaron-css/solid";
import { createSignal } from "solid-js";
import { isServer } from "solid-js/web";
import { A, Outlet } from "solid-start";
import { HeartIcon } from "~/icons/radix";
import { theme } from "~/theme";
import "~/constants/suture.config";

function TPCIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24">
      <path fill="var(--color-brand)" d="M 12 0 L 24 12 L 12 24 L 0 12 Z" />
    </svg>
  );
}

const [now, setNow] = createSignal<Date | undefined>(undefined);

function updateDate() {
  setNow(new Date());
  requestAnimationFrame(() => {
    updateDate();
  });
}
!isServer && updateDate();

function formatDate(date: Date) {
  function pad(val: string | number) {
    return val.toString().padStart(2, "0");
  }

  const hour = ((date.getHours() + 23) % 12) + 1;
  const ampm = date.getHours() < 12 ? "AM" : "PM";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(hour)}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${date
    .getMilliseconds()
    .toString()
    .padStart(3, "0")}`;
}

export default function RadixLayout() {
  return (
    <>
      <div
        class={style({
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          width: 250,
        })}
      >
        <div
          class={style({
            height: 65,
            display: "flex",
            alignItems: "center",
            paddingLeft: 16,
            borderBottomWidth: "1px",
            // borderColor: theme.separator,
            borderColor: "transparent",
          })}
        >
          <div
            class={style({
              position: "relative",
              width: 200,
            })}
          >
            <p
              class={style({
                position: "absolute",
                bottom: 0,
                left: 17,
                zIndex: -1,
                fontSize: 22,
                lineHeight: "28px",
              })}
            >
              solid radix
            </p>
            <TPCIcon />
            <p
              class={style({
                position: "absolute",
                bottom: 0,
                left: 17,
                fontSize: 22,
                lineHeight: "28px",

                color: "white",
                zIndex: 1,
                clipPath: "polygon(0 0, 28px 0, 0 28px)",
              })}
              aria-hidden="true"
            >
              solid radix
            </p>
          </div>
        </div>
        <div
          class={style({
            padding: "0 8px",
            overflow: "auto",
          })}
        >
          <NavHeading>Overview</NavHeading>
          <NavLink href="overview/introduction">Introduction</NavLink>
          {/* <NavLink href="overview/something">Getting started</NavLink> */}
          {/* <NavLink href="overview/something">Styling</NavLink> */}
          {/* <NavLink href="overview/something">Animation</NavLink> */}
          {/* <NavLink href="overview/something">Accessibility</NavLink> */}
          {/* <NavLink href="overview/something">Server side rendering</NavLink> */}
          {/* <NavLink href="overview/something">Releases</NavLink> */}
          <NavHeading>Components</NavHeading>
          {/* <NavLink href="components/something">Accordion</NavLink> */}
          {/* <NavLink href="components/something">Alert Dialog</NavLink> */}
          <NavLink href="components/aspect-ratio">Aspect Ratio</NavLink>
          <NavLink href="components/avatar">Avatar</NavLink>
          {/* <NavLink href="components/something">Checkbox</NavLink> */}
          {/* <NavLink href="components/something">Collapsible</NavLink> */}
          {/* <NavLink href="components/something">Context Menu</NavLink> */}
          <NavLink href="components/dialog">Dialog</NavLink>
          {/* <NavLink href="components/something">Dropdown Menu</NavLink> */}
          {/* <NavLink href="components/something">Hover Card</NavLink> */}
          <NavLink href="components/label">Label</NavLink>
          {/* <NavLink href="components/something">Menubar</NavLink> */}
          {/* <NavLink href="components/something">Popover</NavLink> */}
          {/* <NavLink href="components/something">Progress</NavLink> */}
          {/* <NavLink href="components/something">Radio Group</NavLink> */}
          {/* <NavLink href="components/something">Scroll Area</NavLink> */}
          {/* <NavLink href="components/something">Select</NavLink> */}
          {/* <NavLink href="components/something">Separator</NavLink> */}
          {/* <NavLink href="components/something">Slider</NavLink> */}
          {/* <NavLink href="components/something">Switch</NavLink> */}
          {/* <NavLink href="components/something">Tabs</NavLink> */}
          {/* <NavLink href="components/something">Toast</NavLink> */}
          {/* <NavLink href="components/something">Toggle</NavLink> */}
          {/* <NavLink href="components/something">Toggle Group</NavLink> */}
          {/* <NavLink href="components/something">Toolbar</NavLink> */}
          {/* <NavLink href="components/something">Tooltip</NavLink> */}
          <NavHeading>Utilities</NavHeading>
          <NavLink href="utilities/something">Direction Provider</NavLink>
          <NavLink href="utilities/something">Slot</NavLink>
          <NavLink href="utilities/something">Visually Hidden</NavLink>
          <CopyrightNotice>
            Made with{" "}
            <HeartIcon
              width="15"
              class={style({
                display: "inline-block",
              })}
              preserveAspectRatio="none"
              style={{ transform: "rotate(180deg) translateY(1px)" }}
            />{" "}
            by Trent at{" "}
            <a
              href="mailto:trent@trents.computer"
              class={style({
                ":hover": {
                  textDecoration: "underline",
                },
              })}
            >
              trent@trents.computer
            </a>{" "}
            <span style={{ display: "inline-block" }}>
              © {now() ? formatDate(now()!) : ""}
            </span>
          </CopyrightNotice>
        </div>
      </div>
      <Prose>
        <Outlet />
      </Prose>
    </>
  );
}

const NavHeading = styled("h4", {
  base: {
    height: 40,
    lineHeight: "40px",
    fontSize: 14,
    padding: "0 12px",
    fontWeight: 500,
    color: theme.text2,
    selectors: {
      "&:not(:first-child)": {
        marginTop: 20,
      },
    },
  },
});

const NavLink = styled(A, {
  base: {
    display: "flex",
    height: 40,
    lineHeight: "40px",
    fontSize: 14,
    padding: "0 12px",
    borderRadius: 8,
    fontWeight: 500,
    selectors: {
      "&:hover": {
        backgroundColor: theme.gray6,
      },
      "&.active": {
        backgroundColor: "var(--color-brand)",
        color: "white",
      },
    },
  },
});

const CopyrightNotice = styled("small", {
  base: {
    marginTop: 40,
    fontVariantNumeric: "tabular-nums",
    fontSize: 12,
    lineHeight: "16px",
    color: theme.text2,
    display: "block",
    padding: "0 12px",
  },
});

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

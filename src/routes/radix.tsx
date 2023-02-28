import { globalStyle, style } from "@macaron-css/core";
import { styled } from "@macaron-css/solid";
import { createSignal } from "solid-js";
import { isServer } from "solid-js/web";
import { A, Outlet } from "solid-start";
import { theme } from "~/theme";
import "~/constants/suture.config";
import { HeartIcon } from "solid-radix-icons";
import { SiteWordmark } from "~/components/SiteWordmark";

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

          display: "none",
          "@media": {
            "(min-width: 960px)": {
              display: "block",
            },
          },
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
          <SiteWordmark title="solid radix" />
        </div>
        <div
          class={style({
            padding: "0 8px",
            overflow: "auto",
          })}
        >
          <NavHeading>Overview</NavHeading>
          <NavLink href="overview/introduction">Introduction</NavLink>
          {/* <NavLink href="overview/getting-started">Getting started</NavLink> */}
          {/* <NavLink href="overview/styling">Styling</NavLink> */}
          {/* <NavLink href="overview/animation">Animation</NavLink> */}
          {/* <NavLink href="overview/accessibility">Accessibility</NavLink> */}
          {/* <NavLink href="overview/ssr">Server side rendering</NavLink> */}
          {/* <NavLink href="overview/releases">Releases</NavLink> */}
          <NavHeading>Components</NavHeading>
          {/* <NavLink href="components/accordion">Accordion</NavLink> */}
          {/* <NavLink href="components/alert-dialog">Alert Dialog</NavLink> */}
          <NavLink href="components/aspect-ratio">Aspect Ratio</NavLink>
          {/* <NavLink href="components/avatar">Avatar</NavLink> */}
          {/* <NavLink href="components/checkbox">Checkbox</NavLink> */}
          {/* <NavLink href="components/collapsible">Collapsible</NavLink> */}
          {/* <NavLink href="components/context-menu">Context Menu</NavLink> */}
          {/* <NavLink href="components/dialog">Dialog</NavLink> */}
          {/* <NavLink href="components/dropdown-menu">Dropdown Menu</NavLink> */}
          {/* <NavLink href="components/hover-card">Hover Card</NavLink> */}
          <NavLink href="components/label">Label</NavLink>
          {/* <NavLink href="components/menubar">Menubar</NavLink> */}
          {/* <NavLink href="components/popover">Popover</NavLink> */}
          {/* <NavLink href="components/progress">Progress</NavLink> */}
          {/* <NavLink href="components/radio-group">Radio Group</NavLink> */}
          {/* <NavLink href="components/scroll-area">Scroll Area</NavLink> */}
          {/* <NavLink href="components/select">Select</NavLink> */}
          <NavLink href="components/separator">Separator</NavLink>
          {/* <NavLink href="components/slider">Slider</NavLink> */}
          {/* <NavLink href="components/switch">Switch</NavLink> */}
          {/* <NavLink href="components/tabs">Tabs</NavLink> */}
          {/* <NavLink href="components/toast">Toast</NavLink> */}
          <NavLink href="components/toggle">Toggle</NavLink>
          {/* <NavLink href="components/toggle-group">Toggle Group</NavLink> */}
          {/* <NavLink href="components/toolbar">Toolbar</NavLink> */}
          {/* <NavLink href="components/tooltip">Tooltip</NavLink> */}
          <NavHeading>Utilities</NavHeading>
          {/* <NavLink href="utilities/direction-provider">Direction Provider</NavLink> */}
          <NavLink href="utilities/accessible-icon">Accessible Icon</NavLink>
          <NavLink href="utilities/presence">Presence</NavLink>
          <NavLink href="utilities/slot">Slot</NavLink>
          <NavLink href="utilities/visually-hidden">Visually Hidden</NavLink>
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
      <div class="flex">
        <div
          class={style({
            "@media": {
              "(min-width: 960px)": {
                minWidth: "250px",
              },
            },
          })}
        />
        <Prose>
          <Outlet />
        </Prose>
        <div
          class={style({
            "@media": {
              "(min-width: 960px)": {
                width: "250px",
                flexShrink: 9999999,
              },
            },
          })}
        />
      </div>
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
globalStyle(`${Prose} h3`, {
  fontSize: "19px",
  marginTop: "44px",
  marginBottom: "8px",
  lineHeight: "1.3333333",
});

globalStyle(`${Prose} p`, {
  marginTop: "1.25em",
  marginBottom: "1.25em",
});

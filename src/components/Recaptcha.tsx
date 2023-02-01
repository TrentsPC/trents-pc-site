import { style } from "@macaron-css/core";
import { styled } from "@macaron-css/solid";
import { createEffect, createSignal } from "solid-js";

export function Recaptcha() {
  const [open, setOpen] = createSignal(false);
  return (
    <Root>
      <AnchorContent>
        <Checkbox onClick={() => setOpen((o) => !o)}>
          <CheckboxBorder />
        </Checkbox>
        <Label>I'm a robot</Label>
        <Footer>
          <LogoPortrait>
            <LogoImg />
            <LogoText>reCAPTCHA</LogoText>
          </LogoPortrait>
          <AnchorPT>
            <a
              href="https://www.google.com/intl/en/policies/privacy/"
              target="_blank"
            >
              Privacy
            </a>
            <span aria-hidden="true" role="presentation">
              {" "}
              -{" "}
            </span>
            <a
              href="https://www.google.com/intl/en/policies/terms/"
              target="_blank"
            >
              Terms
            </a>
          </AnchorPT>
        </Footer>
      </AnchorContent>
      {open() && (
        <div
          class={style({
            position: "absolute",
            top: -582 / 2,
            left: 52,
            height: 582,
            width: 402,
            padding: 7,
            border: "1px solid #cfcfcf",
            backgroundColor: "white",
          })}
        >
          <div
            class={style({
              backgroundColor: "#1a73e8",
              color: "white",
              padding: "24px 24px",
              lineHeight: 1.25,
            })}
          >
            Select all squares with
            <div
              class={style({
                fontWeight: 700,
                fontSize: 28,
              })}
            >
              an even total rgb value
            </div>
            If there are none, click skip
          </div>
          <div
            class={style({
              fontWeight: 700,
              fontSize: 28,
              display: "grid",
              height: 386,
              marginTop: 8,
              gap: 4,
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
            })}
          >
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
            <Square />
          </div>
          <div
            class={style({
              display: "flex",
              marginTop: 8,
            })}
          >
            <button
              class={style({
                backgroundColor: "#1a73e8",
                padding: "0 32px",
                borderRadius: 2,
                height: 40,
                marginLeft: "auto",
                color: "white",
              })}
            >
              SKIP
            </button>
          </div>
        </div>
      )}
    </Root>
  );
}

function Square() {
  let canvas: HTMLCanvasElement = null!;

  createEffect(() => {
    if (!canvas) return;

    let ctx = canvas.getContext("2d")!;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, y, 1, 1);
      }
    }
  });
  return (
    <div style={{ position: "relative" }}>
      <canvas
        ref={canvas}
        width="50"
        height="50"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

const Root = styled("div", {
  base: {
    fontFamily: "Roboto,helvetica,arial,sans-serif",
    width: "302px",
    height: "76px",
    background: "#f9f9f9",
    color: "#000",
    border: "1px solid #d3d3d3",
    borderRadius: 3,
    boxShadow: "0 0 4px 1px rgb(0 0 0 / 8%)",
    position: "relative",
  },
});

const AnchorContent = styled("div", {
  base: {
    height: "74px",
    width: "206px",
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
});

const Label = styled("label", {
  base: {
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "74px",
    minWidth: "152px",
  },
});

const Checkbox = styled("span", {
  base: {
    flexShrink: 0,
    margin: "0 12px 2px 12px",
    border: "none",
    fontSize: "1px",
    height: "28px",
    width: "28px",
    overflow: "visible",
    outline: "0",
    verticalAlign: "text-bottom",
    position: "relative",
  },
});

const CheckboxBorder = styled("div", {
  base: {
    borderRadius: "2px",
    backgroundColor: "#fff",
    border: "2px solid #c1c1c1",
    fontSize: "1px",
    height: "28px",
    position: "absolute",
    width: "28px",
    zIndex: "1",
  },
});

const Footer = styled("div", {
  base: {
    display: "inline-block",
    height: "74px",
    verticalAlign: "top",
    width: "70px",
    position: "relative",
  },
});

const LogoPortrait = styled("div", {
  base: {
    margin: "10px 0 0 26px",
    width: "58px",
    WebkitUserSelect: "none",
  },
});

const LogoImg = styled("div", {
  base: {
    background: "url(https://www.gstatic.com/recaptcha/api2/logo_48.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "32px",
    height: "32px",
    margin: "0 13px 0 13px",
    width: "32px",
  },
});

const LogoText = styled("div", {
  base: {
    color: "#555",
    cursor: "default",
    fontFamily: "Roboto,helvetica,arial,sans-serif",
    fontSize: "10px",
    fontWeight: "400",
    lineHeight: "10px",
    marginTop: "5px",
    textAlign: "center",
  },
});

const AnchorPT = styled("div", {
  base: {
    margin: "2px 11px 0 0",
    paddingRight: "2px",
    position: "absolute",
    right: "-25px",
    textAlign: "right",
    width: "276px",
    fontFamily: "Roboto,helvetica,arial,sans-serif",
    fontSize: "8px",
    fontWeight: "400",
    color: "#555",
  },
});

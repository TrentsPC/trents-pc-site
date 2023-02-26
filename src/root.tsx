// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import "virtual:windi.css";
import { hcl } from "./modules/color";
import { hue } from "./signals";

export default function Root() {
  return (
    <Html
      lang="en"
      style={{
        "--hue": hue(),
        "--color-brand": hcl(hue(), 27, 80),
        "--color-brand2": hcl(hue() - 10, 27, 80),
        "--color-brand3": hcl(hue() - 20, 27, 80),
        "--color-brand4": hcl(hue() - 30, 27, 80),
        "--color-brand5": hcl(hue() - 40, 27, 80),
        "--color-brand6": hcl(hue() - 50, 27, 80),
        "--color-brand7": hcl(hue() - 60, 27, 80),
        "--color-brand-vibrant": hcl(hue(), 40, 60),
      }}
    >
      <Head>
        <Title>Trents.Computer</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}

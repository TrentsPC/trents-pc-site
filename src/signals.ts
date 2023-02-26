import { createSignal } from "solid-js";
import { isServer } from "solid-js/web";

function getInitialHue() {
  if (isServer) {
    return Date.now() % 360;
  } else {
    let hue = Number(document.documentElement.style.getPropertyValue("--hue"));
    console.log(hue);
    if (isFinite(hue)) {
      return hue;
    }
  }
  return 0;
}

export const [hue, setHue] = createSignal(getInitialHue());
function updateHue() {
  setHue((hue() + 1) % 360);
  requestAnimationFrame(() => {
    updateHue();
  });
}
!isServer && updateHue();

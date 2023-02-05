import { createSignal } from "solid-js";
import { isServer } from "solid-js/web";

export const [hue, setHue] = createSignal(0);
function updateHue() {
  setHue((hue() + 1) % 360);
  requestAnimationFrame(() => {
    updateHue();
  });
}
!isServer && updateHue();

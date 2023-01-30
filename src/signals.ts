import { createSignal } from "solid-js";
import { isServer } from "solid-js/web";

export const [hue, setHue] = createSignal(0);
function updateDate() {
  setHue(hue() + 1);
  requestAnimationFrame(() => {
    updateDate();
  });
}
!isServer && updateDate();

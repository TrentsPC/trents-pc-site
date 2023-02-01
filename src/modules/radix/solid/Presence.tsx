import { JSX, children, createMemo, createSignal } from "solid-js";

export function Presence(props: { visible: boolean; children: JSX.Element }) {
  let first = true;
  const [show, setShow] = createSignal(props.visible);
  const resolved = children(() => props.children);

  let child = createMemo(() => {
    let el = resolved() as Element;
    while (typeof el === "function") el = (el as Function)();

    function endTransition(e?: Event) {
      el.removeEventListener("transitionend", endTransition);
      el.removeEventListener("animationend", endTransition);

      setShow(false);
    }

    if (props.visible) {
      el.removeEventListener("transitionend", endTransition);
      el.removeEventListener("animationend", endTransition);
      setShow(true);
    } else {
      if (!first) {
        el.addEventListener("transitionend", endTransition);
        el.addEventListener("animationend", endTransition);
      }
    }
    first = false;
    return el;
  });

  return <>{show() && child}</>;
}

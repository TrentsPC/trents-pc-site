import { JSX } from "solid-js";
import { Slot } from "./Slot";

type RemoveScrollProps = {
  children?: JSX.Element;
  allowPinchZoom?: boolean;
  shards?: Array<HTMLElement>;
};

function RemoveScroll(props: RemoveScrollProps) {
  return (
    <>
      <Slot>{props.children}</Slot>
    </>
  );
}

export { RemoveScroll };
export type { RemoveScrollProps };

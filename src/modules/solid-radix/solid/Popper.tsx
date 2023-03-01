import {
  Accessor,
  JSX,
  Show,
  createContext,
  createEffect,
  createSignal,
  splitProps,
  useContext,
} from "solid-js";
import { Measurable } from "../core/rect";
import { Primitive, PrimitiveProps } from "./Primitive";

const SIDE_OPTIONS = ["top", "right", "bottom", "left"] as const;
const ALIGN_OPTIONS = ["start", "center", "end"] as const;

type Side = typeof SIDE_OPTIONS[number];
type Align = typeof ALIGN_OPTIONS[number];

/* -------------------------------------------------------------------------------------------------
 * PopperRoot
 * -----------------------------------------------------------------------------------------------*/

type PopperContextValue = {
  anchor: Accessor<Measurable | null>;
  onAnchorChange(anchor: Measurable | null): void;
};
const PopperContext = createContext(undefined! as PopperContextValue);

interface PopperProps {
  children?: JSX.Element;
}
const PopperRoot = (props: PopperProps) => {
  const [anchor, setAnchor] = createSignal<Measurable | null>(null);
  return (
    <PopperContext.Provider value={{ anchor, onAnchorChange: setAnchor }}>
      {props.children}
    </PopperContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * PopperAnchor
 * -----------------------------------------------------------------------------------------------*/

type PopperAnchorElement = HTMLDivElement;
type PopperAnchorProps = PrimitiveProps<"div"> & {
  virtualRef?: Measurable;
};

const PopperAnchor = (props: PopperAnchorProps) => {
  const [, anchorProps] = splitProps(props, ["virtualRef"]);
  const context = useContext(PopperContext);
  let ref: PopperAnchorElement = null!;
  // const composedRefs = useComposedRefs(forwardedRef, ref);

  createEffect(() => {
    // Consumer can anchor the popper to something that isn't
    // a DOM node e.g. pointer position, so we override the
    // `anchorRef` with their virtual ref in this case.
    context.onAnchorChange(props.virtualRef || ref);
  });

  return (
    <Show when={!props.virtualRef}>
      <Primitive.div
        {...anchorProps}
        ref={(r) => {
          (props.ref as any)?.(r);
          ref = r;
        }}
      />
    </Show>
  );
};

export const Popper = {
  Root: PopperRoot,
};
export type { PopperProps };

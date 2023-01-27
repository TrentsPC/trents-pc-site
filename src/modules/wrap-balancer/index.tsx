import {
  JSX,
  createEffect,
  createRenderEffect,
  createUniqueId,
  onCleanup,
} from "solid-js";
import { Dynamic } from "solid-js/web";

type RelayoutFn = (
  id: string | number,
  ratio: number,
  wrapper: HTMLElement
) => void;

const relayout: RelayoutFn = (id, ratio, wrapper) => {
  const container = wrapper.parentElement;

  const update = (width: number) => (wrapper.style.maxWidth = width + "px");

  // Reset wrapper width
  wrapper.style.maxWidth = "";

  // Get the initial container size
  const width = container!.clientWidth;
  const height = container!.clientHeight;

  // Synchronously do binary search and calculate the layout
  let lower: number = width / 2 - 0.25;
  let upper: number = width + 0.5;
  let middle: number;

  if (width) {
    while (lower + 1 < upper) {
      middle = Math.round((lower + upper) / 2);
      update(middle);
      if (container!.clientHeight === height) {
        upper = middle;
      } else {
        lower = middle;
      }
    }

    // Update the wrapper width
    update(upper * ratio + width * (1 - ratio));
  }
};

interface BalancerProps extends JSX.HTMLAttributes<HTMLElement> {
  /**
   * The HTML tag to use for the wrapper element.
   * @default 'span'
   */
  as?: keyof JSX.IntrinsicElements;
  /**
   * The balance ratio of the wrapper width (0 <= ratio <= 1).
   * 0 means the wrapper width is the same as the container width (no balance, browser default).
   * 1 means the wrapper width is the minimum (full balance, most compact).
   * @default 1
   */
  ratio?: number;
}

const Balancer = ({
  as = "span",
  ratio = 1,
  children,
  ...props
}: BalancerProps) => {
  const id = createUniqueId();
  let wrapperRef: HTMLElement = undefined!;
  let resizeObserver: ResizeObserver;

  // Re-balance on content change and on mount/hydration.
  createEffect(() => {
    if (wrapperRef) {
      resizeObserver = new ResizeObserver(() =>
        relayout(id, ratio, wrapperRef)
      );
      resizeObserver.observe(wrapperRef.parentElement!);

      // Remove the observer when unmounting.
      onCleanup(() => {
        if (!wrapperRef) return;
        if (!resizeObserver) return;

        resizeObserver.disconnect();
      });
    }
  });

  return (
    <>
      <Dynamic
        {...props}
        component={as}
        data-br={id}
        data-brr={ratio}
        ref={wrapperRef}
        style={{
          display: "inline-block",
          verticalAlign: "top",
          textDecoration: "inherit",
        }}
      >
        {children}
      </Dynamic>
    </>
  );
};

export default Balancer;

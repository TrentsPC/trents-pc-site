import { JSX } from "solid-js";

export type LabelProps = JSX.HTMLAttributes<HTMLLabelElement>;

export const Label = (props: LabelProps) => {
  return (
    <label
      {...props}
      onMouseDown={(event) => {
        if (typeof props.onMouseDown === "function") {
          props.onMouseDown(event);
        }
        // prevent text selection when double clicking label
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }}
    />
  );
};

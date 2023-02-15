import { JSX, mergeProps, splitProps } from "solid-js";

export interface IconProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  children?: never;
  color?: string;
}
export function ChatBubbleIcon(props: IconProps) {
  props = mergeProps({ color: "currentColor" }, props);
  const [color, rest] = splitProps(props, ["color"]);
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M2 22V4q0-.825.588-1.413Q3.175 2 4 2h16q.825 0 1.413.587Q22 3.175 22 4v12q0 .825-.587 1.413Q20.825 18 20 18H6Z"
        fill={color.color}
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    </svg>
  );
}

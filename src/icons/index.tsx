import { JSX, mergeProps, splitProps } from "solid-js";

export interface IconProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  children?: never;
  color?: string;
}

export function TPCCypher(props: IconProps) {
  props = mergeProps({ color: "currentColor" }, props);
  const [color, rest] = splitProps(props, ["color"]);
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M 9 0 A 1 1 0 0 1 9 8 L 9 14.5 A 0.5 0.5 0 0 1 8.5 15 L 8 15 A 1 1 0 0 1 8 0 Z M 8 1 A 1 1 0 0 0 8 14 L 8 8 L 1 8 L 1 7 L 8 7 Z M 9 7 A 1 1 0 0 0 9 1 Z"
        fill={color.color}
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    </svg>
  );
}

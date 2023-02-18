import { JSX } from "solid-js";

/* -------------------------------------------------------------------------------------------------
 * Arrow
 * -----------------------------------------------------------------------------------------------*/

type PrimitiveSvgProps = JSX.SvgSVGAttributes<SVGSVGElement>;

interface ArrowProps extends PrimitiveSvgProps {}

const ArrowRoot = (props: ArrowProps) => {
  return (
    <svg
      {...props}
      width={props.width || 10}
      height={props.height || 5}
      viewBox="0 0 30 10"
      preserveAspectRatio="none"
    >
      {props.children || <polygon points="0,0 30,0 15,10" />}
    </svg>
  );
};

/* -----------------------------------------------------------------------------------------------*/

export const Arrow = {
  Root: ArrowRoot,
};
export type { ArrowProps };

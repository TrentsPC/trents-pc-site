import { JSX } from "solid-js";

/* -------------------------------------------------------------------------------------------------
 * AspectRatio
 * -----------------------------------------------------------------------------------------------*/

type PrimitiveDivProps = JSX.HTMLAttributes<HTMLDivElement>;
interface AspectRatioProps extends PrimitiveDivProps {
  ratio?: number;
  style?: JSX.CSSProperties;
}

const Root = (props: AspectRatioProps) => {
  const { ratio = 1 / 1, style, ...aspectRatioProps } = props;
  return (
    <div
      style={{
        // ensures inner element is contained
        position: "relative",
        // ensures padding bottom trick maths works
        width: "100%",
        "padding-bottom": `${100 / ratio}%`,
      }}
      data-radix-aspect-ratio-wrapper=""
    >
      <div
        {...aspectRatioProps}
        style={{
          ...style,
          // ensures children expand in ratio
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      />
    </div>
  );
};

/* -----------------------------------------------------------------------------------------------*/

export const AspectRatio = { Root };
export type { AspectRatioProps };

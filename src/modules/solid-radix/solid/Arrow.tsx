import { Primitive, PrimitiveProps } from "./Primitive";

type ArrowProps = PrimitiveProps<"svg">;

const Arrow = (props: ArrowProps) => {
  return (
    <Primitive.svg
      {...props}
      width={props.width ?? 10}
      height={props.height ?? 5}
      viewBox="0 0 30 10"
      preserveAspectRatio="none"
    >
      <polygon points="0,0 30,0 15,10" />
    </Primitive.svg>
  );
};

export { Arrow };
export type { ArrowProps };

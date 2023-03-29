import { Primitive, PrimitiveProps } from "./Primitive";

function FocusScopeRoot(props: PrimitiveProps<"div">) {
  return <Primitive.div />;
}

export const FocusScope = {
  Root: FocusScopeRoot,
};

import { Primitive, PrimitiveProps } from "./Primitive";

export type DismissibleLayerProps = PrimitiveProps<"div">;

function DismissibleLayerRoot(props: DismissibleLayerProps) {
  return <Primitive.div />;
}
function DismissibleLayerBranch(props: PrimitiveProps<"div">) {
  return <Primitive.div />;
}

export const DismissibleLayer = {
  Root: DismissibleLayerRoot,
  Branch: DismissibleLayerBranch,
};

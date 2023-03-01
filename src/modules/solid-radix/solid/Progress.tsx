/* -------------------------------------------------------------------------------------------------
 * Progress
 * -----------------------------------------------------------------------------------------------*/

import { Accessor, createContext, splitProps, useContext } from "solid-js";
import { Primitive, PrimitiveProps } from "./Primitive";

const DEFAULT_MAX = 100;

type ProgressState = "indeterminate" | "complete" | "loading";
type ProgressContextValue = {
  value: Accessor<number | null>;
  max: Accessor<number>;
};
const ProgressContext = createContext(undefined! as ProgressContextValue);

type ProgressProps = PrimitiveProps<"div"> & {
  value?: number | null | undefined;
  max?: number;
  getValueLabel?(value: number, max: number): string;
};

const ProgressRoot = (props: ProgressProps) => {
  const [, progressProps] = splitProps(props, [
    "value",
    "max",
    "getValueLabel",
  ]);

  const max = () => (isValidMaxNumber(props.max) ? props.max : DEFAULT_MAX);
  const value = () =>
    isValidValueNumber(props.value, max()) ? props.value : null;
  const valueLabel = () =>
    isNumber(value)
      ? props.getValueLabel
        ? props.getValueLabel(value, max())
        : defaultGetValueLabel(value, max())
      : undefined;

  return (
    <ProgressContext.Provider
      value={{
        value,
        max,
      }}
    >
      <Primitive.div
        aria-valuemax={max()}
        aria-valuemin={0}
        aria-valuenow={isNumber(value) ? value : undefined}
        aria-valuetext={valueLabel()}
        role="progressbar"
        data-state={getProgressState(value(), max())}
        data-value={value() ?? undefined}
        data-max={max()}
        {...progressProps}
      />
    </ProgressContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * ProgressIndicator
 * -----------------------------------------------------------------------------------------------*/

type ProgressIndicatorProps = PrimitiveProps<"div">;

const ProgressIndicator = (props: ProgressIndicatorProps) => {
  const context = useContext(ProgressContext);
  return (
    <Primitive.div
      data-state={getProgressState(context.value(), context.max())}
      data-value={context.value ?? undefined}
      data-max={context.max}
      {...props}
    />
  );
};

/* ---------------------------------------------------------------------------------------------- */

function defaultGetValueLabel(value: number, max: number) {
  return `${Math.round((value / max) * 100)}%`;
}

function getProgressState(
  value: number | undefined | null,
  maxValue: number
): ProgressState {
  return value == null
    ? "indeterminate"
    : value === maxValue
    ? "complete"
    : "loading";
}

function isNumber(value: any): value is number {
  return typeof value === "number";
}

function isValidMaxNumber(max: any): max is number {
  // prettier-ignore
  return (
    isNumber(max) &&
    !isNaN(max) &&
    max > 0
  );
}

function isValidValueNumber(value: any, max: number): value is number {
  // prettier-ignore
  return (
    isNumber(value) &&
    !isNaN(value) &&
    value <= max &&
    value >= 0
  );
}

export const Progress = {
  Root: ProgressRoot,
  Indicator: ProgressIndicator,
};
export type { ProgressProps, ProgressIndicatorProps };

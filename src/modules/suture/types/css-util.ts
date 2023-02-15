import type * as Native from "csstype";
import * as Util from "./util";

export { Native };

export interface CSSProperties
  extends Native.StandardLonghandProperties,
    Native.StandardShorthandProperties,
    Native.SvgProperties {}

type ValueByPropertyName<PropertyName> =
  PropertyName extends keyof CSSProperties
    ? CSSProperties[PropertyName]
    : never;

/** Returns a Style interface, leveraging the given media and style map. */
export type CSS<Media = {}, Utils = {}> =
  // nested at-rule css styles
  {
    [K in Util.Prefixed<"@", keyof Media>]?: CSS<Media, Utils>;
  } & {
    // known property styles
    [K in keyof CSSProperties as K extends keyof Utils ? never : K]?:
      | ValueByPropertyName<K>
      | Native.Globals
      | Util.Index
      | undefined;
  } & {
    // known utility styles
    [K in keyof Utils]?: Utils[K] extends (arg: infer P) => any
      ?
          | (P extends any[]
              ?
                  | ($$PropertyValue extends keyof P[0]
                      ?
                          | ValueByPropertyName<P[0][$$PropertyValue]>
                          | Native.Globals
                          | undefined
                      : never)[]
                  | P
              : $$PropertyValue extends keyof P
              ?
                  | ValueByPropertyName<P[$$PropertyValue]>
                  | Native.Globals
                  | undefined
              : $$ScaleValue extends keyof P
              ? { scale: P[$$ScaleValue] } | undefined
              : never)
          | P
      : never;
  } & {
    /** Unknown property. */
    [K: string]: number | string | CSS<Media, Utils> | {} | undefined;
  };

/** Unique symbol used to reference a property value. */
export declare const $$PropertyValue: unique symbol;

/** Unique symbol used to reference a property value. */
export type $$PropertyValue = typeof $$PropertyValue;

/** Unique symbol used to reference a token value. */
export declare const $$ScaleValue: unique symbol;

/** Unique symbol used to reference a token value. */
export type $$ScaleValue = typeof $$ScaleValue;

export declare const $$ThemeValue: unique symbol;

export type $$ThemeValue = typeof $$ThemeValue;

// https://github.com/microsoft/TypeScript/issues/37888#issuecomment-846638356
export type WithPropertyValue<T> = {
  readonly [K in $$PropertyValue]: T;
};
export type WithScaleValue<T> = {
  readonly [K in $$ScaleValue]: T;
};

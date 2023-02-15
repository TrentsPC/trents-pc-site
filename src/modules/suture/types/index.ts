import type * as Config from "./config";
import type * as CSSUtil from "./css-util";
import type * as StyledComponent from "./styled-component";

export { $$PropertyValue, $$ScaleValue, $$ThemeValue } from "./css-util";
export type CreateSuture = Config.CreateSuture;
export type CSSProperties = CSSUtil.CSSProperties;
export type FontFace = CSSUtil.Native.AtRule.FontFace;

/** Returns a Style interface from a configuration, leveraging the given media and style map. */
export type CSS<
  Config extends {
    media?: {};
    theme?: {};
    themeMap?: {};
    utils?: {};
  } = {
    media: {};
    theme: {};
    themeMap: {};
    utils: {};
  }
> = CSSUtil.CSS<Config["media"], Config["utils"]>;

/** Returns the properties, attributes, and children expected by a component. */
export type ComponentProps<Component> = Component extends (
  ...args: any[]
) => any
  ? Parameters<Component>[0]
  : never;

/** Returns a type that expects a value to be a kind of CSS property value. */
export type PropertyValue<
  Property extends keyof CSSUtil.CSSProperties,
  Config = null
> = Config extends null
  ? CSSUtil.WithPropertyValue<Property>
  : Config extends { [K: string]: any }
  ? CSSUtil.CSS<Config["media"], Config["utils"]>[Property]
  : never;

/** Returns a type that expects a value to be a kind of theme scale value. */
export type ScaleValue<Scale, Config = null> = Config extends null
  ? CSSUtil.WithScaleValue<Scale>
  : Config extends { [K: string]: any }
  ? Scale extends keyof Config["theme"]
    ? `$${string & keyof Config["theme"][Scale]}`
    : never
  : never;

/** Returns a type that suggests variants from a component as possible prop values. */
export type VariantProps<Component extends { [key: symbol | string]: any }> =
  StyledComponent.TransformProps<
    Component[StyledComponent.$$StyledComponentProps],
    Component[StyledComponent.$$StyledComponentMedia]
  >;

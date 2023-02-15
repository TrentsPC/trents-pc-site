import type * as CSSUtil from "./css-util";
import type * as StyledComponent from "./styled-component";
import type * as Util from "./util";

/** Remove an index signature from a type */
export type RemoveIndex<T> = {
  [k in keyof T as string extends k
    ? never
    : number extends k
    ? never
    : k]: T[k];
};

export interface CssFunctionType<Media extends {} = {}, Utils extends {} = {}> {
  <
    Composers extends (
      | string
      | Util.Function
      | {
          [name: string]: unknown;
        }
    )[],
    CSS = CSSUtil.CSS<Media, Utils>
  >(
    ...composers: {
      [K in keyof Composers]: string extends Composers[K] // Strings and Functions can be skipped over
        ? Composers[K]
        : Composers[K] extends string | Util.Function
        ? Composers[K]
        : RemoveIndex<CSS> & {
            /** The **variants** property lets you set a subclass of styles based on a key-value pair.
             *
             * [Read Documentation](https://stitches.dev/docs/variants)
             */
            variants?: {
              [Name in string]: {
                [Pair in number | string]: CSS;
              };
            };
            /** The **compoundVariants** property lets you to set a subclass of styles based on a combination of active variants.
             *
             * [Read Documentation](https://stitches.dev/docs/variants#compound-variants)
             */
            compoundVariants?: (("variants" extends keyof Composers[K]
              ? {
                  [Name in keyof Composers[K]["variants"]]?:
                    | Util.Widen<keyof Composers[K]["variants"][Name]>
                    | Util.String;
                }
              : Util.WideObject) & {
              css: CSS;
            })[];
            /** The **defaultVariants** property allows you to predefine the active key-value pairs of variants.
             *
             * [Read Documentation](https://stitches.dev/docs/variants#default-variants)
             */
            defaultVariants?: "variants" extends keyof Composers[K]
              ? {
                  [Name in keyof Composers[K]["variants"]]?:
                    | Util.Widen<keyof Composers[K]["variants"][Name]>
                    | Util.String;
                }
              : Util.WideObject;
          } & CSS & {
              [K2 in keyof Composers[K]]: K2 extends
                | "compoundVariants"
                | "defaultVariants"
                | "variants"
                ? unknown
                : K2 extends keyof CSS
                ? CSS[K2]
                : unknown;
            };
    }
  ): StyledComponent.CssComponent<
    StyledComponent.StyledComponentType<Composers>,
    StyledComponent.StyledComponentProps<Composers>,
    Media,
    CSS
  >;
}

/** Suture interface. */
export interface Suture<Media extends {} = {}, Utils extends {} = {}> {
  config: {
    media: Media;
    utils: Utils;
  };
  keyframes: {
    (style: { [offset: string]: CSSUtil.CSS<Media, Utils> }): string;
  };
  css: CssFunctionType<Media, Utils>;
}

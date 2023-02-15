// import { CSS, CSSProperties, createSuture } from "~/modules/suture";

// const { config } = createSuture({
//   media: {
//     sm: "(min-width: 600px)",
//   },
//   utils: {
//     m: (margin: CSSProperties["margin"]) => ({ margin }),
//   },
// });

// declare module "solid-js" {
//   namespace JSX {
//     interface IntrinsicAttributes {
//       css?: CSS<typeof config>;
//     }
//     interface CustomAttributes<T> {
//       css?: CSS<typeof config>;
//     }
//   }
// }

// export function Something() {
//   let ref;
//   return (
//     <button
//       css={{
//         m: 0,
//       }}
//       ref={ref}
//     ></button>
//   );
// }

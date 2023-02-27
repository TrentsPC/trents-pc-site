import { style } from "@macaron-css/core";
import { styled } from "@macaron-css/solid";
import {
  Description,
  HeroCodeBlock,
  HeroContainer,
  Highlights,
  Pre,
  PropsTable,
} from "~/components/docs";
import { AspectRatio } from "~/modules/solid-radix";

export default function Page() {
  return (
    <>
      <h1>Aspect Ratio</h1>
      <Description>Displays content within a desired ratio.</Description>
      <HeroContainer>
        <AspectRatioDemo />
      </HeroContainer>
      <HeroCodeBlock
        files={[
          {
            title: "index.jsx",
            source: `import { AspectRatio } from 'solid-radix';
import './styles.css';
          
const AspectRatioDemo = () => (
  <div class="Container">
    <AspectRatio.Root ratio={16 / 9}>
      <img
        class="Image"
        src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
        alt="Landscape photograph by Tobias Tullius"
      />
    </AspectRatio.Root>
  </div>
);
          
export default AspectRatioDemo;`,
          },
          {
            title: "styles.css",
            source: `.Container {
  width: 300px;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.14);
}
          
.Image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}`,
          },
        ]}
      />
      <Highlights features={["Accepts any custom ratio."]} />
      <h2>Anatomy</h2>
      <p>Import the component.</p>
      <Pre
        children={`import * as AspectRatio from '@radix-ui/react-aspect-ratio';

export default () => <AspectRatio.Root />;`}
      />

      <h2>API Reference</h2>

      <h3>Root</h3>

      <p>Contains the content you want to constrain to a given ratio.</p>

      <PropsTable
        data={[
          {
            name: "asChild",
            required: false,
            type: "boolean",
            default: "false",
            description:
              "Change the component to the HTML tag or custom component of the only child. This will merge the original component props with the props of the supplied element/component and change the underlying DOM node.",
          },
          {
            name: "ratio",
            type: "number",
            default: "1",
            description: "The desired ratio",
          },
        ]}
      />
      <QuickNav>Quick nav</QuickNav>
    </>
  );
}

const QuickNav = styled("div", {
  base: {
    position: "fixed",
    top: 0,
    right: 0,
    width: 250,
    padding: "68px 25px",
  },
});

function AspectRatioDemo() {
  return (
    <div
      class={style({
        width: "300px",
        borderRadius: "6px",
        overflow: "hidden",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.14)",
      })}
    >
      <AspectRatio ratio={16 / 9}>
        <img
          class={style({
            objectFit: "cover",
            width: "100%",
            height: "100%",
          })}
          src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
          alt="Landscape photograph by Tobias Tullius"
        />
      </AspectRatio>
    </div>
  );
}

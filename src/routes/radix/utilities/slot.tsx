import { Description, Highlights, Pre } from "~/components/docs";
import { Slot } from "~/modules/radix";

export default function SlotPage() {
  return (
    <>
      <h1>Slot</h1>
      <Description>Merges its props onto its immediate child.</Description>
      <Highlights
        features={["Can be used to support your own `asChild` prop."]}
      />
      <Slot class="parent" onClick={(e) => console.log("hi", e)}>
        <div
          class="child"
          onClick={(e) => {
            console.log("prevent");
            e.preventDefault();
          }}
        >
          hi
        </div>
      </Slot>
      <Pre>{`import { Slot } from '@radix-ui/react-slot';

export default () => (
  <Slot class="parent" onClick={(e) => console.log("hi", e)}>
    <div
      class="child"
      onClick={(e) => {
        console.log("prevent");
        e.preventDefault();
      }}
    >
      hi
    </div>
  </Slot>
);`}</Pre>
    </>
  );
}

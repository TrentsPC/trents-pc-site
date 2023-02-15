import {
  Description,
  HeroCodeBlock,
  HeroContainer,
  Highlights,
} from "~/components/docs";
import { Cross2Icon, MixerHorizontalIcon } from "~/icons/radix";
import { Popover } from "~/modules/radix";

export default function Page() {
  return (
    <>
      <h1>Popover</h1>

      <Description>
        Displays rich content in a portal, triggered by a button.
      </Description>

      <HeroContainer>
        <PopoverDemo />
      </HeroContainer>

      <HeroCodeBlock
        files={[
          {
            title: "index.jsx",
            source: ``,
          },
        ]}
      />

      <Highlights
        features={[
          "Can be controlled or uncontrolled.",
          "Customize side, alignment, offsets, collision handling.",
          "Optionally render a pointing arrow.",
          "Focus is fully managed and customizable.",
          "Supports modal and non-modal modes.",
          "Dismissing and layering behavior is highly customizable.",
        ]}
      />
    </>
  );
}

const PopoverDemo = () => (
  <Popover.Root>
    <Popover.Trigger class="IconButton" aria-label="Update dimensions">
      <MixerHorizontalIcon />
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content class="PopoverContent" sideOffset={5}>
        <div
          style={{ display: "flex", "flex-direction": "column", gap: "10px" }}
        >
          <p class="Text" style={{ "margin-bottom": "10px" }}>
            Dimensions
          </p>
          <fieldset class="Fieldset">
            <label class="Label" for="width">
              Width
            </label>
            <input class="Input" id="width" value="100%" />
          </fieldset>
          <fieldset class="Fieldset">
            <label class="Label" for="maxWidth">
              Max. width
            </label>
            <input class="Input" id="maxWidth" value="300px" />
          </fieldset>
          <fieldset class="Fieldset">
            <label class="Label" for="height">
              Height
            </label>
            <input class="Input" id="height" value="25px" />
          </fieldset>
          <fieldset class="Fieldset">
            <label class="Label" for="maxHeight">
              Max. height
            </label>
            <input class="Input" id="maxHeight" value="none" />
          </fieldset>
        </div>
        <Popover.Close class="PopoverClose" aria-label="Close">
          <Cross2Icon />
        </Popover.Close>
        <Popover.Arrow class="PopoverArrow" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

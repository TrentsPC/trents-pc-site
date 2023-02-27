import { Description, Highlights, Pre } from "~/components/docs";

export default function Page() {
  return (
    <>
      <h1>Presence</h1>
      <Description>Show or hide a component</Description>
      <Highlights
        features={["Can be used to support your own unmount animations."]}
      />
    </>
  );
}

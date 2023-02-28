import { onMount } from "solid-js";
import { Description, Highlights, Pre } from "~/components/docs";
import { Slot } from "~/modules/solid-radix";

export default function SlotPage() {
  return (
    <>
      <h1>Slot</h1>
      <Description>Merges its props onto its immediate child.</Description>
      <Highlights
        features={["Can be used to support your own `asChild` prop."]}
      />
      <h2>Anatomy</h2>
      <p>Import the component.</p>
      <Pre>{`import { Slot } from 'solid-radix';

export default () => (
  <Slot>
    <div>Hello</div>
  </Slot>
);`}</Pre>
      <h2>Basic example</h2>
      <p>
        Use to create your own <code>asChild</code> API.
      </p>
      <Pre>{`// your-button.jsx
import { Dynamic } from 'solid-js/web';
import { Slot } from 'solid-radix';

function Button({ asChild, ...props }) {
  return <Dynamic {...props} component={asChild ? Slot : 'button'} />;
}`}</Pre>
      <h3>Usage</h3>
      <Pre>{`import { Button } from './your-button';

export default () => (
  <Button asChild>
    <a href="/contact">Contact</a>
  </Button>
);`}</Pre>
      <h3>Event handlers</h3>
      <p>
        Any prop that starts with <code>on</code> (e.g., <code>onClick</code>)
        is considered an event handler. When merging event handlers,{" "}
        <code>Slot</code> will create a new function where the child handler
        takes precedence over the slot handler. If one of the event handlers
        relies on
        <code>event.defaultPrevented</code> make sure that the order is correct.
      </p>
      <Pre>{`import { Slot } from 'solid-radix';

export default () => (
  <Slot onClick={(event) => {
    if (!event.defaultPrevented) console.log('Not logged because default is prevented.');
  }}>
    <button onClick={(event) => event.preventDefault()) />
  </Slot>
);`}</Pre>
      <h2>Changes for Solid</h2>
      <p>
        Because Solid does not have runtime components,{" "}
        <strong>
          <code>Slot</code> merges its props with the child DOM element
          attributes, <em>not</em> the child component props
        </strong>
        . For components where the interactive element is the root element,
        there should be no difference with this approach. But in some components
        it may act in unexpected ways:
      </p>
      <Pre>{`// labelled-button.jsx

export function LabelledButton(props) {
  return (
    <div>
      <label>{props.title}</label>
      <button {...props} />
    </div>
  )
}

// your-app.jsx
import { LabelledButton } from "./labelled-button"

export default function App() {
  return (
    <Slot
      onClick={() => {
        console.log('This logs when you click the \`div\`, not the \`button\` :(')
      }}
    >
      <LabelledButton>Click me!</LabelledButton>
    </Slot>
  )
}
`}</Pre>
      <p>
        In situations ike these, consider refactoring to allow access to the
        interactive element:
      </p>
      <Pre>{`// labelled-button.jsx

export function LabelledButton(props) {
  return (
    <div {...props}>
      <label>{props.title}</label>
      {props.button}
    </div>
  )
}

export function Button(props) {
  return (
    <button {...props} />
  )
}

// your-app.jsx
import { LabelledButton, Button } from "./labelled-button"

export default function App() {
  return (
    <LabelledButton
      button={
        <Slot onClick={() => console.log('This correctly logs \`button\` clicks :3')} >
          <Button>Click me!</Button>
        </Slot>
      }
    />
  )
}`}</Pre>
    </>
  );
}

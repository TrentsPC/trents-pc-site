/* -------------------------------------------------------------------------------------------------
 * Dialog
 * -----------------------------------------------------------------------------------------------*/

import {
  Accessor,
  JSX,
  Setter,
  createContext,
  createEffect,
  createSignal,
  createUniqueId,
  onCleanup,
  onMount,
  splitProps,
  useContext,
} from "solid-js";
import { mergeRefs } from "./refs";
import { composeEventHandlers } from "../core/primitive";
import { Portal } from "solid-js/web";
import { Presence } from "./Presence";
import { createControllableSignal } from "./createControllableSignal";
import { arrow, computePosition, flip, offset, shift } from "@floating-ui/dom";
import { Measurable } from "../core/rect";
// import { Transition } from "./Transition";

type PopoverContextValue = {
  // From Popper
  anchor: Accessor<Measurable | null>;
  onAnchorChange(anchor: Measurable | null): void;
  // From Popover
  triggerRef: HTMLButtonElement;
  contentId: string;
  open: Accessor<boolean>;
  onOpenChange(open: boolean): void;
  onOpenToggle(): void;
  hasCustomAnchor: Accessor<boolean>;
  onCustomAnchorAdd(): void;
  onCustomAnchorRemove(): void;
  modal: Accessor<boolean>;
};

const PopoverContext = createContext<PopoverContextValue>(
  undefined as any as PopoverContextValue
);

interface PopoverProps {
  children?: JSX.Element;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

const PopoverRoot = (props: PopoverProps) => {
  const triggerRef: HTMLButtonElement = null!;
  const [anchor, setAnchor] = createSignal<Measurable | null>(null);
  const [hasCustomAnchor, setHasCustomAnchor] = createSignal(false);
  const [open, setOpen] = createControllableSignal({
    prop: () => props.open,
    defaultProp: () => props.defaultOpen,
    onChange: props.onOpenChange,
  });

  return (
    <PopoverContext.Provider
      value={{
        anchor: anchor,
        onAnchorChange: setAnchor,
        contentId: createUniqueId(),
        triggerRef,
        open: () => open() || false,
        onOpenChange: setOpen || (() => {}),
        onOpenToggle: () => setOpen((i) => !i),
        hasCustomAnchor: hasCustomAnchor,
        onCustomAnchorAdd: () => setHasCustomAnchor(true),
        onCustomAnchorRemove: () => setHasCustomAnchor(false),
        modal: () => props.modal || false,
      }}
    >
      {props.children}
    </PopoverContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * PopoverAnchor
 * -----------------------------------------------------------------------------------------------*/

type PopoverAnchorProps = JSX.HTMLAttributes<HTMLDivElement>;

const PopoverAnchor = (props: PopoverAnchorProps) => {
  let ref: HTMLDivElement = null!;
  const context = useContext(PopoverContext);
  const { onCustomAnchorAdd, onCustomAnchorRemove } = context;

  onMount(() => {
    onCustomAnchorAdd();
    context.onAnchorChange(ref);
  });
  onCleanup(() => {
    onCustomAnchorRemove();
  });

  return <div {...props} ref={mergeRefs((e) => (ref = e), props.ref)} />;
};

/* -------------------------------------------------------------------------------------------------
 * PopoverTrigger
 * -----------------------------------------------------------------------------------------------*/

type PopoverTriggerProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

const DialogTrigger = (triggerProps: PopoverTriggerProps) => {
  const context = useContext(PopoverContext);
  const composedTriggerRef = mergeRefs(
    (el) => (context.triggerRef = el),
    triggerProps.ref
  );
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={context.open()}
      aria-controls={context.contentId}
      data-state={context.open() ? "open" : "closed"}
      {...triggerProps}
      ref={composedTriggerRef}
      onClick={composeEventHandlers(triggerProps.onClick, context.onOpenToggle)}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * PopoverPortal
 * -----------------------------------------------------------------------------------------------*/

type PopoverPortalProps = {
  children?: JSX.Element;
};

const PopoverPortal = (props: PopoverPortalProps) => {
  return <Portal>{props.children}</Portal>;
};

/* -------------------------------------------------------------------------------------------------
 * PopoverContent
 * -----------------------------------------------------------------------------------------------*/

const PopoverContent = (props: any) => {
  return <div {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * DialogClose
 * -----------------------------------------------------------------------------------------------*/

type DialogCloseProps = JSX.HTMLAttributes<HTMLButtonElement>;

const DialogClose = (props: DialogCloseProps) => {
  const context = useContext(PopoverContext);
  return (
    <button
      type="button"
      {...props}
      onClick={composeEventHandlers(props.onClick, () =>
        context.onOpenChange(false)
      )}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * PopoverArrow
 * -----------------------------------------------------------------------------------------------*/

type PopoverArrowProps = JSX.HTMLAttributes<HTMLDivElement>;

const PopoverArrow = (props: PopoverArrowProps) => {
  const context = useContext(PopoverContext);
  return <div {...props} />;
};

export const Popover = {
  Root: PopoverRoot,
  Anchor: PopoverAnchor,
  Trigger: DialogTrigger,
  Portal: PopoverPortal,
  Content: PopoverContent,
  Close: DialogClose,
  Arrow: PopoverArrow,
};

// computePosition(button, tooltip, {
//   placement: 'top',
//   middleware: [
//     offset(6),
//     flip(),
//     shift({padding: 5}),
//     arrow({element: arrowElement}),
//   ],
// }).then(({x, y, placement, middlewareData}) => {
//   Object.assign(tooltip.style, {
//     left: `${x}px`,
//     top: `${y}px`,
//   });

//   // Accessing the data
//   const {x: arrowX, y: arrowY} = middlewareData.arrow;

//   const staticSide = {
//     top: 'bottom',
//     right: 'left',
//     bottom: 'top',
//     left: 'right',
//   }[placement.split('-')[0]];

//   Object.assign(arrowElement.style, {
//     left: arrowX != null ? `${arrowX}px` : '',
//     top: arrowY != null ? `${arrowY}px` : '',
//     right: '',
//     bottom: '',
//     [staticSide]: '-4px',
//   });
// });

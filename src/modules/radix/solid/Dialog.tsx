/* -------------------------------------------------------------------------------------------------
 * Dialog
 * -----------------------------------------------------------------------------------------------*/

import {
  Accessor,
  JSX,
  Setter,
  createContext,
  createUniqueId,
  splitProps,
  useContext,
} from "solid-js";
import { mergeRefs } from "./refs";
import { composeEventHandlers } from "../core/primitive";
import { Portal } from "solid-js/web";

type DialogContextValue = {
  triggerRef: HTMLButtonElement;
  contentRef: DialogContentElement;
  contentId: string;
  titleId: string;
  descriptionId: string;
  open: Accessor<boolean>;
  onOpenChange(open: boolean): void;
  onOpenToggle(): void;
  modal: Accessor<boolean>;
};

const DialogContext = createContext<DialogContextValue>(
  undefined as any as DialogContextValue
);

interface DialogProps {
  children?: JSX.Element;
  open: Accessor<boolean>;
  onOpenChange?: Setter<boolean>;
  modal?: Accessor<boolean>;
}

const DialogRoot = (props: DialogProps) => {
  const triggerRef: HTMLButtonElement = null!;
  const contentRef: DialogContentElement = null!;

  return (
    <DialogContext.Provider
      value={{
        triggerRef,
        contentRef,
        contentId: createUniqueId(),
        titleId: createUniqueId(),
        descriptionId: createUniqueId(),
        open: props.open,
        onOpenChange: props.onOpenChange || (() => {}),
        onOpenToggle: () => props.onOpenChange?.((i) => !i),
        modal: props.modal || (() => false),
      }}
    >
      {props.children}
    </DialogContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * DialogTrigger
 * -----------------------------------------------------------------------------------------------*/

type DialogTriggerProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

const DialogTrigger = (triggerProps: DialogTriggerProps) => {
  const context = useContext(DialogContext);
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
 * DialogPortal
 * -----------------------------------------------------------------------------------------------*/

const PORTAL_NAME = "DialogPortal";

type DialogPortalProps = {
  children?: JSX.Element;
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
};

const DialogPortal = (props: DialogPortalProps) => {
  const context = useContext(DialogContext);
  return <>{context.open() ? <Portal>{props.children}</Portal> : null}</>;
};

/* -------------------------------------------------------------------------------------------------
 * DialogOverlay
 * -----------------------------------------------------------------------------------------------*/

type DialogOverlayProps = JSX.HTMLAttributes<HTMLDivElement>;

const DialogOverlay = (props: DialogOverlayProps) => {
  const overlayProps = props;
  const context = useContext(DialogContext);
  const style =
    overlayProps.style && typeof overlayProps.style === "object"
      ? overlayProps.style
      : {};
  return (
    // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
    // ie. when `Overlay` and `Content` are siblings
    // <RemoveScroll as={Slot} allowPinchZoom shards={[context.contentRef]}>
    <div
      data-state={context.open() ? "open" : "closed"}
      {...overlayProps}
      // We re-enable pointer-events prevented by `Dialog.Content` to allow scrolling the overlay.
      style={{ "pointer-events": "auto", ...style }}
    />
    // </RemoveScroll>
  );
};

/* -----------------------------------------------------------------------------------------------*/

type DialogContentElement = HTMLDivElement;
interface DialogContentProps extends JSX.HTMLAttributes<DialogContentElement> {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
}

const DialogContentNonModal = (props: DialogContentProps) => {
  const context = useContext(DialogContext);
  let hasInteractedOutsideRef = false;

  return (
    <DialogContentImpl
      {...props}
      // trapFocus={false}
      // disableOutsidePointerEvents={false}
      // onCloseAutoFocus={(event) => {
      //   // props.onCloseAutoFocus?.(event);

      //   if (!event.defaultPrevented) {
      //     if (!hasInteractedOutsideRef) context.triggerRef?.focus();
      //     // Always prevent auto focus because we either focus manually or want user agent focus
      //     event.preventDefault();
      //   }

      //   hasInteractedOutsideRef = false;
      // }}
      // onInteractOutside={(event) => {
      //   // props.onInteractOutside?.(event);

      //   if (!event.defaultPrevented) hasInteractedOutsideRef = true;

      //   // Prevent dismissing when clicking the trigger.
      //   // As the trigger is already setup to close, without doing so would
      //   // cause it to close and immediately open.
      //   //
      //   // We use `onInteractOutside` as some browsers also
      //   // focus on pointer down, creating the same issue.
      //   const target = event.target as HTMLElement;
      //   const targetIsTrigger = context.triggerRef?.contains(target);
      //   if (targetIsTrigger) event.preventDefault();
      // }}
    />
  );
};

/* -----------------------------------------------------------------------------------------------*/

type DialogContentImplElement = HTMLDivElement;
type DismissableLayerProps = JSX.HTMLAttributes<DialogContentElement>;
type FocusScopeProps = JSX.HTMLAttributes<HTMLDivElement>;

interface DialogContentImplProps
  extends Omit<DismissableLayerProps, "onDismiss"> {
  // /**
  //  * When `true`, focus cannot escape the `Content` via keyboard,
  //  * pointer, or a programmatic focus.
  //  * @defaultValue false
  //  */
  // trapFocus?: FocusScopeProps["trapped"];
  // /**
  //  * Event handler called when auto-focusing on open.
  //  * Can be prevented.
  //  */
  // onOpenAutoFocus?: FocusScopeProps["onMountAutoFocus"];
  // /**
  //  * Event handler called when auto-focusing on close.
  //  * Can be prevented.
  //  */
  // onCloseAutoFocus?: FocusScopeProps["onUnmountAutoFocus"];
}

const DialogContentImpl = (props: DialogContentImplProps) => {
  const context = useContext(DialogContext);

  const [otherProps, contentProps] = splitProps(props, [
    // "trapFocus",
    // "onOpenAutoFocus",
    // "onCloseAutoFocus",
  ]);

  // Make sure the whole tree has focus guards as our `Dialog` will be
  // the last element in the DOM (beacuse of the `Portal`)
  // useFocusGuards();

  return (
    <>
      {/* <FocusScope
          asChild
          loop
          trapped={trapFocus}
          onMountAutoFocus={onOpenAutoFocus}
          onUnmountAutoFocus={onCloseAutoFocus}
        > */}
      <div
        role="dialog"
        id={context.contentId}
        aria-describedby={context.descriptionId}
        aria-labelledby={context.titleId}
        data-state={context.open() ? "open" : "closed"}
        {...contentProps}
        // onDismiss={() => context.onOpenChange(false)}
      />
      {/* </FocusScope> */}
    </>
  );
};

/* -------------------------------------------------------------------------------------------------
 * DialogTitle
 * -----------------------------------------------------------------------------------------------*/

type DialogTitleProps = JSX.HTMLAttributes<HTMLHeadingElement>;

const DialogTitle = (props: DialogTitleProps) => {
  const context = useContext(DialogContext);
  return <h2 id={context.titleId} {...props} />;
};

/* -------------------------------------------------------------------------------------------------
 * DialogDescription
 * -----------------------------------------------------------------------------------------------*/

const DESCRIPTION_NAME = "DialogDescription";

type DialogDescriptionProps = JSX.HTMLAttributes<HTMLParagraphElement>;

const DialogDescription = (props: DialogDescriptionProps) => {
  const context = useContext(DialogContext);
  return <p id={context.descriptionId} {...props} />;
};

DialogDescription.displayName = DESCRIPTION_NAME;

/* -------------------------------------------------------------------------------------------------
 * DialogClose
 * -----------------------------------------------------------------------------------------------*/

type DialogCloseProps = JSX.HTMLAttributes<HTMLButtonElement>;

const DialogClose = (props: DialogCloseProps) => {
  const context = useContext(DialogContext);
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

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContentNonModal,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
};

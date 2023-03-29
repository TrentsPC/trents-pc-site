import {
  Accessor,
  JSX,
  Show,
  createContext,
  createEffect,
  createUniqueId,
  splitProps,
  useContext,
} from "solid-js";
import { createControllableSignal } from "./createControllableSignal";
import { Primitive, PrimitiveProps } from "./Primitive";
import { composeEventHandlers } from "../core/primitive";
import { mergeRefs } from "~/modules/radix/solid/refs";
import { Portal } from "solid-js/web";
import { Presence } from "./Presence";
import { Slot } from "./Slot";
import { RemoveScroll } from "./RemoveScroll";
import { DismissibleLayer, DismissibleLayerProps } from "./Dismissiblelayer";
import { FocusScope } from "./FocusScope";

/* -------------------------------------------------------------------------------------------------
 * Dialog
 * -----------------------------------------------------------------------------------------------*/

type DialogContextValue = {
  triggerRef: HTMLButtonElement;
  contentRef: HTMLDivElement;
  contentId: string;
  titleId: string;
  descriptionId: string;
  open: Accessor<boolean>;
  onOpenChange(open: boolean): void;
  onOpenToggle(): void;
  modal: Accessor<boolean>;
};

const DialogContext = createContext<DialogContextValue>(
  undefined! as DialogContextValue
);

interface DialogProps {
  children?: JSX.Element;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
  modal?: boolean;
}

function DialogRoot(props: DialogProps) {
  let triggerRef: HTMLButtonElement = null!;
  let contentRef: HTMLDivElement = null!;
  const [open, setOpen] = createControllableSignal({
    prop: () => props.open,
    defaultProp: () => props.defaultOpen,
    onChange: props.onOpenChange,
  });

  return (
    <DialogContext.Provider
      value={{
        triggerRef: triggerRef,
        contentRef: contentRef,
        contentId: createUniqueId(),
        titleId: createUniqueId(),
        descriptionId: createUniqueId(),
        open: () => open() ?? false,
        onOpenChange: setOpen,
        onOpenToggle: () => setOpen(!open()),
        modal: () => props.modal ?? true,
      }}
    >
      {props.children}
    </DialogContext.Provider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * DialogTrigger
 * -----------------------------------------------------------------------------------------------*/

type DialogTriggerProps = PrimitiveProps<"button">;

function DialogTrigger(props: DialogTriggerProps) {
  const context = useContext(DialogContext);
  const composedTriggerRef = mergeRefs(
    (el) => (context.triggerRef = el),
    props.ref
  );
  return (
    <Primitive.button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={context.open()}
      aria-controls={context.contentId}
      data-state={getState(context.open())}
      {...props}
      ref={composedTriggerRef}
      onClick={composeEventHandlers(props.onClick, context.onOpenToggle)}
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * DialogPortal
 * -----------------------------------------------------------------------------------------------*/

type PortalContextValue = { forceMount: Accessor<boolean | undefined> };
const PortalContext = createContext<PortalContextValue>({
  forceMount: () => undefined,
});

type DialogPortalProps = {
  children?: JSX.Element;
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
};

function DialogPortal(props: DialogPortalProps) {
  return (
    <PortalContext.Provider value={{ forceMount: () => props.forceMount }}>
      <Portal>{props.children}</Portal>
    </PortalContext.Provider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * DialogOverlay
 * -----------------------------------------------------------------------------------------------*/

type DialogOverlayProps = DialogOverlayImplProps & {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: boolean;
};

const DialogOverlay = (props: DialogOverlayProps) => {
  const portalContext = useContext(PortalContext);
  const { forceMount = portalContext.forceMount, ...overlayProps } = props;
  const context = useContext(DialogContext);

  return (
    <Show when={context.modal()}>
      <Presence
        visible={
          props.forceMount || portalContext.forceMount() || context.open()
        }
      >
        <DialogOverlayImpl {...overlayProps} />
      </Presence>
    </Show>
  );
};

type DialogOverlayImplProps = PrimitiveProps<"div">;

function DialogOverlayImpl(props: DialogOverlayImplProps) {
  const context = useContext(DialogContext);
  return (
    // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
    // ie. when `Overlay` and `Content` are siblings
    <RemoveScroll allowPinchZoom shards={[context.contentRef]}>
      <Primitive.div
        data-state={getState(context.open())}
        {...props}
        // We re-enable pointer-events prevented by `Dialog.Content` to allow scrolling the overlay.
        style={{ pointerEvents: "auto", ...(props.style as any) }}
      />
    </RemoveScroll>
  );
}

/* -------------------------------------------------------------------------------------------------
 * DialogContent
 * -----------------------------------------------------------------------------------------------*/

type DialogContentProps = DialogContentTypeProps & {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
};

function DialogContent(props: DialogContentProps) {
  const portalContext = useContext(PortalContext);
  const [, contentProps] = splitProps(props, ["forceMount"]);
  const context = useContext(DialogContext);
  return (
    <Presence
      visible={props.forceMount || portalContext.forceMount() || context.open()}
    >
      {context.modal() ? (
        <DialogContentModal {...contentProps} />
      ) : (
        <DialogContentNonModal {...contentProps} />
      )}
    </Presence>
  );
}

/* -----------------------------------------------------------------------------------------------*/

type DialogContentTypeElement = DialogContentImplElement;
interface DialogContentTypeProps
  extends Omit<
    DialogContentImplProps,
    "trapFocus" | "disableOutsidePointerEvents"
  > {}

function DialogContentModal(props: DialogContentTypeProps) {
  const context = useContext(DialogContext);
  let contentRef: HTMLDivElement = null!;
  const composedRefs = mergeRefs((el) => {
    context.contentRef = el;
    contentRef = el;
  }, props.ref);

  // aria-hide everything except the content (better supported equivalent to setting aria-modal)
  createEffect(() => {
    const content = contentRef;
    // if (content) {return hideOthers(content);}
  });

  return (
    <DialogContentImpl
      {...props}
      ref={composedRefs}
      // we make sure focus isn't trapped once `DialogContent` has been closed
      // (closed !== unmounted when animating out)
      // trapFocus={context.open}
      // disableOutsidePointerEvents
      // onCloseAutoFocus={composeEventHandlers(
      //   props.onCloseAutoFocus,
      //   (event) => {
      //     event.preventDefault();
      //     context.triggerRef?.focus();
      //   }
      // )}
      // onPointerDownOutside={composeEventHandlers(props.onPointerDownOutside, (event) => {
      //   const originalEvent = event.detail.originalEvent;
      //   const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
      //   const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

      //   // If the event is a right-click, we shouldn't close because
      //   // it is effectively as if we right-clicked the `Overlay`.
      //   if (isRightClick) event.preventDefault();
      // })}
      // When focus is trapped, a `focusout` event may still happen.
      // We make sure we don't trigger our `onDismiss` in such case.
      // onFocusOutside={composeEventHandlers(props.onFocusOutside, (event) =>
      //   event.preventDefault()
      // )}
    />
  );
}

/* -----------------------------------------------------------------------------------------------*/

function DialogContentNonModal(props: DialogContentTypeProps) {
  const context = useContext(DialogContext);
  let hasInteractedOutsideRef = false;

  return (
    <DialogContentImpl
      {...props}
      // trapFocus={false}
      // disableOutsidePointerEvents={false}
      // onCloseAutoFocus={(event) => {
      //   props.onCloseAutoFocus?.(event);

      //   if (!event.defaultPrevented) {
      //     if (!hasInteractedOutsideRef) context.triggerRef?.focus();
      //     // Always prevent auto focus because we either focus manually or want user agent focus
      //     event.preventDefault();
      //   }

      //   hasInteractedOutsideRef = false;
      // }}
      // onInteractOutside={(event) => {
      //   props.onInteractOutside?.(event);

      //   if (!event.defaultPrevented) hasInteractedOutsideRef.current = true;

      //   // Prevent dismissing when clicking the trigger.
      //   // As the trigger is already setup to close, without doing so would
      //   // cause it to close and immediately open.
      //   //
      //   // We use `onInteractOutside` as some browsers also
      //   // focus on pointer down, creating the same issue.
      //   const target = event.target as HTMLElement;
      //   const targetIsTrigger = context.triggerRef.current?.contains(target);
      //   if (targetIsTrigger) event.preventDefault();
      // }}
    />
  );
}

/* -----------------------------------------------------------------------------------------------*/

type DialogContentImplElement = HTMLDivElement;
interface DialogContentImplProps
  extends Omit<DismissibleLayerProps, "onDismiss"> {
  /**
   * When `true`, focus cannot escape the `Content` via keyboard,
   * pointer, or a programmatic focus.
   * @defaultValue false
   */
  // trapFocus?: FocusScopeProps["trapped"];
  /**
   * Event handler called when auto-focusing on open.
   * Can be prevented.
   */
  // onOpenAutoFocus?: FocusScopeProps["onMountAutoFocus"];
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  // onCloseAutoFocus?: FocusScopeProps["onUnmountAutoFocus"];
}

function DialogContentImpl(props: DialogContentImplProps) {
  // const {
  //   __scopeDialog,
  //   trapFocus,
  //   onOpenAutoFocus,
  //   onCloseAutoFocus,
  //   ...contentProps
  // } = props;
  const context = useContext(DialogContext);
  let contentRef: HTMLDivElement = null!;
  const composedRefs = mergeRefs((el) => {
    contentRef = el;
  }, props.ref);

  // Make sure the whole tree has focus guards as our `Dialog` will be
  // the last element in the DOM (beacuse of the `Portal`)
  // useFocusGuards();

  return (
    <>
      <FocusScope.Root
        asChild
        // loop
        // trapped={trapFocus}
        // onMountAutoFocus={onOpenAutoFocus}
        // onUnmountAutoFocus={onCloseAutoFocus}
      >
        <DismissibleLayer.Root
          role="dialog"
          id={context.contentId}
          aria-describedby={context.descriptionId}
          aria-labelledby={context.titleId}
          data-state={getState(context.open())}
          // {...contentProps}
          ref={composedRefs}
          // onDismiss={() => context.onOpenChange(false)}
        />
      </FocusScope.Root>
    </>
  );
}

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContent,
};

export type {
  DialogProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogOverlayProps,
  DialogContentProps,
};

/* -----------------------------------------------------------------------------------------------*/

function getState(open: boolean) {
  return open ? "open" : "closed";
}

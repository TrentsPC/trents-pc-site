import {
  Accessor,
  JSX,
  createContext,
  createEffect,
  createSignal,
  splitProps,
  useContext,
} from "solid-js";

/* -------------------------------------------------------------------------------------------------
 * Avatar
 * -----------------------------------------------------------------------------------------------*/

type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";

type AvatarContextValue = {
  imageLoadingStatus: Accessor<ImageLoadingStatus>;
  onImageLoadingStatusChange(status: ImageLoadingStatus): void;
};

const AvatarContext = createContext<AvatarContextValue>(
  undefined as any as AvatarContextValue
);

type PrimitiveSpanProps = JSX.HTMLAttributes<HTMLSpanElement>;
interface AvatarProps extends PrimitiveSpanProps {}

const AvatarRoot = (props: AvatarProps) => {
  const [imageLoadingStatus, setImageLoadingStatus] =
    createSignal<ImageLoadingStatus>("idle");
  return (
    <AvatarContext.Provider
      value={{
        imageLoadingStatus,
        onImageLoadingStatusChange: setImageLoadingStatus,
      }}
    >
      <span {...props} />
    </AvatarContext.Provider>
  );
};

/* -------------------------------------------------------------------------------------------------
 * AvatarImage
 * -----------------------------------------------------------------------------------------------*/

const IMAGE_NAME = "AvatarImage";

type PrimitiveImageProps = JSX.ImgHTMLAttributes<HTMLImageElement>;
interface AvatarImageProps extends PrimitiveImageProps {
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void;
}

const AvatarImage = (props: AvatarImageProps) => {
  const [otherProps, imageProps] = splitProps(props, ["onLoadingStatusChange"]);
  const context = useContext(AvatarContext);
  const imageLoadingStatus = useImageLoadingStatus(() => imageProps.src);
  const handleLoadingStatusChange = (status: ImageLoadingStatus) => {
    otherProps.onLoadingStatusChange?.(status);
    context.onImageLoadingStatusChange(status);
  };

  createEffect(() => {
    if (imageLoadingStatus() !== "idle") {
      handleLoadingStatusChange(imageLoadingStatus());
    }
  });

  return (
    <>{imageLoadingStatus() === "loaded" ? <img {...imageProps} /> : null}</>
  );
};

/* -------------------------------------------------------------------------------------------------
 * AvatarFallback
 * -----------------------------------------------------------------------------------------------*/

const FALLBACK_NAME = "AvatarFallback";

type AvatarFallbackElement = JSX.HTMLAttributes<HTMLSpanElement>;
interface AvatarFallbackProps extends PrimitiveSpanProps {
  delayMs?: number;
}

const AvatarFallback = (props: AvatarFallbackProps) => {
  const [delayProps, fallbackProps] = splitProps(props, ["delayMs"]);
  const context = useContext(AvatarContext);
  const [canRender, setCanRender] = createSignal(props.delayMs === undefined);

  createEffect(() => {
    if (delayProps.delayMs !== undefined) {
      const timerId = window.setTimeout(
        () => setCanRender(true),
        delayProps.delayMs
      );
      return () => window.clearTimeout(timerId);
    }
  });

  return (
    <>
      {canRender() && context.imageLoadingStatus() !== "loaded" ? (
        <span {...fallbackProps} />
      ) : null}
    </>
  );
};

/* -----------------------------------------------------------------------------------------------*/

function useImageLoadingStatus(src: Accessor<string | undefined>) {
  const [loadingStatus, setLoadingStatus] =
    createSignal<ImageLoadingStatus>("idle");

  createEffect(() => {
    if (!src()) {
      setLoadingStatus("error");
      return;
    }

    let isMounted = true;
    const image = new window.Image();

    const updateStatus = (status: ImageLoadingStatus) => () => {
      if (!isMounted) return;
      setLoadingStatus(status);
    };

    setLoadingStatus("loading");
    image.onload = updateStatus("loaded");
    image.onerror = updateStatus("error");
    image.src = src()!;

    return () => {
      isMounted = false;
    };
  });

  return loadingStatus;
}

export { AvatarRoot, AvatarImage, AvatarFallback };
export type { AvatarProps, AvatarImageProps, AvatarFallbackProps };

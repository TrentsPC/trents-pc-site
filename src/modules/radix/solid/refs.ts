/**
 * Utility for using jsx refs both for local variables and providing it to the `props.ref` for component consumers.
 * @param setRef use this to set local variables
 * @param propsRef for forwarding the ref to `props.ref`
 * @example
 * ```tsx
 * interface ButtonProps {
 *    ref?: HTMLButtonElement | ((el: HTMLButtonElement) => void);
 * }
 * const Button = (props: ButtonProps) => {
 *    let ref!: HTMLButtonElement
 *    onMount(() => {
 *        // use the local ref
 *    })
 *    return <button ref={mergeRefs(el => (ref = el), props.ref)} />
 * }
 *
 * // in consumer's component:
 * let ref!: HTMLButtonElement
 * <Button ref={ref} />
 * ```
 */
export function mergeRefs<T extends Element>(
  setRef: (el: T) => void,
  propsRef: T | ((el: T) => void) | undefined
): (el: T) => void {
  return (el) => {
    setRef(el);
    (propsRef as ((el: T) => void) | undefined)?.(el);
  };
}

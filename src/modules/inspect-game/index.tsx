import { onMount } from "solid-js";

export function InspectGame() {
  let root: HTMLDivElement = undefined!;

  onMount(() => {
    let introComment = document.createComment(" Hi! ");
    root.append(introComment);

    let responseEl = document.createElement("response");
    responseEl.dataset["response"] = "Enter your response...";
    root.append(responseEl);

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback: MutationCallback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          console.log("A child node has been added or removed.");
        } else if (mutation.type === "attributes") {
          console.log(`The ${mutation.attributeName} attribute was modified.`);
        }
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(responseEl, config);
  });

  onMount(() => {
    const map = "!@#$%^&*,./<>?;':|`~";
    let i = 0;
    const message = " # ";
    let c = document.createComment(message);
    document.body.prepend(c);
    setInterval(() => {
      c.textContent = message.replaceAll("#", map[i]);
      i++;
      i = i % map.length;
    }, 100);
  });

  // @ts-ignore
  return <inspect-me ref={root} />;
}

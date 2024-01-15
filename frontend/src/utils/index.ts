import { MouseEvent } from "react";

export function handleCountUtil(e: MouseEvent<HTMLButtonElement>) {
  const buttonClass = (e.currentTarget as HTMLButtonElement).getAttribute("class");
  if (buttonClass) {
    const firstUnderscoreIndex = buttonClass.indexOf("_");
    const secondUnderscoreIndex = buttonClass.indexOf("_", firstUnderscoreIndex + 1);
    return buttonClass.substring(firstUnderscoreIndex + 1, secondUnderscoreIndex);
  }
}

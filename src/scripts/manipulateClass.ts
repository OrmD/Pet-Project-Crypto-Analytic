const svgIcon = document.querySelector(".svg-arrow") as SVGSVGElement;
const svgIcon2 = document.querySelector(".svg-arrow-2") as SVGSVGElement;
const svgIcon3 = document.querySelector(".svg-arrow-3") as SVGSVGElement;

import { sortingPrice } from "./sortingData";

function manipulateClass(elem: SVGSVGElement): void {
  if (!elem.classList.contains("up") && !elem.classList.contains("down")) {
    elem.classList.add("up");
  } else if (elem.classList.contains("up")) {
    elem.classList.replace("up", "down");
  } else if (elem.classList.contains("down")) {
    elem.classList.remove("down");
  }
}

function deletedClass(el2: SVGSVGElement, el3: SVGSVGElement): void {
  if (el2.classList.contains("up") || el2.classList.contains("down")) {
    el2.classList.remove("up", "down");
  }
  if (el3.classList.contains("up") || el3.classList.contains("down")) {
    el3.classList.remove("up", "down");
  }
}

export function handledButtons(buttonsBlock: HTMLDivElement): void {
  buttonsBlock?.addEventListener("click", (event: MouseEvent): void => {
    const target = event.target as HTMLButtonElement;

    if (target.className === "btn-price") {
      sortingPrice("Price");
      deletedClass(svgIcon2, svgIcon3);
      manipulateClass(svgIcon);
    } else if (target.className === "btn-change") {
      sortingPrice("Price change");
      deletedClass(svgIcon, svgIcon3);
      manipulateClass(svgIcon2);
    } else if (target.className === "btn-change-percent") {
      sortingPrice("Price change %");
      deletedClass(svgIcon2, svgIcon);
      manipulateClass(svgIcon3);
    } else {
      console.log("Для кнопик не назначено операцій");
    }
  });
}

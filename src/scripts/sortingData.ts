import { createDataTable, sliceArray } from "./getAPI";
import { tbody } from "./variables";
import type { Coin } from "./variables";

let typeSort: "asc" | "desc" | "start" = "start";

function sortingPrice(columnSorted: string): void {
  if (sliceArray !== null) {
    if (typeSort === "start") {
      typeSort = "asc";
    } else if (typeSort === "asc") {
      typeSort = "desc";
    } else if (typeSort === "desc") {
      typeSort = "start";
    }

    const sorted = sortArray(sliceArray, typeSort, columnSorted); // створення копії
    createDataTable(sorted, tbody);
  }
}

function sortArray(
  array: Coin[],
  order: "asc" | "desc" | "start",
  columnSort: string
): Coin[] {
  if (order === "start") {
    return array;
  }

  if (columnSort === "Price") {
    return [...array].sort((a, b) =>
      order === "asc"
        ? b.current_price - a.current_price
        : a.current_price - b.current_price
    );
  } else if (columnSort === "Price change") {
    return [...array].sort((a, b) =>
      order === "asc"
        ? b.price_change_24h - a.price_change_24h
        : a.price_change_24h - b.price_change_24h
    );
  } else if (columnSort === "Price change %") {
    return [...array].sort((a, b) =>
      order === "asc"
        ? b.price_change_percentage_24h - a.price_change_percentage_24h
        : a.price_change_percentage_24h - b.price_change_percentage_24h
    );
  }
  return array;
}

export { sortArray, sortingPrice };

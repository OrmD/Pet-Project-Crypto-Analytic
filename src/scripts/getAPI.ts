import type { Coin } from "./variables";
import { tbody } from "./variables";

export async function getApi(): Promise<Coin[] | null> {
  let data;
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false";

  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error! Status ${res.status}`);
    }
    data = await res.json();
    return data;
  } catch (error) {
    console.error(" Error fetching coins:", error);
    return null;
  }
}

const data = await getApi();
export const sliceArray = slicedArray(data, 13);

if (sliceArray !== null) {
  createDataTable(sliceArray, tbody);
}

export function createDataTable(
  array: Coin[] | null,
  elem: HTMLTableSectionElement
) {
  let rowsHTML = ""; // змінна для накопичення HTML-рядків
  if (array === null) {
    return console.error(Error, "Данні массиву відсутні");
  }
  array.forEach((el, index) => {
    rowsHTML += `
		<tr class="table__body-row">
		  <td>${index + 1}</td>
		  <td class="table__img"><img src="${el.image}" alt="${
      el.name
    }" width="24" /></td>
		  <td>${el.name}</td>
		  <td>${el.symbol}</td>
		  <td>${el.current_price}</td>
		  <td>${el.price_change_24h.toFixed(2)}</td>
		  <td>${el.price_change_percentage_24h.toFixed(2)}%</td>
		</tr>
	  `;
  });

  elem.innerHTML = rowsHTML; // вставляємо всі рядки за один раз
}

function slicedArray(array: Coin[] | null, numberSlice: number): Coin[] | null {
  if (array !== null) {
    return array.slice(0, numberSlice);
  }
  return null;
}

const tbody = document.querySelector("tbody") as HTMLTableSectionElement;

const btns = document.querySelector(
  ".table__buttons"
) as HTMLButtonElement | null;

const btnPrice = document.querySelector(
  ".btn-price"
) as HTMLButtonElement | null;

const btnPriceChange = document.querySelector(
  ".btn-change"
) as HTMLButtonElement | null;

const btnPriceChangePercent = document.querySelector(
  ".btn-change-percent"
) as HTMLButtonElement | null;

const btnUpdate = document.querySelector(
  ".btn-update"
) as HTMLButtonElement | null;

export interface Coin {
  id: string;
  image: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
}

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
console.log(data);
const sliceArray = slicedArray(data, 13);

if (sliceArray !== null) {
  createDataTable(sliceArray, tbody);
}

let typeSort: "asc" | "desc" | "start" = "start";
function sortingPrice(): void {
  if (sliceArray !== null) {
    if (typeSort === "start") {
      typeSort = "asc";
    } else if (typeSort === "asc") {
      typeSort = "desc";
    } else if (typeSort === "desc") {
      typeSort = "start";
    }

    const sorted = sortArray(sliceArray, typeSort); // створення копії
    createDataTable(sorted, tbody);
  }
}

btns?.addEventListener("click", (event: MouseEvent) => {
  const target = event.target as HTMLButtonElement;

  if (target.className === "btn-price") {
    sortingPrice();
  }
});
function createDataTable(array: Coin[], elem: HTMLTableSectionElement) {
  let rowsHTML = ""; // змінна для накопичення HTML-рядків
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
function sortArray(array: Coin[], order: "asc" | "desc" | "start"): Coin[] {
  if (order === "start") {
    return array;
  }
  return [...array].sort((a, b) =>
    order === "asc"
      ? b.current_price - a.current_price
      : a.current_price - b.current_price
  );
}

btnUpdate?.addEventListener("click", () => getApi());

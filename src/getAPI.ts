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

const svgArrow: string = `<svg height="20" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330" xml:space="preserve" className="svg-arrow">
<path d="M15 180h263.787l-49.394 49.394c-5.858 5.857-5.858 15.355 0 21.213C232.322 253.535 236.161 255 240 255s7.678-1.465 10.606-4.394l75-75c5.858-5.857 5.858-15.355 0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213 0-5.858 5.857-5.858 15.355 0 21.213L278.787 150H15c-8.284 0-15 6.716-15 15s6.716 15 15 15z"/></svg>`;

btns?.addEventListener("click", (event: MouseEvent): void => {
  const target = event.target as HTMLButtonElement;
  if (target.className === "btn-price") {
    sortingPrice("Price");
    console.log(target);
  } else if (target.className === "btn-change") {
    sortingPrice("Price change");
  } else if (target.className === "btn-change-percent") {
    sortingPrice("Price change %");
  } else {
    console.log("Для кнопик не назначено операцій");
  }
});
function createDataTable(array: Coin[] | null, elem: HTMLTableSectionElement) {
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

btnUpdate?.addEventListener("click", () => {
  getApi();
  createDataTable(sliceArray, tbody);
});

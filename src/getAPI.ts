const tbody = document.querySelector("tbody") as HTMLTableSectionElement;

const btnPrice = document.querySelector(
  ".btn-price"
) as HTMLButtonElement | null;

const btnPriceChange = document.querySelector(
  ".btn-change"
) as HTMLButtonElement | null;

const btnPriceChangePercent = document.querySelector(
  ".btn-change-percent"
) as HTMLButtonElement | null;

export interface Coin {
  map(arg0: (el: any, index: any) => void): unknown;
  id: string;
  image: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
}

export async function getApi(): Promise<Coin[] | null> {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false";

  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error! Status ${res.status}`);
    }
    const data = await res.json();
    slicedArray(data);
    createDataTable(data, tbody);
    console.log(data);

    return data;
  } catch (error) {
    console.error(" Error fetching coins:", error);
    return null;
  }
}

const arrow: string = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="m8.728 15.795-5-8A1.5 1.5 0 0 1 5 5.5h10a1.5 1.5 0 0 1 1.272 2.295l-5 8a1.5 1.5 0 0 1-2.544 0Z"
								fill="#50e20c" />
						</svg>
`;

function createDataTable(array: Coin[], elem: HTMLTableSectionElement) {
  let rowsHTML = ""; // змінна для накопичення HTML-рядків
  const newArray: Coin[] = array.slice(0, 10);
  newArray.forEach((el, index) => {
    rowsHTML += `
		<tr class="table__body-row">
		  <td>${index + 1}</td>
		  <td class="table__img"><img src="${el.image}" alt="${
      el.name
    }" width="24" /></td>
		  <td>${el.name}</td>
		  <td>${el.symbol}</td>
		  <td>${el.current_price}</td>
		  <td>${el.price_change_24h}</td>
		  <td>${el.price_change_percentage_24h}</td>
		</tr>
	  `;
  });

  elem.innerHTML = rowsHTML; // вставляємо всі рядки за один раз
}
function slicedArray(array: Coin[]): Coin[] {
  return array.slice(0, 10);
}
function changePrice(array: Coin[]): Coin[] {
  const newArr: Coin[] = [];

  return newArr;
}

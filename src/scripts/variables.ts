const tbody = document.querySelector("tbody") as HTMLTableSectionElement;

const btns = document.querySelector(".table__buttons") as HTMLDivElement;

interface Coin {
  id: string;
  image: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
}

export type { Coin };
export { btns, tbody };

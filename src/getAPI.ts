const imgBlock = document.querySelector(".table__img");
console.log(imgBlock);

export function getApi() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

  const options = { method: "GET", headers: { accept: "application/json" } };

  fetch(url, options)
    .then((res: Response) => res.json())
    .then((json) => {
      console.log(json);
    })
    .catch((err) => console.error(err));
}

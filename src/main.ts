import { getApi } from "./scripts/getAPI.ts";
import { btns } from "./scripts/variables";
import { handledButtons } from "./scripts/manipulateClass.ts";

import "./reset.css";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  getApi();
  // ✅ викликається тільки один раз при завантаженні
});
handledButtons(btns);

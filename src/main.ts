import { getApi } from "./getAPI.ts";
import "./reset.css";
import "./style.css";
document.addEventListener("DOMContentLoaded", () => {
  getApi(); // ✅ викликається тільки один раз при завантаженні
});

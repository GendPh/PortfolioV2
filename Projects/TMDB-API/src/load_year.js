export function LoadYear() {
  const todayYear = new Date().getFullYear();
  document.getElementById("year").textContent = todayYear + " | All rights reserved | ";
}
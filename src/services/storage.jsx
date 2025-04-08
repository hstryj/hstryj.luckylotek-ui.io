export function validateCode(code) {
  const validCodes = ["ABCD1234", "DEMO2024"];
  return validCodes.includes(code);
}

export function saveAccess() {
  localStorage.setItem("access", "true");
}

export function loadAccess() {
  return localStorage.getItem("access") === "true";
}

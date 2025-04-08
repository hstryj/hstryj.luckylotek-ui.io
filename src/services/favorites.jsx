const STORAGE_KEY = "savedNumbers";

export function saveFavorite(set, strategy) {
  console.log(">> ZAPIS: ", set, strategy);
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const sortedSet = [...set].sort((a, b) => a - b);

  const arraysEqual = (a, b) =>
    a.length === b.length && a.every((val, i) => val === b[i]);

  const alreadyExists = existing.some(entry =>
    arraysEqual(entry.set.sort((a, b) => a - b), sortedSet)
  );
  if (alreadyExists) {
    alert("Ten zestaw już istnieje.");
    return;
  }

  existing.push({
    set: sortedSet,
    strategy,
    date: new Date().toISOString()
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function loadFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function deleteFavorite(index) {
  const existing = loadFavorites();
  existing.splice(index, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

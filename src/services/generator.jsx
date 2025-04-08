let historyData = [];

/**
 * Ładowanie danych z pliku draws.json
 */
export async function loadHistoryData() {
  try {
    const response = await fetch("/draws.json");
    const data = await response.json();
    historyData = data;
  } catch (error) {
    console.error("Błąd wczytywania danych losowań:", error);
  }
}

/**
 * Zwraca wszystkie liczby z historii losowań jako płaską tablicę
 */
function getAllDrawnNumbers() {
  return historyData.flatMap(draw => draw.numbers);
}

/**
 * Zwraca X ostatnich losowań
 */
function getRecentDraws(count = 5) {
  return historyData.slice(-count);
}

/**
 * Losuje unikalne liczby z podanej tablicy
 */
function pickRandom(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).sort((a, b) => a - b);
}

/**
 * Główna funkcja generująca liczby według strategii
 */
export function generateNumbers(strategy) {
  const allNumbers = getAllDrawnNumbers();

  if (allNumbers.length === 0) {
    return pickRandom(Array.from({ length: 49 }, (_, i) => i + 1), 6);
  }

  switch (strategy) {
    case "mostCommon": {
      const freq = {};
      allNumbers.forEach(n => (freq[n] = (freq[n] || 0) + 1));
      const top = Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(entry => parseInt(entry[0]));
      return pickRandom(top, 6);
    }

    case "leastCommon": {
      const freq = {};
      allNumbers.forEach(n => (freq[n] = (freq[n] || 0) + 1));
      const bottom = Object.entries(freq)
        .sort((a, b) => a[1] - b[1])
        .slice(0, 20)
        .map(entry => parseInt(entry[0]));
      return pickRandom(bottom, 6);
    }

    case "skipRecent": {
      const recentNumbers = getRecentDraws(5).flatMap(draw => draw.numbers);
      const all = Array.from({ length: 49 }, (_, i) => i + 1);
      const filtered = all.filter(n => !recentNumbers.includes(n));
      return pickRandom(filtered, 6);
    }

    case "evenOdd": {
      const even = Array.from({ length: 24 }, (_, i) => (i + 1) * 2).filter(n => n <= 49);
      const odd = Array.from({ length: 25 }, (_, i) => i * 2 + 1).filter(n => n <= 49);
      return pickRandom(even, 3).concat(pickRandom(odd, 3)).sort((a, b) => a - b);
    }

    case "popularPairs": {
      const pairs = {};
      historyData.forEach(draw => {
        const nums = draw.numbers;
        for (let i = 0; i < nums.length; i++) {
          for (let j = i + 1; j < nums.length; j++) {
            const key = [nums[i], nums[j]].sort((a, b) => a - b).join("-");
            pairs[key] = (pairs[key] || 0) + 1;
          }
        }
      });
      const topPair = Object.entries(pairs)
        .sort((a, b) => b[1] - a[1])[0][0]
        .split("-")
        .map(Number);
      const pool = Array.from({ length: 49 }, (_, i) => i + 1).filter(n => !topPair.includes(n));
      return [...topPair, ...pickRandom(pool, 4)].sort((a, b) => a - b);
    }

    default:
      return pickRandom(Array.from({ length: 49 }, (_, i) => i + 1), 6);
  }
}
export function analyzeDraws(draws) {
    const countMap = {};
    for (const draw of draws) {
      for (const n of draw.numbers) {
        countMap[n] = (countMap[n] || 0) + 1;
      }
    }
    return countMap;
  }
  
  export function getFavoritePairs(draws, target) {
    const pairCount = {};
  
    for (const draw of draws) {
      if (draw.numbers.includes(target)) {
        draw.numbers.forEach((n) => {
          if (n !== target) {
            pairCount[n] = (pairCount[n] || 0) + 1;
          }
        });
      }
    }
  
    return Object.entries(pairCount).sort((a, b) => b[1] - a[1]);
  }
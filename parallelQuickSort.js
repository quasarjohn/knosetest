const quickSort = require("./quickSort");

function partition(items, left, right) {
  let pivot = items[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j); //sawpping two elements
      i++;
      j--;
    }
  }
  return [items.splice(0, i), items.splice(i)];
}

function parallelQuickSort(items) {
  return new Promise(async (resolve) => {
    let partitions = partition(items);

    const promises = [];
    partitions.forEach((p) => {
      promises.push(
        // do quicksort on the two arrays separately
        new Promise((resolve) => {
          return resolve(quickSort(p, 0, p.length - 1));
        })
      );
    });

    // resolve async operations in parallel
    const sorted = await Promise.all(promises);
    return resolve([].concat((sorted[0], sorted[1])));
  });
}

module.exports = parallelQuickSort;

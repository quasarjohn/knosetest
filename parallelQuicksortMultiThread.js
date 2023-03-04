const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
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

function parallelQuickSortMultiThread(items, callback) {
  let partitions = partition(items);

  const threadCount = +process.argv[2] || 2;
  // console.log(`Running with ${threadCount} threads`);
  const threads = new Set();
  let sortedNumbers = [];

  if (isMainThread) {
    // console.log("main thread");
    partitions.forEach((partition, index) => {
      threads.add(
        new Worker("./index.js", {
          workerData: {
            partition,
            index,
          },
        })
      );
    });

    for (let worker of threads) {
      worker.on("error", (err) => {
        throw err;
      });

      worker.on("exit", () => {
        threads.delete(worker);
        if (threads.size === 0) {
          console.log("Done");
        }
      });

      worker.on("message", ({ result, index }) => {
        if (index == 1) {
          // sortedNumbers = sortedNumbers.concat(result);
          callback(sortedNumbers);
        } else {
          // sortedNumbers.unshift(result);
          callback(sortedNumbers);
        }
        // if (sortedNumbers.length == items.length) {
        //   callback(sortedNumbers);
        // }
      });
    }
  } else {
    const result = quickSort(
      workerData.partition,
      0,
      workerData.partition.length - 1
    );
    parentPort.postMessage({ result, index: workerData.index });
  }
}

module.exports = parallelQuickSortMultiThread;

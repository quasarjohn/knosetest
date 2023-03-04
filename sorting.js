const parallelQuickSort = require("./parallelQuickSort");
const parallelQuickSortMultiThread = require("./parallelQuicksortMultiThread");
const quickSort = require("./quickSort");

module.exports = function (arraySize = 100000, limit = 100000) {
  const numbers = [];

  // generate random numbers
  for (i = 0; i < arraySize; i++) {
    numbers.push(Math.floor(Math.random() * limit));
  }

  const startTime = new Date().getTime();
  numbers.sort((a, b) => a - b);
  const endTime = new Date().getTime();
  console.log(`${endTime - startTime}ms time to built-in sort`);

  const startTime1 = new Date().getTime();
  quickSort(numbers, 0, numbers.length - 1);
  const endTime1 = new Date().getTime();
  console.log(`${endTime1 - startTime1}ms time to quick sort`);

  const startTime2 = new Date().getTime();
  parallelQuickSort(numbers).then((result) => {
    const endTime2 = new Date().getTime();
    console.log(
      `${endTime2 - startTime2}ms time to parallel sort on single thread`
    );
  });

  //   const startTime3 = new Date().getTime();
  //   parallelQuickSortMultiThread(numbers, (result) => {
  //     const endTime3 = new Date().getTime();
  //     console.log(
  //       `${endTime3 - startTime3}ms time to parallel sort on mulitple threads`
  //     );
  //   });
};

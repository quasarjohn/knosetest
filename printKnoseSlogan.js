module.exports = function printKnoseSlogan(limit = 100) {
  for (i = 1; i < limit; i++) {
    const isDivisibleBy5 = i % 5 === 0;
    const isDivisibleBy7 = i % 7 === 0;

    if (isDivisibleBy5 || isDivisibleBy7) {
      console.log(
        `${isDivisibleBy5 ? "Knose " : ""}${
          isDivisibleBy7 ? "Pet Care Made Easy" : ""
        }`
      );
    } else {
      console.log(i);
    }
  }
};

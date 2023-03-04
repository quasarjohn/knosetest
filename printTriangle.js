module.exports = function printTriangle(size) {
  for (i = 1; i <= size; i++) {
    console.log("-".repeat(size - i) + "*".repeat(i));
  }
};

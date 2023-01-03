// Question 1
// Write a program that takes as input an array of positive and negative numbers (0 excluded). The objective is to
// return those items from the array whose sum is 0. If no such items exist return “No Elements found”
// Example: For an input array [-4, 1, 3, -2, -1],
// one of the possible results would be 3, -2, -1 since their sum is 0.
// Note: If there are more than 1 combination of such items, you can return any 1 of them.
// In addition to this, please also specify the Time complexity (Big
// O notation) and Space complexity (Big O notation) for your solution as well as all possible test cases.

/**
 * We loop through the array and for each element, we find all pairs with sum equals to "0".
 *
 * We use a Set to store the numbers we've seen so far.
 *
 * If we find a pair with sum equals to "0", we return it.
 *
 * If we don't find any, we return "No Elements found".
 *
 * The time complexity of the above algorithm is O(n^2) and the space complexity is O(n).
 * @param [arr] - The array of numbers to search through.
 * @returns [0, -1, 1]
 */

const zeroSumArr = arr => {
  if (!Array.isArray(arr) || arr.includes(0))
    return "Please provide a valid array!";

  const result = [];

  for (let initialIdx = 0; initialIdx < arr.length - 1; initialIdx++) {
    // Find all pairs with sum equals to "0"
    const numSet = new Set();
    for (let nextIdx = initialIdx + 1; nextIdx < arr.length; nextIdx++) {
      const x = -(arr[initialIdx] + arr[nextIdx]);

      numSet.has(x)
        ? result.push([x, arr[initialIdx], arr[nextIdx]])
        : numSet.add(arr[nextIdx]);
    }
  }
  if (result.length === 0) return "No Elements found";
  return result[0];
};

const ex0 = [-4, 1, 3, 0, -2, -1];
const ex1 = [-4, 1, 3, -2, -1];
console.log(zeroSumArr(ex0));
console.log(zeroSumArr(ex1));

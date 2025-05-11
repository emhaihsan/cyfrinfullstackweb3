// Synchronous example: operations execute one after another, blocking the flow of the program

// Function to simulate a time-consuming task
function sleep(milliseconds) {
  const start = new Date().getTime();
  while (new Date().getTime() - start < milliseconds) {
    // Busy-wait loop to simulate a blocking operation
  }
}

// Step 1: Log the start message
console.log("Start of synchronous example");

// Step 2: Perform a blocking operation (simulated by sleep function)
sleep(2000); // Sleep for 2 seconds

// Step 3: Log the end message
console.log("End of synchronous example");

// Output:
// Start of synchronous example
// (Wait for 2 seconds)
// End of synchronous example

// Asynchronous example using callbacks

// Function to simulate a time-consuming task with a callback
function asyncSleep(milliseconds, callback) {
  setTimeout(callback, milliseconds);
}

// Step 1: Log the start message
console.log("Start of asynchronous example (callback)");

// Step 2: Perform a non-blocking operation using setTimeout
asyncSleep(2000, () => {
  // Step 4: This code runs after 2 seconds
  console.log("End of asynchronous example (callback)");
});

// Step 3: Log a message immediately after setting the timeout
console.log("Setting up async operation (callback)");

// Output:
// Start of asynchronous example (callback)
// Setting up async operation (callback)
// (Wait for 2 seconds)
// End of asynchronous example (callback)

// Explanation of Promises

// A Promise is an object that represents the eventual completion or failure
// of an asynchronous operation. It is a container that holds a value that may
// not be available yet, but will be resolved at some point in the future.

// Promises are useful for handling asynchronous operations in a more
// structured way than traditional callbacks. They provide better error
// handling and make it easier to write asynchronous code that is modular and
// composable.

// Example of a Promise

// Create a Promise that resolves to "Hello, World!" after 2 seconds
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Hello, World!");
  }, 2000);
});

// Use the Promise
myPromise.then((value) => {
  console.log(value);
});

// Output:
// Hello, World! (after 2 seconds)

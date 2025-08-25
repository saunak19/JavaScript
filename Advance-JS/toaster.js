// function showToast() {
//   const toast = document.getElementById("toast");
//   toast.classList.remove("hidden");

//   // Hide after 3 seconds
//   setTimeout(() => {
//     toast.classList.add("hidden");
//   }, 10000);
// }

//toaster

// function createToaster(config) {
//   return function (notification) {
//     let div = document.createElement("div");
//     div.className =
//       "hidden fixed bottom-5 right-5 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg";
//   };
// }

// let toaster = createToaster({
//   positionX: "right",
//   positionY: "top ",
//   theme: "dark",
//   duration: 3,
// });

// toaster("This is a dummy notification");

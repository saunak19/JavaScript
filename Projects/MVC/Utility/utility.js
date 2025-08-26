export function createToaster(config) {
  return function (notification, status) {
    let div = document.createElement("div");
    div.className = `fixed top-5 right-5 ${
      status == true ? "bg-green-800" : "bg-red-800"
    } text-white px-4 py-2 rounded-lg shadow-lg ${
      config.positionX === "right" ? "right-10" : "left-10"
    } ${config.positionY === "top" ? "top-10" : "bottom-10"}`;

    div.textContent = notification;
    document.body.appendChild(div);

    setTimeout(() => {
      document.body.removeChild(div);
    }, config.duration * 1000);
  };
}

document
  .getElementById("toggle-dark-mode")
  .addEventListener("click", async () => {
    const isDarkMode = await window.darkMode.toggle();
    document.getElementById("theme-source").innerHTML = isDarkMode
      ? "Dark"
      : "Light";
  });

document
  .getElementById("reset-to-system")
  .addEventListener("click", async () => {
    await window.darkMode.system();
    document.getElementById("theme-source").innerHTML = "System";
  });

function testIt() {
  navigator.bluetooth
    .requestDevice({
      acceptAllDevices: true,
    })
    .then((device) => {
      document.getElementById("device-name").innerHTML =
        device.name || `ID: ${device.id}`;
    })
    .catch((e) => {
      console.error(e);
    });
}

document.getElementById("clickme").addEventListener("click", testIt);

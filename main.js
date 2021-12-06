const path = require("path");
const {
  app,
  BrowserWindow,
  ipcMain,
  nativeTheme,
  globalShortcut,
  Menu,
} = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.webContents.on(
    "select-bluetooth-device",
    (event, deviceList, callback) => {
      event.preventDefault();
      if (deviceList && deviceList.length > 0) {
        callback(deviceList[0].deviceId);
      }
    }
  );

  win.loadFile("index.html");

  ipcMain.handle("dark-mode:toggle", () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = "light";
    } else {
      nativeTheme.themeSource = "dark";
    }
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle("dark-mode:system", () => {
    nativeTheme.themeSource = "system";
  });
}

const dockMenu = Menu.buildFromTemplate([
  {
    label: "New Window",
    click() {
      console.log("New Window");
    },
  },
  {
    label: "New Window with Settings",
    submenu: [{ label: "Basic" }, { label: "Pro" }],
  },
  { label: "New Command..." },
]);

app
  .whenReady()
  .then(() => {
    if (process.platform === "darwin") {
      app.dock.setMenu(dockMenu);
    }
    globalShortcut.register("Alt+CommandOrControl+I", () => {
      console.log("Electron loves global shortcuts!");
    });
  })
  .then(() => {
    createWindow();
    app.on("activate", function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

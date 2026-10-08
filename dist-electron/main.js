import { BrowserWindow as e, app as t } from "electron";
import n from "path";
import { fileURLToPath as r } from "url";
//#region electron/main.ts
var i = r(import.meta.url), a = n.dirname(i);
process.env.DIST = n.join(a, "../dist"), process.env.VITE_PUBLIC = t.isPackaged ? process.env.DIST : n.join(process.env.DIST, "../public");
var o, s = process.env.VITE_DEV_SERVER_URL;
function c() {
	o = new e({
		width: 1200,
		height: 800,
		icon: n.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
		webPreferences: {
			preload: n.join(a, "preload.js"),
			nodeIntegration: !0,
			contextIsolation: !1
		}
	}), o.setMenuBarVisibility(!1), s ? o.loadURL(s) : o.loadFile(n.join(process.env.DIST, "index.html"));
}
t.on("window-all-closed", () => {
	process.platform !== "darwin" && (t.quit(), o = null);
}), t.whenReady().then(c);
//#endregion
export {};

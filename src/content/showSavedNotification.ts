import browser from "webextension-polyfill";

export function showSavedNotification() {
    const el = document.createElement("button");
    el.textContent = "Transcript saved!";
    el.style.position = "fixed";
    el.style.top = "20px";
    el.style.right = "20px";
    el.style.padding = "10px 20px";
    el.style.backgroundColor = "red";
    el.style.color = "white";
    el.style.fontSize = "16px";
    el.style.borderRadius = "5px";
    el.style.zIndex = "10000";
    el.style.border = "none";
    el.style.cursor = "pointer";
    el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";

    document.body.appendChild(el);

    el.addEventListener("click", () => {
        browser.runtime.sendMessage({ type: "open_options" });
    });

    setTimeout(() => {
        el.remove();
    }, 5000);
}
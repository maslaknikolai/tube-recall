export function showSavedNotification() {
    const el = document.createElement("div");
    el.textContent = "Transcript saved!";
    el.style.position = "fixed";
    el.style.top = "20px";
    el.style.right = "20px";
    el.style.padding = "10px 20px";
    el.style.backgroundColor = "red";
    el.style.color = "white";
    el.style.borderRadius = "5px";
    el.style.zIndex = "10000";
    document.body.appendChild(el);
    setTimeout(() => {
        el.remove();
    }, 3000);
}
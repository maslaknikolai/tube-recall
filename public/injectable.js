(() => {
  overrideXHR()
  listenForProgress()

  function overrideXHR() {
    if (window.__XHR_HOOKED__) return;
    window.__XHR_HOOKED__ = true;

    const OriginalXHR = window.XMLHttpRequest;

    class XHRInterceptor extends OriginalXHR {
      constructor() {
        super();

        this.addEventListener("load", () => {
          try {
            const url = this.responseURL;
            const body = this.responseText;

            window.postMessage({
              type: "XHR_CAPTURE",
              url,
              body,
              ytInitialData: window.ytInitialData,
            }, "*");
          } catch (err) {
            console.warn("[xhr-hook] error:", err);
          }
        });
      }
    }

    window.XMLHttpRequest = XHRInterceptor;
    console.log("[xhr-hook] XMLHttpRequest hooked");
  }

  function listenForProgress() {
    setInterval(() => {
      const progress = document.getElementById('movie_player')?.getCurrentTime?.()

      window.postMessage({
        type: "VIDEO_PROGRESS",
        progress,
      }, "*");
    }, 1000);
  }
})()
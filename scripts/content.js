let isFullScreen = false;
const TOGGLE_BUTTON_CLASS = 'toggle-fullscreen-button';

let currentTabUrl = null;

const getButtonText = (isFullScreen) => {
  return `${isFullScreen ? "Exit" : "Enter"} fullscreen`;
}

const observer = new MutationObserver(async (mutations) => {

  const response = await chrome.runtime.sendMessage({greeting: "hello"});
  // do something with response here, not outside the function
  console.log("RESPONSE", response);
  
  const toggleButtonContainer = document.querySelector(".fire-card-action-bar.on-grey-theme-container");
  if (toggleButtonContainer) {
    
    console.debug("Found container for toggle button", toggleButtonContainer);
    
    // Add toggle button if needed
    if (!document.querySelector(`.${TOGGLE_BUTTON_CLASS}`)) {

      const moreMenuButton = document.querySelector("firestore-link-out-menu");
      if (!moreMenuButton) {
        console.debug("Could not find more menu button, probably not on cloud firestore data page. Not inserting button");
        return;
      }

      console.log("Adding toggle button...");
      const toggleButton = document.createElement('button');
      toggleButton.classList.add("mat-mdc-menu-trigger", "menu-button", "mdc-button", "mat-mdc-button", "mat-primary", "mat-mdc-button-base", TOGGLE_BUTTON_CLASS);
      toggleButton.textContent = getButtonText(isFullScreen);
      toggleButtonContainer.insertAdjacentElement("afterbegin", toggleButton);
      console.debug("Added toggle button");

      console.log("Adding event listener...");
      toggleButton.addEventListener('click', () => {

        isFullScreen = !isFullScreen;
        toggleButton.textContent = getButtonText(isFullScreen);
        
        // Toggle class on specific elements
        const elementsToToggle = [];
        elementsToToggle.push(document.querySelector("f7e-data-panel-viewer"));
        elementsToToggle.push(document.querySelector(".data-panel-viewer"));
        elementsToToggle.forEach((element) => {
          if (element) {
            element.classList.toggle("fullscreen");
          }
          else {
            console.error("Could not find element to toggle");
          }
        });

        document.body.classList.toggle("fullscreen");
        console.debug(`Toggled fullscreen to ${isFullScreen}`);
      });
    }
  }
  else {
    console.debug("Could not find container for toggle button");
  }
});
observer.observe(document, { childList: true, subtree: true });

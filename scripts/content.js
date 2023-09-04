let isFullScreen = false;
let error = false;
const TOGGLE_BUTTON_CLASS = 'toggle-fullscreen-button';

const getButtonText = (isFullScreen) => {
  return `${isFullScreen ? "Exit" : "Enter"} fullscreen`;
}

const modalHtml = `
<div class="not_found_modal_container">
  <img src="images/icon-128.png"/>
  <p>Firebase-fullscreen extension could not locate some elements in the DOM to insert button or to toggle fullscreen. Please check that you are using the latest version of the extension or <a href="https://github.com/clementlize/firestore-fullscreen">submit an issue</a>. Thank you.</p>
  <span class="mat-mdc-button-touch-target" />
</div>
`

const modal = document.createElement('template');
modal.innerHTML = modalHtml;

const observer = new MutationObserver((mutations) => {
  
  const toggleButtonContainer = document.querySelector(".fire-card-action-bar.on-grey-theme-container2");
  if (toggleButtonContainer) {
    
    console.debug("Found container for toggle button", toggleButtonContainer);
    
    // Add toggle button only if needed
    if (!document.querySelector(`.${TOGGLE_BUTTON_CLASS}`)) {

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
        elementsToToggle.push(document.querySelector(".f7e-card"));
        elementsToToggle.push(document.querySelector(".f7e-viewer"));
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
  else if (!error) {

    error = true;
    console.debug("Could not find container for toggle button");

    const body = document.querySelector("body");
    if (body) {
      body.appendChild(modal.content.cloneNode(true));
    }
    else {
      console.error("Could not find body element");
    }
  }
});

observer.observe(document, { childList: true, subtree: true });
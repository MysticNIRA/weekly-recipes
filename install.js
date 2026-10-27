/* Installing the app on a phone or computer, and registering the service worker (sw.js) that lets
   it open without internet. Settings → Help shows the steps for the device in use, plus an Install
   button where the browser offers one (Chrome and Edge). Loaded before the main script, which calls
   setupInstall once the page is ready. */
let installPrompt=null;
const isInstalled=()=>matchMedia("(display-mode: standalone)").matches||navigator.standalone===true;
const isIOS=()=>/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
const isAndroid=()=>/android/i.test(navigator.userAgent);
function installHelpHtml(){
  if(isInstalled())return `<p class="settings-note" style="margin-left:0">You're using the installed app. It opens without internet too.</p>`;
  const steps=isIOS()?`In Safari, tap the <strong>Share</strong> button (a square with an arrow), then <strong>Add to Home Screen</strong>. The installed app keeps its own saved data, separate from Safari, so install it before you save much. Installed, it also keeps your data even when you don't open it for a while.`
    :isAndroid()?`In Chrome, tap <strong>⋮</strong>, then <strong>Install app</strong> (or <strong>Add to Home screen</strong>). Your saved recipes and lists come with it.`
    :`In Chrome or Edge, click the install icon at the right end of the address bar, or open the browser menu and choose <strong>Install Weekly Recipes</strong>.`;
  return `${installPrompt?`<button class="btn" id="installBtn">Install the app</button>`:""}
    <p class="settings-note" style="margin-left:0">${steps} It then opens full screen with its own icon and works without internet.</p>`;
}
function renderInstallHelp(){
  const el=document.getElementById("installHelp");
  el.innerHTML=installHelpHtml();
  const button=document.getElementById("installBtn");
  if(button)button.onclick=async()=>{
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt=null;renderInstallHelp();
  };
}
function setupInstall(){
  // Service workers only run on https (or localhost); opening index.html as a file skips this.
  if("serviceWorker" in navigator&&(location.protocol==="https:"||location.hostname==="localhost"))
    navigator.serviceWorker.register("sw.js").catch(()=>{});
  window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();installPrompt=e;renderInstallHelp()});
  window.addEventListener("appinstalled",()=>{installPrompt=null;renderInstallHelp()});
  renderInstallHelp();
}

document.querySelectorAll('.menu').forEach(item => {
    item.addEventListener("click", () => loadContent(item.textContent), false);
});

function loadContent(option) {
    const content = document.getElementById('content');
    let data = null;
    switch (option) {
        case "Countries":
            data = "pages/countries/index.html";
            break;
        case "Dinossaur":
            data = "pages/dinogame/index.html";
            break;
        default:
            break;
    } 
    const headerTitle = document.getElementById('header-title');
    headerTitle.textContent = option;
    document.title = option;
    
    content.innerHTML='<object style="width: 100%; height: Calc(100vh - 80px)" type="text/html" data=' + data + '></object>';
    closeNav();
}

function openNav() {
    document.querySelectorAll('#menu-item').forEach(item => item.style.opacity = "1");
    document.getElementById("mySidebar").style.width = "200px";
    document.getElementById("header").style.marginLeft = "200px";
    document.getElementById("content").style.marginLeft = "200px";
    document.getElementById("content").style.width = "Calc(100% - 200px)";
    if(detectMobile()) {
        document.getElementById('header-title').style.opacity = "0";
    }
}

function closeNav() {
    document.querySelectorAll('#menu-item').forEach(item => item.style.opacity = "0");
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("header").style.marginLeft= "0";
    document.getElementById("content").style.marginLeft= "0";
    document.getElementById("content").style.width = "100%";
    if(detectMobile()) {
        document.getElementById('header-title').style.opacity = "1";
    }
}

function detectMobile() {
    return window.outerWidth < 600;
}

function changeThemeLight() {
    document.getElementById("theme").outerHTML = '<link id="theme" rel="stylesheet" href="styles/lightTheme.css">';
}

function changeThemeDark() {
    document.getElementById("theme").outerHTML = '<link id="theme" rel="stylesheet" href="styles/darkTheme.css">';
}
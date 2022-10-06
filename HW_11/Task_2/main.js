window.onload = function () {

    (function (document) {
        let allDomElements = document.getElementsByTagName("*");

        for (let i = 0; i < allDomElements.length; i++) {
            let domTagName = allDomElements[i].tagName.toLowerCase();
            if (domTagName != "html" && domTagName != "head" && domTagName != "body") {
                allDomElements[i].style.color = null;
                allDomElements[i].style.backgroundColor = null;
                allDomElements[i].style.width = null;
                allDomElements[i].style.height = null;
            }
        }
    } (document));

}
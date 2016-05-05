var pageURL = document.location.protocol + "//" + document.location.host + document.location.pathname + "#/search?page=",
    pageURLSuffix = "&limit=96&type=Motion%252CMotionPack",
    pageNum = parseInt(document.querySelector(".pagination li.active a").textContent, 10),
    pageMax = parseInt(document.querySelector(".pagination li:nth-last-child(2) a").textContent, 10);
function MixamoScript() {
    var items = document.getElementsByClassName("product");
    if (items.length == 0) {
        window.setTimeout(MixamoScript, 1000);
        return;
    }

    var killScript = setInterval(runAddToMyAssets, 250);
    //var   button = document.querySelector(".add-to-cart"),
    var button = document.querySelector(".addtocart"),
        next = false,
        index = 0,
        isClicked = false;
    console.log("MixamoScript: ", pageNum, "/", pageMax);

    function runAddToMyAssets() {
        if (items.length == 0) {
            items = document.getElementsByClassName("product");
        }
        if (button == null) {
            button = document.querySelector(".addtocart");//add-to-cart");
        }

        // Make sure we have items available to click.
        if (items.length != 0) {
            // Next Page
            if(index >= items.length) {
                clearInterval(killScript);
                //nextButton.click();

                if (pageNum >= pageMax) {
                    window.removeEventListener("hashchange", MixamoScript);
                    console.log("MixamoScript: Done.");
                    return;
                } else {
                    ++pageNum;
                }
                console.log("MixamoScript: ", pageNum, "/", pageMax);

                document.location.href = pageURL + pageNum.toString() + pageURLSuffix;
                return;
            }

            // Next Element
            if (next) {
                ++index;
            }

            // Click Element
            if(!isClicked) {
                items[index].click();
            }

            // Add Asset
            addToMyAssets();
        }
        return;
    }
    function addToMyAssets() {
        next = false;
        isClicked = true;
        if(button.disabled == true) {
            return;
        }
        if (button.textContent == "Add to My Assets") {
            button.click();
            next = true;
            isClicked = false;
            return;
        }
        if (button.textContent == "View / Download") {
            next = true;
            isClicked = false;
        }
    }
}
MixamoScript();
window.addEventListener("hashchange", MixamoScript, false);

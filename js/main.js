(function () {
    'use strict';

    let showTxt = false;
    const sitelogo = document.getElementsByClassName('sitelogo')[0];
    const sidebar = document.getElementsByClassName('sidebar')[0];
    const exitBtn = document.getElementsByClassName('exitBtn')[0];
    const landscapemenu = document.getElementsByClassName('landscapemenu')[0];
    const portraitmenu = document.getElementsByClassName('portraitmenu')[0];

    let landscapelistMed = ["images/landscapes/lmed1.jpg", "images/landscapes/lmed2.jpg"];
    let portraitlistMed = ["images/portraits/pmed1.jpg", "images/portraits/pmed2.jpg", "images/portraits/pmed3.jpg", "images/portraits/pmed4.jpg"];
    let landscapelistBig = ["images/landscapes/lbig1.jpg", "images/landscapes/lbig2.jpg"];
    let portraitlistBig = ["images/portraits/pbig1.jpg", "images/portraits/pbig2.jpg", "images/portraits/pbig3.jpg", "images/portraits/pbig4.jpg"];

    function generategallery(menuchoice) {
        let chosenlist;                      
        var imageList = [];
        let galleryview = document.getElementsByClassName('galleryview')[0];        //the div where image gallery will be shown

        landscapemenu.style.opacity = "0%";
        portraitmenu.style.opacity = "0%";                          // fadeout menuchoice, THEN remove divs
        setTimeout(showGalleryBoxes, 800);

        switch (menuchoice) {
            case "landscape":
                chosenlist = landscapelistMed;                    // generate image list. 
                break;
            case "portrait":
                chosenlist = portraitlistMed;
                break;
        }

        function showGalleryBoxes() {
            landscapemenu.style.display = "none";               // remove menuchoice divs
            portraitmenu.style.display = "none";                    
            exitBtn.style.fontSize = "smaller"; 
        for (let i = 0; i < chosenlist.length; i++) {               //generates img boxes.
            imageList[i] = new Image();
            imageList[i].id = chosenlist[i];
            imageList[i].src = chosenlist[i];
            imageList[i].addEventListener("click", enlargePhoto);
            galleryview.appendChild(imageList[i]);
        }
        setTimeout(galleryBoxOpacityUp, 200);
        exitBtnFunction();
    }
        let galleryBoxOpacityUp = function () {                         //opacity increase for gallery boxes
            let galleryImg = document.getElementsByTagName("img");
            for (let i = 0; i < galleryImg.length; i++) {
                galleryImg[i].style.opacity = "100%";
            }
        }
    };

    landscapemenu.addEventListener("click", function(event) {
        generategallery("landscape");
    });
    portraitmenu.addEventListener("click", function(event) {
        generategallery("portrait");
    });
    sitelogo.addEventListener("click", sidebarFunc);

    function sidebarFunc() {
        if (showTxt === false) {
            sidebar.style.fontSize = "smaller";
            showTxt = true;
        } else {
            console.log("hej")
            sidebar.style.fontSize = "0";
            showTxt = false;
        };
    }

    function overlayOn() {
        document.getElementById("overlay").style.opacity = "100%";
        setTimeout(addOverlayOffListen, 200);
    }

    function addOverlayOffListen() {
        document.addEventListener("click", overlayOff);
    }

    function overlayOff() {
        document.getElementById("overlay").style.opacity = "0%";
        setTimeout(overlayRemove, 800)
    }

    function  overlayRemove() {
        document.getElementById("overlay").style.display = "none";
        document.removeEventListener("click", overlayOff);
    }

    function enlargePhoto() {
        let currentPhotoIndex = event.target.id.replace("med", "big");
        let renderNewPhoto = new Image();
        let overlayContainer = document.getElementsByClassName("overlayImage")[0];
        let bigImages = overlayContainer.getElementsByTagName("img");

        console.log(bigImages);
        if (bigImages.length > 0) {
        while (bigImages.length > 0) {
            overlayContainer.removeChild(bigImages[0]);
        }
    }
        renderNewPhoto.src = currentPhotoIndex;
        document.getElementById("overlay").style.display = "block";
        setTimeout(overlayOn, 100);
        overlayContainer.appendChild(renderNewPhoto);
        renderNewPhoto.style.objectFit = "contain";
        renderNewPhoto.style.opacity = "100%";

    }


    let exitBtnFunction = function() {
        exitBtn.addEventListener("click", function (event) {                        //the "close" button.
        let galleryview = document.getElementsByClassName('galleryview')[0];
        let galleryimages = galleryview.getElementsByTagName('img');

        exitBtn.style.fontSize = 0;

        for (let i = 0; i < galleryimages.length; i++) {
            galleryimages[i].style.opacity = "0%";
        }

        setTimeout(showmenu, 200);

        function showmenu() {
            while (galleryimages.length > 0) {
                galleryview.removeChild(galleryimages[0]);
            }
            landscapemenu.style.display = "block";
            portraitmenu.style.display = "block";
            setTimeout(showMenuChoices, 200);
            function showMenuChoices (){
            landscapemenu.style.opacity = "100%";
            portraitmenu.style.opacity = "100%";

            }                    
        };


    });
    }

})();

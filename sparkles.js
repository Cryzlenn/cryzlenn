var colour = "white";
var sparkles = 15; // Reduced number of sparkles
var swide, shigh;
var tiny = [];
var star = [];
var starv = [];
var starx = [];
var stary = [];
var tinyx = [];
var tinyy = [];
var tinyv = [];

window.onload = function() {
    if (document.getElementById) {
        // Add event listener for window resize
        window.addEventListener('resize', set_width);
        
        set_width(); // Set initial width
        
        for (var i = 0; i < sparkles; i++) {
            var rats = createDiv(3, 3);
            rats.style.visibility = "hidden";
            rats.style.zIndex = "999";
            document.body.appendChild(tiny[i] = rats);
            tinyv[i] = 0;
            
            var starDiv = createDiv(5, 5);
            starDiv.style.backgroundColor = "transparent";
            starDiv.style.visibility = "hidden";
            starDiv.style.zIndex = "999";
            
            var rlef = createDiv(1, 5);
            var rdow = createDiv(5, 1);
            
            starDiv.appendChild(rlef);
            starDiv.appendChild(rdow);
            
            rlef.style.top = "2px";
            rlef.style.left = "0px";
            rdow.style.top = "0px";
            rdow.style.left = "2px";
            
            document.body.appendChild(star[i] = starDiv);
            starv[i] = 0;
        }
        
        // Add mouse move event listener
        document.addEventListener('mousemove', function(event) {
            if (Math.random() < 0.1) { // Reduced frequency of sparkles
                var c = Math.floor(Math.random() * sparkles);
                if (!starv[c]) {
                    starx[c] = event.clientX;
                    stary[c] = event.clientY;
                }
            }
        });
        
        sparkle();
    }
};

function sparkle() {
    for (var c = 0; c < sparkles; c++) {
        if (!starv[c]) {
            star[c].style.left = (starx[c] = Math.random() * swide) + "px";
            star[c].style.top = (stary[c] = Math.random() * shigh) + "px";
            star[c].style.clip = "rect(0px, 5px, 5px, 0px)";
            star[c].childNodes[0].style.backgroundColor = 
            star[c].childNodes[1].style.backgroundColor = 
                (colour == "random") ? newColour() : colour;
            star[c].style.visibility = "visible";
            starv[c] = 50;
        }
        if (starv[c]) update_star(c);
        if (tinyv[c]) update_tiny(c);
    }
    setTimeout(sparkle, 40);
}

function update_star(i) {
    if (--starv[i] == 25) star[i].style.clip = "rect(1px, 4px, 4px, 1px)";
    if (starv[i]) {
        stary[i] += 1 + Math.random() * 3;
        starx[i] += (i % 5 - 2) / 5;
        if (stary[i] < shigh) {
            star[i].style.top = stary[i] + "px";
            star[i].style.left = starx[i] + "px";
        } else {
            star[i].style.visibility = "hidden";
            starv[i] = 0;
        }
    } else {
        tinyv[i] = 50;
        tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
        tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
        tiny[i].style.width = "2px";
        tiny[i].style.height = "2px";
        tiny[i].style.backgroundColor = star[i].childNodes[0].style.backgroundColor;
        star[i].style.visibility = "hidden";
        tiny[i].style.visibility = "visible";
    }
}

function update_tiny(i) {
    if (--tinyv[i] == 25) {
        tiny[i].style.width = "1px";
        tiny[i].style.height = "1px";
    }
    if (tinyv[i]) {
        tinyy[i] += 1 + Math.random() * 3;
        tinyx[i] += (i % 5 - 2) / 5;
        if (tinyy[i] < shigh) {
            tiny[i].style.top = tinyy[i] + "px";
            tiny[i].style.left = tinyx[i] + "px";
        } else {
            tiny[i].style.visibility = "hidden";
            tinyv[i] = 0;
        }
    } else tiny[i].style.visibility = "hidden";
}

function set_width() {
    swide = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    shigh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

function createDiv(height, width) {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.height = height + "px";
    div.style.width = width + "px";
    div.style.overflow = "hidden";
    return div;
}

function newColour() {
    var c = [255, Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
    c.sort(function() { return 0.5 - Math.random(); });
    return "rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")";
}
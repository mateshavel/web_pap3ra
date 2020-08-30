function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch (err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

ajax_get('/PAPERA-eshop/scripts/dataProduct.json', function (data) {
    document.getElementById("title").innerHTML = data["title"];
    document.getElementById("description").innerHTML = data["description"];
    document.getElementById("mainImg").setAttribute("src", data["mainImg"]);



    for (var i = 0; i < data["articles"].length; i++) {
        document.getElementById("articles").innerHTML = data["articles"];
    }


    //poskládá vše do id= text
    // html += "<ul>";
    // for (var i=0; i < data["articles"].length; i++) {
    //     html += '<li><a href="' + data["articles"][i]["url"] + '">' + data["articles"][i]["title"] + "</a></li>";
    // }
    // html += "</ul>";
    // document.getElementById("text").innerHTML = html;
});

// {
//     "title" : "Code Maven",
//     "description" : "Coding is fun!",
//     "articles" : [
//     {
//         "title" : "Handling user events in JavaScript",
//         "url"   : "http://code-maven.com/handling-events-in-javascript"
//     },
//     {
//         "title" : "On-load counter with JavaScript and local storage",
//         "url"   : "http://code-maven.com/on-load-counter-with-javascript-and-local-storage"
//     }
// ]
// }

// <h1 id="title"></h1>
//     <hr>
//     <div id="text"></div>
//
//     <script src="ajax.js"></script>




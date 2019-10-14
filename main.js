var endp = "849a691f3e4bd20104f776de4193d8094f4f264f8cf8437bf0e8decc7d0c1577";
       

var endpoint = "http://www.jsonstore.io/" + endp;
                    
function encrypt(url){
var codex = CryptoJS.AES.encrypt(url, window.location.hash.substr(1)).toString();
    return codex;
}

function cre1() {
  var x = document.createElement("INPUT");
  x.setAttribute("type", "text");
  x.setAttribute("value", "Hello World!");
  document.body.appendChild(x);
}

function geturl(){
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith(" / ") || url.startsWith(" // ") ;
    if(!protocol_ok){
        var newurl = " // "+url;
       return newurl;
        
        }else{
            return url;
        }
}

function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function genhash(){
    if (window.location.hash == ""){
        window.location.hash = "849a691f3e4bd20104f776de4193d8094f4f264f8cf8437bf0e8decc7d0c1577" + getrandom();
    }
}

function send_request(url) {
    this.url = url;
    
    $.ajax({
        'url': endpoint + "/",
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
})
}

function shorturl(){
    var longurl = geturl();
    genhash();
   var longurl = encrypt(longurl)
    send_request(longurl);
}

var hashh = window.location.hash.substr(64)

if (window.location.hash != "") {
       var ep1 =  window.location.hash.substr(1)
       var ep2 = "http://www.jsonstore.io/" + ep1.substring(0,64);
    $.getJSON(endpoint2 + "/" ,function (data) {
        data = data["result"];
        var decrypted = CryptoJS.AES.decrypt(data, window.location.hash.substr(1));

        if (decrypted != null) {
            
            document.getElementById("t1").innerHTML = decrypted.toString(CryptoJS.enc.Utf8);
        }

    });
}

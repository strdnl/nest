
                    
 // Retrieving data:
text = localStorage.getItem("testJSON");
obj = JSON.parse(text);
var don = obj.url;
// document.getElementById("demo").innerHTML = don ;

function show(){
          window.location.hash = don;

load();
}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

function pedit2(){
       var d1 = document.getElementById("urlinput").value;
  if (d1!="") {
  var d2 = "<a href=" + "'https://" + d1 + "'>" + d1 + "</a>";
  document.getElementById("urlinput").value = d2;
   shorturl();}
  else {
    show();}
}

function pedit(){
       var d1 = document.getElementById("urlinput").value;
   if (d1!="") {
  var d2 = "<img src='" + d1 + "' alt='" + d1 + "'>";
  document.getElementById("urlinput").value = d2;
 shorturl();
   }else {
    show() 
   }
}

function encrypt(url){
var codex = CryptoJS.AES.encrypt(url, window.location.hash.substr(1)).toString();
    return codex;
}

function godsedit() {
  var x = document.createElement("INPUT");
  x.setAttribute("type", "password");
  x.setAttribute("id", "pass");
  document.body.appendChild(x);
}

function geturl(){
  show();
  var prev = document.getElementById("t1").innerHTML;
    var url = document.getElementById("urlinput").value;
   if (url == ""){
     return url;
   } else {
    var protocol_ok = url.startsWith("###") || url.startsWith("$$$") || url.startsWith("###") ;
    if(!protocol_ok){
        var newurl = prev + "<br>" + url + "<i><small><sup>  " + Date.now() + "</sup></small></i>";
       return newurl;
        
        }else{
          var nurl2 = "<b><u>" + url.substring(3) + "</u></b>";
            return nurl2;
        }}
}

function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 25; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function genhash(){
    if (window.location.hash == ""){
         var endp = document.getElementById("epinput").value;
        window.location.hash = endp + getrandom();
         var weet = document.getElementById("urlinput").value;
         document.getElementById("urlinput").value = "$$$" + weet;


       var myObj, myJSON, text, obj;

// Storing data:
myObj = {url:  window.location.hash.substr(1) };
myJSON = JSON.stringify(myObj);
localStorage.setItem("testJSON", myJSON);
    }
}

function send_request(url) {
    this.url = url;
    var ep1 =  window.location.hash.substr(1)
       var ep2 = "https://www.jsonstore.io/" + ep1.substring(0,64);
    $.ajax({
        'url': ep2 + "/",
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
})
}

function shorturl(){
    var longurl = geturl();
 if (longurl == ""){
    return;
 } else {
    genhash();
   var longurl = encrypt(longurl)
    send_request(longurl);
    document.getElementById("urlinput").value = "WAIT THREE SECONDS";
  //wait(3000);
  document.getElementById("urlinput").value = "";
 }
}

var hashh = window.location.hash.substr(64)

if (window.location.hash != "") {
      load()  
        }
function load(){
   var ep1 =  window.location.hash.substr(1)
       var ep2 = "https://www.jsonstore.io/" + ep1.substring(0,64);
    $.getJSON(ep2 + "/" ,function (data) {
        data = data["result"];
        var decrypted = CryptoJS.AES.decrypt(data, window.location.hash.substr(1));

        if (decrypted != null) {
          var abc = decrypted.toString(CryptoJS.enc.Utf8);
            document.getElementById("t1").innerHTML = abc;
            document.getElementById("demo").innerHTML = "== STORED ==";

           // document.getElementById("urlinput").innerHTML = abc;
           var myObj, myJSON, text, obj;

// Storing data:
myObj = { url: window.location.hash.substr(1) };
myJSON = JSON.stringify(myObj);
localStorage.setItem("testJSON", myJSON);  
  
  
}
    });
}

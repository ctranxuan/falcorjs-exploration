

curl -g 'http://localhost:3000/model.json?paths=[["runnersById",{"from":1,"to":3},["firstName","lastName","number","rank"]]]&method=get'

var req = new XMLHttpRequest();
req.open('GET', 'http://localhost:3000/model.json?paths=[["runnersById",{"from":1,"to":3},["firstName","lastName","number","rank"]]]&method=get', true);
req.onreadystatechange = function (aEvt) {
  if (req.readyState == 4) {
     if(req.status == 200)
      console.log(req.responseText);
     else
      console.log("Erreur pendant le chargement de la page. %o\n", req);
  }
};
req.send(null);


patch falcor.browser => batch(...) { ...   var clone = this._clone(); }

usl = document.querySelector(".usl");
while ( usl.tagName !== "TABLE" ) {
    usl = usl.parentNode;
}
rows = usl.querySelectorAll("tr");
flag = prompt("Please enter country code:").toUpperCase();
country = "";
switch (flag) {
    case "ENG": country = "England"; break;
    default: country = prompt("Unkonwn flag, please provide country name");
}
if ( typeof deduct === "undefined" ) {
    deduct = [];
}
removed = prompt("Which positions are removed?").split(",");
ret = [];
ret.push('flag = "'+flag+'";');
ret.push('country = "'+country+'";');
for ( r=1 ; r!==rows.length ; r++ ) {
    thisRow = rows[r];
    td = thisRow.querySelectorAll("td,th");
    _team = td[1].querySelector("a");
    _teamName = _team.innerText;
    _teamWiki = _team.getAttribute("href").split("/").pop();
    _played = td[2].innerText;
    _won = td[3].innerText;
    _drawn = td[4].innerText;
    _lost = td[5].innerText;
    _for = td[6].innerText;
    _against = td[7].innerText;
    _deduct = 0;
    if ( deduct.indexOf(r) !== -1 ) {
        _deduct = prompt("How many points are deducted from " + _teamName);
    }
    _classes = [];
    if ( r === 1 ) {
        _classes.push("champion");
    }
    if ( removed.indexOf(r+"") !== -1 ) {
        _classes.push("removed");
    }
    if ( deduct.indexOf(r) !== -1 ) {
        _classes.push("deduction");
    }
    str = '';
    str += 'addTeam("'+_teamName+'","'+_teamWiki+'",'+_won+','+_drawn+','+_lost+','+_for+','+_against+','+_deduct+',"'+_classes.join("|")+'");';
    ret.push(str);
}
console.log(ret.join("\n"));
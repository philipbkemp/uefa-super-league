usl = document.querySelectorAll(".usl");
if ( ! usl || usl.length === 0 ) {
    alert("No .usl class");
}
rows = [];
usl.forEach(function(uslItem){
    while ( uslItem.tagName !== "TABLE" ) {
        uslItem = uslItem.parentNode;
    }
    r = Array.from(uslItem.querySelectorAll("tr"));
    r.forEach(function(row){rows.push(row);});
});
flag = "AUT";//prompt("Please enter country code:").toUpperCase();
country = "";
switch (flag) {
    case "ALB": country = "Albania"; break;
    case "AUT": country = "Austria"; break;
    case "BEL": country = "Belgium"; break;
    case "CZE": country = "Czechoslovakia"; break;
    case "DNK": country = "Denmark"; break;
    /*case "EIR": country = "Ireland"; break;*/
    case "ENG": country = "England"; break;
    case "ESP": country = "Spain"; break;
    case "EST": country = "Estonia"; break;
    case "FIN": country = "Finland"; break;
    case "HUN": country = "Hungary"; break;
    case "IRL": country = "Republic of Ireland"; break;
    case "ISL": country = "Iceland"; break;
    case "ITA": country = "Italy"; break;
    case "LTU": country = "Lithuania"; break;
    case "LUX": country = "Luxembourg"; break;
    case "LVA": country = "Latvia"; break;
    case "MLT": country = "Malta"; break;
    case "NIR": country = "Northern Ireland"; break;
    case "NLD": country = "Netherlands"; break;
    case "POL": country = "Poland"; break;
    case "ROU": country = "Romania"; break;
    case "SCO": country = "Scotland"; break;
    case "SWE": country = "Sweden"; break;
    case "YUG": country = "Yugoslavia"; break;
    default: country = prompt("Unknown flag, please provide country name");
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
    if ( _team ) {
        _teamName = _team.innerText;
        _teamWiki = _team.getAttribute("href").replace("/wiki/","").replace("/w/index.php?title=","").replace("&action=edit&redlink=1","");
    } else {
        _teamName = td[1].innerText;
        _teamWiki = _teamName;
    }
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
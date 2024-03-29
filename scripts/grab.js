usl = document.querySelectorAll(".usl");
if ( ! usl || usl.length === 0 ) {
    if ( document.querySelector("#League_standings") ) { usl = document.querySelector("#League_standings"); }
    else if ( document.querySelector("#A_Lyga") ) { usl = document.querySelector("#A_Lyga"); }
    else if ( document.querySelector("#Final_table") ) { usl = document.querySelector("#Final_table"); }
    else if ( document.querySelector("#Final_Table") ) { usl = document.querySelector("#Final_Table"); }
    else if ( document.querySelector("#League_table") ) { usl = document.querySelector("#League_table"); }
    else if ( document.querySelector("#Standings") ) { usl = document.querySelector("#Standings"); }
    else if ( document.querySelector("#Final_standings") ) { usl = document.querySelector("#Final_standings"); }
    else if ( document.querySelector("#Final_classification") ) { usl = document.querySelector("#Final_classification"); }
    else if ( document.querySelector("#Table") ) { usl = document.querySelector("#Table"); }
    if ( usl ) {
        usl = usl.parentElement.nextElementSibling.nextElementSibling;
        if ( usl.tagName !== "TABLE" ) {
            usl = usl.nextElementSibling;
        }
        if ( usl.tagName !== "TABLE" ) {
            usl = usl.nextElementSibling;
        }
        usl = [ usl ];
    }
}
if ( ! usl || usl.length === 0 ) {
    alert("unable to find table");
}
rows = [];
usl.forEach(function(uslItem){
    while ( uslItem.tagName !== "TABLE" ) {
        uslItem = uslItem.parentNode;
    }
    r = Array.from(uslItem.querySelectorAll("tr"));
    r.forEach(function(row){rows.push(row);});
});
flag = "PRT";//prompt("Please enter country code:").toUpperCase();
country = "";
switch (flag) {
    case "ALB": country = "Albania"; break;
    case "AUT": country = "Austria"; break;
    case "BEL": country = "Belgium"; break;
    case "CHE": country = "Switzerland"; break;
    case "CYP": country = "Cyprus"; break;
    /*case "CSK": country = "Czechoslovakia"; break;*/
    case "DNK": country = "Denmark"; break;
    /*case "EIR": country = "Ireland"; break;*/
    case "ENG": country = "England"; break;
    case "ESP": country = "Spain"; break;
    case "EST": country = "Estonia"; break;
    case "FIN": country = "Finland"; break;
    case "FRA": country = "France"; break;
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
    case "PRT": country = "Portugal"; break;
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
thisSeasonUsl = [];
ret = [];
ret.push('flag = "'+flag+'";');
ret.push('country = "'+country+'";');
strDeduct = [];
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
    pos = td[0].innerText;
    _played = td[2].innerText;
    _won = td[3].innerText;
    _drawn = td[4].innerText;
    _lost = td[5].innerText;
    _for = td[6].innerText;
    _against = td[7].innerText;
    _deduct = 0;
    if ( _won !== "W" && _won !== "" ) {
        if ( deduct.indexOf(r) !== -1 ) {
            _deduct = prompt("How many points are deducted from " + _teamName);
            strDeduct.push('<li class="list-group-item"><img src="../../f/'+flag+'.png" title="'+country+'">'+country+': '+_teamName+' were deducted '+_deduct+' point'+(parseInt(_deduct)===1?'':'s')+'</li>');
        }
        _classes = [];
        if ( r === 1 ) {
            _classes.push("champion");
        }
        
        if ( removed.indexOf(pos+"") !== -1 ) {
            _classes.push("removed");
        } else {
            thisSeasonUsl.push([_teamName,_teamWiki]);
        }
        if ( deduct.indexOf(r) !== -1 ) {
            _classes.push("deduction");
        }
        str = '';
        str += 'addTeam("'+_teamName+'","'+_teamWiki+'",'+_won+','+_drawn+','+_lost+','+_for+','+_against+','+_deduct+',"'+_classes.join("|")+'");';
        ret.push(str);
    }
}
console.clear();
lastSeasonUsl = localStorage.usl ? JSON.parse(localStorage.usl) : [];
relegatedTeams = [];
lastSeasonUsl.forEach(function(lsu){
    if ( thisSeasonUsl.filter(function(x){return x[1]===lsu[1];}).length === 0 ) {
        relegatedTeams.push(lsu[0]);
    }
});
localStorage.usl = JSON.stringify(thisSeasonUsl);
console.error("RELEGATED: " + relegatedTeams.join("  |  "));
console.warn(ret.join("\n"));
if ( strDeduct.length !== 0 ) {
    console.warn(strDeduct.join("\n"));
}
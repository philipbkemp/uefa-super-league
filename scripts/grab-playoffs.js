usl = document.querySelectorAll(".usl");
if ( ! usl || usl.length === 0 ) {
    if ( document.querySelector("#Regular_season") ) { usl = document.querySelector("#Regular_season"); }
    else if ( document.querySelector("#First_stage") ) { usl = document.querySelector("#First_stage"); }
    else if ( document.querySelector("#Spring_"+window.location.href.split("/").pop().split("_")[0]) ) { usl = document.querySelector("#Spring_"+window.location.href.split("/").pop().split("_")[0]); }
    if ( usl ) {
        usl = usl.parentElement.nextElementSibling.nextElementSibling;
        if ( usl.tagName !== "TABLE" ) { usl = usl.nextElementSibling; }
        if ( usl.tagName !== "TABLE" ) { usl = usl.nextElementSibling; }
        if ( usl.tagName !== "TABLE" ) { usl = usl.nextElementSibling; }
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
flag = "CHE";//prompt("Please enter country code:").toUpperCase();
country = "";
switch (flag) {
    case "ALB": country = "Albania"; break;
    case "AUT": country = "Austria"; break;
    case "BEL": country = "Belgium"; break;
    case "CHE": country = "Switzerland"; break;
    /*case "CSK": country = "Czechoslovakia"; break;*/
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
thisSeasonUsl = [];
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

// playoff
po_up = null;
if ( document.querySelector("#Championship_play-offs") ) { po_up = document.querySelector("#Championship_play-offs").parentElement; }
else if ( document.querySelector("#Play-off_round") ) { po_up = document.querySelector("#Play-off_round").parentElement; }
else if ( document.querySelector("#Playoff") ) { po_up = document.querySelector("#Playoff").parentElement; }
else if ( document.querySelector("#Champion_Playoffs") ) { po_up = document.querySelector("#Champion_Playoffs").parentElement; }
else if ( document.querySelector("#Champion_playoffs") ) { po_up = document.querySelector("#Champion_playoffs").parentElement; }
else if ( document.querySelector("#Championship_group") ) { po_up = document.querySelector("#Championship_group").parentElement; }
if ( ! po_up  ) {
    _up = prompt("What's the heading of the promotion table?");
    if ( document.querySelector("#"+_up) ) { po_up = document.querySelector("#"+_up).parentElement; }
}
while (po_up.tagName !== "TABLE") {
    po_up = po_up.nextElementSibling;
}
po_up.querySelectorAll("tr").forEach(function(po_up_r){
    po_up_r_c = po_up_r.querySelectorAll("td,th");
    if ( po_up_r_c.length !== 0 ) {
        // team
        po_up_team = po_up_r_c[1].querySelectorAll("A");
        if ( po_up_team.length !== 0 ) {
            po_up_team = po_up_team[0].getAttribute("href").replace("/wiki/","");
            ret.forEach(function(retR,retI){
                if ( retR.indexOf(po_up_team) !== -1 ) {
                    _pstr = [parseInt(po_up_r_c[3].innerHTML),parseInt(po_up_r_c[4].innerHTML),parseInt(po_up_r_c[5].innerHTML),parseInt(po_up_r_c[6].innerHTML),parseInt(po_up_r_c[7].innerHTML)].join(",");
                    _p_str = ret[retI].replace(");","");
                    _p_str += ","+_pstr +");";
                    ret[retI] = "playoff_" + _p_str;
                }
            });
        }
    }
});

//playout
po_down = null;
if ( document.querySelector("#Relegation_play-outs") ) { po_down = document.querySelector("#Relegation_play-outs").parentElement; }
else if ( document.querySelector("#Play-out_round") ) { po_down = document.querySelector("#Play-out_round").parentElement; }
else if ( document.querySelector("#Playout") ) { po_down = document.querySelector("#Playout").parentElement; }
else if ( document.querySelector("#Group_A") ) { po_down = document.querySelector("#Group_A").parentElement; }
else if ( window.location.href.split("/").pop().split("_")[0].indexOf("%") === -1) {
    if ( document.querySelector("#Kvalsvenskan_"+window.location.href.split("/").pop().split("_")[0]) ) { po_down = document.querySelector("#Kvalsvenskan_"+window.location.href.split("/").pop().split("_")[0]).parentElement; }
}

if ( po_down ) {
    while (po_down.tagName !== "TABLE") {
        po_down = po_down.nextElementSibling;
    }
    po_down.querySelectorAll("tr").forEach(function(po_up_r){
        po_down_r_c = po_up_r.querySelectorAll("td,th");
        if ( po_down_r_c.length !== 0 ) {
            // team
            po_down_team = po_down_r_c[1].querySelectorAll("A");
            if ( po_down_team.length !== 0 ) {
                po_down_team = po_down_team[0].getAttribute("href").replace("/wiki/","");
                ret.forEach(function(retR,retI){
                    if ( retR.indexOf(po_down_team) !== -1 ) {
                        _pstr = [parseInt(po_down_r_c[3].innerHTML),parseInt(po_down_r_c[4].innerHTML),parseInt(po_down_r_c[5].innerHTML),parseInt(po_down_r_c[6].innerHTML),parseInt(po_down_r_c[7].innerHTML)].join(",");
                        _p_str = ret[retI].replace(");","");
                        _p_str += ","+_pstr +");";
                        ret[retI] = "playoff_" + _p_str;
                    }
                });
            }
        }
    });
}

//playout 2
po_down = null;
if ( document.querySelector("#Group_B") ) { po_down = document.querySelector("#Group_B").parentElement; }

if ( po_down ) {
    while (po_down.tagName !== "TABLE") {
        po_down = po_down.nextElementSibling;
    }
    po_down.querySelectorAll("tr").forEach(function(po_up_r){
        po_down_r_c = po_up_r.querySelectorAll("td,th");
        if ( po_down_r_c.length !== 0 ) {
            // team
            po_down_team = po_down_r_c[1].querySelectorAll("A");
            if ( po_down_team.length !== 0 ) {
                po_down_team = po_down_team[0].getAttribute("href").replace("/wiki/","");
                ret.forEach(function(retR,retI){
                    if ( retR.indexOf(po_down_team) !== -1 ) {
                        _pstr = [parseInt(po_down_r_c[3].innerHTML),parseInt(po_down_r_c[4].innerHTML),parseInt(po_down_r_c[5].innerHTML),parseInt(po_down_r_c[6].innerHTML),parseInt(po_down_r_c[7].innerHTML)].join(",");
                        _p_str = ret[retI].replace(");","");
                        _p_str += ","+_pstr +");";
                        ret[retI] = "playoff_" + _p_str;
                    }
                });
            }
        }
    });
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
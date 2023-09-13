flag = "";
country = "";
newTeams = document.querySelector(".division.division_new tbody");

function addTeam(name,wiki,_w,_d,_l,_f,_a,deduct,classes) {
	existingClub = document.querySelectorAll("a[data-wiki='"+wiki+"']");
	if ( existingClub.length === 1 ) {
		updateTeam(existingClub[0],name,wiki,_w,_d,_l,_f,_a,deduct,classes);
	} else if ( existingClub.length === 0 ) {
		suggestWiki = redirects.filter(function(k){
			return k[1] === (flag.toLowerCase() + "/" + wiki);
		});
		if ( suggestWiki.length === 1 ) {
			newWiki = suggestWiki[0][0].replace( flag.toLowerCase() + "/" , "");
			addTeam(name,newWiki,_w,_d,_l,_f,_a,deduct,classes);
		} else {
			newTeam(name,wiki,_w,_d,_l,_f,_a,deduct,classes);
		}
	} else {
		alert("Issue findining " + wiki);
	}
}

function updateTeam(link,name,wiki,_w,_d,_l,_f,_a,deduct,classes) {
	row = link.parentNode.parentNode;

	tds = row.querySelectorAll("TD");

	if ( tds[2].innerHTML.trim() !== "" ) {
		alert("Duplicate team " + wiki + " / " + name);
		return;
	}

	_games = _w + _d + _l;
	_pts = (_w*3) + _d - deduct;
	_winPercent = ((_w / _games)*100).toFixed(1) + "%";
	_fpg = (_f / _games).toFixed(2);
	_apg = (_a / _games).toFixed(2);
	_ppg = (_pts / _games).toFixed(2);

	row.classList.remove( ...row.classList );
	if ( classes !== "" ) {
		classes.split("|").forEach(function(k){
			row.classList.add(k);
		});
	}

	clubName = tds[1].querySelector("a");
	clubName.innerHTML = name;
	tds[2].innerHTML = _games;
	tds[3].innerHTML = _w;
	tds[4].innerHTML = _d;
	tds[5].innerHTML = _l;
	tds[6].innerHTML = _f;
	tds[7].innerHTML = _a;
	tds[8].innerHTML = _pts;
	tds[9].innerHTML = _f - _a;
	tds[10].innerHTML = _winPercent;
	tds[11].innerHTML = _fpg;
	tds[12].innerHTML = _apg;
	tds[13].innerHTML = _ppg;
}

function newTeam(name,wiki,_w,_d,_l,_f,_a,deduct,classes) {
	row = document.createElement("TR");
	if ( classes !== "" ) {
		classes.split("|").forEach(function(k){
			row.classList.add(k);
		});
	}

	if ( allTeams.indexOf(flag.toLowerCase() + "/" + wiki) !== -1 ) {
		newReturn = "R";
	} else {
		newReturn = prompt("Is " + wiki + " [N]ew or [R]eturning or [D]uplicate?").toUpperCase();
	}
	if ( newReturn === "N" || newReturn === "NEW" ) {
		row.classList.add("newclub");
	} else if ( newReturn === "R" || newReturn === "RETURNING" ) {
		row.classList.add("returning");
	} else if ( newReturn === "D" || newReturn === "DUPLICATE" ) {
		suggestWiki = redirects.filter(function(k){
			return k[1] === (flag.toLowerCase() + "/" + wiki);
		});
		if ( suggestWiki.length === 0 ) {
			newWiki = prompt("What is their correct Wiki page?",wiki);
			console.log('NEW REDIRECT => ["'+flag.toLowerCase()+"/"+newWiki+'","'+flag.toLowerCase()+"/"+wiki+'"]');
		} else {
			newWiki = suggestWiki[0][0].replace( flag.toLowerCase() + "/" , "");
		}
		return addTeam(name,newWiki,_w,_d,_l,_f,_a,deduct,classes);
	} else {
		alert("Unable to categorise new club " + name);
	}

	pos = document.createElement("TD");
	pos.innerHTML = newTeams.querySelectorAll("tr").length + 1;
	row.append(pos);

	team = document.createElement("TD");
	img = document.createElement("IMG");
	img.setAttribute("src","../../f/"+flag+".png");
	img.setAttribute("title",country);
	team.append(img);
	link = document.createElement("A");
	_teamUrl = wiki.toLowerCase()
		.replaceAll("%c3%b8","o").replaceAll("ø","o")
		.replaceAll("(","").replaceAll(")","")
		.replaceAll("/","_")
		.replaceAll("%27","_").replaceAll("'","_")
		.replaceAll("%c3%a1","a")
		.replaceAll("%c3%a8","e")
		.replaceAll("%c3%a9","e")
		.replaceAll("%c3%9a","u")
		.replaceAll("%c3%98","o")
		.replaceAll("%c3%b3","o")
		.replaceAll("%c3%b6","o")
		.replaceAll("%c5%b1","u")
		.replaceAll(" ","_").replaceAll(".","_").replaceAll("__","_");
    if ( /[^a-z0-9_]/.test(_teamUrl) ) {
        _teamUrl = prompt("Invalid URL " + _teamUrl,_teamUrl);
    }
	link.setAttribute("href","../../c/"+flag.toLowerCase()+"/"+_teamUrl+".html");
	link.setAttribute("data-wiki",wiki);
	link.innerHTML = name;
	team.append(link);
	row.append(team);

	_games = _w + _d + _l;
	_pts = (_w*3) + _d - deduct;
	_winPercent = ((_w / _games)*100).toFixed(1) + "%";
	_fpg = (_f / _games).toFixed(2);
	_apg = (_a / _games).toFixed(2);
	_ppg = (_pts / _games).toFixed(2);

	played = document.createElement("TD");
	played.innerHTML = _games;
	row.append(played);

	won = document.createElement("TD");
	won.innerHTML = _w;
	row.append(won);

	drawn = document.createElement("TD");
	drawn.innerHTML = _d;
	row.append(drawn);

	lost = document.createElement("TD");
	lost.innerHTML = _l;
	row.append(lost);

	gFor = document.createElement("TD");
	gFor.innerHTML = _f;
	row.append(gFor);

	gAgainst = document.createElement("TD");
	gAgainst.innerHTML = _a;
	row.append(gAgainst);

	points = document.createElement("TD");
	points.innerHTML = _pts;
	row.append(points);

	gDiff = document.createElement("TD");
	gDiff.innerHTML = _f - _a;
	row.append(gDiff);

	winPercent = document.createElement("TD");
	winPercent.innerHTML = _winPercent;
	row.append(winPercent);

	fpg = document.createElement("TD");
	fpg.innerHTML = _fpg;
	row.append(fpg);

	apg = document.createElement("TD");
	apg.innerHTML = _apg;
	row.append(apg);

	ppg = document.createElement("TD");
	ppg.innerHTML = _ppg;
	row.append(ppg);

	newTeams.append(row);
}

a = "a";
b = "b";
c = "c";
d = "d";
e = "e";
f = "f";
g = "g";
h = "h";
n = "new";
function store(division,split=true) {
	divTbl = document.querySelectorAll("#div_"+division+" table tbody")[0];
	if ( split ) {
		console.log(divTbl.innerHTML.trim().split("<tr").join("\n<tr"));
	} else {
		console.log(divTbl.innerHTML.trim());//.split("<tr").join("\n<tr"));
	}
}

function sort(division) {
	var table = document.querySelectorAll("#div_"+division+" table")[0];
	var tbody = table.querySelector("tbody");
	var rows = Array.from(tbody.rows);

	rows.sort(function (a, b) {
		if ( a.cells.length !== 14 ) {
			return 0;
		}
	
		var valueA_PPG = parseFloat(a.cells[13].textContent);
		var valueB_PPG = parseFloat(b.cells[13].textContent);
		if (valueA_PPG !== valueB_PPG) {
			return valueB_PPG - valueA_PPG;
		} else {

			var valueA_FPG = parseFloat(a.cells[11].textContent);
			var valueB_FPG = parseFloat(b.cells[11].textContent);
			if ( valueA_FPG !== valueB_FPG ) {
				return valueB_FPG - valueA_FPG;
			} else {

				var valueA_APG = parseFloat(a.cells[12].textContent);
				var valueB_APG = parseFloat(b.cells[12].textContent);
				if ( valueA_APG !== valueB_APG ) {
					return valueA_APG - valueB_APG;
				} else {
					alert("NEED ANOTHER SORTING LEVEL");
					console.log(a.cells[1].textContent," // ",b.cells[1].textContent);
				}
			}
		}

		return a.cells[1].textContent.localeCompare(b.cells[1].textContent);
	});

	// Reattach sorted rows to the table body
	rows.forEach(function (row) {
		tbody.appendChild(row);
	});

	var _table = document.querySelectorAll("#div_"+division+" table")[0];
	var _tbody = _table.querySelector("tbody");
	var _rows = Array.from(_tbody.rows);
	_rows.forEach(function (k,v) {
		k.querySelectorAll("td")[0].innerHTML = (v+1);
	});
}

function nextSeason() {
	divisions = ["a","b","c","d","e","f","g","h"];
	str = [];
	divisions.forEach(function(i,idx) {
		divTbl = document.querySelectorAll("#div_"+i+" table tbody")
		if ( divTbl.length !== 0 ) {
			str[idx] = "";
			divTbl = divTbl[0];
			rows = divTbl.querySelectorAll("tr");
			rows.forEach(function(r){
				if ( r.classList.contains("removed") ) {
					r.classList.add("d-none");
				} else {
					r.classList.remove( ...r.classList );
					tds = r.querySelectorAll("td");
					for ( j=2 ; j!==14 ; j++ ) {
						tds[j].innerHTML = "";
					}
					str[idx] += '<tr class="">' + r.innerHTML.trim() + '</tr>\n';
				}
			});
		}
	});
	divisions.forEach(function(i,idx) {
		if ( str[idx] && str[idx] !== "" ) {
			alert( "DIVISON " + i.toUpperCase() + ": " + document.querySelectorAll("#div_"+i+" table tbody tr:not(.d-none)").length );
			console.log("DIVISON " + i.toUpperCase());
			console.log(str[idx]);
		}
	});
}

function listTeams() {
	divisions = ["a","b","c","d","e","f","g","h"];
	str = [];
	divisions.forEach(function(i,idx) {
		divTbl = document.querySelectorAll("#div_"+i+" table tbody")
		if ( divTbl.length !== 0 ) {
			divTbl = divTbl[0];
			rows = divTbl.querySelectorAll("tr");
			rows.forEach(function(r){
				link = r.querySelectorAll("a")[0];
				s = link.getAttribute("data-wiki");
				img = r.querySelectorAll("img")[0].getAttribute("src").split("/").pop().split(".")[0].toLowerCase();
				str.push('"' + img + "/" + s + '"');
			});
		}
	})
	console.log(",\n"+str.join(",\n"));
}

function listNewTeams() {
	divisions = ["a","b","c","d","e","f","g","h"];
	str = [];
	divisions.forEach(function(i,idx) {
		divTbl = document.querySelectorAll("#div_"+i+" table tbody")
		if ( divTbl.length !== 0 ) {
			divTbl = divTbl[0];
			rows = divTbl.querySelectorAll("tr.newclub");
			rows.forEach(function(r){
				link = r.querySelectorAll("a")[0];
				s = link.getAttribute("data-wiki");
				img = r.querySelectorAll("img")[0].getAttribute("src").split("/").pop().split(".")[0].toLowerCase();
				str.push('"' + img + "/" + s + '"');
			});
		}
	})
	console.log(",\n"+str.join(",\n"));
}

function getWinner() {
	winner = document.querySelector("#div_a .division tbody tr");
	_t = winner.querySelector("a");
	_n = winner.querySelector("img");
	year = document.querySelector("head title").innerHTML.split(" / ")[1].split(" ")[1].trim();
	tURL = _t.getAttribute("href").replaceAll("../../","");
	tWiki = _t.getAttribute("data-wiki");
	tName = _t.innerHTML;
	nFlag = _n.getAttribute("src").split("/").pop().split(".")[0];
	nName = _n.getAttribute("title");
	u = window.location.href.split("/");
	y = u.pop();
	f = u.pop();
	s = 'addWinner("y/'+f+'/'+y+'","'+year+'","'+tURL+'","'+tWiki+'","'+tName+'","'+nFlag+'","'+nName+'");';
	console.log(s.trim());
}

function addWinner(_url,_year,_club,_wiki,_name,_flag,_country) {
    thisPage = window.location.href.split("/").pop().split(".")[0] === "winners_club" ? "CLUB" : "NATION";
    if ( thisPage === "CLUB" ) {
        exists = document.querySelectorAll("a[data-wiki='"+_wiki+"']");
        if ( exists.length !== 0 ) {
        	winnersRow = exists[0].parentNode.parentNode;
            ya = document.createElement("A");
            ya.innerHTML = _year;
            ya.setAttribute("href",_url);
            winnersTD = winnersRow.querySelectorAll("td");
            winnersTD[2].append(" ");
            winnersTD[2].append(ya);
            winnersTD[1].innerHTML = parseInt(winnersTD[1].innerHTML) +1;
        } else {
            winnersRow = document.querySelector(".winners tbody");
            r = document.createElement("TR");
            t = document.createElement("TD");
            i = document.createElement("IMG");
            i.setAttribute("src","f/"+_flag+".png");
            i.setAttribute("title",_country);
            a = document.createElement("A");
            a.setAttribute("href",_club);
            a.setAttribute("data-wiki",_wiki);
            a.innerHTML = _name;
            t.append(i);
            t.append(a);
            c = document.createElement("TD");
            c.innerHTML = "1";
            y = document.createElement("TD");
            ya = document.createElement("A");
            ya.innerHTML = _year;
            ya.setAttribute("href",_url);
            y.append(ya);
            r.append(t);
            r.append(c);
            r.append(y);
            winnersRow.append(r);
        }
    } else {
        exists = document.querySelectorAll("img[src='f/"+_flag+".png']");
        if ( exists.length !== 0 ) {
        	winnersRow = exists[0].parentNode.parentNode;
            ya = document.createElement("A");
            ya.innerHTML = _year;
            ya.setAttribute("href",_url);
            winnersTD = winnersRow.querySelectorAll("td");
            winnersTD[2].append(" ");
            winnersTD[2].append(ya);
            winnersTD[1].innerHTML = parseInt(winnersTD[1].innerHTML) +1;
		} else {
			winnersRow = document.querySelector(".winners tbody");
            r = document.createElement("TR");
            n = document.createElement("TD");
            i = document.createElement("IMG");
            i.setAttribute("src","f/"+_flag+".png");
            i.setAttribute("title",_country);
            n.append(i);
            n.append(_country);
            c = document.createElement("TD");
            c.innerHTML = "1";
            y = document.createElement("TD");
            ya = document.createElement("A");
            ya.innerHTML = _year;
            ya.setAttribute("href",_url);
            y.append(ya);
            r.append(n);
            r.append(c);
            r.append(y);
            winnersRow.append(r);
        }
    }

	var table = document.querySelectorAll("table.winners")[0];
	var tbody = table.querySelector("tbody");
	var rows = Array.from(tbody.rows);
	rows.sort(function (a, b) {	
		var countA = parseInt(a.cells[1].textContent);
		var countB = parseInt(b.cells[1].textContent);
		if (countA !== countB) {
			return countB - countA;
		}
	});
	rows.forEach(function (row) {
		tbody.appendChild(row);
	});

    console.log( document.querySelector(".winners tbody").innerHTML );
}

function moveNew(target,count) {
    sort(n);
    fromDiv = document.querySelectorAll(".division_new tbody tr");
    toDiv = document.querySelector("#div_"+target+" .division tbody");
    moved = 0;
    fromDiv.forEach(function(k){
        if ( moved !== count ) {
            toDiv.appendChild(k);
            moved++;
        }
    });
}
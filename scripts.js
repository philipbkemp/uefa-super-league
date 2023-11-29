flag = "";
country = "";
newTeams = document.querySelector(".division.division_new tbody");

function playoff_addTeam(name,wiki,_w,_d,_l,_f,_a,deduct,classes,_pw,_pd,_pl,_pf,_pa) {
	addTeam(name,wiki,_w+_pw,_d+_pd,_l+_pl,_f+_pw,_a+_pa,deduct,classes);
}
function playoff_addTeamN(name,wiki,_w,_d,_l,_f,_a,deduct,classes,_pw,_pd,_pl,_pf,_pa) {
	addTeamN(name,wiki,_w+_pw,_d+_pd,_l+_pl,_f+_pw,_a+_pa,deduct,classes);
}

function addTeam(name,wiki,_w,_d,_l,_f,_a,deduct,classes) {
	wiki = wiki.replaceAll("'","%27");
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

function addTeamN(name,wiki,_w,_d,_l,_f,_a,deduct,classes) {
	newTeam(name,wiki,_w,_d,_l,_f,_a,deduct,classes,"NEW");
}

function updateTeam(link,name,wiki,_w,_d,_l,_f,_a,deduct,classes) {
	row = link.parentNode.parentNode;

	tds = row.querySelectorAll("TD");

	if ( tds[2].innerHTML.trim() !== "" ) {
		console.error("Duplicate team " + wiki + " / " + name);
		return;
	}

	_games = _w + _d + _l;
	_pts = (_w*3) + _d - deduct;
	_winPercent = ((_w / _games)*100).toFixed(1) + "%";
	if ( _winPercent === "NaN%" ) { _winPercent = "0.0%"; }
	_fpg = (_f / _games).toFixed(2);
	if ( _fpg === "NaN" ) { _fpg = "0.00"; }
	_apg = (_a / _games).toFixed(2);
	if ( _apg === "NaN" ) { _apg = "0.00"; }
	_ppg = (_pts / _games).toFixed(2);
	if ( _ppg === "NaN" ) { _ppg = "0.00"; }

	row.classList.remove( ...row.classList );
	if ( classes !== "" ) {
		classes.split("|").forEach(function(k){
			row.classList.add(k);
		});
	}
	if ( deduct !== 0 && classes.indexOf("addition") !== 0 ) {
		row.classList.add("deduction");
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

	if ( deduct !== 0 ) {
		tds[8].setAttribute("data-deduct",deduct);
	}
}

function newTeam(name,wiki,_w,_d,_l,_f,_a,deduct,classes,newReturn="") {

	row = document.createElement("TR");
	if ( classes !== "" ) {
		classes.split("|").forEach(function(k){
			row.classList.add(k);
		});
	}

	known = false;
	if ( newReturn === "" && allTeams.indexOf(flag.toLowerCase() + "/" + wiki) !== -1 ) {
		newReturn = "R";
	} else {
		if ( newReturn === "" ) {
			newReturn = prompt("Is "+name+" (" + wiki + ") [N]ew or [R]eturning or [D]uplicate?");
			if ( newReturn ) {
				newReturn = newReturn.toUpperCase();
			}
		} else {
			known = true;
		}
	}
	if ( newReturn === "N" || newReturn === "NEW" ) {
		row.classList.add("newclub");
		if ( !known ) {
			finalWiki = prompt("What's the final wiki page you end up?",wiki);
			console.warn("NEW TEAM => /*"+finalWiki+"*/\""+flag.toLowerCase()+"/"+wiki+"\",");
		}
	} else if ( newReturn === "R" || newReturn === "RETURNING" ) {
		row.classList.add("returning");
	} else if ( newReturn === "D" || newReturn === "DUPLICATE" ) {
		suggestWiki = redirects.filter(function(k){
			return k[1] === (flag.toLowerCase() + "/" + wiki);
		});
		if ( suggestWiki.length === 0 ) {
			newWiki = prompt("What is their correct Wiki page?",wiki);
			console.warn('NEW REDIRECT => ["'+flag.toLowerCase()+"/"+newWiki+'","'+flag.toLowerCase()+"/"+wiki+'"],');
		} else {
			newWiki = suggestWiki[0][0].replace( flag.toLowerCase() + "/" , "");
		}
		return addTeam(name,newWiki,_w,_d,_l,_f,_a,deduct,classes);
	} else {
		alert("Unable to categorise new club " + name);
	}

	if ( ! newTeams ) {
		var divNew = document.createElement("div");
		divNew.id = "div_new";
		var table = document.createElement("table");
		table.className = "division division_new";
		var thead = document.createElement("thead");
		var headers = ["#","New Teams","P","W","D","L","F","A","Pts","GD","W%","FPG","APG","PPG"];
		var tr = document.createElement("tr");
		for (var i = 0; i < headers.length; i++) {
			var th = document.createElement("th");
			var abbr = document.createElement("abbr");
			abbr.title = headers[i];
			abbr.textContent = headers[i];
			th.appendChild(abbr);
			tr.appendChild(th);
		}
		thead.appendChild(tr);
		var tbody = document.createElement("tbody");
		table.appendChild(thead);
		table.appendChild(tbody);
		divNew.appendChild(table);
		document.getElementById("myTabContent").append(divNew);
		newTeams = document.querySelector(".division.division_new tbody");
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
		.replaceAll("-","_")
		.replaceAll("%27","_").replaceAll("'","_")
		.replaceAll("%c3%a1","a")
		.replaceAll("%c3%a5","a")
		.replaceAll("%c4%83","a")
		.replaceAll("%c3%a2","a")
		.replaceAll("%c3%81","a")
		.replaceAll("%c3%a4","a")
		.replaceAll("%c4%81","a")
		.replaceAll("%c4%85","a")
		.replaceAll("%c3%85","a")
		.replaceAll("%c3%84","a")
		.replaceAll("%c3%a0","a")
		.replaceAll("%c3%a6","ae")
		.replaceAll("%c4%8c","c")
		.replaceAll("%c4%8d","c")
		.replaceAll("%c3%a7","c")
		.replaceAll("%c4%91","d")
		.replaceAll("%c3%a8","e")
		.replaceAll("%c4%99","e")
		.replaceAll("%c3%a9","e")
		.replaceAll("%c4%93","e")
		.replaceAll("%c4%97","e")
		.replaceAll("%c3%ab","e")
		.replaceAll("%c4%9b","e")
		.replaceAll("%c3%89","e")
		.replaceAll("%c3%aa","e")
		.replaceAll("%c4%a6","h")
		.replaceAll("%c3%ad","i")
		.replaceAll("%c4%ab","i")
		.replaceAll("%c3%8d","i")
		.replaceAll("%c3%ae","i")
		.replaceAll("ī","i")
		.replaceAll("î","i")
		.replaceAll("%c4%ae","i")
		.replaceAll("%c5%82","l")
		.replaceAll("%c5%81","l")
		.replaceAll("%c5%88","n")
		.replaceAll("%c5%84","n")
		.replaceAll("%c3%b1","n")
		.replaceAll("%c3%96","o")
		.replaceAll("%c3%98","o")
		.replaceAll("%c3%b3","o")
		.replaceAll("%c3%b6","o")
		.replaceAll("%c3%b0","o")
		.replaceAll("%c5%91","o")
		.replaceAll("%c3%b5","o")
		.replaceAll("%c3%93","o")
		.replaceAll("%c3%be","p")
		.replaceAll("%c3%9e","p")
		.replaceAll("%c5%99","r")
		.replaceAll("%c8%99","s")
		.replaceAll("%c5%a0","s")
		.replaceAll("%c5%9a","s")
		.replaceAll("%c5%a1","s")
		.replaceAll("%c8%98","s")
		.replaceAll("%c3%9f","ss")
		.replaceAll("%c8%9b","t")
		.replaceAll("%c5%a5","t")
		.replaceAll("%c5%a3","t")
		.replaceAll("%c3%9a","u")
		.replaceAll("%c3%bc","u")
		.replaceAll("%c5%b1","u")
		.replaceAll("%c3%9c","u")
		.replaceAll("%c3%ba","u")
		.replaceAll("%c5%ab","u")
		.replaceAll("%c5%b3","u")
		.replaceAll("%c3%bd","y")
		.replaceAll("%c5%bd","z")
		.replaceAll("%c5%be","z")
		.replaceAll("%c5%ba","z")
		.replaceAll("%c5%bb","z")
		.replaceAll("%26","and")
		.replaceAll("%e2%80%93","_")
		.replaceAll("#","_")
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
	if ( _winPercent === "NaN%" ) { _winPercent = "0.0%"; }
	_fpg = (_f / _games).toFixed(2);
	if ( _fpg === "NaN" ) { _fpg = "0.00"; }
	_apg = (_a / _games).toFixed(2);
	if ( _apg === "NaN" ) { _apg = "0.00"; }
	_ppg = (_pts / _games).toFixed(2);
	if ( _ppg === "NaN" ) { _ppg = "0.00"; }

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
	if ( classes.indexOf("addition") === -1 ) {
		points.setAttribute("data-deduct",deduct);
	} else {
		points.setAttribute("data-addition",Math.abs(deduct));
	}
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

	if ( deduct !== 0 && classes.indexOf("addition") === -1 ) {
		row.classList.add("deduction");
	}

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
	
		// 1: PPG
		var valueA_PPG = parseFloat(a.cells[13].textContent);
		var valueB_PPG = parseFloat(b.cells[13].textContent);
		if (valueA_PPG !== valueB_PPG) {
			return valueB_PPG - valueA_PPG;
		} else {

			// 2: FPG
			var valueA_FPG = parseFloat(a.cells[11].textContent);
			var valueB_FPG = parseFloat(b.cells[11].textContent);
			if ( valueA_FPG !== valueB_FPG ) {
				return valueB_FPG - valueA_FPG;
			} else {

				// 3: APG
				var valueA_APG = parseFloat(a.cells[12].textContent);
				var valueB_APG = parseFloat(b.cells[12].textContent);
				if ( valueA_APG !== valueB_APG ) {
					return valueA_APG - valueB_APG;
				} else {

					// 4: W%
					var valueA_W5 = parseFloat(a.cells[10].textContent.replace("%",""));
					var valueB_W5 = parseFloat(b.cells[10].textContent.replace("%",""));
					if ( valueA_W5 !== valueB_W5 ) {
						return valueB_W5 - valueA_W5;
					} else {

						// 5: Games played
						var valueA_P = parseFloat(a.cells[2].textContent);
						var valueB_P = parseFloat(b.cells[2].textContent);
						if ( valueA_P !== valueB_P ) {
							return valueB_P - valueA_P;
						} else {

							// 6: Draws
							var valueA_D = parseFloat(a.cells[4].textContent);
							var valueB_D = parseFloat(b.cells[4].textContent);
							if ( valueA_D !== valueB_D ) {
								return valueB_D - valueA_D;
							} else {

								// 7: Club name
								var valueA_Name = a.cells[1].textContent;
								var valueB_Name = b.cells[1].textContent;
								if ( valueA_Name !== valueB_Name ) {
									return valueA_Name.localeCompare(valueB_Name);
								} else {

									console.error("Tied teams: ",a.cells[1].textContent," // ",b.cells[1].textContent);
								}
							}
						}
					}
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
	clubCount = [];
	clubCount[0] = 0;
	str[0] = "";
	divisions.forEach(function(i,idx) {
		divTbl = document.querySelectorAll("#div_"+i+" table tbody")
		if ( divTbl.length !== 0 ) {
			str[idx+1] = "";
			clubCount[idx+1] = 0;
			divTbl = divTbl[0];
			rows = divTbl.querySelectorAll("tr");
			rows.forEach(function(r){
				if ( r.classList.contains("removed") ) {
					r.classList.add("d-none");
				} else if ( r.classList.contains("relegated") ) {
					r.classList.remove( ...r.classList );
					document.querySelector("#div_"+divisions[idx+1]+" table tbody").append(r);
				} else if ( r.classList.contains("promoted") ) {
					clubCount[idx-1]++;
					r.classList.remove( ...r.classList );
					tds = r.querySelectorAll("td");
					tds[0].innerHTML = clubCount[idx-1];
					for ( j=2 ; j!==14 ; j++ ) {
						tds[j].innerHTML = "";
					}
					str[idx-1] += '<tr class="">' + r.innerHTML.trim() + '</tr>\n';
					document.querySelector("#div_"+divisions[idx-1]+" table tbody").append(r);
				} else {
					clubCount[idx]++;
					r.classList.remove( ...r.classList );
					tds = r.querySelectorAll("td");
					tds[0].innerHTML = clubCount[idx];
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
			console.log("DIVISON " + i.toUpperCase() + "==================================================");
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

function listNewTeams(f) {
	divisions = ["a","b","c","d","e","f","g","h","new"];
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
				if ( !f || img === f ) {
					str.push('"' + img + "/" + s + '"');
				}
			});
		}
	})
	console.log(",\n"+str.join(",\n"));
}

/*
function listNewPages() {
	divisions = ["a","b","c","d","e","f","g","h"];
	str = [];
	divisions.forEach(function(i,idx) {
		divTbl = document.querySelectorAll("#div_"+i+" table tbody")
		if ( divTbl.length !== 0 ) {
			divTbl = divTbl[0];
			rows = divTbl.querySelectorAll("tr.newclub");
			rows.forEach(function(r){
				link = r.querySelectorAll("a")[0];
				s = link.getAttribute("href").split("/").pop();
				img = r.querySelectorAll("img")[0].getAttribute("src").split("/").pop().split(".")[0].toLowerCase();
				spaces = 50 - s.length;
				spacer = "";
				if ( spaces > 0 ) {
					for ( j=0 ; j!==spaces ; j++ ) {
						spacer += " ";
					}
				}
				name = link.innerHTML;
				str.push(img + "  " + s + "" + spacer + name);
			});
		}
	})
	str.sort();
	console.log(str.join("\n"));
}*/

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
            a = document.createElement("A");
            a.setAttribute("href","c/"+_flag.toLowerCase()+"/index.html");
            a.innerHTML = _country;
            n.append(i);
            n.append(a);
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

function archive() {
    ex = [];
    divisions = ["a","b","c","d","e","f","g","h"];
    year = document.querySelector("head title").innerHTML.split(" / ")[1].split(" ")[1].trim();
    divisions.forEach(function(i,idx){
        divs = document.querySelectorAll("#div_"+i+" tbody tr")
        divs.forEach(function(row){
            tds = row.querySelectorAll("td");
            teamData = [];
            teamData.push(year);
            teamData.push(row.classList.value);
            teamData.push(i.toUpperCase());
            tds.forEach(function(col){
                links = col.querySelectorAll("a");
                if ( links.length !== 0 ) {
                	img = col.querySelectorAll("img")[0].getAttribute("src").split("/").pop().split(".")[0];
                	teamData.push(img);
                    teamData.push(links[0].getAttribute("href").split("/").pop());
                    teamData.push(links[0].innerHTML);
                } else {
                    teamData.push(col.innerHTML);
                }
            });
            ex.push(teamData);
        });
    });
    s = "";
    ex.forEach(function(x){
        s += "";
        s += "goArchive(";
        for ( i=0 ; i!==x.length ; i++ ) {
            if ( i !== 0 ) { s+= ","; }
            s += '"'+x[i]+'"';
        }
        s += ");";
        s += "\n";
    });
    console.log(s);
}

function relegatePromote() {
    divisions = ["a","b","c","d","e","f","g","h"];
    afterCount = [];
    afterCount[0] = 0;
	divisions.forEach(function(i,idx) {
		divRows = document.querySelectorAll("#div_"+i+" table tbody tr");
		if ( divRows.length !== 0 ) {
            afterCount[idx+1] = 0;
            divRows.forEach(function(r){
                if ( r.classList.contains("removed") ) {
                    // removed
                } else if ( r.classList.contains("relegated") ) {
                    afterCount[idx+1]++
                } else if ( r.classList.contains("promoted") ) {
                    afterCount[idx-1]++;
                } else {
                    afterCount[idx]++;
                }
            });
        }
    });
    afterCount.forEach(function(x,idx){
    	if ( x !== 0 ) {
        	console.log(divisions[idx].toUpperCase() + ": " + x);
        }
    });
}

function checkMissing() {
	document.querySelectorAll("tbody tr").forEach(function(row){
	    p = row.querySelectorAll("td")[2].innerHTML;
	    if ( p === '' ) {
	        division = row.parentElement.parentElement.parentElement.getAttribute("id").split("_")[1].toUpperCase();
	        tds = row.querySelectorAll("td");
	        position = tds[0].innerHTML;
	        club = tds[1].querySelector("a").innerHTML;
	        clubCountry = tds[1].querySelector("img").getAttribute("src").split("/").pop().split(".")[0];
	        clubUrl = tds[1].querySelector("a").getAttribute("data-wiki");
	        console.log("Division " + division + " / " + position + " / " + clubCountry + " / " + club + " / " + clubUrl);
	    }
	});
}

function bye() {
    previous = prompt("Last season's removed teams");
    prev = previous.split("|");
    prev.forEach(function(prv){
        if(document.querySelectorAll('a[data-wiki="'+prv+'"]').length!==0) {
            console.log( prv + " was removed, but is still present" );
        }
    });
    s = [];
    document.querySelectorAll("tr.removed a").forEach(function(team){
        s.push(team.getAttribute("data-wiki"));
    });
    return s.join("|");
}

function hm() {
	dn = document.querySelectorAll("#div_new tbody tr").length;
	if ( dn > 700 && document.querySelector("#div_h-tab").classList.contains("disabled") ) {
		console.error("Division H needs to be enabled");
	} else if ( dn > 600 && document.querySelector("#div_g-tab").classList.contains("disabled") ) {
		console.error("Division G needs to be enabled");
	} else if ( dn > 500 && document.querySelector("#div_f-tab").classList.contains("disabled") ) {
		console.error("Division F needs to be enabled");
	} else if ( dn > 400 && document.querySelector("#div_e-tab").classList.contains("disabled") ) {
		console.error("Division E needs to be enabled");
	} else if ( dn > 300 && document.querySelector("#div_d-tab").classList.contains("disabled") ) {
		console.error("Division D needs to be enabled");
		console.warn('<div class="tab-pane fade" id="div_d" role="tabpanel" aria-labelledby="div_d-tab"><table class="division"><thead><th><abbr title="Position">#</abbr></th><th>Team</th><th><abbr title="Played">P</abbr></th><th><abbr title="Won">W</abbr></th><th><abbr title="Drawn">D</abbr></th><th><abbr title="Lost">L</abbr></th><th><abbr title="Goals For">F</abbr></th><th><abbr title="Goals Against">A</abbr></th><th><abbr title="Points">Pts</abbr></th><th><abbr title="Goal Difference">GD</abbr></th><th><abbr title="Win Percentage">W%</abbr></th><th><abbr title="Goals For Per Game">FPG</abbr></th><th><abbr title="Goals Conceded Per Game">APG</abbr></th><th><abbr title="Points Per Game">PPG</abbr></th></thead><tbody></tbody></table></div>');
	} else if ( dn > 200 && document.querySelector("#div_c-tab").classList.contains("disabled") ) {
		console.error("Division C needs to be enabled");
	} else if ( dn > 100 && document.querySelector("#div_b-tab").classList.contains("disabled") ) {
		console.error("Division B needs to be enabled");
	} else {
		console.warn(dn + " teams");
	}
	if ( parseInt(localStorage.maxTeams) === dn ) {
		if ( localStorage.maxTeamsYear.indexOf(document.querySelector("H1").innerHTML) === -1 ) {
			localStorage.maxTeamsYear += "|" + document.querySelector("H1").innerHTML;
		}
		console.warn("MAX: " + localStorage.maxTeams);
		console.warn("MAX: " + localStorage.maxTeamsYear);
	}
	if ( parseInt(localStorage.maxTeams) < dn ) {
		localStorage.maxTeams = dn;
		localStorage.maxTeamsYear = document.querySelector("H1").innerHTML;
		console.warn("MAX: " + localStorage.maxTeams);
		console.warn("MAX: " + localStorage.maxTeamsYear);
	}
}

function nextSeasonTeams() {
	nextSeason();
	console.clear();
	div = [];
	divisions = ["a","b","c","d","e","f","g","h"];
	divisions.forEach(function(i,idx) {
		div[i] = [];
		divRows = document.querySelectorAll("#div_"+i+" table tbody tr");
		if ( divRows.length !== 0 ) {
			divRows.forEach(function(r){
				if ( ! r.classList.contains("removed") ) {
					div[i].push( '"' + r.querySelector("a").getAttribute("href").replace("../../c/","") +'"' );
				}
			});
		}
	});
	s = []
	divisions.forEach(function(i,idx) {
		if ( div[i].length !== 0 ) { s.push( "div"+i+"=[" + div[i].join(",") +"]" ); }
	});
	console.log(s.join("\n"));
}
function checkTeams() {
	if ( typeof diva !== "undefined" ) {
		diva.forEach(function(t){
			tt = document.querySelector('#div_a tbody a[href$="'+t+'"]');
			if ( tt ) {
				tt.parentElement.parentElement.querySelectorAll("td")[0].innerHTML = "OK";
			} else {
				console.warn("Division A is missing " + t);
			}
		});
	}
	if ( typeof divb !== "undefined" ) {
		divb.forEach(function(t){
			tt = document.querySelector('#div_b tbody a[href$="'+t+'"]');
			if ( tt ) {
				tt.parentElement.parentElement.querySelectorAll("td")[0].innerHTML = "OK";
			} else {
				console.warn("Division B is missing " + t);
			}
		});
	}
	if ( typeof divc !== "undefined" ) {
		divc.forEach(function(t){
			tt = document.querySelector('#div_c tbody a[href$="'+t+'"]');
			if ( tt ) {
				tt.parentElement.parentElement.querySelectorAll("td")[0].innerHTML = "OK";
			} else {
				console.warn("Division C is missing " + t);
			}
		});
	}
}
flag = "";
country = "";
newTeams = document.querySelector(".division.division_new tbody");

function addTeam(name,wiki,_w,_d,_l,_f,_a,deduct,classes) {
	existingClub = document.querySelectorAll("a[data-wiki='"+wiki+"']");
	if ( existingClub.length === 1 ) {
		updateTeam(existingClub[0],name,wiki,_w,_d,_l,_f,_a,deduct,classes);
	} else if ( existingClub.length === 0 ) {
		newTeam(name,wiki,_w,_d,_l,_f,_a,deduct,classes);
	} else {
		alert("Issue findining " + wiki);
	}
}

function updateTeam(link,name,wiki,_w,_d,_l,_f,_a,deduct,classes) {
	row = link.parentNode.parentNode;

	tds = row.querySelectorAll("TD");

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

	newReturn = prompt("Is " + name + " [N]ew or [R]eturning?").toUpperCase();
	if ( newReturn === "N" || newReturn === "NEW" ) {
		row.classList.add("newclub");
	} else if ( newReturn === "R" || newReturn === "RETURNING" ) {
		row.classList.add("returning");
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
	_teamUrl = wiki.toLowerCase().replaceAll(".","_").replaceAll("__","_");
    if ( /[^a-z0-9_]/.test(_teamUrl) ) {
        alert("Invalid URL " + _teamUrl);
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
function store(division) {
	divTbl = document.querySelectorAll("#div_"+division+" table tbody")[0];
	console.log(divTbl.innerHTML.trim().split("<tr").join("\n<tr"));
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
				alert("NEED ANOTHER SORTING LEVEL");
				console.log(a.cells[1].textContent," // ",b.cells[1].textContent);
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
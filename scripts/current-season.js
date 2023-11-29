deduct=[];
usl = null;
ret = [];
newTeams = [
	"R.W.D._Molenbeek_(2015)",
	"Harju_JK_Laagri",
	"FC_Blau-Wei%C3%9F_Linz",
	"Almere_City_FC",
	"Puszcza_Niepołomice"
];
if ( document.querySelector("#League_table") ) {
	usl = document.querySelector("#League_table").parentElement.nextElementSibling.nextElementSibling;
} else if ( document.querySelector("#Regular_season") ) {
	usl = document.querySelector("#Regular_season").parentElement.nextElementSibling.nextElementSibling;
}
switch ( window.location.href.split("/").pop().split("#")[0] ) {
	case "2023%E2%80%9324_Kategoria_Superiore": 					flag = "ALB"; country = "Albania"; break;
	case "2023%E2%80%9324_Austrian_Football_Bundesliga": 		flag = "AUT"; country = "Austria"; usl = usl.nextElementSibling; break;
	case "2023%E2%80%9324_Belgian_Pro_League": 					flag = "BEL"; country = "Belgium"; usl = usl.nextElementSibling; break;
	case "2023%E2%80%9324_Danish_Superliga": 						flag = "DNK"; country = "Denmark"; usl = usl.nextElementSibling; break;
	case "2023%E2%80%9324_Premier_League": 						flag = "ENG"; country = "England"; break;
	case "2023_Meistriliiga": 														flag = "EST"; country = "Estonia"; break;
	case "2023%E2%80%9324_Ligue_1": 									flag = "FRA"; country = "France"; break;
	case "2023%E2%80%9324_Nemzeti_Bajnoks%C3%A1g_I": 	flag = "HUN"; country = "Hungary"; break;
	case "2023%E2%80%9324_Serie_A": 									flag = "ITA"; country = "Italy"; break;
	case "2023_Latvian_Higher_League": 										flag = "LVA"; country = "Latvia"; break;
	case "2023%E2%80%9324_Luxembourg_National_Division": 	flag = "LUX"; country = "Luxembourg"; break;
	case "2023%E2%80%9324_Maltese_Premier_League":  			flag = "MLT"; country = "Malta"; break;
	case "2023%E2%80%9324_Eredivisie": 									flag = "NLD"; country = "Netherlands"; break;
	case "2023%E2%80%9324_NIFL_Premiership": 						flag = "NIR"; country = "Northern Ireland"; break;
	case "2023%E2%80%9324_Ekstraklasa": 								flag = "POL"; country = "Poland"; break;
	case "2023%E2%80%9324_Liga_I": 										flag = "ROU"; country = "Romania"; usl = usl.nextElementSibling.nextElementSibling.nextElementSibling; break;
	case "2023%E2%80%9324_Scottish_Premiership":  				flag = "SCO"; country = "Scotland"; break;
	case "2023%E2%80%9324_La_Liga": 										flag = "ESP"; country = "Spain"; break;
	case "2023_Allsvenskan": 														flag = "SWE"; country = "Sweden"; break;
}
if ( usl) {
	usl = [usl];
	rows = [];
	usl.forEach(function(uslItem){
		while ( uslItem.tagName !== "TABLE" ) {
			uslItem = uslItem.parentNode;
		}
		r = Array.from(uslItem.querySelectorAll("tr"));
		r.forEach(function(row){rows.push(row);});
	});
	removed = []
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
		/*if ( r === 1 ) {
			_classes.push("champion");
		}
		if ( removed.indexOf(r+"") !== -1 ) {
			_classes.push("removed");
		}
		if ( deduct.indexOf(r) !== -1 ) {
			_classes.push("deduction");
		}*/
		_classes.push("inprogress");
		str = '';
		if ( newTeams.indexOf(_teamWiki) !== -1 ) {
			str += "addTeamN(";
		} else {
			str += "addTeam(";
		}
		str += '"'+_teamName+'","'+_teamWiki+'",'+_won+','+_drawn+','+_lost+','+_for+','+_against+','+_deduct+',"'+_classes.join("|")+'");';
		ret.push(str);
	}
}
console.clear();
console.warn(ret.join("\n"));
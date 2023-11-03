deduct=[];
usl = null;
ret = [];
newTeams = [
	"R.W.D._Molenbeek_(2015)",
	"Harju_JK_Laagri",
	"FC_Blau-Wei%C3%9F_Linz"
];
switch ( window.location.href.split("/").pop().split("#")[0] ) {
	case "2023%E2%80%9324_Kategoria_Superiore": 					flag = "ALB"; country = "Albania"; usl = document.querySelector("#League_table").parentElement.nextElementSibling.nextElementSibling; break;
	case "2023%E2%80%9324_Austrian_Football_Bundesliga": 		flag = "AUT"; country = "Austria"; usl = document.querySelector("#League_table").parentElement.nextElementSibling.nextElementSibling.nextElementSibling; break;
	case "2023%E2%80%9324_Belgian_Pro_League": 					flag = "BEL"; country = "Belgium"; usl = document.querySelector("#League_table").parentElement.nextElementSibling.nextElementSibling.nextElementSibling; break;
	case "2023%E2%80%9324_Danish_Superliga": 						flag = "DNK"; country = "Denmark"; usl = document.querySelector("#League_table").parentElement.nextElementSibling.nextElementSibling.nextElementSibling; break;
	//case "2023_Meistriliiga": 														flag = "EST"; country = "Estonia"; usl = document.querySelector("#League_table").parentElement.nextElementSibling.nextElementSibling; break;
	case "2023%E2%80%9324_Premier_League": 						flag = "ENG"; country = "England"; usl = document.querySelector("#League_table").parentElement.nextElementSibling.nextElementSibling; break;
	case "2023%E2%80%9324_Nemzeti_Bajnoks%C3%A1g_I": 	flag = "HUN"; country = "Hungary"; usl = document.querySelector("#League_table").parentElement.nextElementSibling.nextElementSibling; break;
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
console.log(ret.join("\n"));
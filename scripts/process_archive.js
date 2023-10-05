thisTeamName = document.querySelector("h1").innerHTML;

function goArchive(year,classes,division,placed,file,team,p,w,d,l,f,a,pts,gd,wpercent,fpg,apg,ppg) {
	if ( window.location.href.split("/").pop() === file ) {
		t = document.querySelector(".division.history tbody");

		r = document.createElement("TR");
		c1 = document.createElement("TD");
		c2 = document.createElement("TD");
		c3 = document.createElement("TD");
		c4 = document.createElement("TD");
		c5 = document.createElement("TD");
		c6 = document.createElement("TD");
		c7 = document.createElement("TD");
		c8 = document.createElement("TD");
		c9 = document.createElement("TD");
		c10 = document.createElement("TD");
		c11 = document.createElement("TD");
		c12 = document.createElement("TD");
		c13 = document.createElement("TD");
		c14 = document.createElement("TD");
		c15 = document.createElement("TD");
		c1A = document.createElement("A");
		c1A.setAttribute("href","../../y/"+year.substr(0,2)+"/"+year.substr(2,6)+".html");
		c1A.append(year);
		c1.append(c1A);
		c2.append(division + "." + placed);
		notes = [];
		classes.split(" ").forEach(function(c){
			switch (c) {
				case "champion": notes.push("Domestic Champion"); break;
				case "newclub":
				case "removed":
				case "returning":
				case "":
					break;
				default: notes.push("??"+c+"??");
			}
		});
		if ( thisTeamName !== team ) {
			notes.push("*renamed* " + team);
			thisTeamName = team;
		}
		if ( notes.length === 0 ) {
			c3.append("");
		} else {
			c3.append(notes.join("; "));
		}
		c4.append(p);
		c5.append(w);
		c6.append(d);
		c7.append(l);
		c8.append(f);
		c9.append(a);
		c10.append(pts);
		c11.append(gd);
		c12.append(wpercent);
		c13.append(fpg);
		c14.append(apg);
		c15.append(ppg);
		r.append(c1);
		r.append(c2);
		r.append(c3);
		r.append(c4);
		r.append(c5);
		r.append(c6);
		r.append(c7);
		r.append(c8);
		r.append(c9);
		r.append(c10);
		r.append(c11);
		r.append(c12);
		r.append(c13);
		r.append(c14);
		r.append(c15);
		r.setAttribute("class",classes.replace("champion",""));
		if ( division === "A" && placed === "1" ) {
			r.classList.add("champion");
		}

		t.append(r);
	}
}
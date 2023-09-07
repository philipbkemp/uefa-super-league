# UEFA Super League
My take on a UEFA Super League

## Process:

- Copy the `/y/_template.html` file to the `/y/??/??-??.html` file and adjust the `YYYY` and `YY` years
- In dev console of the previous season, run `nextSeason()` and confirm the popup is less than or equal to 100 teams per division
- Paste the results into the new season file's division tables
- In the previous season, remove the classes `pe-none disabled` from the "Next Season link"
- On the `/index.html` page, remove the `disabled` class from the new season link
- Open the season in Wikipedia and open all leagues to confirm which leagues are active
- In each active league, add `usl` to an element in the final standings table
- Copy the `/scripts/grab.js` contents and paste into the dev console of each active league
- The result can be pasted into the dev console of the current season and dealt with as needed
- Sort the new teams with `sort(n)`
- Move the appropriate number of new teams to each division with `moveNew(a,10)` where `a` is the division, and `10` is the number of teams
- Sort each division with `sort(a)` etc
- Store each division with `store(a)` etc and copy the results into the table of the HTML file
- Check for any Notes, and remove the "New" Division, and validate that each Team competed
- Run `listNewTeams()` to get all the new teams for the `/teams.js` file
- Run `getWinner()` to get the winner
- Open a new tab for the winners by club and by nation page, pasting the winner result into the dev consoles
- Copy the results and paste over the exisiting table in the HTML files of the winners
- Commit to GitHub
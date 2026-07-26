const params = new URLSearchParams(window.location.search);
const teamName = params.get('name');

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const team = data.standings.find(t => t.team === teamName);
        const teamRosterEntry = data.rosters.find(r => r.team === teamName);

        document.getElementById("team-name").innerHTML = `
            ${team.team}
            <img src="${teamImages[team.team]}" class="team-name-logo">
            `;
        document.getElementById("team-record").textContent = `${team.wins} - ${team.losses}`;

        const rosterList = document.getElementById("team-roster");
        const currentRoster = getCurrentRoster(team.team, teamRosterEntry.players, data.trades);
        currentRoster.forEach(player => {
            const li = document.createElement("li");
            li.innerHTML = `
                <img src="${playerImages[player]}" class="character-icon">
                ${player}
            `;
            rosterList.appendChild(li);
        });

        const scheduleBody = document.getElementById("team-schedule-body");
        const teamSchedule = data.schedule.filter(game => game.home_team === teamName || game.away_team === teamName);
        teamSchedule.forEach(game => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${game.date}</td>
                <td class="team-cell" style="--bg-image: url('${teamImages[game.home_team]}')"><a href="team.html?name=${encodeURIComponent(game.home_team)}">${game.home_team}</a></td>
                <td class="team-cell" style="--bg-image: url('${teamImages[game.away_team]}')"><a href="team.html?name=${encodeURIComponent(game.away_team)}">${game.away_team}</a></td>
                <td>${game.result}</td>
            `;
            scheduleBody.appendChild(row);
        });
    });
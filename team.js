const params = new URLSearchParams(window.location.search);
const teamName = params.get('name');

async function loadTeamPage() {
  const response = await fetch('data.json');
  const data = await response.json();

  const team = data.standings.find(t => t.team === teamName);
  const teamRosterEntry = data.rosters.find(r => r.team === teamName);

  const { data: draftedPlayers, error } = await supabaseClient
    .from("players")
    .select("*")
    .eq("team", teamName)
    .eq("draft", true);

  if (error) {
    console.error(error);
    return;
  }

  const draftedNames = draftedPlayers.map(player => player.name);
  const fullStartingRoster = [...teamRosterEntry.players, ...draftedNames];

  document.getElementById("team-name").innerHTML = `
      ${team.team}
      <img src="${teamImages[team.team]}" class="team-name-logo">
      `;
  document.getElementById("team-record").textContent = `${team.wins} - ${team.losses}`;

  const rosterList = document.getElementById("team-roster");
  const currentRoster = getCurrentRoster(team.team, fullStartingRoster, data.trades);
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
}

loadTeamPage();
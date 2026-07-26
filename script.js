fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const standingsBody = document.getElementById("standings-body");
        data.standings.sort((a, b) => (b.wins - a.wins) || (b.runDifferential - a.runDifferential));
        data.standings.forEach(team => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td class="team-cell" style="--bg-image: url('${teamImages[team.team]}')"><a href="team.html?name=${encodeURIComponent(team.team)}">${team.team}</a></td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            `;
        standingsBody.appendChild(row);
        });
        const scheduleBody = document.getElementById("schedule-body");
        data.schedule.forEach(game => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${game.date}</td>
            <td class="team-cell" style="--bg-image: url('${teamImages[game.home_team]}')"><a href="team.html?name=${encodeURIComponent(game.home_team)}">${game.home_team}</a></td>
            <td class="team-cell" style="--bg-image: url('${teamImages[game.away_team]}')"><a href="team.html?name=${encodeURIComponent(game.away_team)}">${game.away_team}</a></td>
            <td>${game.result}</td>
            `;
        scheduleBody.appendChild(row);
        });
        const tradesContainer = document.getElementById("trades-container");
        data.trades.forEach(trade => {
            const card = document.createElement("div");
            card.className = "trade-card";
            const teamAImages = trade.TeamASends.map(player => `<img class="trade-logo" src="${playerImages[player]}">`).join("");
            const teamBImages = trade.TeamBSends.map(player => `<img class="trade-logo" src="${playerImages[player]}">`).join("");
            card.innerHTML = `
                <div class="trade-side" style="--bg-image: url('${teamImages[trade.TeamA]}')">
                    ${teamAImages}
                    <p class="trade-team"><a href="team.html?name=${encodeURIComponent(trade.TeamA)}">${trade.TeamA}</a></p>
                    <p class="trade-player">sends ${trade.TeamASends.join(", ")}</p>
                </div>
                <div class="trade-middle">
                    <p class="trade-date">${trade.date}</p>
                    <p class="trade-arrows">⇄</p>
                </div>
                <div class="trade-side" style="--bg-image: url('${teamImages[trade.TeamB]}')">
                    ${teamBImages}
                    <p class="trade-team"><a href="team.html?name=${encodeURIComponent(trade.TeamB)}">${trade.TeamB}</a></p>
                    <p class="trade-player">sends ${trade.TeamBSends.join(", ")}</p>
                </div>
            `;
            tradesContainer.appendChild(card);
        });
    });
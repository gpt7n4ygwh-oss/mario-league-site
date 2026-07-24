fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const standingsBody = document.getElementById("standings-body");
        data.standings.forEach(team => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${team.team}</td>
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
            <td>${game.home_team}</td>
            <td>${game.away_team}</td>
            <td>${game.result}</td>
            `;
        scheduleBody.appendChild(row);
        });
        const tradesBody = document.getElementById("trades-body");
        data.trades.forEach(trade => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${trade.date}</td>
            <td>${trade.TeamA}</td>
            <td>${trade.TeamASends}</td>
            <td>${trade.TeamB}</td>
            <td>${trade.TeamBSends}</td>
            `;
        tradesBody.appendChild(row);
        });
    });
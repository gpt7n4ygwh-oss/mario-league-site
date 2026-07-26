function getCurrentRoster(teamName, initialRoster, trades) {
    let roster = [...initialRoster];

    const sortedTrades = [...trades].sort((a, b) => new Date(a.date) - new Date(b.date));

    sortedTrades.forEach(trade => {
        if (trade.TeamA === teamName) {
            roster = roster.filter(player => !trade.TeamASends.includes(player));
            roster.push(...trade.TeamBSends)
        }
        if (trade.TeamB === teamName) {
            roster = roster.filter(player => !trade.TeamBSends.includes(player));
            roster.push(...trade.TeamASends);
        }
    });

    return roster;
}
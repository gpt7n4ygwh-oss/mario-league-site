const DRAFT_PASSWORD = "FAF";

function checkAccess() {
  const entered = prompt("Enter the draft password:");
  if (entered !== DRAFT_PASSWORD) {
    document.body.innerHTML = "<p>Incorrect password. Access denied.</p>";
    return false;
  }
  return true;
}

if (checkAccess()) {
  loadAvailablePlayers();
}

async function loadAvailablePlayers() {
  const { data, error } = await supabaseClient
    .from("players")
    .select("*")
    .eq("draft", false)
    .order("name", { ascending: true});

    if (error) {
        console.error(error);
        return;
    }

  const list = document.getElementById("available-players");
  list.innerHTML = "";

  data.forEach(player => {
    const li = document.createElement("li");
    li.innerHTML = `
    <img src="${playerImages[player.name]}" class="character-icon">
    ${player.name}
    <button>Draft</button>
    `;
    li.querySelector("button").addEventListener("click", () => draftPlayer(player.id));
    list.appendChild(li);
  });
}

async function draftPlayer(playerId) {
  const team = document.getElementById("team-select").value;

  const { error } = await supabaseClient
    .from("players")
    .update({ draft: true, team: team })
    .eq("id", playerId);

  if (error) {
    console.error(error);
    return;
  }

  loadAvailablePlayers();
}
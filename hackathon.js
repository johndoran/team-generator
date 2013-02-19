var players = ["John Doran", "Patrick Allen", "Eamonn Moloney", "Gary Meredith", "James Glennon", "Maciej Baranowski", "Conor O'Kane", "Karol Domagala", "Nicola Zaghini", "Stephen Crowley", "Neil Gleeson", "Ignacio Delgado", "Macdara Butler", "Lukasz Mazur", "Wojciech Kozlowski", "Mark Kelly", "Conor Twomey", "Brendan Casey", "Brendan Fahy", "Denise Creed"];

var basedon = { "animals": ["Tigers", "Lions", "Wolves", "Jaguars", "Bears", "Cheetahs", "Leopards", "Panthers", "Gorillas"],
    "birds": ["Hawks", "Eagles", "Kites", "Ospreys", "Falcons", "Buzzards", "Owls"],
    "cars": ["Ferrari", "Mercedes", "Lexus", "Bugatti", "Jaguar", "Audi", "Cadillac", "Lamborghini", "Bentley", "Porsche", "Volvo"],
    "dinosaurs": ["Velociraptors", "Triceratops", "Stegosaurus", "T-Rex", "Brachiosaurus", "Allosaurus", "Apatosaurus"],
    "elements": ["Oxygen", "Hydrogen", "Helium", "Carbon", "Neon", "Copper", "Zinc", "Cobalt", "Titanium", "Sodium"],
    "greekgods": ["Zeus", "Athena", "Hera", "Hermes", "Artemis", "Apollo", "Poseidon", "Ares", "Eros", "Hercules", "Venus"],
    "numbers": ["Team 1", "Team 2", "Team 3", "Team 4", "Team 5", "Team 6", "Team 7", "Team 8", "Team 9", "Team 10"],
    "sports": ["Man Utd", "Chelsea", "Man City", "Liverpool", "West Ham", "Arsenal"],
    "warriors": ["Knights", "Spartans", "Ninjas", "Vikings", "Samurai", "Legionaires", "Barbarians"]
};

$(function () {

    for (var i = 0; i < players.length; i++) {
        $('#names-val').append(players[i] + "\n")
    }

    $("#numplayers-val").change(function () {
        $('#numplayers').html('No per team: ' + $('#numplayers-val').val())
        if ($(".team-results").is(":visible")) {
            genTeams()
        }

    });
    $('#names-val').val($('#names-val').val().trim())
    $('.team-results').hide()
    $('#shuffle-btn').hide()

    $('#numplayers').html('No per team: ' + $('#numplayers-val').val())
    $('#no-of-players').html($('#no-of-players').html() + ' ' + players.length)

    $('#gen-teams').click(function () {
        var resultsVisible = $(".team-results").is(":visible");

        handleGenToggle(resultsVisible);
        if (!resultsVisible) {
            genTeams()
        }
    });

    $('#team-types').change(function () {
        genTeams()
    });

    $('#shuffle-btn').click(function () {
        genTeams()
        $('#example').modal('show')
    });

});

function handleGenToggle(resultsVisible) {
    //$("html, body").animate({ scrollTop: $(document).height() }, "slow");

    $('.team-results').animate({
        height: 'toggle'
    });

    if (!resultsVisible) {
        $('#gen-teams').html('Reset')
        $('#shuffle-btn').show()
    } else {
        $(".team-results .team textarea").val('');
        $('#gen-teams').html('Generate Teams!')
        $('#shuffle-btn').hide()
    }
}

function genTeams() {
    shuffleArray(players)

    $(".team-results .team textarea").remove()
    $(".team-results .team div #team-div").remove()

    var teamNames = basedon[$('#team-types :selected').val()]
    var numPlayersPerTeam = $('#numplayers-val').val()
    var numTeams = Math.ceil(players.length / numPlayersPerTeam)
    var numPlayers = numPlayersPerTeam / players.count
    var playerIdx = 0;


    for (t = 0; t < numTeams; t++) {

        var playerRow = teamNames[t] + '\n'

        for (playerTeamIdx = 0; playerTeamIdx < numPlayersPerTeam; playerTeamIdx++) {
            if (players[playerIdx] != undefined) {
                playerRow += players[playerIdx] + '\n'
                playerIdx++;
            }
        }

        $(".team-results .team").append("<textarea id='team-results' rows='8' columns='80' name='team' style='margin-right:2em;'>" + playerRow + "</textarea>");
    }

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }


}

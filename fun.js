
var currentSorting = 'overallRate'; 
var sortButtons = document.querySelectorAll('.sort-button'); 


function fetchAndProcessData(sortingKey) {
    
    fetch('https:
        .then(response => response.json())
        .then(data => {
            var champions = data;

            
            function findOptimalChampions(champions, sortingKey) {
                var sortedChampions = [];

                
                for (var championName in champions) {
                    if (champions.hasOwnProperty(championName)) {
                        var champion = champions[championName];
                        var overallRate = (champion.pick_rate + champion.win_rate) / 2 * 100; 
                        var highestPickRate = 0;
                        var highestPickRateShardName = "";
                
                        
                        champion.shards.forEach(function(shard) {
                            if (shard.pick_rate > highestPickRate) {
                                highestPickRate = shard.pick_rate;
                                highestPickRateShardName = shard.name;
                            }
                        });
                
                        sortedChampions.push({ 
                            name: championName, 
                            shard: highestPickRateShardName, 
                            overallRate: overallRate.toFixed(2), 
                            pickRate: (champion.pick_rate * 100).toFixed(2) + '%', 
                            winRate: (champion.win_rate * 100).toFixed(2) + '%' 
                        });
                    }
                }
                
                sortedChampions.sort(function(a, b) {
                    if (sortingKey === 'winRate') {
                        return parseFloat(b.winRate) - parseFloat(a.winRate); 
                    } else if (sortingKey === 'pickRate') {
                        return parseFloat(b.pickRate) - parseFloat(a.pickRate); 
                    } else {
                        return parseFloat(b.overallRate) - parseFloat(a.overallRate); 
                    }
                });

                return sortedChampions;
            }

            
            var optimalChampions = findOptimalChampions(champions, sortingKey);

            
            var htmlContent = "";
            var counter = 0;
            optimalChampions.forEach(function(champion) {
                counter ++;
                htmlContent += '<div class="champion"><label>'+counter+'</label><div class="championPic"><img class="img img-fluid" src=https:
            });

            
            document.getElementById("grid").innerHTML = htmlContent;
        })
        .catch(error => console.error('Veri alınamadı:', error));
}


fetchAndProcessData(currentSorting);


sortButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        currentSorting = this.dataset.sorting; 
        fetchAndProcessData(currentSorting); 
    });
});


document.addEventListener('selectstart', function(e) {
    
    e.preventDefault();
});


document.addEventListener('contextmenu', function(e) {
    
    e.preventDefault();
});

function searchChampions() {
    var input, filter, championsContainer, champions, championName, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    championsContainer = document.getElementById('grid');
    champions = championsContainer.getElementsByClassName('champion');

    for (i = 0; i < champions.length; i++) {
        championName = champions[i].getElementsByClassName("championName")[0];
        txtValue = championName.textContent || championName.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            champions[i].style.display = "";
        } else {
            champions[i].style.display = "none";
        }
    }
}
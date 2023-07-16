let items = [];
let votes = {};

document.getElementById('itemForm').addEventListener('submit', function(event) {
    event.preventDefault();
    addItem();
});

function addItem() {
    let item = document.getElementById("newItem").value;
    if (item && !items.includes(item)) {
        items.push(item);
        votes[item] = 0;
        updateItems();
    }
    document.getElementById('newItem').value = '';
}

function updateItems() {
    let votingDiv = document.getElementById("votingDiv");
    votingDiv.innerHTML = '';
    items.forEach(item => {
        let btn = document.createElement("button");
        btn.onclick = function() { submitVote(item); };
        btn.innerHTML = item;
        votingDiv.appendChild(btn);
    });
    votingDiv.style.display = 'flex';
}

function submitVote(item) {
    votes[item] += 1;
    localStorage.setItem("votes", JSON.stringify(votes));
    animateBackground(item);
    let buttons = document.querySelectorAll("button");
}

function animateBackground(item) {
    console.log(item)
    let background = document.getElementById('background');
    background.classList.add('animated');
    var btns = document.getElementsByTagName("button");
    for (var i = 0; i < btns.length; i++) {
        if (btns[i].textContent === item) {
            btns[i].classList.add("highlighted");
        }
    }
    setTimeout(() => {
        for (var i = 0; i < btns.length; i++) {
            btns[i].classList.remove("highlighted");
        }
        background.classList.remove('animated');
    }, 1000); // remove the class after 3 seconds
}

function tallyVotes() {
    let tally = localStorage.getItem("votes");
    if (tally) {
        tally = JSON.parse(tally);
        let result = '';
        for (let item in tally) {
            result += `${item}: ${tally[item]} votes\n`;
        }
        alert(result);
    }
}

function reset() {
    items = [];
    votes = {};
    localStorage.removeItem("votes");
    document.getElementById("votingDiv").innerHTML = '';
    document.getElementById("votingDiv").style.display = 'none';
}

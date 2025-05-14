const gamescreen = document.getElementById("gamescreen");
const map = document.getElementById("map");
const stud = Math.round((window.innerHeight / 25) + 40);

function addPlayer(x=Number,y=Number,character=String,size=Number) {
    let player = {};
    player.sprite = document.createElement("div");
    player.sprite.id = "player";
    player.X = x;
    player.Y = y;
    player.character = character;
    player.size = size;

    player.sprite.style.width = `${size * stud}px`;
    player.sprite.style.height = `${size * stud}px`;
    player.sprite.style.bottom = `${y * stud}px`;
    player.sprite.style.left = `${x * stud}px`;
    player.sprite.style.backgroundSize = `${size * stud}px`;
    player.sprite.style.backgroundImage = `url(assets/characters/${character}/idle.png)`;

    map.appendChild(player.sprite);
    return player
}

const player = addPlayer(1, 3, "jonathan", 1);
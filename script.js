const cardsContainer = document.getElementById("cards-container");
const finalPointsMsg = document.getElementById("final-points-msg");
const remaningPlays = document.getElementById("remaning-plays");
const points = document.getElementById("points");
const flashMsg = document.getElementById("flash-msg");
const reloadBtn = document.getElementById("reload-btn");

let plays = 12;
let currentPoints = 0;

const icons = [
    "trash-01.png",
    "trash-02.png",
    "trash-03.png",
    "wave.png",
    "wave.png",
    "wave.png",
    "wave.png",
    "wave.png",
    "wave.png",
    "wave.png",
    "wave.png",
    "wave.png",
    "wave.png",
    "wave.png",
    "wave.png",
    "wave.png",
    "wave.png",
    "wave.png",
    "wave.png",
    "wave.png",
    "wave.png",
    "wave.png",
    "wave.png",
    "wave.png",
    "wave.png",
];

reloadBtn.addEventListener("click", () => {
    location.reload();
});

const addFlashMsg = (points) => {
    flashMsg.innerText = `+${points}`;
    flashMsg.classList.remove("hide");

    setTimeout(() => {
        flashMsg.classList.add("hide");
    }, 500);
};

const revelCard = ({ target }) => {
    if (plays > 0) {
        if (!target.parentNode.classList.contains("reveal-card")) {
            const frontImg =
                target.parentNode.querySelector(".front").style.backgroundImage;
            target.parentNode.classList.add("reveal-card");

            if (frontImg.includes("trash-01.png")) {
                currentPoints += 50;
                addFlashMsg(50);
            } else if (frontImg.includes("trash-02.png")) {
                currentPoints += 100;
                addFlashMsg(100);
            } else if (frontImg.includes("trash-03.png")) {
                currentPoints += 150;
                addFlashMsg(150);
            }

            plays -= 1;
        }
    } else {
        const allCards = document.querySelectorAll(".card");
        allCards.forEach((card) => card.classList.add("reveal-card"));

        reloadBtn.classList.remove("hide");
        finalPointsMsg.innerText = `Parabéns! Você fez ${currentPoints} pontos`;
        finalPointsMsg.classList.remove("hide");
    }

    remaningPlays.innerText = plays;
    points.innerText = currentPoints.toString().padStart(2, "0");
};

const newCard = (frontImg) => {
    const card = document.createElement("div");
    card.className = "card";

    const front = document.createElement("div");
    front.className = "face front";
    front.style.backgroundImage = `url('./img/${frontImg}')`;

    const back = document.createElement("div");
    back.className = "face back";

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", revelCard);

    return card;
};

const loadGame = () => {
    const shuffledIcons = [...icons, ...icons, ...icons, ...icons].sort(
        () => Math.random() - 0.5
    );

    shuffledIcons.forEach((img) => {
        const card = newCard(img);
        cardsContainer.appendChild(card);
    });
};

loadGame();

const emojis = document.querySelectorAll(".emoji");
const selectedBox = document.getElementById("selectedEmojis");
const resultEmoji = document.getElementById("resultEmoji");
const mainCharacter = document.getElementById("resultCharacter");

let selected = [];

// 이모지 조합 사전 (이모지키친 느낌)
const emojiFusion = {
    "😊😡": "😤",
    "😊😭": "🥹",
    "😡😭": "😣",
    "😍😎": "😏",
    "🤩🥳": "🎉",
    "😴😡": "😠",
    "😊😍": "🥰",
    "😡🤩": "🤯"
};

function fuseEmojis(list) {
    if (list.length === 0) return "🙂";

    const key = list.slice().sort().join("");

    if (emojiFusion[key]) {
        return emojiFusion[key];
    }

    // 3개 조합은 랜덤 변형
    if (list.length === 3) {
        return "🤪";
    }

    return list[list.length - 1];
}

function updateDisplay() {
    selectedBox.textContent = "선택: " + selected.join(" ");
    const result = fuseEmojis(selected);
    resultEmoji.textContent = result;
    mainCharacter.textContent = result;
}

emojis.forEach(emoji => {
    emoji.addEventListener("click", () => {
        const value = emoji.textContent;

        if (selected.includes(value)) {
            selected = selected.filter(e => e !== value);
            emoji.classList.remove("selected");
        } else {
            if (selected.length < 3) {
                selected.push(value);
                emoji.classList.add("selected");
            }
        }

        updateDisplay();
    });
});

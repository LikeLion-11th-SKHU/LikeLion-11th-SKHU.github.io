const $text = document.querySelector(".motion_text");

const letters = [
	"POSSIBILITY \n TO \n REALITY",
	"당신의 내일과 \n 가장 가까운 \n 오늘을 만듭니다.",
	"SKHU 멋사 \n 11기 여러분을 \n 환영합니다. "
];

const speed = 100;
let i = 0;

const changeLineBreak = (letter) => {
	return letter.map(text => text === "\n" ? "<br>" : text);
}

const typing = async () => {
	const letter = changeLineBreak(letters[i].split(""));

	while (letter.length) {
		await wait(speed);
		$text.innerHTML += letter.shift();
	}

	await wait(800);

	letter.pop();
		$text.innerHTML = letter.join("");

	i = !letters[i + 1] ? 0 : i + 1;
	typing();
}

function wait(ms) {
	return new Promise(res => setTimeout(res, ms))
}

setTimeout(typing, 1500);



const slide = document.querySelector(".slide");
let slideHeight = slide.clientHeight;
const prevBtn = document.querySelector(".slide_prev_button");
const nextBtn = document.querySelector(".slide_next_button");
let slideItems = document.querySelectorAll(".slide_item");
const maxSlide = slideItems.length;

let currSlide = 1;

const pagination = document.querySelector(".slide_pagination");

for (let i = 0; i < maxSlide; i++) {
	if (i === 0) pagination.innerHTML += `<li id="pagination_li" class="active"></li>`;
	else pagination.innerHTML += `<li id="pagination_li"></li>`;
}

const paginationItems = document.querySelectorAll(".slide_pagination > #pagination_li");

const startSlide = slideItems[0];
const endSlide = slideItems[slideItems.length - 1];
const startElem = document.createElement("div");
const endElem = document.createElement("div");

endSlide.classList.forEach((c) => endElem.classList.add(c));
endElem.innerHTML = endSlide.innerHTML;

startSlide.classList.forEach((c) => startElem.classList.add(c));
startElem.innerHTML = startSlide.innerHTML;

slideItems[0].before(endElem);
slideItems[slideItems.length - 1].after(startElem);

slideItems = document.querySelectorAll(".slide_item");

let offset = slideHeight + currSlide;
slideItems.forEach((i) => {
	i.setAttribute("style", `top: ${-offset}px`);
});

function nextMove() {
	currSlide++;
	if (currSlide <= maxSlide) {
		const offset = slideHeight * currSlide;
		slideItems.forEach((i) => {
			i.setAttribute("style", `top: ${-offset}px`);
		});
		paginationItems.forEach((i) => i.classList.remove("active"));
		paginationItems[currSlide - 1].classList.add("active");
	} else {
		currSlide = 0;
		let offset = slideHeight * currSlide;
		slideItems.forEach((i) => {
			i.setAttribute("style", `transition: ${0}s; top: ${-offset}px`);
		});
		currSlide++;
		offset = slideHeight * currSlide;
		setTimeout(() => {
			slideItems.forEach((i) => {
				i.setAttribute("style", `transition: ${0.15}s; top: ${-offset}px`);
			});
		}, 0);
		paginationItems.forEach((i) => i.classList.remove("active"));
		paginationItems[currSlide - 1].classList.add("active");
	}
}
function prevMove() {
	currSlide--;
	if (currSlide > 0) {
		const offset = slideHeight * currSlide;
		slideItems.forEach((i) => {
			i.setAttribute("style", `top: ${-offset}px`);
		});
		paginationItems.forEach((i) => i.classList.remove("active"));
		paginationItems[currSlide - 1].classList.add("active");
	} else {
		currSlide = maxSlide + 1;
		let offset = slideHeight * currSlide;
		slideItems.forEach((i) => {
			i.setAttribute("style", `transition: ${0}s; top: ${-offset}px`);
		});
		currSlide--;
		offset = slideHeight * currSlide;
		setTimeout(() => {
			slideItems.forEach((i) => {
				i.setAttribute("style", `transition: ${0.15}s; top: ${-offset}px`);
			});
		}, 0);
		paginationItems.forEach((i) => i.classList.remove("active"));
		paginationItems[currSlide - 1].classList.add("active");
	}
}

nextBtn.addEventListener("click", () => {
	nextMove();
});
prevBtn.addEventListener("click", () => {
	prevMove();
});

for (let i = 0; i < maxSlide; i++) {
	paginationItems[i].addEventListener("click", () => {
		currSlide = i + 1;
		const offset = slideHeight * currSlide;
		slideItems.forEach((i) => {
			i.setAttribute("style", `top: ${-offset}px`);
		});
		paginationItems.forEach((i) => i.classList.remove("active"));
		paginationItems[currSlide - 1].classList.add("active");
	});
}

let loopInterval = setInterval(() => {
	nextMove();
}, 3000);

const slide_stop = document.querySelector(".slide_stop");
slide_stop.addEventListener("click", () => {
	clearInterval(loopInterval);
});

const slide_move = document.querySelector(".slide_move");
slide_move.addEventListener("click", () => {
	loopInterval = setInterval(() => {
		nextMove();
	}, 3000);
});
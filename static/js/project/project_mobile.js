const slide_m = document.querySelector(".slide_m");
let slideWidth = slide_m.clientWidth;
const prevBtn_m = document.querySelector(".slide_prev_button_m");
const nextBtn_m = document.querySelector(".slide_next_button_m");
let slideItems_m = document.querySelectorAll(".slide_item_m");
const maxSlide_m = slideItems_m.length;

let currSlide_m = 1;

const pagination_m = document.querySelector(".slide_pagination_m");

for (let i_m = 0; i_m < maxSlide_m; i_m++) {
	if (i_m === 0) pagination_m.innerHTML += `<li id="pagination_li_m" class="active_m"></li>`;
	else pagination_m.innerHTML += `<li id="pagination_li_m"></li>`;
}

const paginationItems_m = document.querySelectorAll(".slide_pagination_m > #pagination_li_m");
const startSlide_m = slideItems_m[0];
const endSlide_m = slideItems_m[slideItems_m.length - 1];
const startElem_m = document.createElement("div");
const endElem_m = document.createElement("div");

endSlide_m.classList.forEach((c_m) => endElem_m.classList.add(c_m));
endElem_m.innerHTML = endSlide_m.innerHTML;

startSlide_m.classList.forEach((c_m) => startElem_m.classList.add(c_m));
startElem_m.innerHTML = startSlide_m.innerHTML;

slideItems_m[0].before(endElem_m);
slideItems_m[slideItems_m.length - 1].after(startElem_m);

slideItems_m = document.querySelectorAll(".slide_item_m");
//
let offset_m = slideWidth + currSlide_m;
slideItems_m.forEach((i_m) => {
	i_m.setAttribute("style", `left: ${-offset_m}px`);
});

function nextMoves() {
	currSlide_m++;
	if (currSlide_m <= maxSlide_m) {
		const offset_m = slideWidth * currSlide_m;
		slideItems_m.forEach((i_m) => {
			i_m.setAttribute("style", `left: ${-offset_m}px`);
		});
		paginationItems_m.forEach((i_m) => i_m.classList.remove("active_m"));
		paginationItems_m[currSlide_m - 1].classList.add("active_m");
	} else {
		currSlide_m = 0;
		let offset_m = slideWidth * currSlide_m;
		slideItems_m.forEach((i_m) => {
			i_m.setAttribute("style", `transition: ${0}s; left: ${-offset_m}px`);
		});
		currSlide_m++;
		offset_m = slideWidth * currSlide_m;
		setTimeout(() => {
			slideItems_m.forEach((i_m) => {
				i_m.setAttribute("style", `transition: ${0.15}s; left: ${-offset_m}px`);
			});
		}, 0);
		paginationItems_m.forEach((i_m) => i_m.classList.remove("active_m"));
		paginationItems_m[currSlide_m - 1].classList.add("active_m");
	}
}

function prevMoves() {
	currSlide_m--;
	if (currSlide_m > 0) {
		const offset_m = slideWidth * currSlide_m;
		slideItems_m.forEach((i_m) => {
			i_m.setAttribute("style", `left: ${-offset_m}px`);
		});
		paginationItems_m.forEach((i_m) => i_m.classList.remove("active_m"));
		paginationItems_m[currSlide_m - 1].classList.add("active_m");
	} else {
		currSlide_m = maxSlide_m + 1;
		let offset_m = slideWidth * currSlide_m;
		slideItems_m.forEach((i_m) => {
			i_m.setAttribute("style", `transition: ${0}s; left: ${-offset_m}px`);
		});
		currSlide_m--;
		offset_m = slideWidth * currSlide_m;
		setTimeout(() => {
			slideItems_m.forEach((i_m) => {
				i_m.setAttribute("style", `transition: ${0.15}s; left: ${-offset_m}px`);
			});
		}, 0);
		paginationItems_m.forEach((i_m) => i_m.classList.remove("active_m"));
		paginationItems_m[currSlide_m - 1].classList.add("active_m");
	}
}

nextBtn_m.addEventListener("click", () => {
	nextMoves();
});
prevBtn_m.addEventListener("click", () => {
	prevMoves();
});

window_m.addEventListener("resize", () => {
	slideWidth = slide_m.clientWidth;
});

for (let i_m = 0; i_m < maxSlide_m; i_m++) {
	paginationItems_m[i_m].addEventListener("click", () => {
		currSlide_m = i_m + 1;
		const offset_m = slideWidth * currSlide_m;
		slideItems_m.forEach((i_m) => {
			i_m.setAttribute("style", `left: ${-offset_m}px`);
		});
		paginationItems_m.forEach((i_m) => i_m.classList.remove("active_m"));
		paginationItems_m[currSlide_m - 1].classList.add("active_m");
	});
}

let startPoint_m = 0;
let endPoint_m = 0;

slide_m.addEventListener("touchstart", (e_m) => {
	startPoint_m = e_m.touches[0].pageX;
});
slide_m.addEventListener("touchend", (e_m) => {
	endPoint_m = e_m.changedTouches[0].pageX;
	if (startPoint_m < endPoint_m) {
		prevMoves();
	} else if (startPoint_m > endPoint_m) {
		nextMoves();
	}
});

let loopInterval_m = setInterval(() => {
	nextMoves();
}, 3000);

slide_m.addEventListener("mouseover", () => {
	clearInterval(loopInterval_m);
});

slide_m.addEventListener("mouseout", () => {
	loopInterval_m = setInterval(() => {
		nextMoves();
	}, 3000);
});

// Snowflake drawing Logic by Coding Train

function makesnack(msg) {
	snackbar.innerHTML = msg;
	snackbar.className = 'show';
	setTimeout(function () {
		snackbar.className = snackbar.className.replace('show', '');
	}, 3000);
}

var thickness, fillcolor, mycanvas, onlinecountdisplay;
var thicknessbar,
	thicknessindicator,
	lock,
	activecol,
	colorspot,
	eraser,
	colorPallete,
	smartColor,
	smartBrush;
let symmetry = 6;
let angle = 360 / symmetry;

let xoff = 0;
function setup() {
	let mycanvas = createCanvas(250, 250);
	angleMode(DEGREES);
	background(0);
	// colorMode(HSB, 255, 255, 255);
	//colorMode(HSB);

	mycanvas.parent($('.canvascontainer')[0]);
	// thicknessbar = $('#size');
	thicknessbar = document.getElementById('size');
	thicknessindicator = $('#sizeval')[0];

	thickness = Number(thicknessbar.value);
	thicknessbar.addEventListener('input', () => {
		thickness = Number(thicknessbar.value);
		thicknessindicator.innerHTML = thickness;
	});
	colorPallete = $('.color-pallete');
	activecol = $('.col');
	smartColor = $('#smartColor')[0];
	smartBrush = $('#smartBrush')[0];
	fillcolor = color(activecol[0].jscolor.rgb);
	activecol.click((e) => {
		fillcolor = color(e.target.jscolor.rgb);
	});
	activecol.focusin((e) => {
		colorPallete.addClass('put-space');
	});
	activecol.focusout((e) => {
		colorPallete.removeClass('put-space');
	});
	smartColor.addEventListener('change', (e) => {
		if (smartColor.checked) {
			colorMode(HSB, 255, 255, 255, 255);
		} else {
			colorMode(RGB);
		}
	});
	$('.canvascontainer canvas').bind('touchmove', (e) => {
		console.log('scrolling');
		e.preventDefault();
	});
}

const updateColor = (picker) => {
	const col = picker.rgb;
	fillcolor = color(col);
};
function draw() {
	translate(width / 2, height / 2);

	if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
		let mx = mouseX - width / 2;
		let my = mouseY - height / 2;
		let pmx = pmouseX - width / 2;
		let pmy = pmouseY - height / 2;

		if (mouseIsPressed) {
			// let hu = map(sin(xoff), -1,1,0,255);

			// stroke(hu, 255, 255, 100);
			// stroke(fillcolor, 100);
			// console.log(colors);
			if (smartColor.checked) {
				// let hu = map(sin(xoff), -1, 1, h - 50, h + 50);
				// hu = constrain(hu, 0, 255);
				let hu = map(sin(xoff), -1, 1, 0, 255);
				xoff += 1;
				// stroke(hu, 255, 255, 100);
				stroke(fillcolor.levels[0], hu, 255, 100);
			} else {
				let colors = fillcolor.levels;
				stroke(colors[0], colors[1], colors[2], 100);
			}
			// stroke(hu,100)
			let angle = 360 / symmetry;
			for (let i = 0; i < symmetry; i++) {
				rotate(angle);
				let d = dist(mx, my, pmx, pmy);
				let sw = map(d, 0, 8, 3, 0.3);
				if (smartBrush.checked) {
					strokeWeight(sw);
				} else {
					strokeWeight(thickness);
				}
				line(mx, my, pmx, pmy);
				push();
				scale(1, -1);
				line(mx, my, pmx, pmy);
				pop();
			}
		}
	}
}

function resetpainting() {
	if (confirm('This will clear your whole painting')) {
		background(0);
	}
}

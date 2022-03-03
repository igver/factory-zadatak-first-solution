$(document).ready(function(){

	const buttonPrev = $('.prev');
	const buttonNext = $('.next');

	function getActiveSlide(currentSlider){
		let activeSlide = $('#' + currentSlider + ' img.active').attr('id');
		return activeSlide;
	}

	function getFirstSlide(currentSlider){
		let firstSlide = $('#' + currentSlider + ' img').attr('id');
		return firstSlide;
	}

	function prevSlide(slider){
		let currentSlider = slider;
		let activeSlideName = getActiveSlide(currentSlider);
		let activeSlideNumber = parseInt(activeSlideName.split("-").pop());

		let sliderParent = document.getElementById(currentSlider);
		let slidesElements = sliderParent.children;
		let childrenLength = sliderParent.children.length;

		if (activeSlideNumber <= 1){
			var previousOne = childrenLength;
			moveSlider();
		}else{
			var previousOne = activeSlideNumber - 1;
			moveSlider();
		}

		function moveSlider(){
			let previousOneName = '#' + currentSlider + '-' + previousOne;

			let getActive = sliderParent.querySelector('.active');

			$('#' + activeSlideName).removeClass('active');
			$(previousOneName).addClass('active');
			
			$(getActive).removeClass("active");

			const clone = getActive.cloneNode(true);

			sliderParent.insertAdjacentElement ('afterBegin', clone);

			let moveToLeft = document.getElementById(activeSlideName).offsetWidth;
			let currentPosition = parseInt($("#" + currentSlider).css("right"));
			let totalMove = currentPosition - moveToLeft - 10;

			$("#" + currentSlider).animate({right: totalMove});

			const button1 = document.querySelector('.prev');
			const button2 = document.querySelector('.next');

			button1.disabled = true;
			button2.disabled = true;

			setTimeout(function () {
				sliderParent.removeChild(getActive);
				$("#" + currentSlider).css({right: 0});
				button1.disabled = false;
				button2.disabled = false;
			}, 500);
		}
	}


	function nextSlide(slider){
		let currentSlider = slider;
		let activeSlideName = getActiveSlide(currentSlider);
		let FirstSlideName = getFirstSlide(currentSlider);
		let FirstSlideNumber = parseInt(FirstSlideName.split("-").pop());

		var nextOne = FirstSlideNumber;

		var nextOneName = '#' + currentSlider + '-' + nextOne;

		$('#' + activeSlideName).removeClass('active');
		$(nextOneName).addClass('active');

		let sliderParent = document.getElementById(currentSlider);
		let childrenLength = sliderParent.children.length;
		let getActive = sliderParent.querySelector('.active');
		const clone = getActive.cloneNode(true);

		$(getActive).removeClass("active");

		let activeWidth = getActive.offsetWidth;

		sliderParent.insertAdjacentElement ('beforeEnd', clone);

		let currentPosition = parseInt($("#" + currentSlider).css("right")) - activeWidth - 10;

		$("#" + currentSlider).css({right: currentPosition});

		let totalMove = currentPosition + activeWidth + 10;

		$("#" + currentSlider).animate({right: totalMove});

		const button1 = document.querySelector('.prev');
		const button2 = document.querySelector('.next');

		button1.disabled = true;
		button2.disabled = true;

		setTimeout(function () {
			sliderParent.removeChild(getActive);
	  		button1.disabled = false;
			button2.disabled = false;
		}, 500);
	}

	buttonPrev.on('click', () => {
		prevSlide('slider-top');
		prevSlide('slider-bottom');
	});

	buttonNext.on('click', () => {
		nextSlide('slider-top');
		nextSlide('slider-bottom');
	});

});
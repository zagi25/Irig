import { gsap } from 'gsap';


export const nav_anim = (element,color, down) => {
	const tl = gsap.timeline();
	tl.to(element,
		{
			duration: down ? 1 : 0.5,
			background: color,
		}
	);
}

export const slide_animation = (current_slide, next_slide, curr_info, next_info, direction, left, right) => {
	let move;
	const tl = gsap.timeline({
		onComplete: () => {
		right.style.pointerEvents = 'auto';
		left.style.pointerEvents = 'auto';
		}
	});
	if(direction === 'right'){
		move = '-100%';
	}else{
		move = '100%';
	}
	tl.to(current_slide,
		{
			duration: 1.5,
			left: move,
		}
	);
	tl.fromTo(curr_info,
		{
			autoAlpha: 1,
		},
		{
			duration: 0.5,
			autoAlpha: 0,
		},
		'-=1.5'
	);
	tl.to(next_slide,
		{
			duration:1.5,
			left: 0
		},
		'-=1.5'
	);
	tl.fromTo(next_info,
		{
			autoAlpha: 0
		},
		{
			duration: 0.5,
			autoAlpha: 1
		}
	);
}

export const initial_animation = (element1, element2, right, left) => {
	const tl = gsap.timeline();
	tl.fromTo(element1,
		{
			autoAlpha: 0,
		},
		{
			duration: 1,
			autoAlpha: 1,
		},'+=1');
	tl.fromTo(element2,
		{
			autoAlpha: 0,
		},
		{
			duration:1,
			autoAlpha:1,
		},'-=1');
	tl.fromTo(right,
		{
			autoAlpha: 0,
		},
		{
			duration: 1,
			autoAlpha: 1,
		}, '-=1');
	tl.fromTo(left,
		{
			autoAlpha: 0,
		},
		{
			duration: 1,
			autoAlpha: 1,
		}, '-=1');
}

export const info_show_animation = (container, text_container) => {
	const tl = gsap.timeline();
	tl.fromTo(container,
		{
			width: 0,
		},
		{
			duration: 0.7,
			width: '90%',
		}
	);
	tl.fromTo(text_container,
		{
			autoAlpha: 0,
		},
		{
			duration: 0.4,
			autoAlpha: 1,
		},
	);
}

export const info_close_animation = (container, text_container, map) => {
	const tl = gsap.timeline({
		onComplete: () => {
			container.style.display = 'none';
			map.style.setProperty('--map-after-zindex','-50');
		}
	});
	tl.fromTo(text_container,
		{
			autoAlpha: 1,
		},
		{
			duration: 0.1,
			autoAlpha: 0,
		});
	tl.fromTo(container,
		{
			width: '90%',
		},
		{
			duration: 0.3,
			width: 0,
		},'-=0.1');
}


import { initial_animation, slide_animation, nav_anim, info_show_animation, info_close_animation} from './animations';
import data from './data';
import img_jpg from "../static/*.jpg";
import info_image_jpeg from '../static/info_images/*.jpeg';
import info_image_jpg from '../static/info_images/*.jpg';
import create_map from './mapa';
import place from './place';
import detect_swipe from './detect_swipe';




//Variables
const navbar = document.querySelector('nav');
const nav_list = document.querySelector('.nav-links');
const navlinks = navbar.querySelectorAll('li');
const sections = document.querySelectorAll('section');
const y = sections[0].clientHeight;//Height of page
const max_scroll = (sections.length - 1) * y;
let section_index = 0;
let first_down = true;
let can_scroll = true;
let s = 0;//Scroll position

const crest = document.querySelector('.crest-container');
const logo_img = crest.querySelector('img');
const arrow_r = document.querySelector('.arrow-right');
const arrow_l = document.querySelector('.arrow-left');
const slide_container = document.querySelector('.slider');
let current_slide = document.querySelector('.current-slide');
let current_info = document.querySelector('.slide-info');
let current_img = document.querySelector('#current-img');
const hamburger = document.querySelector('.nav-hamburger');
let show_hamburger = true;
let current = 0;//Current slide

const about_container = document.querySelector('.about-container');

const map_section = document.querySelector('.map');
const map_container = document.querySelector('#map');
let mouse_in = false;
const info_images = {...info_image_jpeg, ...info_image_jpg};

//Functions

history.scrollRestoration = 'manual';
window.onbeforeunload = function () {
  window.scrollTop(0);
}

//SCROLLING
//Full page scroll
const wheel_scroll = (e) => {
	if(navlinks[section_index - 1]){
		navlinks[section_index - 1].style.setProperty('--nav-link-width', '0');
		navlinks[section_index - 1].style.transform = 'scale(1)';
	}
	if(can_scroll && !mouse_in){
		can_scroll = false
		if(e.wheelDelta < 0){
			if(s + y <= max_scroll){ 
				s += y;
				section_index++;
			}else{
				can_scroll = true;
			}
			window.scroll({
				top: s,
				behavior: 'smooth',
			});
		}else if( e.wheelDelta > 0){
			if(s - y >= 0){ 
				s -= y;
				section_index--;
			}else{
				can_scroll = true;
			}
			window.scroll({
				top: s,
				behavior: 'smooth',
			});
		}
	}
	if(navlinks[section_index - 1]){
		navlinks[section_index - 1].style.setProperty('--nav-link-width', '100%');
		navlinks[section_index - 1].style.transform = 'scale(1.1)';
	}
	if(section_index > 0){
		if(first_down){
			nav_anim(navbar,'#ec1c25', true);
			hamburger.style.color = 'white';
		}
		first_down = false;
	}else{
		first_down = true;
		nav_anim(navbar,'transparent', false);
		hamburger.style.color = 'rgba(255,255,255, 0.8)';
	}
};

let can_swipe = true;
let info_open = false;

const swipe_scroll = (e) => {
	end_posY = e.changedTouches[0].clientY;
	start_posY = Math.abs(start_posY);
	end_posY = Math.abs(end_posY);
	let dir_Y = end_posY - start_posY;

	if(navlinks[section_index - 1]){
		navlinks[section_index - 1].style.setProperty('--nav-link-width', '0');
		navlinks[section_index - 1].style.transform = 'scale(1)';
	}
	if(!info_open){
		e.target.localName === 'canvas' ? can_swipe = false : can_swipe = true;
	}
	if(can_swipe){
		if(dir_Y < 0){
			if(s + y <= max_scroll){ 
				s += y;
				section_index++;
			}
			window.scroll({
				top: s,
				behavior: 'smooth',
			});
		}else if(dir_Y > 0){
			if(s - y >= 0){ 
				s -= y;
				section_index--;
			}
			window.scroll({
				top: s,
				behavior: 'smooth',
			});
		}
	}

	if(navlinks[section_index - 1]){
		navlinks[section_index - 1].style.setProperty('--nav-link-width', '100%');
		navlinks[section_index - 1].style.transform = 'scale(1.1)';
	}
	if(section_index > 0){
		if(first_down){
			nav_anim(navbar,'#ec1c25', true);
			hamburger.style.color = 'white';
		}
		first_down = false;
	}else{
		first_down = true;
		nav_anim(navbar,'transparent', false);
		hamburger.style.color = 'rgba(255,255,255, 0.8)';
	}
}

const scroll_on_click = (e) => {
	if(e.target.tagName === 'LI'){
		if(first_down){
			nav_anim(navbar, '#ec1c25', true);
			hamburger.style.color = 'white';
		}
		first_down = false;
		if(navlinks[section_index - 1]){
			navlinks[section_index - 1].style.setProperty('--nav-link-width', '0');
			navlinks[section_index - 1].style.transform = 'scale(1)';
		}
		sections[e.target.id].scrollIntoView();	
		navlinks[e.target.id - 1].style.setProperty('--nav-link-width', '100%');
		navlinks[e.target.id - 1].style.transform = 'scale(1.1)';
		section_index = Number(e.target.id);
		s = Number(e.target.id) * y;
		nav_list.style.right = '-100%';
		show_hamburger = true;
	}
}

const logo_click = () => {
	first_down = true;
	if(section_index !== 0){
		sections[0].scrollIntoView();
		section_index = 0;
		s = 0;
		for(let i = 0; i < navlinks.length; i++){
			navlinks[i].style.setProperty('--nav-link-width', '0');
			navlinks[i].style.transform = 'scale(1)';
		}
	}
	nav_list.style.right = '-100%';
	show_hamburger = true;
}


//SLIDER
//Creating new slide
const create_slide = (position) => {
	let index;
	if(position === 'next-slide'){
		if(current === data.length - 1){
			index = 0;
		}else{
			index = current + 1;
		}
	}else{
		if(current === 0){
			index = data.length - 1;
		}else{
			index = current - 1;
		}
	}
	const new_slide = document.createElement('div'); 
	new_slide.classList.add('slide', position);
	const slide_img = document.createElement('img');
	const slide_info = document.createElement('div');
	index % 2 === 0 ?
		slide_info.classList.add('slide-info', 'slide-info-left')
	:
		slide_info.classList.add('slide-info', 'slide-info-right');
	const slide_title = document.createElement('h1');
	const slide_par = document.createElement('p');

	new_slide.appendChild(slide_img);
	slide_info.appendChild(slide_title);
	slide_info.appendChild(slide_par);
	new_slide.appendChild(slide_info);
	slide_container.appendChild(new_slide);

	slide_img.src = img_jpg[data[index].image];
	slide_title.innerHTML = data[index].title;
	slide_par.innerHTML = data[index].desc;
	
	return [new_slide, slide_info];
}

//Slide logic
const slide = (direction) => {
	arrow_r.style.pointerEvents = 'none';
	arrow_l.style.pointerEvents = 'none';
	if(direction === 'right'){
		previous_slide.remove();
		previous_info.remove();
		slide_animation(current_slide, next_slide, current_info, next_info, direction, arrow_l, arrow_r); 
		previous_slide = current_slide;
		previous_info = current_info;
		current_slide = next_slide;
		current_info = next_info;
		current === data.length - 1 ? current = 0 : current++;
		[next_slide, next_info] = create_slide('next-slide');
	}else{
		next_slide.remove();
		next_info.remove();
		slide_animation(current_slide, previous_slide, current_info, previous_info, direction, arrow_l, arrow_r); 
		next_slide = current_slide;
		next_info = current_info;
		current_info = previous_info;
		current_slide = previous_slide;
		current === 0 ? current = data.length - 1 : current-- ;
		[previous_slide, previous_info] = create_slide('previous-slide');
	}
	clearInterval(auto_slide);
	auto_slide = setInterval(() => slide('right'), 5000);
}


//MAP SECTION
//Creating info container
let all_info = [];
let info, text;
const create_info = (info) => {	
	for(let i = 0; i < info.length; i++){
		const info_container = document.createElement('div');
		info_container.classList.add('info-container');
		const info_img_container = document.createElement('div');
		info_img_container.classList.add('info-img-container');
		info_container.appendChild(info_img_container);
		const info_img = document.createElement('img');
		info_img_container.appendChild(info_img);
		const text_container = document.createElement('div');
		text_container.classList.add('text-container');
		const info_title = document.createElement('h1');
		info_title.classList.add('info-title');
		text_container.appendChild(info_title);

		info_img_container.appendChild(text_container);

		info_img.src = info_images[info[i].image];
		info_title.innerHTML = info[i].name;
		const split_desc = info[i].desc.split('\n');
		for(let i in split_desc){
			let info_text = document.createElement('p');
			text_container.appendChild(info_text);
			info_text.innerHTML = split_desc[i];
		}
		const close_icon = document.createElement('i');
		close_icon.classList.add('fas', 'fa-times','close-icon');
		text_container.appendChild(close_icon);
		map_section.appendChild(info_container);

		all_info.push([info_container, text_container, close_icon]);
	}
}

const mouse_over = () => {
	mouse_in = true;
}

const show_info = (id) => {
	let close_icon;
	can_swipe = false;
	info_open = true;
	console.log(id);
	[info, text, close_icon] = all_info[id];
	info.style.display = 'flex';
	map_section.style.setProperty('--map-after-zindex','50');

	info_show_animation(info, text);

	close_icon.addEventListener('click', () => {
		info_close_animation(info, text, map_section);
		document.removeEventListener('click', check_click);
		info.removeEventListener('mouseover', mouse_over);
		mouse_in = false;
		can_swipe = true;
		info_open = false;
	});

	info.addEventListener('mouseover', mouse_over);

	document.addEventListener('click', check_click);
}

const check_click = (e) => {
	if(!info.contains(e.target)){
		info_close_animation(info, text, map_section);
		document.removeEventListener('click', check_click);
		info.removeEventListener('mouseover', mouse_over);
		mouse_in = false;
		can_swipe = true;
		info_open = false;
	}
}


//Main

navbar.addEventListener('click', (e) => scroll_on_click(e));
crest.addEventListener('click', logo_click);
document.addEventListener('wheel', (e) => wheel_scroll(e));
document.addEventListener('scroll', () => {
	let scroll_pos = document.documentElement.scrollTop;
	if(scroll_pos < y && s === 0){
		nav_anim(navbar, 'transparent', false);
		logo_img.style.transform = 'scale(1)';
		hamburger.style.color = 'rgba(255,255,255,0.8)';
	}else{
		logo_img.style.transform = 'scale(0.8)';
	}
	if(scroll_pos === y * section_index){
		can_scroll = true;
	}
});

hamburger.addEventListener('click', () => {
	if(show_hamburger) {
		nav_list.style.right = '-2rem';
		show_hamburger = false;
	}else{
		nav_list.style.right = '-100%';
		show_hamburger = true;
	}
});

let [next_slide, next_info] = create_slide('next-slide');
let [previous_slide, previous_info] = create_slide('previous-slide');
current_img.onload = initial_animation(navbar, current_info, arrow_r, arrow_l);
arrow_r.addEventListener('click', () => slide('right'));
arrow_l.addEventListener('click', () => slide('left'));
slide_container.addEventListener('mousedown', () => clearInterval(auto_slide));
slide_container.addEventListener('mouseup', () => {
	auto_slide = setInterval(() => slide('right'), 5000);
});
let auto_slide = setInterval(() => slide('right'), 5000);

create_info(place);

const [map, vector_layer] = create_map('map');
map.on('singleclick', function (e){
	const feature = this.forEachFeatureAtPixel(e.pixel, function (feature) {
		return feature;
	});
	if(feature){
		const id = Number(feature.get('id'));
		show_info(id);
	}else{
		return;
	}
});
map.on("pointermove", function (e) {
	let hit = this.forEachFeatureAtPixel(e.pixel, function(feature){
			return true;
	}); 
	if (hit) {
			this.getTargetElement().style.cursor = 'pointer';
	} else {
			this.getTargetElement().style.cursor = '';
	}
});
map.on('movestart', () => {
	let view = map.getView();
	if(view.getZoom() <= 11){
		vector_layer.setVisible(false);
	}else if(view.getZoom() > 11){
		vector_layer.setVisible(true);
	}
});

map_container.addEventListener('mouseover', () => {
	mouse_in = true;
});
map_container.addEventListener('mouseout', () => {
	mouse_in = false;
});



let start_posX, start_posY, end_posX, end_posY;
document.addEventListener('touchstart' , (e) => {
	start_posX = e.changedTouches[0].clientX;
	start_posY = e.changedTouches[0].clientY;
});

document.addEventListener('touchend' , swipe_scroll);




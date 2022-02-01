import granice from './granice.geojson';
import place from './place';
import icons from '../static/map_icons/*.png';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {transform} from 'ol/proj.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Style, Stroke, Icon} from 'ol/style';
import Point from 'ol/geom/Point';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import Overlay from 'ol/Overlay';


const get_pos = (coor) => {
	let real_coor = [coor[1], coor[0]]
	return transform(real_coor, 'EPSG:4326', 'EPSG:3857');
}


const create_features = (data) => {
	let features = [];
	for(let i = 0; i < data.length; i++){
		const iconFeature = new Feature({
			geometry: new Point(get_pos(data[i].position)),
			name: data[i].name,
			id:data[i].id,
		});

		const iconStyle = new Style({
			image: new Icon({
				src: icons[data[i].icon],
			}),
		});

		iconFeature.setStyle(iconStyle);
		features.push(iconFeature);
	}
	return features;
}

const view = new View({
	center: transform([19.85876455090402, 45.08801265971454], 'EPSG:4326', 'EPSG:3857'),
	zoom: 12
});

const layer = new VectorLayer({
	source: new VectorSource({
		format: new GeoJSON(),
		url: granice,
		features: create_features(place),
	}),
	style: new Style({
		stroke: new Stroke({
			color: 'red',
			width: '2rem',
		}),
	}),
});

const create_map = (target_div, popup_div) => {
	let map = new Map({
		view: view,
		layers: [
			new TileLayer({
				source: new OSM()
			}),
			layer,
		],
		target: target_div
	});


	return [map, layer];
};

export default create_map;

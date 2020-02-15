import React from 'react';
import mapboxgl from 'mapbox-gl';
import './RaceMap.css';
import data from './data/race_track.json'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

class RaceMap extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			lng: process.env.REACT_APP_INITIAL_LONG,
			lat: process.env.REACT_APP_INITIAL_LAT,
			zoom: process.env.REACT_APP_INITIAL_ZOOM
		};
	}
	componentDidMount() {
		const map = new mapboxgl.Map({
			container: this.mapContainer,
			style: 'mapbox://styles/mapbox/outdoors-v11',
			center: [this.state.lng, this.state.lat],
			zoom: this.state.zoom
		});

		map.on('move', () => {
			this.setState({
				lng: map.getCenter().lng.toFixed(4),
				lat: map.getCenter().lat.toFixed(4),
				zoom: map.getZoom().toFixed(2)
			});
		});

		map.on('load', () => {
      		map.addSource(
      			'race_route',
      			{
			        type: 'geojson',
					lineMetrics: true,
			        data: data
	      		}
      		);

      		map.addLayer(
      			{
			        id: 'race_route',
			        type: 'line',
			        source: 'race_route',
			        'layout': {
						'line-join': 'round',
						'line-cap': 'round'
					},
					"paint": {
						"fill-extrusion-color": "#f00",
						"fill-extrusion-base": 0.5,
						"fill-extrusion-opacity": 0.5,
						"fill-extrusion-height": ["get", "height"]
					}/*
					'paint': {
						'line-color': 'red',
						'line-width': 14,
						// 'line-gradient' must be specified using an expression
						// with the special 'line-progress' property
						'line-gradient': [
							'interpolate',
							['linear'],
							['line-progress'],
							0,
							'blue',
							0.1,
							'royalblue',
							0.3,
							'cyan',
							0.5,
							'lime',
							0.7,
							'yellow',
							1,
							'red'
						]
					}*/
				}
			);
		});
	}

	render() {
		return (
			<div>
				<div className='sidebarStyle'>
					<div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
				</div>
				<div ref={el => this.mapContainer = el} className="mapContainer"/>
			</div>
		);
	}
}
export default RaceMap;
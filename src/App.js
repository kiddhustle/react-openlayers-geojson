import React from 'react';

import Map from 'ol/Map';
import View from 'ol/View';
import { GeoJSON } from 'ol/format';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';

import { styleFunction } from './styles'
import countryFeatures from './data/generated.geo.json'

import './App.css';
import 'ol/ol.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    // refs 
    this.mapRef = React.createRef()
  }
  componentDidMount() {
    // const { countryFeatures } = this.props
    // create feature layer and vector source
    console.log(countryFeatures)
    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(countryFeatures),
    })

    const vectorLayer = new VectorLayer({
      style: styleFunction,
      source: vectorSource,
    });

    // create map object with feature layer
    const map = new Map({
      target: this.mapRef.current,
      layers: [
        //default OSM layer
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });


    // save map and layer references to local state
    this.setState({
      map: map,
      vectorLayer
    });
  }

  render () {
    return (
      <div ref={this.mapRef}  className="map" style={{height: '500px', width: '100%'}}> </div>
    );
  }
  
}

export default App;

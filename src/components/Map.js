/* global google */
import React, { Component } from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps'

const MapWithAMarker = withScriptjs(withGoogleMap(props =>

  <GoogleMap
    defaultZoom={8} 
    zoom={props.zoom}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    center={props.center}
    >

      {props.markers && 
        props.markers.filter(marker => marker.isVisible).map((marker, index, arr) => {

                      const venueInfo = props.venues.find( venue => venue.id === marker.id)

                      return <Marker 
                      key={index} 
                      position={{ lat: marker.lat, lng: marker.lng }} 
                      onClick={() => props.handleMarkerClick(marker)}
                      animation={arr.length === 1 ? google.maps.Animation.BOUNCE :  google.maps.Animation.DROP}
                      >
                      { marker.isOpen && venueInfo.bestPhoto && (
                       <InfoWindow>
                        <React.Fragment>
                          <img src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`} 
                               alt={'Venue Image'}/>
                          <p>{venueInfo.name}</p>
                        </React.Fragment>
                       </InfoWindow>
                     )}
                     </Marker>
                    
        })}

  </GoogleMap>
  
  ))


export default class Map extends Component {
  render() {
    return (
    	<MapWithAMarker
      {...this.props}
		  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB1mlGKJdOp_dmmbkF4AtGcaaUBUHQpvJ4&v=3.exp"
		  loadingElement={<div style={{ height: `100%` }} />}
		  containerElement={<div style={{ height: `100%`, width: `75%` }} />}
		  mapElement={<div style={{ height: `100%` }} />}
		/>

    	)
   }
}
import React, { Component } from 'react'
import Map from './components/Map'
import SideBar from './components/SideBar'
import './App.css'
import SquareAPI from './API/'

export default class Home extends Component {
	constructor() {
		super()
		this.state = {
			venues: [],
			markers: [],
			center: [],
			zoom: 12,
			updateSuperState: obj => {
				this.setState(obj)
			}
		}
	}
	closeAllMarkers = () => {
		const markers = this.state.markers.map(marker =>{
			marker.isOpen = false
			return marker
		})
		this.setState({markers: Object.assign(this.state.markers,markers)})

	}

	handleMarkerClick = (marker) => {
		this.closeAllMarkers()
		console.log(marker)
		marker.isOpen = true
		this.setState({markers: Object.assign(this.state.markers, marker)})
		const venue = this.state.venues.find(venue => venue.id === marker.id)
		//console.log(venue, 'Single Venue')
		//SquareAPI.getVenueDetails(marker.id).then(res => console.log(res))
		SquareAPI.getVenueDetails(marker.id).then(res => {

			const newVenue = Object.assign(venue, res.response.venue)
			this.setState({venues: Object.assign(this.state.venues, newVenue)})
			console.log(newVenue)
		})
	}

	handleListItemClick = venue => {
		console.log(venue)
		const marker = this.state.markers.find(marker => marker.id === venue.id)
		this.handleMarkerClick(marker)
	}

	componentDidMount() {
		SquareAPI.search({

			near:'Austin,TX',
			query: 'tacos',
			limit: 10
			}).then(results => {
				const {venues} = results.response
				const {center} = results.response.geocode.feature.geometry
				const markers = venues.map(venue => (
					
					{
						lat: venue.location.lat,
						lng: venue.location.lng,
						isOpen: false,
						isVisible: true,
						id: venue.id
					}

				))
				

				this.setState({ venues, center, markers })	
				console.log(markers)
			})		
	}
	
  	render() {
  		return (
		    <div className="App">

			    <SideBar {...this.state} handleListItemClick={this.handleListItemClick} />
			    <Map {...this.state} handleMarkerClick={this.handleMarkerClick}/>
			    
		    </div>
		  )
  	}
}


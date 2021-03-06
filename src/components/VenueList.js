import React, { Component } from 'react'
import ListItem from './ListItem'
import './VenueList.css'

export default class VenueList extends Component {

	render() {
		return (
				<ol className='venueList'>
					{this.props.venues &&
					 this.props.venues.map( (venue, index) => (
							<ListItem key={index} {...venue} role="listbox" handleListItemClick={this.props.handleListItemClick}/>
						))}

				</ol>
			)
	}

}
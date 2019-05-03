class Helper {
	static baseURL() {
		return 'https://api.foursquare.com/v2'
	}

	static auth() {
		const keys = {

			client_id: 'NVISNBIMGPCRXYTLGVLXEJQHXXE50NPOQWYNMVV5HJKMSCO1',
			client_secret: 'OAICADRVGLB5YYGJSKAZBQTUCNWV5W1HOGHZVSPFQ0BJLNG5',
			v: '20190502'
		}

		return Object.keys(keys)
					 .map( key => `${key}=${keys[key]}`)
					 .join('&')
			
	}

	static headers() {
		return {
			Accept: 'Application/json'
		}
	}

	static urlBuilder(urlPrams) {
		if(!urlPrams){
			return ''
		}
		return Object.keys(urlPrams)
					 .map( key => `${key}=${urlPrams[key]}`)
					 .join('&')

	}

	static simpleFetch(endPoint,method,urlPrams) {
		let requestData = {
			method,
			headers: Helper.headers()
		}

		return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlPrams)}`,
			   requestData
			   ).then(res => res.json())

	}
}

export default class SquareAPI {
	static search(urlPrams) {
		return Helper.simpleFetch('/venues/search','GET', urlPrams)
	}

	static getVenueDetails(VENUE_ID) {
		return Helper.simpleFetch(`/venues/${VENUE_ID}`, 'GET')

	}

	static getVenuePhotos(VENUE_ID){
		return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, 'GET')

	}


}

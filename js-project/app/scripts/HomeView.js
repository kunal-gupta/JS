import API_KEY from './API_KEY';

class HomeView extends Backbone.View {

	initialize () {
		this.template = $('script[name="home"]').html();
	}

	render () {
		
		this.renderData();
		return this;
	}
	
	/**
	*This method renders the data after calling this url
	*/
	renderData(){
		var link = "https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key="+API_KEY;
		fetch(link, { headers: { "Content-Type": "application/json; charset=utf-8" }})
		.then(res => res.json()) // parse response as JSON (can be res.text() for plain response)
		.then(response => {
			this.renderTable(response);
		})
		.catch(err => {
			alert("sorry, there are no results for your search")
		});
	}
	
	/**
	*Rendring table on provided json object returned from NASA url
	*/
	renderTable(json){
		var templateString = this.createTemplateString();
		var templateTable = _.template(templateString);
		this.$el.html(templateTable({"values": Object.values(json.near_earth_objects)}));
	}
	
	/**
	*This method returns template string
	*/
	createTemplateString(){
		var templateString = `
		<table class="table table-responsive table-striped table-bordered">
			<thead>
			<tr>
				<th>id</th>
				<th>neo_reference_id</th>
				<th>name</th>
				<th>nasa_jpl_url</th>
				<th>absolute_magnitute_h</th>
				<th colspan="2" style="text-align:center;">estimated_diameter(kilometer)</th>
			</tr>
			<tr>
				<th colspan="5"></th>
				<th>estimated_diameter_max</th>
				<th>estimated_diameter_min</th>
			</tr>
			</thead>
			<% _(values[0]).each(function(value) { %> 
				<tbody>
				<tr>
					<td><%-value.id%></td>
					<td><%-value.neo_reference_id%></td>
					<td><%-value.name%></td>
					<td><%-value.nasa_jpl_url%></td>
					<td><%-value.absolute_magnitude_h%></td>
					<td><%-value.estimated_diameter.kilometers.estimated_diameter_max%></td>
					<td><%-value.estimated_diameter.kilometers.estimated_diameter_min%></td>
				</tr>
				</tbody>
			<% }); %> 
		</ul>`;
		
		return templateString;
	}

}


export default HomeView;
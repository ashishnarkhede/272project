
function getvisualizationData(jsonData){
			
			 var dataArray = [];
			 
		     geodata = new google.visualization.DataTable();
				    
			 geodata.addColumn("string", "State");
			 geodata.addColumn('number', 'Event Count');
			 	 
			      /* for loop code for changing inputdata to 'data' of type google.visualization.DataTable*/
			      $.each(jsonData, function(i,obj){
			   
			    	  var state = $.trim(obj.name);
			    	  
			    	  //googlecharts barchart using jquerygooglecharts barchart using jquery
			    	dataArray.push([state, obj.count]);
			      });
			      
			     geodata.addRows(dataArray);
			     
			     return geodata;
			}
			

function getOptionForGeochart(){
	
	  var options = {
			  
			  displayMode: "markers",
			  region: '019',
			  colorAxis: {colors: ['green', 'blue']},
			  
			  magnifyingGlass:{enable: true, zoomFactor: 7.5}

   		 };
	return   options;		 
	}


function chartReadyHandler()
{
	$('#preloader').hide();
}


function drawGeoChart(inputdata) {
	
    geoOptions = getOptionForGeochart(),

    data = getvisualizationData(inputdata),
    
    geochart = new google.visualization.GeoChart(document.getElementById('geo-chart'));
  
    google.visualization.events.addListener(geochart, 'ready', chartReadyHandler);

    
    geochart.draw(data, geoOptions);

   //getPieChartData();
    
/*for redrawing the bar chart on window resize*/
$(window).resize(function () {
	
  geochart.draw(data, geoOptions);
});

}

	function getGeoData(){
			
			$.ajax({
			
				url: "GeoStatistics",
				
				dataType: "JSON",
					
				success: function(data){	
	
					drawGeoChart(data);
				}
			});
	}//getjosndat



google.load("visualization", "1", {packages:["corechart"]});


$(document).ready(function(){
	
	getGeoData();
	
});
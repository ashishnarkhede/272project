var dataArray = [];


function getBubbleData()
{
	$.ajax({
		
		type: "GET",
		
		datatype: "JSON",
		
		url : "StatsbyLightCondition",
		
		success: function(response)
		{
			drawBubbleChart(response);
		},
		error: function()
		{
			alert("alert: "+response);
		}
		
	});
	
}

function drawBubbleChart(data) {
 	
	var bubbleData;
	var bubbleArray = [];
	
	bubbleData = new google.visualization.DataTable();
	
	bubbleData.addColumn("string", "Light_Condition");
    bubbleData.addColumn("number", "Year");
    bubbleData.addColumn("number", "Injury");
    bubbleData.addColumn("string","Damage");
    
    
     
	    $.each(data, function(i, obj){

	     	bubbleArray.push([obj.light_cond, obj.ev_year, obj.fatalities, obj.damage]);
	   
	        });
      
   
    bubbleData.addRows(bubbleArray);
    
	var chart = new google.visualization.BubbleChart(document.getElementById('bubble_chart'));

	var options = {
			  
	          title: 'Correlation between light conditions and aircraft damage', titleTextStyle: {color: 'black', fontName: "Times New Roman", fontSize:21},
	          hAxis: {title: "Year", baselineColor:"black", titleTextStyle: {color: 'black', fontName: "Times New Roman", fontSize:20}, viewWindow: {min: 1980, max: 2014}},
	          vAxis: {title: "Injury", baselineColor:"black", titleTextStyle: {color: 'black', fontName: "Times New Roman", fontSize:20} ,viewWindow: {min: 0, max: 1600}},	          
	          bubble: {textStyle: {fontSize: 11, color:"Black"}, opacity:0.75},
	          backgroundColor: "transparent",
	          tooltip:  {textStyle: {color: 'Black'}, showColorCode: true, trigger: 'focus'},
		      legend:{textStyle:{color:'black', fontName:'Times New Roman', fontSize:12}},
		      colors:['#FF0000',"#FF00FF",'#0000FF', "#00FF00", "#6600CC"]
		    
	        };

	
	
    chart.draw(bubbleData, options);

}



google.load("visualization", "1", {packages:["corechart"]});

$(document).ready(function(){

	getBubbleData();

});



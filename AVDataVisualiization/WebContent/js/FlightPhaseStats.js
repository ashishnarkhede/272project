
var phase;

var chart;


function getFlightPhaseStats()
{
	$('#loader1').show();
	
	$.ajax({
		
        type: "GET",
		
		url: "FlightPhaseStatistics",
		
		datatype: "JSON",
			
		success: function(response){ drawPhaseStatsPie(response);	},
		
        error: function(response){
        	alert("Error "+response);
        },

	});
}


function drawPhaseStatsPie(data)
{
	
	  var container = document.getElementById("pie-div");
	
		Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
		    return {
		        radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
		        stops: [
		            [0, color],
		            [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
		        ]
		    };
		});
	  
   var options = {
	
		   chart: { renderTo: container,
			   options3d: {
					enabled: true,
	                alpha: 35,
	                beta: 0
	            }
		        },
			      
		   title:{text:"Accident count by flight phase"},
		      
		
	        
		   tooltip: {
			    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			        },
			        plotOptions: {
		                pie: {
		                    allowPointSelect: true,
		                    cursor: 'pointer',
		                    dataLabels: {
		                        enabled: true,
		                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		                        style: {
		                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                        },
		                        connectorColor: 'silver'
		                    }
		                }
		            },
		            
		            plotOptions: {
		                pie: {
		                    allowPointSelect: true,
		                    cursor: 'pointer',
		                    depth: 45,
		                    dataLabels: {
		                        enabled: true,
		                        format: '{point.name}'
		                    }
		                }
		            },   
		            
		   series:[{
			        name:"Accident count by flight phase",
		            type:"pie",
		            title:'Flight Phase Stats',
			        data:[]
		   }]
   };
   
   
   var piedata=[];
   
   $.each(data, function(i, obj){
	 
	   piedata.push([obj.flight_phase, obj.event_count]);
	   
   });
   var piechart = new Highcharts.Chart(options);
   
   piechart.series[0].setData(piedata);
   
   $('#loader1').hide();
   
   piechart.redraw();
   
   $('#ddlPhase').show();
	

}//function


function getFlightPhaseSpecStats()
{
	
	$.ajax({
		
        type: "GET",
		
		url: "AccidentCountbyFlightPhase",
		
		datatype: "JSON",
			
		success: function(response){ drawPhaseStatsOverYears(response);	},
		
        error: function(response){
        	alert("Error "+response);
        },

	});
	
	
}

function getDetailedPhaseStats(phase)
{
	//alert(phase);
	$('#loader2').show();
	
	 $.ajax({
		
		 type:"POST",
		 
		 url: "AccidentCountbyFlightPhase",
		
		 data:"phase="+phase,
		 
		datatype: "JSON",
				
		success: function(response){ getFlightPhaseSpecStats();	},
			
	    error: function(response){
	        	alert("Error "+response);
	        },

	 });

}


function drawPhaseStatsOverYears(data)
{
	
	var $col_container = $('#column-chart'); 
	 
	 var options = {
		
			 chart:{renderTo:$col_container[0], 
				  
				    },
		 
				    colors:['#0A0A2A'],
			        
			 title:{ text:'Accident count by Flight Phase - '+phasename},
			 
			 xAxis:{ title: {text: 'Years',
				 
				 type: 'datetime',
                 dateTimeLabelFormats: {
                 day: '%e of %b'}
			    },
				     
				     labels:{
				    	 
				    	 rotation: -90,
				    	 align:'right',
				    	 style:{
				    		 fontSize: '13px',
		                        fontFamily: 'Verdana, sans-serif'
				    	 }
				     }
				
			       },
			       
			 yAxis:{ title: {text: 'Accident count'},
				     
				     min:0, max:200
			       },
			  
			 series: [{
				        data:[],
				       // name: 'Accident count by Flight Phase'
			 }]
	 };
	 

     var linedata = [];
     var cat = []; 
     
        $.each(data, function(i, obj)
    			{
        	       cat.push(obj.ev_year);
        	       linedata.push(obj.count);
    			});
    
       
         
    var chart = new Highcharts.Chart(options);
    chart.series[0].name = 'Accident count over years by Flight Phase'; 
    chart.series[0].setData(linedata);
    chart.series[0].name="Accident count by Flight Phase - "+phasename;
    chart.xAxis[0].update({categories:cat}, true);
  
    $('#loader2').hide();
      
    chart.redraw();
   
}



$(document).ready(function(){
	
	$('#loader2').hide();
	
	$("#sel_phase").val("---Select---");
	
	$("#sel_phase").change(function()
	     		{
	     		
	     			phase = $("#sel_phase").val();
	     			phasename = $('#sel_phase option:selected').text();
	     			
	     			if(phase!= "---Select---")
	     			{
	     				getDetailedPhaseStats(phase);
	     			}
	     		});
	 
	 $('#ddlPhase').hide();
	
	
	getFlightPhaseStats();
	
});
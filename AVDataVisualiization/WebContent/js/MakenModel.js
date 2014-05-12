
var barchart, piechart, barOptions, bardata, make, state, lineOptions, linechart;

	
	
		
		
		function getFatalitiesbyMake(){
			
			$.ajax({
			
				url: "FatalitiesbyMakenModel",
				
				dataType: "JSON",
					
				success: function(data){	
	
				
					drawMakeModelColumnChart(data);
					
				}
			});
	}//getjosndata

		
		
	// selct handler for barchart columns
	      function selectHandler(){
    	 
		  var selectedItem = barchart.getSelection()[0];
           if (selectedItem) 
           {
             make = bardata.getValue(selectedItem.row, 0);
            // alert('The user selected ' + make);
             //getPieChartData();
             
             getPiebyModel(make);
           }
      }
	
	      //Post call to servlet to set the  n make
	      
	      function getPiebyModel(make)
	         {
	        	 $.ajax({
	        		
	        		 type: "POST",
	        		 url:  "FatalitiesbyModel", 
	        		
	        		 data: "make="+make,
	        		 datatype: "JSON",
	        		 success: function(response)
	        		 {
	        			// alert(response);
	        			 getPieChartData();
	        		 },
	        		 
	        		 error: function(response)
	        		 {
	        			 alert("Error..."+response);	        				
	        		 }	        			 
	        	 });
	         }
	
	      //Get call to servlet to retreive data
	      
         function getPieChartData()
         {
        	$.ajax({
        		
        		url: "FatalitiesbyModel",
        		
        		datatype: "JSON",
        		
        		success: function(data){
        			
        			drawMakeStatsPie(data);
				}
        		
        	});
         }
	
         
         function doSomething(make)
         {
        	 //alert(categ);
        	 getPiebyModel(make);
         }
                
        function drawMakeStatsPie(data)
        {
        	
        	  var container = document.getElementById("pie-chart");
        	
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
        	                alpha: 30,
        	                beta: 0
        	            }
        		        },
        			      
        		   title:{text:"Fatalities percentage by Aircraft Models for Make "+make},
        		      
        		   colors:['#FF0000', '#0000FF', '#8A0829', '#DF013A', '#610B0B', '#01DF01', '#00BFFF', '#BF00FF', '#FF4000'],
        	        
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
        		                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
        		                            fontSize:'15px'
        		                        },
        		                        connectorColor: 'silver'
        		                    }
        		                }
        		            },
        		            
        		            plotOptions: {
        		                pie: {
        		                    allowPointSelect: true,
        		                    cursor: 'pointer',
        		                    depth: 65,
        		                    dataLabels: {
        		                        enabled: true,
        		                        format: '{point.name}'
        		                    }
        		                }
        		            },   
        		            
        		   series:[{
        			        name:"Fatalities %",
        		            type:"pie",
        		            
        			        data:[]
        		   }]
           };
           
           
           var piedata=[];
          
           
           $.each(data, function(i, obj){
        	 
        	   piedata.push([obj.model, obj.fatalities]);
        	   
           });
           var piechart = new Highcharts.Chart(options);
           
           piechart.series[0].setData(piedata);
                     
           piechart.redraw();
           
           $('#piedesc').show();

        }//function
        
  
        function drawMakeModelColumnChart(data)
		 {
			var $col_container = $('#bar-chart'); 
			 
			 var options = {
				
					 chart:{renderTo:$col_container[0], 
						    type: 'column',
							
						    },
				 
						    title:{ text:'Fatalities count over years for aircraft make'},
				
						    plotOptions: {
				                column: {
				                    colorByPoint: true
				                }
				            },
				            colors: [
				                '#ff0000',  
				                '#0000FF',
				                '#01DF01',
				                
				            ],
				            
				           
					 
					 xAxis:{ title: {text: 'Aircraft Make', style:{color:'#000000', fontSize:'18px'}},
						     
						     labels:{
						    	 
						    	 rotation: 90,
						    	// align:'right',
						    	 style:{
						    		    color:'#000000',
						    		    fontSize: '10px',
				                        fontFamily: 'Verdana, sans-serif'
						    	 }
						     }
						     
						},
					       
						
						 plotOptions: {
				                series: {
				                    cursor: 'pointer',
				                    point: {
				                        events: {
				                            click: function() {
				                            	make=this.category;
				                                doSomething(this.category);
				                            }
				                        }
				                    }
				                }
				            },
				            
					 yAxis:{ title: {style:{color:'#000000', fontSize:'18px'}, text: 'Fatalities count'}, 
						    type: 'logarithmic',
						    min:50, max:16000
					       },
					  
					 series: [{
						        data:[],
						        name: 'Fatalities count according to aircraft make',
						        dataLabels: {
				                    enabled: true,
				                    rotation: -90,
				                    color: '#FFFFFF',
				                    align: 'right',
				                    x: 4,
				                    y: 10,
				                    style: {
				                        fontSize: '13px',
				                        fontFamily: 'Verdana, sans-serif'
				                    }
				                }
					 }]
			 };
			 
			 
			 var chartdata = [];
			 var categ = [];
			 var statenames = [];
			 
		 $.each(data, function(i, obj){
				 
				 chartdata.push([obj.make, obj.total_fatalities]);
				 categ.push((obj.make).substring(0,10));
				 statenames.push(data);
			  });
			 
		    	 
		 
			 var col_chart = new Highcharts.Chart(options);
	
	         col_chart.series[0].setData(chartdata);
			 col_chart.xAxis[0].update({categories:categ}, true);
			 col_chart.redraw();
			 
		 }//function
        
$(document).ready(function(){

	$('#piedesc').hide();
	getFatalitiesbyMake();
	
});



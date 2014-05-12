
var state, statename,lineOptions, lineChart;

        		//post call to servlet 

        		function getLineChartbyState()
        		{ 
        			$('#loader2').show();
        			
        			
        			$.ajax({
        				
        				type: "POST",
        				
        				url: "FatalitiesTrendforSpecState",
        				
        				data: "state="+state,
        				
        				datatype: "JSON",
        				
        				success: function(response)
        			        		 {
        			        			 //alert("Response:" +response);
        			        			 getLineChartData();
        			        		 },
        			        		 
        			    error: function(response)
        			        		 {
        			        			 alert("Error..."+response);	        				
        			        		 }
        				
        				});
        		}

        		function getLineChartData()
        		{
        			$.ajax({
        				
        				type: "GET",
        				
        				url: "FatalitiesTrendforSpecState",
        				
        				datatype: "JSON",
        				
        				success: function(response)
        			        		 {
        			        			 //alert(response);
        					             drawHighLineChart(response);
        			        			// drawLineChart(response);
        			        		 },
        			        		 
        			        		 error: function(response)
        			        		 {
        			        			 alert("Error..."+response);	        				
        			        		 }
        				
        				});
        		};


        		function drawLineChart(linedata)
        		{
        			var lineData;
        			var lineArray = [];
        			
        			lineData = new google.visualization.DataTable();
        			lineData.addColumn("string","Year");
        			lineData.addColumn("number","Fatalities");
        			
        			
        			$.each(linedata, function(i, obj)
        			{
        			   lineArray.push([(obj.year), obj.fatalities]);
        			});
        			
        			var yearscale = [];
        			
        			for(var i=1980; i<2015; i++)
        		    {
        				yearscale.push(i);
        		    }
        			
        			
        		
        			lineOptions = {   fontSize:18,
        				             'title':'Fatalities by Year for state - '+statename,
        				             titleTextStyle: {color: 'white', fontName: "Times New Roman", fontSize:18},
        				              colors: ['white'],
        				             hAxis: {title: 'Year----------->', 
        					        	    titleTextStyle: {color: 'white', fontName: 'Times New Roman', fontSize:15},
        					        	    ticks: yearscale,
        						            gridlines: {color:"white"},
               					            slantedText: true,
               					            slantedTextAngle:90,
               					            baselineColor: "white"
               					            
        				                   },
        				                   
        					         vAxis: {
        					        	     logScale: true , 
        					          	     title: 'Fatalities---------->',
        					          	     titleTextStyle: {color: 'white', fontName: 'Times New Roman', fontSize:15},
        					          	     minValue:20,
        					          	     maxValue:800,
        					          	     gridlines: {color:"white"}
        					               },
        					               
        					         orientation: 'horizontal',
        					         backgroundColor: { fill: "transparent" },
        					         legend:{textStyle:{color:'white', fontName:'Times New Roman', fontSize:12}},
        					         
        				          };
        			
        			
        			lineData.addRows(lineArray);
        			
        			var line_chart = document.getElementById('line-chart');
        			
        			
        			 var elem = '<div width="80%" style="float:auto; margin-bottom:20px; position:relative" id="'+state+'">';
        		     
        		     $(line_chart).append($(elem));
        			
        			
        			linechart = new google.visualization.LineChart(document.getElementById(state));
        			
        			linechart.draw(lineData, lineOptions);
        		}

        	
        		 function drawHighLineChart(highdata)
		           {
		
		        			var line_chart = document.getElementById('line-chart');
		        			
		        		//	 var elem = '<div width="80%" style="float:auto; margin-bottom:20px; position:relative" id="'+state+'">';
		        		     
		        		  //   $(line_chart).append($(elem));
		        		     
		        		   //  var container = document.getElementById(state);
		        		    
		        var options = {
		      
		        		   chart:{renderTo: line_chart},
		        		
		        		   colors:['#BFFF00'],
		        		   
		        		   title: {
		                       text: 'Fatalities over year for state - '+statename
		                      
		                   },
		                 
		        		
		                   
		               yAxis:{title:{text:"Total Fatalities", style:{color:"yellow", fontSize:'18px'}}},
		            
		               xAxis:{    
		            	      title:{text:"Year", style:{color:"yellow", fontSize:'18px'}}
		            	     },
		                
		                series: [{
		                    data:[],
		                    name: 'Fatalities by State over years'
		                }]
		            
		        };

		     var data = [];
		     var cat = []; 
		     
		        $.each(highdata, function(i, obj)
	        			{
		        	       cat.push(obj.year);
		        	       data.push(obj.fatalities);
	        			});
		    
		       
		     
		    var chart = new Highcharts.Chart(options);
		    chart.series[0].name = 'Fatalities over years by state'; 
		    chart.series[0].setData(data);
		    chart.xAxis[0].update({categories:cat}, true);
		    chart.redraw();
		    
		    $('#loader2').hide();;
		}//function

        		
        
        		 
        		
        function compareStatesChart()
        {
        	$.ajax({
        		
        		type:"GET",
        		
        		url:"FatalitiesStatsbyYearnState",
        		
        		datatype: "JSON",
        		
        		success: function(response){
        			
        		drawHighColumnChart(response);
        		
        		},
        		
        		error:function(response)
        		{
        			alert("Error..."+response);
        		}
        	
        	});
        		 
        }
        		 
        
		 
		 function drawHighColumnChart(data)
		 {
			var $col_container = $('#bar-chart'); 
			 
			 var options = {
				
					 chart:{renderTo:$col_container[0], 
						    type: 'column',
						    },
				 
					        
					 title:{ text:'Fatalities in US states from 1980 to 2013'},
					 
				       colors: ['#0000FF'
				            ],
					 
					 
					 xAxis:{ title: {text: 'States',  style:{color:'#FFFF00', fontSize:'20px'}},
						     type: 'category',
                             labels:{
						    	 
						    	 rotation: -90,
						    	 align:'right',
						    	 style:{
						    		 fontSize: '15px',
				                        fontFamily: 'Verdana, sans-serif'
						    	 }
						     }
						     
					 },
						     
					
					 yAxis:{ title: {text: 'Fatalities count', style:{color:'#FFFF00', fontSize:'20px'}},
						     
						     min:50, max:1800
					       },
					  
					 series: [{
						        data:[],
						        name: 'Fatalities count in US states'
					 }]
			 };
			 
			 
			 var chartdata = [];
			 var categ = [];
			 
			 
		 $.each(data, function(i, obj){
				 
				 chartdata.push([obj.ev_state, obj.fatalities]);
				 categ.push(obj.ev_state);
				 
			  });
			 
		    	 
		 
			 var col_chart = new Highcharts.Chart(options);
	
	         col_chart.series[0].setData(chartdata);
			 col_chart.xAxis[0].update({categories:categ}, true);
			 col_chart.redraw();
			 
              $('#preloader').hide();
			  
			 $('#Select_states').show();
			 
		 }//function
		 
        
	
		 
  /*      function drawCompareStatesChart(data)
        {
             var dataArray = [];
			 
		     var bardata = new google.visualization.DataTable();
			
		     var options = {
		    		 
					    title: 'Fatalities by States over years',
					    titleTextStyle: {color: 'white', fontName: 'Times New Roman', fontSize:19},
				        hAxis: {title: 'State----------->', 
				        	    titleTextStyle: {color: 'white', fontName: 'Times New Roman', fontSize:16} 
			                   },
				        vAxis: {logScale: true , 
				          	    title: 'Fatalities---------->',
				          	    titleTextStyle: {color: 'white', fontName: 'Times New Roman', fontSize:16} 
				               }, 
				        bar: {groupWidth: "95%"},
                     backgroundColor: { stroke: '#white',
                         strokeWidth: 3,
                         fill: 'transparent'},
                     colors:['#00CCFF'],
       		      legend:{textStyle:{color:'white', fontName:'Times New Roman', fontSize:12}}
       	
		     		 };
	     
			 bardata.addColumn("string", "State");
			 bardata.addColumn('number', 'Fatalities');
			 	 
			       $.each(data, function(i,obj){
			   
			       dataArray.push([obj.state, obj.fatalities]);
			    	   
			   });
			      
			     bardata.addRows(dataArray);
			
			    var barchart = new google.visualization.ColumnChart(document.getElementById('bar-chart'));
			        
			    barchart.draw(bardata, options);

			    dynamicDDL(data);
        }*/

        
        
        function dynamicDDL(data)
        {

        	$ddlStatediv = $('#ddlStatediv');
        	
        	$ddlStatediv.append('<select id='+"sel_states"+' style='+"margin-top:5px; margin-bottom:20px; margin-left:15px;"+' class='+"styled-select>");
        	
        	$ddlState = $('#sel_states');
        	
		    $ddlState.append('<option>---Select---</option>');
		    
		    $.each(data, function(i, obj){
		    	
		    	$ddlState.append('<option value='+obj.ev_state+'>'+obj.name+'</option>');
		    });
        	
        }

        		 
google.load("visualization", "1", {packages:["corechart"]});

$(document).ready(function(){
	
	$('#loader2').hide();
	
	 $("#sel_states").change(function()
	     		{
	     		
	     			state = $("#sel_states").val();
	     			statename = $('#sel_states option:selected').text();
	     			
	     			if(state!= "---Select---")
	     			{
	     				getLineChartbyState(state);
	     			}
	     		});
	 
	 $('#Select_states').hide();
	 
	compareStatesChart();

});
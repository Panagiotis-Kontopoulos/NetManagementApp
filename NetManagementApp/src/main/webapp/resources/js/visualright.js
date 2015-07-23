        var userID='';
        var startDate='';
        var endDate='';
        var minDate=null;
        var maxDate=null;
        var matcherA = /[^a-zA-Z]/g;
	    var matcherN = /[^0-9]/g;
        var submittedChoice = 0;
        
function sortAlphaNum(a,b) {
	
      	  var tempA = a.replace(matcherA, "");
      	  var tempB = b.replace(matcherA, "");
      	  if(tempA === tempB) 
      	  {
      		  var aN = parseInt(a.replace(matcherN, ""), 10);
      	  	  var bN = parseInt(b.replace(matcherN, ""), 10);
      	  	  return aN === bN ? 0 : aN > bN ? 1 : -1;
      	  }
      	  else 
      	  {
      	  		return tempA > tempB ? 1 : -1;
      	  }
}        
        
function options(data) {
   	
	/*In this function we return the available users */
		  var arr = [];
		 
		  
		  clickableMenuVisual(0, 1);
		  var header = $('<h2 id="headerTagId"></h2>').text('Available Users');
		  $('#headerTag').append(header);
		  
          var table = $('<table id="tableID"></table>');
         
		
          $.each(data,function(i,item){ 
        	arr.push(item);  
          })
      
          arr.sort(sortAlphaNum);
		     
		     $.each(arr,function(i,item) {
		    	 
        	  row = $('<tr></tr>');
              var rowData = $('<td></td>').text(item);
              row.append(rowData);
              table.append(row);
        	  
          });
          
 		
        if ($('#tableID').length) {
             $("#usersTable tr:first").after(row);
             console.log("Table created (if)");
        }
        else {
            $('#usersTable').append(table);
            console.log("Table created (else)");
        }
        
        
        
        
		var parent = document.querySelector('#usersTable');
		
		$("#userSel").show();
        
        parent.addEventListener('click', function(e){
        	$("#popupText").text("Are you sure you want to monitor " + e.target.innerHTML.toLowerCase()+ " ?");
        	$("#divpopup").dialog({
				title: "User Selected",
				width: 430,
				height: 200,
				modal:true,
				
				buttons: {
					YES: 
						function(){
						$(this).dialog('close');
						var elem = document.getElementById("User");
						elem.value = e.target.innerHTML.toLowerCase();
						userID = e.target.innerHTML.toLowerCase();
						},
					NO:
						function(){
						$(this).dialog('close');
						
						}
				}
				});
          //console.log("You clicked row " + e.target.innerHTML.toLowerCase());
        });
        
        
    	
    
    	    
    	var addUserBtn = $('<button id="addUserBtn" type="submit" class="btn btn-default"></button>').text('Show TimeLine');
        $('#userSel').append(addUserBtn);

        var submitUser = document.getElementById("addUserBtn");
        submitUser.addEventListener('click',function(e){
        	 if(document.getElementById('User').value == '') {
        		 alert("Please fill user field");
             }
        	 else {
        		 userID = document.getElementById('User').value;
        		 var out = getAvUserDates(userID);
        		 //console.log('out',out);
        		 if(out == "success"){
        			 datePicker();
        		 }
        	 }
        	
        })
        
        
           
}



function enableSpecificDates(date) {
	var m = date.getMonth();
	var d = date.getDate();
	var y = date.getFullYear();
	var currentdate = new Date(y,m,d);

	if(currentdate >= minDate && currentdate <= maxDate)
	{	
		//console.log('currentdate is ok',currentdate);
		//console.log('minDate',minDate);
		//console.log('maxDate',maxDate);
		return [true];
	}
	else
		return [false];
}




function datePicker() {
	//alert('datePicker');
	var strTime = '';
	var splitter = '';
	var splitter1 = '';
	var splitter2 = '';
	strTime = sessionStorage.getItem('timeframe');
	var splitter = strTime.split('#');
	var splitter1 = splitter[0].split(' ');
	var splitter2 = splitter[1].split(' ');
	minDate = new Date(splitter1[0]);
	maxDate = new Date(splitter2[0]);
	
	//console.log('minDate(string)',splitter1[0]);
	//console.log('maxDate(string)',splitter2[0]);
	
	//console.log('minDate(Date)',new Date(splitter1[0]));
	//console.log('maxDate(Date)',new Date(splitter2[0]));
	
	
	$( "#from" ).datepicker({
	      changeMonth: true,
	      numberOfMonths: 1,
	      dateFormat: "yy-mm-dd",
	      beforeShowDay: enableSpecificDates,
	      onClose: function( selectedDate ) {
	    	 
	        $( "#to" ).datepicker( "option", "minDate", selectedDate );
	        startDate = selectedDate;
	        console.log(' startDate: ' + startDate);
	      }
	    });
	    $( "#to" ).datepicker({
	      changeMonth: true,
	      numberOfMonths: 1,
	      dateFormat: "yy-mm-dd",
	      beforeShowDay:enableSpecificDates,
	      onClose: function(selectedDate ) {
	    	  //var end =selectedDate.split("/").reverse().join("-"); 
	        $( "#from" ).datepicker( "option", "maxDate", selectedDate );
	        endDate = selectedDate;
	        console.log(' endDate: ' + selectedDate);
	      }
	    });
	
	    $("#timeline").show();
	    var submitChoiceBtn = $('<button id="btnIdSub" type="submit" class="btn btn-default"></button>').text('Submit Choice');
	    $('#closer').append(submitChoiceBtn);
	    var closeBtn = $('<button id="btnId" class="btn btn-default"></button>').text('Close');
	    $('#closer').append(closeBtn);
	    
		var tooltipDate = "[ " + splitter1[0] + " - " + splitter2[0] + " ]" ;
	    document.getElementById('User').title=tooltipDate;	
	
	var submit = document.getElementById("btnIdSub");
    submit.addEventListener('click',function(e){
 	 if(document.getElementById('User').value == '' || document.getElementById('from').value=='' || document.getElementById('to').value=='')
     {
 		 	alert("Please fill all the fields");
 	 }
 	 else
 	 {
 		//after choice enable other menu items
 		 console.log('user: ' + document.getElementById('User').value + ' startDate: ' + document.getElementById('from').value + ' endDate: ' + document.getElementById('to').value);
 		 userID = document.getElementById('User').value;
 		 startDate = document.getElementById('from').value;
 		 endDate = document.getElementById('to').value;
 		 
 		$("#popupText").text("Your choices: " + userID + " , " + startDate + " , " + endDate);
		   $("#divpopup").dialog({
				title: "Choice Submission",
				width: 430,
				height: 200,
				modal:true,
				buttons: {
					OK: 
						function(){
						$(this).dialog('close');
						
						}
					
					}
				});
		   
		  clickableMenuVisual(1, 2);
		  clickableMenuVisual(1, 3);
		  clickableMenuVisual(1, 4);
		  clickableMenuVisual(1, 5);
 		 //getApInfo();
 	 }
 	
 	 
    });
   
   
    var closer = document.querySelector('#btnId');
    closer.addEventListener('click',function(e){
	   var tab = document.querySelector('#tableID');
       var hTag = document.querySelector('#headerTagId');
       var showDate =  document.querySelector('#addUserBtn');
	   tab.parentNode.removeChild(tab); 
	   hTag.parentNode.removeChild(hTag);
	   closer.parentNode.removeChild(closer);
	   showDate.parentNode.removeChild(showDate);
	   submit.parentNode.removeChild(submit);
	   
	   var elem = document.getElementById("User");
	   elem.value = '';
	   elem = document.getElementById("from");
	   elem.value = '';
	   elem = document.getElementById("to");
	   elem.value = '';
	   $("#timeline").hide();
	   $("#userSel").hide();
	   clickableMenuVisual(1, 1);
	   clickableMenuVisual(0, 2);
	   clickableMenuVisual(0, 3);  
	   clickableMenuVisual(0, 4);
	   clickableMenuVisual(0, 5);

   });
	
}


function clickableMenuVisual(option, menuitem){
	//option 0 for disable, 1 for enable
	
	if(menuitem == 1) {
		
		if(option == 0){
			var link = document.getElementById('userLink');
			link.href="javascript:void(0);"
			link.style.color="grey";
		}
		else {
			var link = document.getElementById('userLink');
			link.href="javascript:getUsers();"
				link.style.color="#000";
				link.onmouseover= function(){this.style.color="red";}
				link.onmouseout = function(){this.style.color="#000";}
				
		}
		
	}
	else if(menuitem == 2) {
		if(option == 0){
			var link = document.getElementById('markersLink');
			link.href="javascript:void(0);"
			link.style.color="grey";
		}
		else {
			var link = document.getElementById('markersLink');
			link.href="javascript:getApInfo();"
				link.style.color="#000";
				link.onmouseover= function(){this.style.color="red";}
				link.onmouseout = function(){this.style.color="#000";}
				
		}
	
	}
	else if(menuitem == 3) {
		if(option == 0){
			var link = document.getElementById('polyLink');
			link.href="javascript:void(0);"
			link.style.color="grey";
		}
		else {
			var link = document.getElementById('polyLink');
			link.href="javascript:Polyline();"
				link.style.color="#000";
				link.onmouseover= function(){this.style.color="red";}
				link.onmouseout = function(){this.style.color="#000";}
				
		}
	}
	else if(menuitem == 4) {
		if(option == 0){
			var link = document.getElementById('graphLink');
			link.href="javascript:void(0);"
			link.style.color="grey";
		}
		else {
			var link = document.getElementById('graphLink');
			link.href="javascript:BatteryGraph();"
				link.style.color="#000";
				link.onmouseover= function(){this.style.color="red";}
				link.onmouseout = function(){this.style.color="#000";}
				
		}
	}
	else if(menuitem == 5) {
		if(option == 0){
			var link = document.getElementById('cellsLink');
			link.href="javascript:void(0);"
			link.style.color="grey";
		}
		else {
			var link = document.getElementById('cellsLink');
			link.href="javascript:Cells();"
				link.style.color="#000";
				link.onmouseover= function(){this.style.color="red";}
				link.onmouseout = function(){this.style.color="#000";}
				
		}
	}
	
}






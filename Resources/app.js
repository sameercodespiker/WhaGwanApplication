Ti.include('suds.js');
//joji
Ti.Database.install('InterestDB.sqlite', 'interest');

var AppStart = 'false';

var loginWin = Ti.UI.createWindow({
 	backgroundImage: 'bg.png',
    title: 'WHA GWAN',
    barImage : 'orange.png'
});

var event_title ="abc";
var intrestsSend = '';
/*var NavGroup = Ti.UI.iOS.createNavigationWindow({
	window: loginWin,
}); */


 
var events = Ti.UI.createWindow({
	backgroundImage: 'bg.png',
    title: 'WHA GWAN',
    barImage : 'orange.png',
    myvar: ''
});

var eventdetail = Ti.UI.createWindow({
	backgroundImage: 'bg.png',
    title: 'WHA GAWAN',
    barImage : 'orange.png',
    backButtonTitle: 'Events',
    myvar: 'sameer'
});


var drawer = Ti.UI.createWindow({
	left:0,
	top:0,
	width:180,
	borderColor: '#000000',
    backgroundColor: '#a2a2a2',
    toggle: false
});

var Interests = Ti.UI.createWindow({
	backgroundImage: 'bg.png',
    title: 'WHA GWAN',
    barImage : 'orange.png'
});

var Location = Ti.UI.createWindow({
	backgroundImage: 'bg.png',
    title: 'WHA GWAN',
    barImage : 'orange.png'
});

var iconScroll = Ti.UI.createScrollView({
scrollType:'vertical',
left: 0,
width:320,
top: 30
	});

var fetchinglabel = Ti.UI.createLabel({
	    top: 2,
	    left: 10,
	    width: 'auto',
	    height: 'auto',
	    text: 'Fetching Events...'
	});
	iconScroll.add(fetchinglabel);	
	

var eve = [];
var eventtitle = [];
var interPeople= [];
var gg = [];
var eventimage = [];
var imageview = [];

if (Ti.App.Properties.getString('AppStart') == null)
{
	//loginWin.open();
	var NavGroup_b = Ti.UI.iOS.createNavigationWindow({
	window: loginWin
	});
	setTimeout(function(){
	NavGroup_b.open();
	}, 3000);
	
	var NavGroup = Ti.UI.iOS.createNavigationWindow({
	window: events
	});
	Ti.API.log(Ti.App.Properties.getString('AppStart'));
	Ti.App.Properties.setString('AppStart', 'true');
	Ti.API.log(Ti.App.Properties.getString('AppStart'));
	}
else
{ 
	var NavGroup = Ti.UI.iOS.createNavigationWindow({
	window: events
	});
	GetEvents();
	setTimeout(function(){
	NavGroup.open();
	}, 3000);

} 

function getGoing( a, b){
	var db_e = Ti.Database.open('interest');	
	var Rows = db_e.execute('SELECT * FROM AppUser');
	var Uname = Rows.fieldByName('username');
	db_e.close(); 
	
	var url_abc = "http://whagwanapp.com/webservice5.asmx";
	var callparams_abc = {
		un: b,
	   	sig : 'count',
	   	username: Uname
	};

	var suds_abc = new SudsClient({
	    endpoint: url_abc,
	    targetNamespace: 'http://whagwanapp.com/'
	});
	
	try {
	    	suds_abc.invoke('HelloWorld', callparams_abc, function(xmlDoc) {
	        var results_abc = xmlDoc.documentElement.getElementsByTagName('HelloWorldResult');
	        	if (results_abc && results_abc.length>0) {
	            	var result_abc = results_abc.item(0).text;
	            	var goingCount = result_abc;
	            	//Ti.API.log("Going: " + goingCount);
	            	gg[a] = Titanium.UI.createLabel({
					backgroundColor:'transparent',
					width:'30',
					height:'10',
					left:65,
					bottom: 5,
					minimumFontSize: 4,
					text: goingCount
					});
					eve[a].add(gg[a]);     
					
	            	}
				 else
	        {
	             Ti.API.log('Nai chala');	
	        }

  
	    });
	
	} catch(e) {
	    Ti.API.error('Error: ' + e);
	}
}

function getInterested( a, b){
	var db_z = Ti.Database.open('interest');	
	var Rows = db_z.execute('SELECT * FROM AppUser');
	var Uname = Rows.fieldByName('username');
	db_z.close(); 
	
	var url_abc = "http://whagwanapp.com/webservice5.asmx";
	var callparams_abc = {
		un: b,
	   	sig : 'getInterested',
	   	username : Uname
	};

	var suds_abc = new SudsClient({
	    endpoint: url_abc,
	    targetNamespace: 'http://whagwanapp.com/'
	});
	
	try {
	    	suds_abc.invoke('HelloWorld', callparams_abc, function(xmlDoc) {
	        var results_abc = xmlDoc.documentElement.getElementsByTagName('HelloWorldResult');
	        	if (results_abc && results_abc.length>0) {
	            	var result_abc = results_abc.item(0).text;
	            	var interestedCount = result_abc;
	            	//Ti.API.log("Interested:" + interestedCount);
	            	interPeople[a] = Titanium.UI.createLabel({
					backgroundColor:'transparent',
					width:'50',
					height:'10',
					right:5,
					bottom: 5,
					text: interestedCount,
					minimumFontSize: 4
					});
					eve[a].add(interPeople[a]);  

	            	}
				 else
	        {
	             Ti.API.log('Nai chala');	
	        }

  
	    });
	
	} catch(e) {
	    Ti.API.error('Error: ' + e);
	}
}
//*********************************//
//LOGIN CODE STARTS FROM HERE//
//*********************************//
/*loginWin.addEventListener('open', function(e){
var db_C = Ti.Database.open('interest');	
	db_C.execute('DELETE from Userint');
	db_C.execute('DELETE from Int');
});*/


var view = Ti.UI.createView();

var label = Ti.UI.createLabel({
	text: 'Username',
	top: 10,
	left: 10,
	width:250,
	height: 35
	});
	
var username = Ti.UI.createTextField({
color: '#333333',
hintText: 'UserName',	
top: 40,
left: 8,
width:250,
height: 35,
borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

var label2 = Ti.UI.createLabel({
	text: 'EmailAddress',
	top: 70,
	left: 10,
	width:250,
	height: 35
	});

var pass = Ti.UI.createTextField({
color: '#333333',
hintText: 'EmailAddress',	
top: 100,
left: 8,
width:250,
height: 35,
borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

var label3 = Ti.UI.createLabel({
	text: 'Interests',
	top: 145,
	left: 10,
	width:250,
	height: 35
	});
	
var interestScroll = Ti.UI.createScrollView({
scrollType:'vertical',
left: 0,
width:320,
top: 190,
height: 160,
showVerticalScrollIndicator: true
	});



var userInterests = [];
var GetInterests = [];
var url = "http://whagwanapp.com/webservice3.asmx";
	var callparams = {
       	   
	};
	
	var suds = new SudsClient({
	    endpoint: url,
	    targetNamespace: 'http://whagwanapp.com/'
	});
	
	try {
	    suds.invoke('HelloWorld', callparams, function(xmlDoc) {
	        var results = xmlDoc.documentElement.getElementsByTagName('HelloWorldResult');
	        if (results && results.length>0) 
	        {		var result = results.item(0).text;
	        		var interestList = result.split('/');
	        		for (var i = 0; i < interestList.length - 1; i++)
	          		{	
	          			var db_a = Ti.Database.open('interest');	
						var Rows = db_a.execute('SELECT * FROM Int where Name = "'+ interestList[i] +'" ');
						if(Rows.isValidRow()){
    					//	Ti.API.log("Exists");
    					db_a.close(); 
						}
						else {
							db_a.execute('INSERT into Int(Name) VALUES("'+ interestList[i] +'")');
							Ti.API.log("Insert");
							db_a.close(); 
						}
						
	          			var btnH = '30';
	          			var topValue = 10 + (btnH * i);
	          			
						GetInterests[i] = Ti.UI.createButton({
							color: '#000000',
							title: interestList[i],
							top: topValue,
							left: 30,
							height: btnH,
							width: 260,
							backgroundImage: 'eventsButton.png',
							following: false,
							editable: true
					
						});
					interestScroll.add(GetInterests[i]);  
	  				  			
	  				GetInterests[i].addEventListener('click', function(e)
	  				{
	  					if (e.source.following == false)
	  					{
	  						e.source.backgroundImage = 'boxx.png';
	  						e.source.following  = true;
	  						
	  					}
						else 
						{
							e.source.backgroundImage = 'eventsButton.png';
							e.source.following  = false;	
							
							
						}
	
					});
	        	} 
	       
	        }
     else
	        {
	        //   Ti.API.log (results.item(0));
	        }
	    });
	} catch(e) {
	    Ti.API.error('Error: ' + e);
	}

		
var button = Ti.UI.createButton({
title: 'NEXT',
top: 355,
left: 270,
borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
backgroundImage: 'next.png'
});

button.addEventListener('click', function(e){
					var UN = username.value;
	 				var PW = pass.value;
	 				Ti.API.log(UN + " " + PW);
	 				var db = Ti.Database.open('interest');	
	 				var Rows = db.execute('SELECT * FROM AppUser where username = "'+ UN +'" ');
					if(Rows.isValidRow()){
    				//means you already have it in your favorites
    					Ti.API.log("ExistsInAPPUser");
    					db.close();
					}
					else { 
						db.execute('INSERT into AppUser(username) VALUES("'+ UN +'")');
						Ti.API.log("InsertInAPPUser");
						db.close();
					}
if (username.hasText() == false || pass.hasText() == false )
{
 	 	var dialog = Ti.UI.createAlertDialog({
    	title: 'Invalid Input',
    	message: 'Please enter username and email address to continue',
   		 buttonNames: ['OK']
 });
dialog.addEventListener('click', function(e){
  
  });
  dialog.show();
}
else
{
			for (var i = 0; i < GetInterests.length; i++)
	 		{
	 			if (GetInterests[i].following == true)
	 			{
	 				Ti.API.log("Checking if I am true" + GetInterests[i].title);
					userInterests.push(GetInterests[i].title);
	 			}	
 				else
 				{
	 				Ti.API.log('i ' + i + ' : ' + GetInterests[i].following);
	 			}
	 		}
	        
	 for (var i = 0 ; i < userInterests.length; i ++)
	 {				
	 				
	 				var db = Ti.Database.open('interest');	
					var Rows = db.execute('SELECT * FROM Userint where interestfollow = "'+ userInterests[i] +'" ');
					if(Rows.isValidRow()){
    				//means you already have it in your favorites
    					Ti.API.log("ExistsInUser");
    					db.close(); 
					}
					else { 
						db.execute('INSERT into Userint(interestfollow) VALUES("'+ userInterests[i] +'")');
						Ti.API.log("InsertInUser");
						db.close(); 
					}
					
	 				intrestsSend = intrestsSend + userInterests[i] + '%';
	 }
	
	

	//
	
	var url_e = "http://whagwanapp.com/webservice4.asmx";
	var callparams_e = {
       	   A: UN,
       	   B: PW
	};
	
	var suds_e = new SudsClient({
	    endpoint: url_e,
	    targetNamespace: 'http://whagwanapp.com/'
	});
	
	try {
	    suds_e.invoke('HelloWorld', callparams_e, function(xmlDoc) {
	        var results = xmlDoc.documentElement.getElementsByTagName('HelloWorldResult');
	       
	        if (results && results.length>0) 
	        {
	        var result = results.item(0).text;
	       //	Ti.API.log(result);
	        }
});
	} 

	catch(e) {
	    Ti.API.error('Error: ' + e);
	} 
	 

NavGroup_b.openWindow(Location);
//Location.open();
loginWin.close();
}});

view.add(username);
view.add(label);
view.add(label2);
view.add(label3);
view.add(pass);
view.add(button);
view.add(interestScroll);
loginWin.add(view);


//*********************************//
//EVENT LIST CODE STARTS FROM HERE//
//*********************************//

var button = Titanium.UI.createButton({
backgroundImage: 'sliderbutton.png',
height: '10dp',
width: '10dp',
//toggle: false
});

function MoveRight()
{
	iconScroll.left = 180;
}

function MoveLeft()
{
	iconScroll.left= 0;
}

button.addEventListener('click', function(e){
	if (drawer.toggle == false)
	{
		drawer.toggle = true;
		drawer.open();	
		MoveRight();
	}
	else
	{
		drawer.close();
		drawer.toggle = false;
		MoveLeft();
	}

}); 

events.leftNavButton= button;





function GetEvents()
{	intrestsSend = '';
	var db_C = Ti.Database.open('interest');
	var FollowingInterests = db_C.execute('SELECT * FROM Userint');
	while (FollowingInterests.isValidRow()){
				var interestsString = FollowingInterests.fieldByName('interestfollow');
				intrestsSend = intrestsSend + interestsString + '%';
				//Ti.API.log(intrestsSend);
				FollowingInterests.next();
				}
	//Ti.API.log(intrestsSend);
	//db_C.execute('DELETE from Userint');
	//db_C.execute('DELETE from Int');
	db_C.close();
	
	
	Ti.API.log("joji " + intrestsSend);
	
	var url = "http://whagwanapp.com/webservice.asmx";
	var callparams = {
	   sig : intrestsSend
	};

	var suds = new SudsClient({
	    endpoint: url,
	    targetNamespace: 'http://whagwanapp.com/'
	});

	try {
	    suds.invoke('Testing', callparams, function(xmlDoc) {
	        var results = xmlDoc.documentElement.getElementsByTagName('TestingResult');
	        if (results && results.length>0) {
	        	//var eve = [];
	            var result = results.item(0).text;
	          var arrValue = result.split('---');
	          for (var i = 0; i < arrValue.length - 1; i++){
	          	buttonProperties = arrValue[i].split('///');
	          			var btnH = '70';
		var topValue = 10 + (btnH * i);
		eve[i] = Ti.UI.createButton({
		color:'#f00',
		backgroundImage:'eventsButton.png',
		top: topValue,
		left: 30,
		height: btnH,
		width: 260,
		buttonname:'',
});

var imagenameforbutton = buttonProperties[1];
var UrlforImage = "http://whagwanapp.com/Photos/";
var imagepathforbutton = UrlforImage + imagenameforbutton;
	  		

eventimage[i]= 	Titanium.UI.createImageView({
		top: 10,
		left: 10,
		height: 50,
		width: 50,
		image: imagepathforbutton
});

eve[i].add(eventimage[i]);

eventtitle[i]= Titanium.UI.createLabel({
	top : 10,
	height: 25,
	left: 65,
	width: 210,
	text:  buttonProperties[0]
});
eve[i].add(eventtitle[i]);
eve[i].buttonname = buttonProperties[0];
	
var nametoSend = buttonProperties[0];
getGoing(i, nametoSend);
getInterested(i, nametoSend);
//Ti.API.log("Going:" + goingCount);


events.addEventListener('click', function(e){
	if(drawer.toggle == true){
		drawer.close();
		drawer.toggle = false;
		MoveLeft();
	}
	
});
//*********************************//
//EVENT DETAIL CODE STARTS FROM HERE//
//*********************************//



eve[i].addEventListener('click', function(e)
{
	if (drawer.toggle == true)
	{
		return;
	}

	var db_g = Ti.Database.open('interest');	
	var Rows_g = db_g.execute('SELECT * FROM AppUser');
	var Username = Rows_g.fieldByName('username');
	var EventName = e.source.buttonname;
	Ti.API.log("Checking username and Event: " + EventName + " " + Username);
	var CheckUserForEvent = db_g.execute('SELECT UName FROM EventsInterested where EName = "' + EventName + '" ');
	var CheckUser = CheckUserForEvent.fieldByName('UName');
	if(CheckUser == Username)
	{
		Ti.API.log(CheckUser + "  " + Username + "  Already Interested Events");
		db_g.close();
	}

	else{	
		    Ti.API.log("Inserting Interested Events");
			db_g.execute('INSERT into EventsInterested(UName, EName) VALUES("'+ Username +'", "'+ EventName +'" )');
			db_g.close();
		
		 	var url_abc = "http://whagwanapp.com/webservice5.asmx";
 			var callparams_abc = {
			un: e.source.buttonname,
	   		sig : 'insertInterested',
	   		username : Username
		};

	var suds_abc = new SudsClient({
	    endpoint: url_abc,
	    targetNamespace: 'http://whagwanapp.com/'
	});
	
	try {
	  suds_abc.invoke('HelloWorld', callparams_abc, function(xmlDoc) {
	  var results_abc = xmlDoc.documentElement.getElementsByTagName('HelloWorldResult');
	  if (results_abc && results_abc.length>0) {
	      var result_abc = results_abc.item(0).text;
	      var goingCount = result_abc;
	      Ti.API.log("Interest " + goingCount);
	    }
		else
	        {
	             Ti.API.log('Nai chala');	
	        }
	});
	
	} catch(e) {
	    Ti.API.error('Error: ' + e);
	}
}


var testwin = Ti.UI.createWindow({
backgroundImage: 'bg.png',
    title: 'WHA GWAN',
    barImage : 'orange.png',
    myvar:''
});
testwin.myvar = e.source.buttonname;
//Ti.API.log(testwin.myvar);

var BackButton = Ti.UI.createButton({
title: 'Events'	
});

BackButton.addEventListener('click', function(e){
	testwin.close();
	
	NavGroup.openWindow(events);
	GetEvents();
});
testwin.leftNavButton = BackButton;


var lll = Ti.UI.createLabel({
top: 70,
left: 50	
});
lll.text = testwin.myvar;
testwin.add(lll);

var circle = Ti.UI.createImageView({
width: '100dp',
height: '100dp',
borderRadius: 50,
borderColor: '#A9A9A9',
borderWidth: 5,
backgroundColor: '#D7D4d8',
center: {x:'160dp' , y:'210dp'}
});

var going = false;



var fbshare = Ti.UI.createButton({
backgroundImage: 'fb.png',
bottom: 0,
height: Ti.UI.SIZE,
width: Ti.UI.FILL
});

fbshare.addEventListener('click', function(e){
		var fb = require('facebook');
		fb.appid = 558174570963142;
		fb.permissions = ['publish_stream'];
		fb.addEventListener('login', function(e) {
   		 if (e.success) {
       	// alert('Logged in');
}
});

	fb.authorize();
	
var data = {
    link : "http://www.codespikestudios.com",
    name : "Wha Gwan app",
    message : "I am going to using Wha Gwan",
    caption : "Wha Gwan app",
    picture : "http://whagwanapp.com/Photos/logo.png",
    description : "Use Wha Gwan on android and iOS to view events happening near you..."
};
fb.dialog("feed", data, function(e) {
    if(e.success && e.result) {
       // alert("Success! New Post ID: " + e.result);
    } 
    else 
    	{
        if(e.error) 
        {
            //alert(e.error);
        } 
        else 
        {
            //alert("User canceled dialog.");
        }
    }
});
});

var info = Ti.UI.createView({
top : '10dp',
left: 0,
height: '200dp',
width: '160dp',
backgroundColor: '#FFFFFF',
borderColor: '#D7D4d8',
borderWidth: 5
});
var infolabel = Ti.UI.createLabel({
font: 5,
height: '120dp',
width: '140dp'
});

var mapview_b = Map.createView({
	top: 0,
	left: 0,
	height: Ti.UI.FILL,
	width: Ti.UI.FILL,
    mapType: Map.NORMAL_TYPE,
    regionFit:true
    });


var location = Ti.UI.createView({
top : '10dp',
left: '160dp',
//height: '50%',
height: '200dp',
width: '160dp',
backgroundColor: '#FFFFFF',
borderColor: '#D7D4d8',
borderWidth: 5
});

location.add(mapview_b);
var loclabel = Ti.UI.createLabel({
font: 5,
height: '120dp',
width: '140dp'
});

var ameties = Ti.UI.createView({
top : '210dp',
left: '0dp',
//bottom: 0,
height: '200dp',
width: '160dp',
backgroundColor: '#FFFFFF',
borderColor: '#D7D4d8',
borderWidth: 5
});
var amlabel = Ti.UI.createLabel({
font: 5,
height: '120dp',
width: '140dp'
});

var admission = Ti.UI.createView({
top : '210dp',
left: '160dp',
//bottom: 0,
height: '200dp',
width: '160dp',
backgroundColor: '#FFFFFF',
borderColor: '#D7D4d8',
borderWidth: 5
});
var adLabel = Ti.UI.createLabel({
font: 5,
height: '120dp',
width: '140dp'
});

info.add(infolabel);
location.add(loclabel);
ameties.add(amlabel);
admission.add(adLabel);

info.addEventListener('click', function(e){
	var infoWin = Ti.UI.createWindow({
	backgroundColor: '#FFFFFF',
    title: 'WHA GWAN',
    barImage : 'orange.png'
	});
	var winlabel = Ti.UI.createLabel({
	text: infolabel.text
});

	infoWin.add(winlabel);

	infoWin.backButtonTitle = 'Back';
	NavGroup.openWindow(infoWin);
});

ameties.addEventListener('click', function(e){
	var infoWin = Ti.UI.createWindow({
	backgroundColor: '#FFFFFF',
    title: 'WHA GWAN',
    barImage : 'orange.png'
	});
	var winlabel = Ti.UI.createLabel({
	text:amlabel.text
	});

	infoWin.add(winlabel);
	infoWin.backButtonTitle = 'Back';
	NavGroup.openWindow(infoWin);
});

admission.addEventListener('click', function(e){
	var infoWin = Ti.UI.createWindow({
	backgroundColor: '#FFFFFF',
    title: 'WHA GWAN',
    barImage : 'orange.png'
	});
	var winlabel = Ti.UI.createLabel({
	text:adLabel.text
	});

	infoWin.add(winlabel);
	infoWin.backButtonTitle = 'Back';
	NavGroup.openWindow(infoWin);
});



testwin.add(admission);
testwin.add(ameties);
testwin.add(location);
testwin.add(info);
testwin.add(circle); 
testwin.add(fbshare);

	var EDurl = "http://whagwanapp.com/webservice2.asmx";
	var EDcallparams = {
        sig : testwin.myvar	  
	};
	
	var EDsuds = new SudsClient({
	    endpoint: EDurl,
	    targetNamespace: 'http://whagwanapp.com/'
	});
	var piecesArray = [];
	try {
	    EDsuds.invoke('Testing', EDcallparams, function(xmlDoc) {
	        var EDresults = xmlDoc.documentElement.getElementsByTagName('TestingResult');
	        if (EDresults && EDresults.length>0) 
	        {
	        	var EDarray = [];
	            var EDresult = EDresults.item(0).text;
	          	var EDarrValue = EDresult.split('--');
	          	for (var i = 0; i < EDarrValue.length; i++)
	          	{
	  				piecesArray = EDarrValue[i].split('%%%');
	  			
	  				for (var j = 0 ; j < piecesArray.length ; j++)
	  				{
	  					EDarray.push(piecesArray[j]);
	  				//	Ti.API.info(j + piecesArray[j]);
	  				}    
	  				
	  				
	  			}
	  		infolabel.text = EDarray[0] + "  "+ "DATE: " + EDarray[2] + "  " + "TIME: " + EDarray [3];
	  		amlabel.text = EDarray[1];
	  		adLabel.text = EDarray[4];
	  		//loclabel.text = testwin.myvar;
	  		var imageName = EDarray[5];
	  		var urlLink = EDarray[8];
	  		var current = {
	  			latitude: EDarray[7],
	  			longitude: EDarray[6],
	  			latitudeDelta: 0.01,
	  			longitudeDelta: 0.01
	  		};
	  		var pin_b = Map.createAnnotation({
			latitude: EDarray[7],
			longitude:EDarray[6],
			pincolor:Map.ANNOTATION_RED,
			myid:2,
			});
	  		mapview_b.hide();
	  		mapview_b.addAnnotation(pin_b);
	  		mapview_b.setLocation(current);
	  		mapview_b.show();
			
			var mapview_c = Map.createView({
				top: 0,
				left: 0,
				height: Ti.UI.FILL,
				width: Ti.UI.FILL,
   				mapType: Map.NORMAL_TYPE,
    			regionFit:true
   			 });
			
			
			mapview_c.setLocation(current);
			
	  		var appUrl = "http://whagwanapp.com/Photos/";
	  		var imagepath = appUrl + imageName;
	  		circle.image = imagepath; 
	  		
	 		 		
	  		circle.addEventListener('click', function(e){
  				if (urlLink=="")
  				{	var imageview = Ti.UI.createImageView({
  						image: imagepath,
  						center: {x: "50%", y: "50%"},
  						width: 250,
  						height: 250
  						});
 
  					var imageWindow = Ti.UI.createWindow({
  						backgroundColor: '#FFFFFF',
    					title: 'WHA GWAN',
    					barImage : 'orange.png'
  					});
  					
  					imageWindow.add(imageview);
  					imageWindow.backButtonTitle = "Back";
  					NavGroup.openWindow(imageWindow);
	  				Ti.API.log("URL" + urlLink);
	  			/*	var webview = Ti.UI.createWebView();
					webview.url = imagepath;
					testwin.add(webview);
					testwin.open(webview); */
	  			}
	  			else
	  			{
	  				Ti.API.log(urlLink);
	  				var webview = Ti.UI.createWebView();
					webview.url = urlLink;
					testwin.add(webview);
					testwin.open(webview);
				}	
	  		});


 location.addEventListener('click', function(e){
	 var infoWin = Ti.UI.createWindow({
     title: 'WAH GWAN'
	 });
	 
	mapview_c.addAnnotation(pin_b);
 	infoWin.add(mapview_c);
 		 
	 infoWin.backButtonTitle = 'Back';
	 NavGroup.openWindow(infoWin, {animated:true});
 });
  		
//***IMPLEMENTING JOIN*****//
	  		
var db_e = Ti.Database.open('interest');	
var Rows = db_e.execute('SELECT * FROM AppUser');
var Uname = Rows.fieldByName('username');
Ti.API.log("Checking Rows :" + Uname);
Ti.API.log("Checking EventName :" + EDarray[0]);
db_e.close(); 

var join = Ti.UI.createLabel({
	text: 'JOIN',
	color: 'blue',
	joined: false
});

join.addEventListener('click', function(e) {
if (e.source.joined == false)
    {
	e.source.joined = true;
    join.text = 'GOING';
    join.color= 'green';
    Ti.API.log("if statement chal rai hai");

    
   var db_i = Ti.Database.open('interest');	
   db_i.execute('INSERT into EventsGoing(UName, EName) VALUES("'+ Uname +'", "'+ testwin.myvar +'" )');
   db_i.close();
    Ti.API.log("what is testwin" + testwin.myvar);
    var url_abc = "http://whagwanapp.com/webservice5.asmx";
	var callparams_abc = {
		un: testwin.myvar,
	   	sig : 'insert',
	   	username: Uname
	};

	var suds_abc = new SudsClient({
	    endpoint: url_abc,
	    targetNamespace: 'http://whagwanapp.com/'
	});
	
	try {
	    	suds_abc.invoke('HelloWorld', callparams_abc, function(xmlDoc) {
	        var results_abc = xmlDoc.documentElement.getElementsByTagName('HelloWorldResult');
	        	if (results_abc && results_abc.length>0) 
	        		{
	            	var result_abc = results_abc.item(0).text;
	            	var goingCount = result_abc;
	            	Ti.API.log("Done " + goingCount);
	            	}
				 else
	        {
	             Ti.API.log('Nai chala');	
	        }

  
	    });
	
	} catch(e) {
	    Ti.API.error('Error: ' + e);
	}
    
    }
else
    {
    var db_f = Ti.Database.open('interest');	
   	db_f.execute('DELETE FROM EventsGoing where EName = "' + testwin.myvar + '" ');
   	db_f.close();
    Ti.API.log("else statement chal rai hai");
    e.source.joined = false;
    join.text = 'JOIN';
    join.color= 'blue';
    
    var url_abc = "http://whagwanapp.com/webservice5.asmx";
	var callparams_abc = {
		un: testwin.myvar,
	   	sig : 'deleteGoing',
	   	username: Uname
	};

	var suds_abc = new SudsClient({
	    endpoint: url_abc,
	    targetNamespace: 'http://whagwanapp.com/'
	});
	
	try {
	    	suds_abc.invoke('HelloWorld', callparams_abc, function(xmlDoc) {
	        var results_abc = xmlDoc.documentElement.getElementsByTagName('HelloWorldResult');
	        	if (results_abc && results_abc.length>0) 
	        		{
	            	var result_abc = results_abc.item(0).text;
	            	var goingCount = result_abc;
	            	Ti.API.log("Done " + goingCount);
	            	}
				 else
	        {
	             Ti.API.log('Nai chala');	
	        }

  
	    });
	
	} catch(e) {
	    Ti.API.error('Error: ' + e);
	}
    
    }
});


	var db_a = Ti.Database.open('interest');	
	var Rows_b = db_a.execute('SELECT UName FROM EventsGoing where EName = "' + EDarray[0] + '" ');
	if(Rows_b.isValidRow()){
	var nameCheck = Rows_b.fieldByName('UName');
		if (nameCheck == Uname)
		{
		join.text = "GOING";
		join.color = "green";
		join.joined = true;
		testwin.rightNavButton = join;
		Ti.API.log(" User and Event Exists");
		}
		else {
		testwin.rightNavButton = join;
		Ti.API.log("User and Event does not Exists");	
		}	
		}
	else {
	//db_a.execute('INSERT into EventGoing(UName, EName) VALUES("'+ Uname+'", "'+ EDarray[0] +'" )');
	testwin.rightNavButton = join;
	Ti.API.log("Insert Event and Event didnt exist");
	}
	db_a.close(); 
	  		
} 
else
{
 EDlabel.text = 'Oops, could not determine result of SOAP call.';
}
});
	
} catch(e) {
Ti.API.error('Error: ' + e);
} 

iconScroll.removeAllChildren();
events.close();	
NavGroup.openWindow(testwin);

//NavGroup.openWindow(eventdetail, {animated:true});
//Ti.API.log(eventdetail.myvar);
}); 
	  iconScroll.add(eve[i]);    
	  fetchinglabel.text = "";   
	  
	  } // end for
	        } else {
	            label.text = 'Oops, could not determine result of SOAP call.';
	        }
	    });
	} catch(e) {
	    Ti.API.error('Error: ' + e);
	}
	


	
events.add(iconScroll); 
}

//*********************************//
//DRAWER CODE STARTS FROM HERE//
//*********************************//

var interestButton = Ti.UI.createButton({
	top: 60,
	backgroundImage: 'Interest.png',
	title: 'Interest',
	color: '#000000',
	width: 180,
	height: 40
	});
	
interestButton.addEventListener('click', function(e){
	
	if (drawer.toggle == true)
	{
		MoveLeft();
		drawer.toggle = false;
	}
	else
	{	
		MoveRight();
		drawer.toggle = true;
	}
		
		
	drawer.close();
	//NavGroup.left = 0;
	iconScroll.removeAllChildren();
	events.remove(iconScroll);
	events.close();
	//Location.close();
	NavGroup.openWindow(Interests);
});


var homeButton = Ti.UI.createButton({
	top: 110,
	backgroundImage: 'Home.png',
	title: 'Home',
	color: '#000000',
	width: 180,
	height: 40
	});
	
homeButton.addEventListener('click', function(e){
	if (drawer.toggle == true)
	{
		drawer.toggle = false;
		MoveLeft();
	}
	else
	{
		drawer.toggle = true;
		MoveRight();
	}
	
	drawer.close();
	//NavGroup.left = 0;
	//Interests.close();
	//Location.close();
	NavGroup.openWindow(events);
});

var locButton = Ti.UI.createButton({
	top: 160,
	backgroundImage: 'Location.png',
	title: 'Location',
	color: '#000000',
	width: 180,
	height: 40
	});
	
locButton.addEventListener('click', function(e){
	
	if (drawer.toggle == true)
	{
		drawer.toggle = false;
		MoveLeft();
	}
	else
	{
		drawer.toggle = true;
		MoveRight();
	}
	drawer.close();
	NavGroup.left = 0;
	//Interests.close();
	events.close();
	NavGroup.openWindow(Location);
});
drawer.add(locButton);
drawer.add(homeButton);
drawer.add(interestButton);

//*********************************//
//INTEREST CODE STARTS FROM HERE//
//*********************************//
var backButtonInterest = Ti.UI.createButton({
	title: 'Events'	
});

backButtonInterest.addEventListener('click', function(e){
	intrestsSend = '';
	var db_C = Ti.Database.open('interest');
	var FollowingInterests = db_C.execute('SELECT * FROM Userint');
	while (FollowingInterests.isValidRow()){
				var interestsString = FollowingInterests.fieldByName('interestfollow');
				intrestsSend = intrestsSend + interestsString + '%';
				//Ti.API.log(intrestsSend);
				FollowingInterests.next();
				}
	viewInterest.removeAllChildren();
	Interests.close();
	NavGroup.openWindow(events);
	//Ti.API.log(intrestsSend);
	//db_C.execute('DELETE from Userint');
	//db_C.execute('DELETE from Int');
	db_C.close();
	GetEvents();
});

Interests.leftNavButton = backButtonInterest;

var viewInterest = Ti.UI.createScrollView();
var interestbuttons = [];

Interests.addEventListener('open', function(e) {	
	var db_B = Ti.Database.open('interest');
	var interestCount = 1;
	var RowsButton = db_B.execute('SELECT * FROM Int');
	while (RowsButton.isValidRow()){
		var name = RowsButton.fieldByName('Name');
		var btnH = '30';
	    var topValue = 10 + (btnH * interestCount);
		interestbuttons[interestCount] = Ti.UI.createButton({
			color: '#000000',
			title: name,
			top: topValue,
			left: 30,
			height: btnH,
			width: 260,
			backgroundImage: 'eventsButton.png',
			editable: true,
			follow: 'false'
			});
			
			var FollowingButtons = db_B.execute('SELECT * FROM Userint');
			while (FollowingButtons.isValidRow()){
				var green = FollowingButtons.fieldByName('interestfollow');
				if (green == name){
					interestbuttons[interestCount].backgroundImage = 'boxx.png';
					interestbuttons[interestCount].follow = "true";
				}
				else{
				
				}
			FollowingButtons.next();
			} 
			
			interestbuttons[interestCount].addEventListener('click', function(e){
				if (e.source.follow == 'true'){
					e.source.follow = "false";
					e.source.backgroundImage = 'eventsButton.png';
					var deleteInterest = e.source.title;
					Ti.API.log(deleteInterest);
					//var Rows = db.execute('SELECT * FROM Userint where interestfollow = "'+ userInterests[i] +'" ');
					var db_D = Ti.Database.open('interest');
					db_D.execute('DELETE FROM Userint WHERE interestfollow= "'+ deleteInterest +'"');
					db_D.close();
				}
				else{
					e.source.follow = "true";
					e.source.backgroundImage = 'boxx.png';
					var addInterest = e.source.title;
					Ti.API.log(addInterest);
					//db_B.execute('INSERT INTO Userint(interestfollow) VALUES (?)',e.source.title);
					var db_D = Ti.Database.open('interest');
					db_D.execute('INSERT into Userint(interestfollow) VALUES("'+ addInterest +'")');
					db_D.close();
				}
			});
			
			viewInterest.add(interestbuttons[interestCount]); 
			interestCount = interestCount + 1;
			RowsButton.next();
	} 


db_B.close();});
Interests.add(viewInterest);

//*********************************//
//LOCATION CODE STARTS FROM HERE//
//*********************************//

var Map = require('ti.map');
/*var win = Titanium.UI.createWindow(
{
	backgroundColor: 'yellow'
}
);*/
var maptoggle = false;
var view = Ti.UI.createView();
var label = Ti.UI.createLabel({
	text: 'PLEASE SPECIFY YOUR LOCATION',
	top: 40,
	left: 80,
	width: Ti.UI.FILL
});

  var e_longitude;
  var e_latitude;
Titanium.Geolocation.purpose = "GPS user coordinates";
Titanium.Geolocation.distanceFilter = 10; // set the granularity of the location event

    Titanium.Geolocation.getCurrentPosition(function(e)
    {
        if (e.error)
        {
               // manage the error
               return;
        }

    	e_longitude = e.coords.longitude;
        e_latitude = e.coords.latitude;
        var altitude = e.coords.altitude;
        var heading = e.coords.heading;
        var accuracy = e.coords.accuracy;
        var speed = e.coords.speed;
        var timestamp = e.coords.timestamp;
        var altitudeAccuracy = e.coords.altitudeAccuracy;

    });

var mapview = Map.createView({
	top: 80,
	left: 40,
	height: 280,
	width: 240,
    mapType: Map.NORMAL_TYPE,
    region: {latitude:e_latitude, longitude:e_longitude,
            latitudeDelta:0.01, longitudeDelta:0.01},
    animate:true,
    regionFit:true,
    userLocation:true
    });

/*var  currentRegion = Ti.UI.createButton({
	title: 'Confirm Region',
	backgroundImage: 'next.png',
	top: 380,
	left: 10
}); */

var proceed = Ti.UI.createButton({
	title: 'Proceed',
	backgroundImage: 'next.png',
	top: 380,
	left: 250
});

var pin = Map.createAnnotation({
latitude: 33.586283,
longitude:73.088372,
title:"Your Location",
pincolor:Map.ANNOTATION_RED,
myid:2,
});

mapview.addAnnotation(pin);

/*currentRegion.addEventListener('click', function()
{	
//	if (maptoggle == false){
	maptoggle = true;
	var region = mapview.getRegion();
	pin.latitude = region.latitude;
	pin.longitude = region.longitude;
//	alert(JSON.stringify(region)); }
	 
//	else {
//		alert("You have already specified the region");
//	}
}
);*/

proceed.addEventListener('click', function()
{	
	Location.close();
/*	NavGroup.openWindow(events);
	NavGroup.window = events;
	loginWin.close(); */
	NavGroup.open();
	GetEvents();
});

view.add(label);
view.add(mapview);
//view.add(currentRegion);
view.add(proceed);
Location.add(view);
//view.removeAllChildren();
var mapbackbutton = Ti.UI.createButton({
title: 'Events'
});

mapbackbutton.addEventListener('click', function(e){
Location.close();
NavGroup.openWindow(events);
}); 

Location.leftNavButton = mapbackbutton; 


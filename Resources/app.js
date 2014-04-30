Ti.include('suds.js');
Ti.App.Properties.setString('AppStart', 'false');


var loginWin = Ti.UI.createWindow({
 	backgroundImage: 'bg.png',
    title: 'WHA GAWAN',
    barImage : 'orange.png'
});

var event_title ="abc";
var intrestsSend = '';
var NavGroup = Ti.UI.iOS.createNavigationWindow({
	window: loginWin,
	
});

var events = Ti.UI.createWindow({
	backgroundImage: 'bg.png',
    title: 'WHA GAWAN',
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
    backgroundColor: '#666666',
    toggle: false
});

var Interests = Ti.UI.createWindow({
	backgroundImage: 'bg.png',
    title: 'WAH GAWAN',
    barImage : 'orange.png'
});

var Location = Ti.UI.createWindow({
	backgroundImage: 'bg.png',
    title: 'WAH GAWAN',
    barImage : 'orange.png'
});

/*if (Ti.App.Properties.getString('AppStart')== 'false'){
	var NavGroup = Ti.UI.iOS.createNavigationWindow({
	window: loginWin
	});
	Ti.API.log(Ti.App.Properties.getString('AppStart'));
	Ti.App.Properties.setString('AppStart', 'true');
	Ti.API.log(Ti.App.Properties.getString('AppStart'));
	}
else{
	var NavGroup = Ti.UI.iOS.createNavigationWindow({
	window: events
});
} */

var drawertoggle = false;
//*********************************//
//LOGIN CODE STARTS FROM HERE//
//*********************************//

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
	        		for (var i = 0; i < interestList.length; i++)
	          	{
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
					following: 'false'
					});
			interestScroll.add(GetInterests[i]);  
	  			
	  		GetInterests[i].addEventListener('click', function(e){
	  		if (e.source.following == 'false'){
	  			e.source.backgroundImage = 'boxx.png';
	  			e.source.following  = 'true';
	  		}
			else 
			{
				e.source.backgroundImage = 'eventsButton.png';
				e.source.following  = 'false';	
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
if (username.hasText() == false || pass.hasText() == false ){
  var dialog = Ti.UI.createAlertDialog({
    title: 'Invalid Input',
    message: 'Please enter username and email address to continue',
    buttonNames: ['OK']
  });
  dialog.addEventListener('click', function(e){
  //  Ti.API.info('e.text: ' + e.text);
  });
  dialog.show();
}
else
{
	
	 for (var i = 0; i < GetInterests.length; i++){
	 			if (GetInterests[i].following == 'true')
	 			{
	 				userInterests.push(GetInterests[i].title);
	 			}	
	 }
	        
	 for (var i = 0 ; i < userInterests.length; i ++)
	 {
	 	intrestsSend = intrestsSend + userInterests[i] + '%';
	 }
	 var UN = username.value;
	 var PW = pass.value;

	  NavGroup.openWindow(Location, {animated:true});
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
	       	Ti.API.log(result);
	        }
});
	} 

	catch(e) {
	    Ti.API.error('Error: ' + e);
	}  

}});

view.add(username);
view.add(label);
view.add(label2);
view.add(label3);
view.add(pass);
view.add(button);
view.add(interestScroll);
//view.add(listView2);
loginWin.add(view);
NavGroup.open();

//*********************************//
//EVENT LIST CODE STARTS FROM HERE//
//*********************************//

var button = Titanium.UI.createButton({
backgroundImage: 'sliderbutton.png',
height: '10dp',
width: '10dp',
//toggle: false
});


button.addEventListener('click', function(e){
	if (drawertoggle == false){
		drawertoggle = true;
		drawer.open();	
		NavGroup.left= 180;
		}
	else{
		drawer.close();
		drawertoggle = false;
		NavGroup.left= 0;
		}

}); 

events.leftNavButton= button;


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
var numberofButtons = 10;

Ti.API.log(intrestsSend);
//var tosend = Ti.App.Properties.getString('isend');

function GetEvents()
{
	//Ti.API.log(tosend);
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
		buttonname:''
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

interPeople[i] = Titanium.UI.createLabel({
		backgroundColor:'transparent',
		width:'50',
		height:'10',
		right:5,
		bottom: 5,
		text:'0 interested',
		minimumFontSize: 4
	});
	
eve[i].add(interPeople[i]);

gg[i] = Titanium.UI.createLabel({
		backgroundColor:'transparent',
		width:'30',
		height:'10',
		left:65,
		bottom: 5,
		text:'0 going',
		minimumFontSize: 4
	});
eve[i].add(gg[i]);

//*********************************//
//EVENT DETAIL CODE STARTS FROM HERE//
//*********************************//

eve[i].addEventListener('click', function(e){

var testwin = Ti.UI.createWindow({
backgroundImage: 'bg.png',
    title: 'WAH GAWAN',
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

	var join = Ti.UI.createLabel({
			text:'JOIN',
			color:'blue',
			font:{fontSize:14}
		});
	eventdetail.rightNavButton = join;
	
	join.addEventListener('click', function(e) {
	if (going == false){
	going = true;
    join.text = 'GOING';
    join.color= 'green';}
    
    else
    {
    going = false;
    join.text = 'JOIN';
    join.color= 'blue';
    }
});

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
        alert('Logged in');
    }
});

	fb.authorize();
	
var data = {
    link : "http://www.codespikestudios.com",
    name : "Wah Gwan app",
    message : "I am going to" + testwin.myvar +"using Wah Gwan",
    caption : "Wah Gwan app",
    picture : "http://developer.appcelerator.com/assets/img/DEV_titmobile_image.png",
    description : "Use Wah Gwan on android and iOS to view events happening near you..."
};
fb.dialog("feed", data, function(e) {
    if(e.success && e.result) {
       // alert("Success! New Post ID: " + e.result);
    } else {
        if(e.error) {
            alert(e.error);
        } else {
            alert("User canceled dialog.");
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
	  		loclabel.text = testwin.myvar;
	  		var imageName = EDarray[5];
	  		var appUrl = "http://whagwanapp.com/Photos/";
	  		var imagepath = appUrl + imageName;
	  		circle.image = imagepath;
	        } 
	        else
	        {
	            EDlabel.text = 'Oops, could not determine result of SOAP call.';
	        }
	    });
	
	} catch(e) {
	    Ti.API.error('Error: ' + e);
	}
	
NavGroup.openWindow(testwin, {animated:true});
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
	top: 40,
	backgroundImage: 'interest.png',
	width: Ti.UI.FILL,
	height: Ti.UI.SIZE
	});
	
interestButton.addEventListener('click', function(e){
	
	if (drawer.toggle == true){drawer.toggle = false;}
	else{drawer.toggle = true;}
	drawer.close();
	NavGroup.left = 0;
	events.close();
	Location.close();
	NavGroup.openWindow(Interests);
});


var homeButton = Ti.UI.createButton({
	top: 80,
	backgroundImage: 'home.png',
	width: Ti.UI.FILL,
	height: Ti.UI.SIZE
	});
	
homeButton.addEventListener('click', function(e){
	if (drawer.toggle == true){drawer.toggle = false;}
	else{drawer.toggle = true;}
	
	drawer.close();
	NavGroup.left = 0;
	Interests.close();
	Location.close();
	NavGroup.openWindow(events);
});

var locButton = Ti.UI.createButton({
	top: 120,
	backgroundImage: 'location.png',
	width: Ti.UI.FILL,
	height: Ti.UI.SIZE
	});
	
locButton.addEventListener('click', function(e){
	
	if (drawer.toggle == true){drawer.toggle = false;}
	else{drawer.toggle = true;}
	drawer.close();
	NavGroup.left = 0;
	Interests.close();
	events.close();
	NavGroup.openWindow(Location);
});
drawer.add(locButton);
drawer.add(homeButton);
drawer.add(interestButton);

//*********************************//
//INTEREST CODE STARTS FROM HERE//
//*********************************//

var viewInterest = Ti.UI.createView();

var chooseinterests = Ti.UI.createLabel({
	top: 40,
	text: 'PLEASE CHOOSE YOUR INTERESTS'
}); 

var interestScroll_b = Ti.UI.createScrollView({
scrollType:'vertical',
left: 0,
width:320,
top: 190,
height: 160,
showVerticalScrollIndicator: true
	});

var url = "http://whagwanapp.com/webservice3.asmx";
	var callparams_d = {
       	   
	};
	
	var suds_d = new SudsClient({
	    endpoint: url,
	    targetNamespace: 'http://whagwanapp.com/'
	});
	
	try {
	    suds_d.invoke('HelloWorld', callparams_d, function(xmlDoc) {
	        var results = xmlDoc.documentElement.getElementsByTagName('HelloWorldResult');
	        if (results && results.length>0) 
	        {		var result = results.item(0).text;
	        		var interestList = result.split('/');
	        		for (var i = 0; i < interestList.length; i++)
	          	{
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
					following: 'false'
					});
			interestScroll_b.add(GetInterests[i]);  
	  			
	  		GetInterests[i].addEventListener('click', function(e){
	  		if (e.source.following == 'false'){
	  			e.source.backgroundImage = 'boxx.png';
	  			e.source.following  = 'true';
	  		}
			else 
			{
				e.source.backgroundImage = 'eventsButton.png';
				e.source.following  = 'false';	
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

viewInterest.add(chooseinterests);
viewInterest.add(interestScroll_b); 
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

var mapview = Map.createView({
	top: 80,
	left: 40,
	height: 280,
	width: 240,
    mapType: Map.NORMAL_TYPE,
    region: {latitude:33.586283, longitude:73.088372,
            latitudeDelta:0.01, longitudeDelta:0.01},
    animate:true,
    regionFit:true,
    userLocation:true
    });

var  currentRegion = Ti.UI.createButton({
	title: 'Confirm Region',
	backgroundImage: 'next.png',
	top: 380,
	left: 10
});

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
draggable : true
});

mapview.addAnnotation(pin);

currentRegion.addEventListener('click', function()
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
);

proceed.addEventListener('click', function()
{	
	Location.close();
	NavGroup.openWindow(events, {animated:true});
	GetEvents();
});

view.add(label);
view.add(mapview);
view.add(currentRegion);
view.add(proceed);
Location.add(view);

var mapbackbutton = Ti.UI.createButton({
backgroundImage: 'sliderbutton.png',
height: '10dp',
width: '10dp',
toggle: false
});

mapbackbutton.addEventListener('click', function(e){
	if (drawertoggle == false){
		drawertoggle = true;
		drawer.open();	
		NavGroup.left= 180;
		
		}
	else{
		drawertoggle = false;
		drawer.close();
		NavGroup.left= 0;
		}

}); 

Location.leftNavButton = mapbackbutton; 
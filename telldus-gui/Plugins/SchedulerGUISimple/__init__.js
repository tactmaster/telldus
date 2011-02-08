/** SchedulerGUISimple **/
__setupPackage__( __extension__ );

__postInit__ = function() {
	application.allDoneLoading.connect( com.telldus.schedulersimplegui.init );
}

com.telldus.schedulersimplegui = function() {
	var deviceList;
	var view;

	function init() {
		view = new com.telldus.qml.view({
			addDevice: addDevice,
			getSunRiseTime: getSunRiseTime,
			getSunSetTime: getSunSetTime,
			getSunData: getSunData
		});
		
		//devices:
		deviceList = new com.telldus.qml.array();
		var list = com.telldus.core.deviceList.getList();
		for(var i=0; i < list.length; ++i) {
			var item = list[i];
			item.isEnabled = "enabled";
			deviceList.push(item);
		}
		view.setProperty('deviceModel', deviceList);
		
		//points:
		//from storage...
		var weekPointList = new com.telldus.qml.array();
		var dummypoint = {};
		dummypoint["day"] = 0;
		dummypoint["deviceId"] = 1;
		weekPointList.push(dummypoint);
		dummypoint = {};
		dummypoint["day"] = 1;
		dummypoint["deviceId"] = 2;
		weekPointList.push(dummypoint);
		
		var now = new Date();
		var time1 = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
		print(time1); // 48880
		time2 = time1 + 30;
		time3 = time1 - 60;
		time1 = time1 + 50;
		
		var startdate = now; //new Date(2011,0,5).getTime();
		//var startdate2 = new Date(2011,0,5).getTime();
		
		//ID = ID for storage
		//Key is position in list, returned from "addJob"
		var execFunc = function(job){ print("Custom execute function running"); print("Job: " + job.v.name); return 42; };
		var job = new com.telldus.scheduler.JobRecurringWeek({id: 4, executeFunc: execFunc, name: "testnamn14", type: com.telldus.scheduler.JOBTYPE_RECURRING_WEEK, startdate: startdate, lastRun: 0, device: 1, method: 1, value: ""});
		var event = {};
		event.d = {id: 0, value: 3, fuzzinessBefore: 0, fuzzinessAfter: 0, type: com.telldus.scheduler.EVENTTYPE_ABSOLUTE, offset: 0, time: 300};  //(new Date().getTime())/1000 + 20
		job.addEvent(event);
		//job.addEvent(new Event({id: 0, value: "", fuzzinessBefore: 0, fuzzinessAfter: 0, type: com.telldus.scheduler.EVENTTYPE_ABSOLUTE, offset: 10, time: (new Date().getTime())/1000 + 20}));
		com.telldus.scheduler.addJob(job);
		//newRecurringMonthJob.save();
		/*
		var newAbsoluteJob = getJob({id: 5, name: "testnamn15", type: com.telldus.scheduler.JOBTYPE_RECURRING_MONTH, startdate: startdate2, lastRun: 0, device: 1, method: 1, value: "", pastGracePeriod: 90});
		newAbsoluteJob.addEvent(new Event({id: 1, value: "00-05", fuzzinessBefore: 0, fuzzinessAfter: 0, type: com.telldus.scheduler.EVENTTYPE_ABSOLUTE, offset: 0, time: time2}));
		newAbsoluteJob.addEvent(new Event({id: 2, value: "00-05", fuzzinessBefore: 0, fuzzinessAfter: 0, type: com.telldus.scheduler.EVENTTYPE_ABSOLUTE, offset: 0, time: time3}));
		//newAbsoluteJob.save();
		com.telldus.scheduler.addJob(newAbsoluteJob);
		*/
		//END FROM STORAGE
		
		view.setProperty('weekPointList', weekPointList);
		
		//set images:
		view.setProperty("imageTriggerSunrise", "sunrise.png");
		view.setProperty("imageTriggerSunset", "sunset.png");
		view.setProperty("imageTriggerAbsolute", "absolute.png");
		view.setProperty("imageActionOn", "on.png");
		view.setProperty("imageActionOff", "off.png");
		view.setProperty("imageActionDim", "dim.png");
		view.setProperty("imageActionBell", "bell.png");
		view.setProperty("imageInfo", "info.png");
		
		//height/width constants
		view.setProperty("constBarHeight", 10);
		view.setProperty("constDeviceRowHeight", 50);
		view.setProperty("constDeviceRowWidth", 600);
		view.setProperty("constPointWidth", 30);
		
		view.load("main.qml");
		application.addWidget("scheduler.simple", "icon.png", view);

	}

	function addDevice() {
		deviceList.push({name:'Stallet istallet'});
	}
	
	function getSun(riseset, rowWidth, pointWidth){
		var date = new Date();
		var timevalues = com.telldus.suncalculator.riseset(date);
		var hourminute;
		if(riseset == "rise"){
			hourminute = timevalues[0].split(':');
		}
		else{
			hourminute = timevalues[1].split(':');
		}
		var hourSize = rowWidth/24;
		return hourSize*hourminute[0] + hourSize * (hourminute[1]/60) - pointWidth/2;
	}
	
	//Raw sun data
	function getSunData(){
		var date = new Date;
		return com.telldus.suncalculator.riseset(date);
	}
	
	function getSunRiseTime(rowWidth, pointWidth){
		
		return getSun("rise", rowWidth, pointWidth);
	}
	
	function getSunSetTime(rowWidth, pointWidth){
		return getSun("set", rowWidth, pointWidth);
	}

	return { //Public functions
		init:init
	}

}();

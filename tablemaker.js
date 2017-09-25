// make the table

var table = $("#tablemaker");

var dayToDayName = {
	0 : "Sunday", 
	1 : "Monday", 
	2 : "Tuesday",
	3 : "Wednesday",
	4 : "Thursday",
	5 : "Friday",
	6 : "Saturday"
};

var monthToMonthName = {
	8 : "September",
	9 : "October",
	10 : "November",
	11 : "December"
};

function getDayOfWeek(inputDate, dayOfWeekIndex) {
	var newDate = new Date(inputDate);
	newDate.setDate(newDate.getDate() + dayOfWeekIndex);
	return newDate;
}

function getWeek(week) {
	var startDate = new Date(2017, 08, 24);
	startDate.setDate(startDate.getDate() + 7 * (week - 1));
	return startDate;
}

function dateEntryString(date) {
	return dayToDayName[date.getDay()] + ', ' + monthToMonthName[date.getMonth()] + ' ' + date.getDate();
}

function makeStringFromSpeakerInfo(speakerInfo) {
	return '<b>' + speakerInfo.name + ', ' + speakerInfo.title + '</b> '
		  + speakerInfo.blurb + '<br><br>' + speakerInfo.intro;
}

function speakerAtWeek(week) {
	var speakerInfo = speakers[week];
	var htmlSource;
	if (speakerInfo) {
		htmlSource = makeStringFromSpeakerInfo(speakerInfo)	
	} else {
		htmlSource = '<b>TBA, TBA</b> ';
	}
	return htmlSource;
	
}

function workshopAtWeek(week) {
	var description = workshops[week];
	if (description.name && description.title && description.blurb && description.intro) {
		description = makeStringFromSpeakerInfo(description);
	}
	if (!workshops[week]) {
		description = "TA-led working period.";
	}
	return description;
}

function homeworkAtWeek(week) {
	if (week === 1) {
		return 'HW 1 has a soft due date today.';
	}
	return 'HW ' + week + ' due.';
}

for (var week = 1; week <= 3; week++) {
	var thisWeek = getWeek(week);
	var nextWeek = getWeek(week + 1);

	// get speaker
	table.append('<tr><td>' 
		+ dateEntryString(getDayOfWeek(thisWeek, 2)) 
		+ '</td><td>'
		+ speakerAtWeek(week)
		+ '</td></tr>'
	);

	// get workshop
	table.append('<tr><td>' 
		+ dateEntryString(getDayOfWeek(thisWeek, 4)) 
		+ '</td><td>'
		+ workshopAtWeek(week)
		+ '</td></tr>'
	);

	if (week != 10) {
		table.append(
			'<tr><td>' 
			+ dateEntryString(getDayOfWeek(nextWeek, 1)) 
			+ '</td><td>'
			+ homeworkAtWeek(week)
			+ '</td></tr>'
		);
	}

}

table.append(
	'<tr><td>' 
	+ 'more dates...' 
	+ '</td><td>'
	+ 'more information coming...'
	+ '</td></tr>'
);

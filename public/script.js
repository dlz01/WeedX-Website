$('#fileUpload').on('change', function(e) {
	var file = e.target.files[0];
	var reader = new FileReader();
	reader.onload = function(e) {
	var contents = e.target.result;
	var lines = contents.split("\n");
	var ts = [];
	var times = [];
	var records = [];
	var latitudes = [];
	var longitudes = [];
	var irtsBeforeTarget = [];
	var irtsBeforeSensor = [];
	var irtsAfterTarget = [];
	var irtsAfterSensor = [];

	for (var i = 3; i < lines.length; i++) {
		var line = lines[i].split(",");
		var timestamp = line[0].replace(/"/g, '');
		var date = timestamp.split(" ")[0];
		var time = timestamp.split(" ")[1];
		times.push(time);
		ts.push(timestamp);
		records.push(line[1]);
		latitudes.push(line[2]);
		longitudes.push(line[3]);
		irtsBeforeTarget.push(line[4]);
		irtsBeforeSensor.push(line[5]);
		irtsAfterTarget.push(line[6]);
		irtsAfterSensor.push(line[7]);
	}
	populateDropdown('#timeDropdown', times);
	
	$('#timeDropdown').on('change', function() {
		var selectedTime = $('#timeDropdown').val();
		if (selectedTime != '') {
			var timestamp = selectedTime;
			var index = ts.indexOf(selectedTime);
			var record = records[index];
			var latitude = latitudes[index];
			var longitude = longitudes[index];
			var irtBeforeTarget = irtsBeforeTarget[index];
			var irtBeforeSensor = irtsBeforeSensor[index];
			var irtAfterTarget = irtsAfterTarget[index];
			var irtAfterSensor = irtsAfterSensor[index];
	
			var output = 'Timestamp: ' + timestamp + '<br>';
			output += 'Record number: ' + record + '<br>';
			output += 'Latitude: ' + latitude + '<br>';
			output += 'Longitude: ' + longitude + '<br>';
			output += 'IRT Before Target: ' + irtBeforeTarget + ' \xB0C<br>';
			output += 'IRT Before Sensor: ' + irtBeforeSensor + ' \xB0C<br>';
			output += 'IRT After Target: ' + irtAfterTarget + ' \xB0C<br>';
			output += 'IRT After Sensor: ' + irtAfterSensor + ' \xB0C';
	
			$('#timestampInfo').html(output);
		} else {
			$('#timestampInfo').html('');
		}
		});
	};
	reader.readAsText(file);
});

function populateDropdown(selector, values) {
	var dropdown = $(selector);
	dropdown.empty();
	$.each(values, function(index, value) {
	dropdown.append($('<option></option>').attr('value', value).text(value));
	});
}
  


$('#fileUpload').on('change', function(event) {
  var fileInput = event.target;
  var fileCount = fileInput.files.length;

  var fileLabel = [];
  var fileData = new Map();
  var files = event.target.files;

  for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var reader = new FileReader();
      reader.onload = function(e) {
        var contents = e.target.result;
        var lines = contents.split("\n");
        var tempLabel =lines[1].split(","); 
        for (i = 0; i < tempLabel.length; i++) {
          fileLabel.push(tempLabel[i].replace(/"/g, ''));
        }
        for (i = 4; i < lines.length; i++) {
          var line = lines[i].split(",")
          fileData.set(line[0], line.slice(1));
        }
      };
      reader.readAsText(file);
    }
  // displayFileContents(fileData.size);
});

/* globals Chart:false, feather:false */

// function plotChart() {
// 	'use strict'
  
// 	feather.replace()
  
// 	// Graphs
// 	var ctx = document.getElementById('myChart')
// 	// eslint-disable-next-line no-unused-vars
// 	var myChart = new Chart(ctx, {
// 	  type: 'line',
// 	  data: {
// 		labels: [
// 		  '2023-05-31 00:15:00',
// 		  '2023-05-31 00:30:00',
// 		  '2023-05-31 00:45:00',
// 		  '2023-05-31 01:00:00',
// 		  '2023-05-31 01:15:00',
// 		  '2023-05-31 01:30:00',
// 		  '2023-05-31 01:45:00'
// 		],
// 		datasets: [{
// 		  data: [
// 			8.79,
// 			8.7,
// 			8.19,
// 			7.499,
// 			7.211,
// 			8.35,
// 			8.44
// 		  ],
// 		  lineTension: 0,
// 		  backgroundColor: 'transparent',
// 		  borderColor: '#007bff',
// 		  borderWidth: 4,
// 		  pointBackgroundColor: '#007bff'
// 		}]
// 	  },
// 	  options: {
// 		scales: {
// 		  yAxes: [{
// 			ticks: {
// 			  beginAtZero: false
// 			}
// 		  }]
// 		},
// 		legend: {
// 		  display: false
// 		}
// 	  }
// 	})
//   }
//   plotChart();
$('#fileUpload').on('change', function(e) {
	var file = e.target.files[0];
	var reader = new FileReader();
	reader.onload = function(e) {
	var contents = e.target.result;
	var lines = contents.split("\n");
	var ts = [];
	var dates = [];
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
		if (!dates.includes(date)) {
		dates.push(date);
		}
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
	populateDropdown('#dateDropdown', dates);
	populateDropdown('#timeDropdown', times);
	
	$('#dateDropdown, #timeDropdown').on('change', function() {
		var selectedDate = $('#dateDropdown').val();
		var selectedTime = $('#timeDropdown').val();
		if (selectedDate != '' && selectedTime != '') {
			var timestamp = selectedDate + ' ' + selectedTime;
			var index = ts.indexOf(selectedDate + " " + selectedTime);
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

// function processFiles(event, fileLabel, fileData){
//   var files = event.target.files;

//   for (var i = 0; i < files.length; i++) {
//       var file = files[i];
//       var reader = new FileReader();
//       reader.onload = function(e) {
//         var contents = e.target.result;
//         var lines = contents.split("\n");
//         var tempLabel =lines[1].split(","); 
//         for (i = 0; i < tempLabel.length; i++) {
//           fileLabel.push(tempLabel[i].replace(/"/g, ''));
//         }
//         for (i = 4; i < lines.length; i++) {
//           var line = lines[i].split(",")
//           fileData.set(line[0], line.slice(1));
//         }
//         displayFileContents(fileData.size);
//       };
//       reader.readAsText(file);
//     }
    
//   }


function displayFileContents(content) {
  $("#timestampInfo").append(content + "\n");
}
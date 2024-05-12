// Initialize tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	return new bootstrap.Tooltip(tooltipTriggerEl)
})


// document ready
$(document).ready(function () {
	
	// prevent Bootstrap modal from closing when clicking outside
	$("#modal-dialog-box").modal({backdrop: 'static', keyboard: false });
	$("#modal-confirm-dialog-box").modal({backdrop: 'static', keyboard: false });
	$("#modal-delete-dialog").modal({backdrop: 'static', keyboard: false });
	$("#modal-restore-dialog").modal({backdrop: 'static', keyboard: false });
	
	function showDialogMessage(title, arr_notif){
		var message = "";
		// change title
		$(".modal-title").text(""+title);
			
		if (!Array.isArray(arr_notif)) {
			$(".modal-body").html("<p>"+arr_notif+"</p>");
		}else{
			// Print all elements in the array
			$.each(arr_notif, function(index, value) {
				message += (index+1) + ". " + value +"<br/>";
			});
			$(".modal-body").html("<p>"+message+"</p>");
		}
		// show modal
		$('#modal-dialog-box').modal('show');
	}
	
	function showConfirmDialogMessage(){
		$(".modal-title").text("Confirm Dialog Message");
		$(".modal-body").html("<p>Are you sure want to create new class for students?</p>");
		$('#modal-confirm-dialog-box').modal('show'); // show modal
	}
	
	function hideConfirmDialogMessage(){
		$(".modal-title").text("Confirm Dialog Message");
		$(".modal-body").html("<p>Are you sure want to create new class for students?</p>");
		$('#modal-confirm-dialog-box').modal('hide'); // show modal
	}
	
	function showUpdateConfirmDialogMessage(){
		$(".modal-title").text("Update Class Dialog");
		$(".modal-body").html("<p>Are you sure want to update this class information?</p>");
		$('#modal-confirm-dialog-box').modal('show'); // show modal
	}
	
	function hideUpdateConfirmDialogMessage(){
		$(".modal-title").text("Update Class Dialog");
		$(".modal-body").html("<p>Are you sure want to update this class information?</p>");
		$('#modal-confirm-dialog-box').modal('hide'); // show modal
	}
	
	
	// handle Bootstrap DropDown with specific ID
	$('#dropdown-list-1 a').on('click', function(){
		$('#input-fakultas').val($(this).text());
	});
	
	$('#dropdown-list-2 a').on('click', function(){
		$('#input-jurusan').val($(this).text());
	});
	
	$('#dropdown-list-3 a').on('click', function(){
		$('#input-sks').val($(this).text());
	});
	
		
	// objek yang berisi data untuk dropdown-list-5
	var dropdownData = {
		'Gedung Administrasi (GA)': ["GA English Lab 3", "GA English Lab 2", "GA English Lab 1", "GA Computer Lab 204/FEB", "GA Computer Lab 203/FIK", "GA Computer Lab 202/FIK", "GA Computer Lab 201/FIK"],
		'Gedung Kuliah 1 (GK1)': ["GK1-101", "GK1-102", "GK1-103", "GK1-104", "GK1-105", "GK1-106", "GK1 Nursing Lab (Demo Room)", "GK1-301", "GK1-302", "GK1-303", "GK1-304", "GK1 Keyboarding I Lab", "GK1-305 Keyboarding II Lab", "GK1-306", "GK1-307", "GK1-308", "GK1-401", "GK1-402", "GK1-403", "GK1-404", "GK1-405", "GK1-406", "GK1-501", "GK1-502", "GK1-503 Comp. Lab", "GK1-504", "GK1-505", "GK1-506"],
		'Gedung Kuliah 2 (GK2)': ["GK2-Computer Lab-1", "GK2-Computer Lab-2", "GK2-111 Agro. Lab", "GK2-Tissue Culture Lab", "GK2-101", "GK2-102", "GK2-103", "GK2-104", "GK2-105", "GK2-106", "GK2-107", "GK2-108", "GK2-112", "GK2-113", "GK2-114", "GK2-118", "GK2-119"],
		'Gedung Kuliah 3 (GK3)': ["GK3-201", "GK3-202", "GK3-203", "GK3-204", "GK3-205", "GK3-304", "GK3-305"]
	};
	
	//data latitude dan longitude
	var dropdownDataLatLong = {
		'GA English Lab 3': ["1,4174253", "124,9836026"],
		'GA English Lab 2': ["1,4173484", "124,9838573"],
		'GA English Lab 1': ["1,4174181", "124,9841227"],
		'GA Computer Lab 204/FEB': ["1.4174909", "124,9844905"],
		'GA Computer Lab 203/FIK': ["1,4175326", "124,9841416"],
		'GA Computer Lab 202/FIK': ["1,4174176", "124,9840658"],
		'GA Computer Lab 201/FIK': ["1,4174248", "124,9841568"],
		'GK1-101': ["1,4178155", "124,9844905"],
		'GK1-102': ["1,4178983", "124,9845476"],
		'GK1-103': ["1,4179626", "124,9846216"],
		'GK1-104': ["1,4182835", "124,9845433"],
		'GK1-105': ["1,4826058", "124,9845271"],
		'GK1-106': ["1,4184335", "124,9844819"],
		'GK1 Nursing Lab (Demo Room)': ["1,4180611", "124,9845825"],
		'GK1-301': ["1,4181537", "124,9846381"],
		'GK1-302': ["1,4181537", "124,9846381"],
		'GK1-303': ["1,4183274", "124,9846078"],
		'GK1-304': ["1,4184228", "124,9846002"],
		'GK1 Keyboarding I Lab': ["1,4180259", "124,9846359"],
		'GK1-305 Keyboarding II Lab': ["1,4181756", "124,9846116"],
		'GK1-306': ["1,4183622", "124,9848036"],
		'GK1-307': ["1,4183435", "124,9845074"],
		'GK1-308': ["1,4185623", "124,9545024"],
		'GK1-401': ["1,4178605", "124,9846362"],
		'GK1-402': ["1,4179427", "124,9846065"],
		'GK1-403': ["1,4180298", "124,9845498"],
		'GK1-404': ["1,4182379", "124,9845644"],
		'GK1-405': ["1,4182888", "124,9845059"],
		'GK1-406': ["1,4184621", "124,9845612"],
		'GK1-501': ["1,4177473", "124,9845877"],
		'GK1-502': ["1,4179656", "124,9845881"],
		'GK1-503 Comp. Lab': ["1,4179118", "124,9845901"],
		'GK1-504': ["1,4182134", "124,9846516"],
		'GK1-505': ["1,4183505", "124,9845444"],
		'GK1-506': ["1,4184206", "124,9844559"],
		'GK2-Computer Lab-1': ["1,4172103", "124,9826171"],
		'GK2-Computer Lab-2': ["1,4171792", "124,9826769"],
		'GK2-111 Agro. Lab': ["1,4172688", "124,9824489"],
		'GK2-Tissue Culture Lab': ["1,4171627", "124,9826959"],
		'GK2-101': ["1,4172996", "124,9828546"],
		'GK2-102': ["1,4172764", "124,9828937"],
		'GK2-103': ["1,4172063", "124,9828819"],
		'GK2-104': ["1,4171919", "124,9828838"],
		'GK2-105': ["1,4172182", "124,9828458"],
		'GK2-106': ["1,4171261", "124,9828538"],
		'GK2-107': ["1,4171284", "124,9826344"],
		'GK2-108': ["1,4172431", "124,9825897"],
		'GK2-112': ["1,4176944", "124,9827161"],
		'GK2-113': ["1,4178443", "124,9828882"],
		'GK2-114': ["1,4176154", "124,9828991"],
		'GK2-118': ["1,4172994", "124,9827578"],
		'GK2-119': ["1,4173513", "124,9827804"],
		'GK3-201': ["1,4186612", "124,9845633"],
		'GK3-202': ["1,4190949", "124,9845743"],
		'GK3-203': ["1,4191753", "124,9845743"],
		'GK3-204': ["1,4190234", "124,9845669"],
		'GK3-205': ["1,4190636", "124,9844501"],
		'GK3-304': ["1,4188871", "124,9845234"],
		'GK3-305': ["1,4194152", "124,9844051"]
	};

	// handle when building item is selected (GA, GK1, GK2 dan GK3).
	$('#dropdown-list-4 .dropdown-item').click(function() {
		var selectedBuilding = $(this).text();
		var dropdownList5 = $('#dropdown-list-5');
		dropdownList5.empty();
		// tambahkan item pada dropdown-list-5 berdasarkan item yang dipilih pada dropdown-list-4
		var rooms = dropdownData[selectedBuilding];
		if (rooms && rooms.length) {
		  for (var i = 0; i < rooms.length; i++) {
			dropdownList5.append('<a class="dropdown-item">' + rooms[i] + '</a>');
		  }
		} else {
		  dropdownList5.append('<a class="dropdown-item">No rooms available</a>');
		}
		
		// mengganti label pada button dropdown
		$('#btn-building').text(selectedBuilding);
		
		// mengganti label pada button room dan input field longitude dan latitude
		$('#btn-room').text("Select Room:");
		$('#input-longitude').val("");
		$('#input-latitude').val("");
	});
	
	
	// handle set value when click button room
	$('#dropdown-list-5').on('click', '.dropdown-item', function() {
	  // get text label
	  var selectedRoom = $(this).text();
		
	  // mengganti label pada button dropdown
	  $('#btn-room').text(selectedRoom);
	  
	  // get latitude dan longitude
	  var posisi = dropdownDataLatLong[selectedRoom];
	  $('#input-latitude').val(""+posisi[0]);
	  $('#input-longitude').val(""+posisi[1]);
	  
	});
	
	// handle set value when click button "Day"
	$('#dropdown-list-6 .dropdown-item').click(function() {
		// get text label
		var selectedDay = $(this).text();
		
		// mengganti label pada button dropdown
		$('#btn-day').text(selectedDay);
	});
	
	// handle set value when click button "Time/Waktu"
	$('#dropdown-list-7 .dropdown-item').click(function() {
		// get text label
		var selectedTime = $(this).text();
		
		// mengganti label pada button dropdown
		$('#btn-time').text(selectedTime);
	});
	

	
	var target_url = "";
	var id_unique = "";
	var email_lecturer = "";
	var code_class = "";
	var name_subject = "";
	var name_lecturer = "";
	var fakultas = "";
	var prodi = "";
	var sks = "";
	var room_number = "";
	var room_lat = "";
	var room_long = "";
	var jadwal_class = "";
	
	// handle button button create class
	$("#btn-create-class").click(function (e) {
		// array check error
		var arr_notifications = [];
		
		// get input input fields
		target_url = $("#target-url").data("url");
		id_unique = $('#input-id-unique').val();
		email_lecturer = $('#input-email').val();
		room_number = $('#btn-room').text(); // dropdown-list-5 untuk room.
		
		code_class = $('#input-class-code').val().trim();
		if (code_class === '') {
			//console.error("Class code is required.");
			// Add a new item to the end of the array
			arr_notifications.push("Class code is required.");
		}

		name_subject = $('#input-matakuliah').val().trim();
		if (name_subject === '') {
		  //console.error("Subject name is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Subject name is required.");
		}

		name_lecturer = $('#input-nama-pengajar').val().trim();
		if (name_lecturer === '') {
		  //console.error("Lecturer name is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Lecturer name is required.");
		}

		fakultas = $('#input-fakultas').val();
		if (!fakultas) {
		  //console.error("Faculty is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Faculty is required.");
		}

		prodi = $('#input-jurusan').val();
		if (!prodi) {
		  //console.error("Program study is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Program study is required.");
		}

		sks = $('#input-sks').val();
		if (!sks) {
		  //console.error("Credit is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Credit is required.");
		}

		room_lat = $('#input-latitude').val();
		room_long = $('#input-longitude').val();
		if (!room_lat) {
		  //console.error("Room latitude is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("The room's coordinates (latitude and longitude) are required.");
		}

		get_days = $('#btn-day').text();
		if ($.trim(get_days) === $.trim("Select Day:")) {
		  //console.error("Day is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("The day for the course schedule is required.");
		}

		get_time = $('#btn-time').text();
		if ($.trim(get_time) === $.trim("Select Time:")) {
		  console.error("Time is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("The time for the course schedule is required.");
		}
		
		jadwal_class =  get_days+", "+get_time;
		
		// error handling
		if (arr_notifications.length !== 0) {
			// show modal dialog
			showDialogMessage("Empty Input Fields", arr_notifications);
			
		} else { // array not empty
			// show modal dialog
			showConfirmDialogMessage();
		
		}	
	});
	
	// handle button confirm dialog message to create class
	$("#action-create-class").click(function (e) {
		// Call ajax
		$.ajax({
			type: "POST",
			url: ""+target_url+"/dosen/create",
			data: {"id-unique-class": id_unique,
				   "email-lecturer": email_lecturer,
				   "code-class": code_class,
				   "subject-name": name_subject,
				   "lecturer-name": name_lecturer,
				   "facultas": fakultas,
				   "prodi": prodi,
				   "sks": sks,
				   "building-room-number": room_number,
				   "room-latitude": room_lat,
				   "room-longitude": room_long,
				   "jadwal-day-time": jadwal_class
				  },
			dataType:'text', //or HTML, JSON, etc.
			success: function(response){
				// hide modal dialog
				hideConfirmDialogMessage();
				
				if (response.indexOf("Create new class berhasil") !== -1) { // ditemukan
					//alert("MANTAP SUKSES");
					showDialogMessage("New Class Created", "You have successfully created a new class.");
					
					// redirect atau mengarahkan halaman
					window.location.href = target_url+"/dosen/active/";
					//location.reload(); // reload the same page

				}else if (response.indexOf("Duplicate entry") !== -1) {
					showDialogMessage("Duplicate Data Entry", "You already have the same class id data.");
					
				}else{
					//alert("MAAF DICOBA LAGI TERJADI ERROR.");
					showDialogMessage("Error Problem Occurs", "You have a problem, please try again.");
				}
				
			},
			error: function(xhr, status, error){
			 console.error(xhr);
			 alert(xhr);
			}
		});
	});
	
	// handle button update class
	$("#btn-update-class").click(function (e) {
		// array check error
		var arr_notifications = [];
		
		// get input input fields
		target_url = $("#target-url").data("url");
		id_unique = $('#input-id-unique').val();
		email_lecturer = $('#input-email').val();
		room_number = $('#btn-room').text(); // dropdown-list-5 untuk room.
		
		code_class = $('#input-class-code').val().trim();
		if (code_class === '') {
			//console.error("Class code is required.");
			// Add a new item to the end of the array
			arr_notifications.push("Class code is required.");
		}

		name_subject = $('#input-matakuliah').val().trim();
		if (name_subject === '') {
		  //console.error("Subject name is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Subject name is required.");
		}

		name_lecturer = $('#input-nama-pengajar').val().trim();
		if (name_lecturer === '') {
		  //console.error("Lecturer name is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Lecturer name is required.");
		}

		fakultas = $('#input-fakultas').val();
		if (!fakultas) {
		  //console.error("Faculty is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Faculty is required.");
		}

		prodi = $('#input-jurusan').val();
		if (!prodi) {
		  //console.error("Program study is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Program study is required.");
		}

		sks = $('#input-sks').val();
		if (!sks) {
		  //console.error("Credit is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Credit is required.");
		}

		room_lat = $('#input-latitude').val();
		room_long = $('#input-longitude').val();
		if (!room_lat) {
		  //console.error("Room latitude is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Room coordinate positions (latitude and longitude) are required.");
		}

		get_days = $('#btn-day').text();
		if ($.trim(get_days) === $.trim("Select Day:")) {
		  //console.error("Day is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Day in schedule of the course is required.");
		}

		get_time = $('#btn-time').text();
		if ($.trim(get_time) === $.trim("Select Time:")) {
		  console.error("Time is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Time in schedule of the course is required.");
		}
		
		jadwal_class =  get_days+", "+get_time;
		
		// error handling
		if (arr_notifications.length !== 0) {
			// show modal dialog
			showDialogMessage("Empty Input Fields", arr_notifications);
			
		} else { // array not empty
			// show modal dialog
			showUpdateConfirmDialogMessage();
		
		}	
	});
	
	// handle button confirm dialog message to update class
	$("#action-update-class").click(function (e) {
		// Call ajax
		$.ajax({
			type: "POST",
			url: ""+target_url+"/dosen/updateclass",
			data: {"id-unique-class": id_unique,
				   "email-lecturer": email_lecturer,
				   "code-class": code_class,
				   "subject-name": name_subject,
				   "lecturer-name": name_lecturer,
				   "facultas": fakultas,
				   "prodi": prodi,
				   "sks": sks,
				   "building-room-number": room_number,
				   "room-latitude": room_lat,
				   "room-longitude": room_long,
				   "jadwal-day-time": jadwal_class
				  },
			dataType:'text', //or HTML, JSON, etc.
			success: function(response){
				// hide modal dialog
				hideConfirmDialogMessage();
				
				if (response.indexOf("Updated info class berhasil.") !== -1) { // ditemukan
					//alert("MANTAP SUKSES");
					showDialogMessage("Class Info Updated", "You have successfully updated the class information.");
					
					// redirect atau mengarahkan halaman
					window.location.href = target_url+"/dosen/active/";
					//location.reload(); // reload the same page

				}else if (response.indexOf("Duplicate entry") !== -1) {
					showDialogMessage("Duplicate Data Entry", "You already have the same class id data.");
					
				}else{
					//alert("MAAF DICOBA LAGI TERJADI ERROR.");
					showDialogMessage("Error Problem Occurs", "You have a problem, please try again.");
				}
				
			},
			error: function(xhr, status, error){
			 console.error(xhr);
			 alert(xhr);
			}
		});
	});
	
	// Handle button "Delete Class"
	$('tr').on('click', '.dropdown-item:contains("Delete Class")', function() {
		var class_id = $(this).closest('tr').attr("id");
		var namaKelas = $(this).closest('tr').find('#matakuliah').text();
		//alert("ID: "+class_id+", Class name: " + namaKelas);
		
		var defaultlink = $('#delete-class').attr('href')+"delete/"+class_id;
		//alert(defaultlink);

		// show modal
		$("#modal-delete-dialog .course-name").val(namaKelas);
		$('#delete-class').attr('href', ''+defaultlink);
		$('#modal-delete-dialog').modal('show'); // show modal
	});
	
	// Handle button "Restore Class"
	$('tr').on('click', '.dropdown-item:contains("Restore Class")', function() {
		var class_id = $(this).closest('tr').attr("id");
		var namaKelas = $(this).closest('tr').find('#matakuliah').text();
		//alert("ID: "+class_id+", Class name: " + namaKelas);
		
		var defaultlink = $('#delete-class').attr('href')+"restore/"+class_id;
		//alert(defaultlink);

		// show modal
		$("#modal-restore-dialog .course-name").val(namaKelas);
		$('#restore-class').attr('href', ''+defaultlink);
		$('#modal-restore-dialog').modal('show'); // show modal
  	});
	

	
});


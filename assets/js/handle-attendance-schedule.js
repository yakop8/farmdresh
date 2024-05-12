// document ready
$(document).ready(function () {
    // prevent Bootstrap modal from closing when clicking outside
	$("#modal-create-attendance-schedule-dialog").modal({backdrop: 'static', keyboard: false });
    $("#modal-update-attendance-schedule-dialog").modal({backdrop: 'static', keyboard: false });
    $("#modal-delete-attendance-dialog").modal({backdrop: 'static', keyboard: false });
    $("#modal-update-attendance-status-dialog").modal({backdrop: 'static', keyboard: false });
    $("#modal-show-detail-attendance-dialog").modal({backdrop: 'static', keyboard: false });

    // handle Bootstrap DropDown
	$('#modal-create-attendance-schedule-dialog #dropdown-time-1 a').on('click', function(){
		$('#input-class-time').val($(this).text());
	});

    $('#modal-create-attendance-schedule-dialog #dropdown-max-radiuszone-1 a').on('click', function(){
		$('#input-max-radius').val($(this).text());
	});

    $('#modal-update-attendance-schedule-dialog #dropdown-time-2 a').on('click', function(){
		$('#input-class-time2').val($(this).text());
	});

    $('#modal-update-attendance-schedule-dialog #dropdown-max-radiuszone-2 a').on('click', function(){
		$('#input-max-radius2').val($(this).text());
	});

    // event handler button new schedule
    $("#btn-new-schedule").click(function() {
        // show modal
        $('#modal-create-attendance-schedule-dialog').modal('show'); // show modal
    });

    // Handle button "Create New schedule"
    $("#btn-create-attendance").click(function() {
        // variables
        var target_url = $("#target-url").data("url");
        var title_attendance = "";
        var id_attendance = $('#input-id-attendance').val();
		var id_class = $('#input-id-class').val();
		var name_lecturer = $('#lecturer-name').val();
		var email_lecturer = $('#input-email').val();
        var course_name = $('#input-course-name').val();
		var room_latitude = $('#input-room-latitude').val();
		var room_longitude = $('#input-room-longitude').val();
		var date_attendance = "";
        var time_attendance = "";
        var max_radius = "";

        // array check error
		var arr_notifications = [];
		
		// get input fields
		title_attendance = $('#input-title-attendance').val().trim();
        if (title_attendance === '') {
			arr_notifications.push("Title schedule of the attendance is required.");
		}
          
		var inputDate = new Date($("#date-picker-attendance").val());
        if(inputDate == "Invalid Date"){
            arr_notifications.push("Select the date (invalid date) and it is required.");
        }else{
            var year = inputDate.getFullYear(); // Mendapatkan tahun dalam format 4 digit (contoh: 2023)
            //var month = ("0" + (inputDate.getMonth() + 1)).slice(-2); // Mendapatkan bulan dalam format 2 digit (contoh: 04)
            var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var month = monthNames[inputDate.getMonth()];
            var day = ("0" + inputDate.getDate()).slice(-2); // Mendapatkan tanggal dalam format 2 digit (contoh: 18)
            date_attendance = day + " " + month + " " + year; // Menggabungkan tahun, bulan, dan tanggal menjadi format "YYYY-MM-DD"
		}

        time_attendance = $('#input-class-time').val();
        if (time_attendance === '') {
			arr_notifications.push("Time schedule is required.");
		}

		max_radius = $('#input-max-radius').val();
		if (max_radius === '') {
			arr_notifications.push("Maximum radius is required.");
		}

        // error handling
		if (arr_notifications.length !== 0) {
			// put number in array error
            var numbered_notifications = arr_notifications.map(function(notification, index) {
                return (index + 1) + ". " + notification;
            });
            
            // show errors
            alert(numbered_notifications.join("\n"));
			
		} else { // array not empty
			// Call ajax
            $.ajax({
                type: "POST",
                url: ""+target_url+"/students/newattendance",
                data: {"id_attendance": id_attendance,
                    "id_class": id_class,
                    "title_attendance": title_attendance,
                    "name_lecturer": name_lecturer,
                    "email_lecturer": email_lecturer,
                    "name_lecturer": name_lecturer,
                    "room_latitude" : room_latitude,
                    "room_longitude" : room_longitude,
                    "course_name": course_name,
                    "date_attendance": date_attendance,
                    "time_attendance": time_attendance,
                    "max_radius": max_radius
                    },
                dataType:'text', //or HTML, JSON, etc.
                success: function(response){
                    //alert(response);
                    
                    if (response.indexOf("Create new attendance berhasil") !== -1) { // ditemukan
                        //alert("MANTAP SUKSES");
                        
                        // redirect atau mengarahkan halaman
                        window.location.href = target_url+"/students/attendance/"+id_class;
                        //location.reload(); // reload the same page
                    
                    }else if (response.indexOf("Duplicate entry") !== -1) {
                        alert("Maaf, terjadi kesalahan pengimputan database mohon dilakukan kembali.");
                        
                    }else{
                        alert("You have a problem, please try again.");
                    }
                    
                },
                error: function(xhr, status, error){
                console.error(xhr);
                alert(xhr);
                }
            });
		}	
    });


    // Handle button "Delete Attendance"
	$('tr').on('click', '.dropdown-item:contains("Delete Attendance")', function() {
		var attendance_id = $(this).closest('tr').attr("id");
		var attendance_title = $(this).closest('tr').find('#attendance-title').text();
		//alert("ID: "+attendance_id+", Attendance Title: " + attendance_title);
		
		// show modal
		$("#modal-delete-attendance-dialog .attendance-name").val(attendance_title);
		$("#modal-delete-attendance-dialog .id-attendance").val(attendance_id);
		$('#modal-delete-attendance-dialog').modal('show'); // show modal
	});

    // Handle button "Update Attendance"
	$('tr').on('click', '.dropdown-item:contains("Update Attendance")', function() {
		var attendance_id = $(this).closest('tr').attr("id");
		var attendance_title = $(this).closest('tr').find('#attendance-title').text();
		var attendance_time = $(this).closest('tr').find('#attendance-time').text();
		var attendance_date = $(this).closest('tr').find('#attendance-date').text();
		var attendance_radius = $(this).closest('tr').find('#attendance-radius').text();
		//alert("ID: "+attendance_id+", Title: " + attendance_title+", Radius: " + attendance_radius+", Date: "+attendance_date+", Time: "+attendance_time);
		
        // set values
        $("#modal-update-attendance-schedule-dialog #input-title-attendance2").val(attendance_title);
		$("#modal-update-attendance-schedule-dialog #input-id-attendance2").val(attendance_id);
		$("#modal-update-attendance-schedule-dialog #input-class-time2").val(attendance_time);
		$("#modal-update-attendance-schedule-dialog #input-max-radius2").val(attendance_radius);

        // set date value
        var date = new Date(Date.parse(attendance_date)); //membuat objek Date dari tanggal string
        var offset = date.getTimezoneOffset(); //mendapatkan offset waktu dari zona waktu lokal
        date.setMinutes(date.getMinutes() - offset); //menambahkan offset waktu ke objek tanggal
        var isoDate = date.toISOString().substring(0, 10); //mengubah format tanggal menjadi ISO dan mengambil bagian tanggal saja
        $("#modal-update-attendance-schedule-dialog #date-picker-attendance2").val(isoDate); //mengatur value input field

		// show modal
		//$("#modal-delete-attendance-dialog .id-attendance").val(attendance_id);
		$('#modal-update-attendance-schedule-dialog').modal('show'); // show modal
	});


    // Handle button "Update schedule Attendance"
    $("#btn-update-attendance").click(function() {
        // variables
        var target_url = $("#target-url2").data("url");
        var title_attendance = "";
        var id_attendance = $('#input-id-attendance2').val();
		var id_class = $('#input-id-class2').val();
		var name_lecturer = $('#lecturer-name2').val();
		var email_lecturer = $('#input-email2').val();
        var course_name = $('#input-course-name2').val();
		var room_latitude = $('#input-room-latitude2').val();
		var room_longitude = $('#input-room-longitude2').val();
		var date_attendance = "";
        var time_attendance = "";
        var max_radius = "";

        // array check error
		var arr_notifications = [];
		
		// get input fields
		title_attendance = $('#input-title-attendance2').val().trim();
        if (title_attendance === '') {
			arr_notifications.push("Title schedule of the attendance is required.");
		}
          
		var inputDate = new Date($("#date-picker-attendance2").val());
        if(inputDate == "Invalid Date"){
            arr_notifications.push("Select the date (invalid date) and it is required.");
        }else{
            var year = inputDate.getFullYear(); // Mendapatkan tahun dalam format 4 digit (contoh: 2023)
            //var month = ("0" + (inputDate.getMonth() + 1)).slice(-2); // Mendapatkan bulan dalam format 2 digit (contoh: 04)
            var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var month = monthNames[inputDate.getMonth()];
            var day = ("0" + inputDate.getDate()).slice(-2); // Mendapatkan tanggal dalam format 2 digit (contoh: 18)
            date_attendance = day + " " + month + " " + year; // Menggabungkan tahun, bulan, dan tanggal menjadi format "YYYY-MM-DD"
		}
       
        time_attendance = $('#input-class-time2').val();
        if (time_attendance === '') {
			arr_notifications.push("Time schedule is required.");
		}

		max_radius = $('#input-max-radius2').val();
		if (max_radius === '') {
			arr_notifications.push("Maximum radius is required.");
		}

        // error handling
		if (arr_notifications.length !== 0) {
			// put number in array error
            var numbered_notifications = arr_notifications.map(function(notification, index) {
                return (index + 1) + ". " + notification;
            });
            
            // show errors
            alert(numbered_notifications.join("\n"));
			
		} else { // array not empty
			// Call ajax
            $.ajax({
                type: "POST",
                url: ""+target_url+"/students/updateattendance",
                data: {"id_attendance": id_attendance,
                    "id_class": id_class,
                    "title_attendance": title_attendance,
                    "name_lecturer": name_lecturer,
                    "email_lecturer": email_lecturer,
                    "name_lecturer": name_lecturer,
                    "room_latitude" : room_latitude,
                    "room_longitude" : room_longitude,
                    "course_name": course_name,
                    "date_attendance": date_attendance,
                    "time_attendance": time_attendance,
                    "max_radius": max_radius
                    },
                dataType:'text', //or HTML, JSON, etc.
                success: function(response){
                    //alert(response);
                    
                    if (response.indexOf("Updated selected attendance berhasil") !== -1) { // ditemukan
                        //alert("MANTAP SUKSES");
                        
                        // redirect atau mengarahkan halaman
                        window.location.href = target_url+"/students/attendance/"+id_class;
                        //location.reload(); // reload the same page
                    
                    }else if (response.indexOf("Duplicate entry") !== -1) {
                        alert("Maaf, terjadi kesalahan pengimputan database mohon dilakukan kembali.");
                        
                    }else{
                        alert("You have a problem, please try again.");
                    }
                    
                },
                error: function(xhr, status, error){
                console.error(xhr);
                alert(xhr);
                }
            });
		}	
    });

    // handle Bootstrap DropDown with specific ID
	$('#dropdown-attendance-status-student a').on('click', function(){
		$('#input-status-student').val($(this).text());
	});

    // Handle button "Update Status Student Attendance"
	$('tr').on('click', '.dropdown-item:contains("Change Attendance Status")', function() {
		var attendance_student_name = $(this).closest('tr').find('#student-attendance-name').text();
		var attendance_student_email = $(this).closest('tr').find('#student-attendance-email').text();
		var attendance_student_status = $(this).closest('tr').find('#student-attendance-status').text();
		var attendance_student_note = $(this).closest('tr').find('#input-note-student').val();
		var attendance_time_taking = ""+$(this).closest('tr').find('#time-taking-attendance').text();
		//alert("Name: "+attendance_student_name+", Email: " + attendance_student_email+", Status: " + attendance_student_status+", Time: " + attendance_time_taking);
		
        // Handle status
        var status_absent = "";
        if (attendance_student_status === "Unexcused") {
            status_absent = "Unexcused absence";
        } else if (attendance_student_status === "Excused") {
            status_absent = "Excused absence";
        } else {
            status_absent = attendance_student_status;
        }

        // Hadle time taking absence
        var time_taking_attendance = "";
        if (attendance_time_taking === "Unavailable") {
            time_taking_attendance = "Unavailable";
        } else {
            time_taking_attendance = "Available";
        }

		// set values
		$("#modal-update-attendance-status-dialog #input-name-student").val(attendance_student_name);
		$("#modal-update-attendance-status-dialog #input-email-student").val(attendance_student_email);
		$("#modal-update-attendance-status-dialog #input-status-student").val(status_absent);
        $("#modal-update-attendance-status-dialog #input-time-taking-attendance").val(time_taking_attendance);
        $("#modal-update-attendance-status-dialog #input-status-note").val(attendance_student_note);
        
		// show modal
		$('#modal-update-attendance-status-dialog').modal('show'); // show modal
	});

    // Handle button "View Detail Student Attendance"
	$('tr').on('click', '.dropdown-item:contains("Show Details")', function() {
		var attendance_student_name = $(this).closest('tr').find('#student-attendance-name').text();
		var attendance_student_email = $(this).closest('tr').find('#student-attendance-email').text();
		var attendance_student_status = $(this).closest('tr').find('#student-attendance-status').text();
		var attendance_student_note = $(this).closest('tr').find('#input-note-student').val();
		var attendance_student_latitude = $(this).closest('tr').find('#input-latitude-student').val();
		var attendance_student_longtude = $(this).closest('tr').find('#input-longtude-student').val();
		//var attendance_time_taking = ""+$(this).closest('tr').find('#time-taking-attendance').text();
		//alert("Name: "+attendance_student_name+", Email: " + attendance_student_email+", Status: " + attendance_student_status+", Time: " + attendance_time_taking);
		
        // Handle status
        var status_absent = "";
        if (attendance_student_status === "Unexcused") {
            status_absent = "(U) Unexcused absence/tidak hadir";
        } else if (attendance_student_status === "Excused") {
            status_absent = "(E) Excused absence/izin";
        } else if (attendance_student_status === "Present") {
            status_absent = "(P) Present/Hadir";
        } else {
            status_absent = "(L) Late/terlambat";
        }
        
		// set values
		$("#modal-show-detail-attendance-dialog #input-name-student").val(attendance_student_name);
		$("#modal-show-detail-attendance-dialog #input-email-student").val(attendance_student_email);
		$("#modal-show-detail-attendance-dialog #input-status-student").val(status_absent);
        $("#modal-show-detail-attendance-dialog #input-status-note").val(attendance_student_note);
        $("#modal-show-detail-attendance-dialog #input-latitude-student").val(attendance_student_latitude);
        $("#modal-show-detail-attendance-dialog #input-longitude-student").val(attendance_student_longtude);
        
		// show modal
		$('#modal-show-detail-attendance-dialog').modal('show'); // show modal
	});




});


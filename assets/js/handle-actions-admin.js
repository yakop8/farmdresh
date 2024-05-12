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
		$(".modal-body").html("<p>Are you sure want to create new Operator?</p>");
		$('#modal-confirm-dialog-box').modal('show'); // show modal
	}
	
	function hideConfirmDialogMessage(){
		$(".modal-title").text("Confirm Dialog Message");
		$(".modal-body").html("<p>Are you sure want to create new Operator?</p>");
		$('#modal-confirm-dialog-box').modal('hide'); // show modal
	}
	
	function showUpdateConfirmDialogMessage(){
		$(".modal-title").text("Update User Dialog");
		$(".modal-body").html("<p>Are you sure want to update this User information?</p>");
		$('#modal-confirm-dialog-box').modal('show'); // show modal
	}
	
	function hideUpdateConfirmDialogMessage(){
		$(".modal-title").text("Update User Dialog");
		$(".modal-body").html("<p>Are you sure want to update this User information?</p>");
		$('#modal-confirm-dialog-box').modal('hide'); // show modal
	}
	
	
	// handle Bootstrap DropDown with specific ID
	$('#dropdown-list-1 a').on('click', function(){
		$('#input-role').val($(this).text());
	});	
	


	
	var target_url = "";
	var nip = "";
	var email = "";
	var fullname = "";
	var password = "";
	var phone_number = "";
	var role = "";
	
	
	// handle button button User
	$("#btn-create-user").click(function (e) {
		// array check error
		var arr_notifications = [];
		
		// get input input fields
		target_url = $("#target-url").data("url");
		
		nip = $('#input-nip').val().trim();
		if (nip === '') {
			//console.error("NIP is required.");
			// Add a new item to the end of the array
			arr_notifications.push("NIP is required.");
		}

		email = $('#input-email').val().trim();
		if (email === '') {
		  //console.error("Email is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Email is required.");
		}

		fullname = $('#input-fullname').val().trim();
		if (fullname === '') {
		  //console.error("Full name is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Full Name is required.");
		}

		password = $('#input-password').val().trim();
		if (password === '') {
		  //console.error("Password is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Password is required.");
		}

		phone_number = $('#input-phone-number').val().trim();
		if (phone_number === '') {
		  //console.error("Phone Number is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Phone Number is required.");
		}

		role = $('#input-role').val().toLowerCase();
		if (!role) {
		  //console.error("Role is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Role is required.");
		}

		
		// error handling
		if (arr_notifications.length !== 0) {
			// show modal dialog
			showDialogMessage("Empty Input Fields", arr_notifications);
			
		} else { // array not empty
			// show modal dialog
			showConfirmDialogMessage();
		
		}	
	});

	
	// handle button confirm dialog message to create User
	$("#action-create-user").click(function (e) {
		// Call ajax
		$.ajax({
			type: "POST",
			url: ""+target_url+"/admin/create",
			data: {"nip-user": nip,
				   "email-user": email,
				   "fullname-user": fullname,
				   "password-user": password,
				   "phone-number-user": phone_number,
				   "role-user": role
				  },
			dataType:'text', //or HTML, JSON, etc.
			success: function(response){
				// hide modal dialog
				hideConfirmDialogMessage();
				
				if (response.indexOf("Create new User successfully") !== 1) { // ditemukan
					//alert("MANTAP SUKSES");
					showDialogMessage("New User Created", "You have successfully created a new User.");
					
					// redirect atau mengarahkan halaman
					window.location.href = target_url+"/admin/index/";
					//location.reload(); // reload the same page

				}else if (response.indexOf("Duplicate entry") !== -1) {
					showDialogMessage("Duplicate Data Entry", "You already have the same User data.");
					
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
	
	// handle button update User
	$("#btn-update-user").click(function (e) {
		// array check error
		var arr_notifications = [];
		
		// get input input fields
		target_url = $("#target-url").data("url");
		
		nip = $('#input-nip').val().trim();
		if (nip === '') {
			//console.error("NIP is required.");
			// Add a new item to the end of the array
			arr_notifications.push("NIP is required.");
		}

		email = $('#input-email').val().trim();
		if (email === '') {
		  //console.error("Email is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Email is required.");
		}

		fullname = $('#input-fullname').val().trim();
		if (fullname === '') {
		  //console.error("Full name is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Full Name is required.");
		}

		password = $('#input-password').val().trim();
		if (password === '') {
		  //console.error("Password is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Password is required.");
		}

		phone_number = $('#input-phone-number').val().trim();
		if (phone_number === '') {
		  //console.error("Phone Number is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Phone Number is required.");
		}

		role = $('#input-role').val().toLowerCase();
		if (!role) {
		  //console.error("Role is required.");
		  // Add a new item to the end of the array
		  arr_notifications.push("Role is required.");
		}

		
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
	$("#action-update-user").click(function (e) {
		// Call ajax
		$.ajax({
			type: "POST",
			url: ""+target_url+"/admin/updateuser",
			data: {"nip-user": nip,
				   "email-user": email,
				   "fullname-user": fullname,
				   "password-user": password,
				   "phone-number-user": phone_number,
				   "role-user": role
				  },
			dataType:'text', //or HTML, JSON, etc.
			success: function(response){
				// hide modal dialog
				hideConfirmDialogMessage();
				
				if (response.indexOf("Updated info User successfully.") !== 1) { // ditemukan
					//alert("MANTAP SUKSES");
					showDialogMessage("User Info Updated", "You have successfully updated the User information.");
					
					// redirect atau mengarahkan halaman
					window.location.href = target_url+"/admin/listuser/";
					//location.reload(); // reload the same page

				}else if (response.indexOf("Duplicate entry") !== -1) {
					showDialogMessage("Duplicate Data Entry", "You already have the same User id data.");
					
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
	





$('tr').on('click', '.dropdown-item:contains("Delete Operator")', function() {
		var email = $(this).closest('tr').attr("id");
		var nip = $(this).closest('tr').find('#nipuser').text();
		var name = $(this).closest('tr').find('#name').text();
		// alert("EMAIL: "+email+", NIP: " + nip);
		
		var defaultlink = $('#delete-operator').attr('href')+"delete_operator/"+email;
		// alert(defaultlink);

		// // show modal
		// $("#modal-delete-dialog .course-name").val(nip+" | "+email+" | "+name);
		$("#modal-delete-dialog .course-name").val(name);
		$('#delete-operator').attr('href', ''+defaultlink);
		$('#modal-delete-dialog').modal('show'); // show modal
	});


	

	

	
});


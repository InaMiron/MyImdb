class User {
	constructor() {
		this.username = "";
		this.password = "";
	}
//login
	sendLoginData (data) {
		return $.ajax("https://ancient-caverns-16784.herokuapp.com/auth/login", {
			method:"POST",
			data: data,
			success:(response) => {
				alert('User logged in.');
			},
			error:(xhr) => {
				const parsedMessage = JSON.parse(xhr.responseText);
				alert('STATUS ' + xhr.status + '. ' + parsedMessage.message);
			},
		});
	};

//logout method

	SendLogoutData(){
		return $.ajax("https://ancient-caverns-16784.herokuapp.com/auth/logout",{
			method:"GET",
			headers:{'X-Auth-Token':localStorage.getItem('loginToken')},
			success:(response)=>{
				console.log("Logout message is : ",response);
			},
			error:(xhr)=>{
				const parsedMessage = JSON.parse(xhr.responseText);
				alert('STATUS ' + xhr.status + '. ' + parsedMessage.message);
			},
		});

	}

//register
	registerData (data) {
		return $.ajax ("https://ancient-caverns-16784.herokuapp.com/auth/register", {
			method:"POST",
			data:data,
			success:(response) => {
				console.log(response);
				alert("Registration completed successfully");
			},
			error:(xhr) => {
				const parsedMessage = JSON.parse(xhr.responseText);
				alert('STATUS ' + xhr.status + '. ' + parsedMessage.message);
			}
		})
	}


};


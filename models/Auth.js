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
				console.log(data);
				alert('Welcome, ' + data.username + " !");
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
				alert(response.message);
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
			},
			error:(xhr) => {
				const parsedMessage = JSON.parse(xhr.responseText);
				alert('STATUS ' + xhr.status + '. ' + parsedMessage.message);
			}
		})
	}


};

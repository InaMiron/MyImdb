window.onload=Onloaded;

function Onloaded(){
	happenAtLogedIn ();
	
	//logOut
	const logoutUser=new User();
	const logoutButton=document.getElementById('logout-button');
	logoutButton.addEventListener('click',(e)=>{
		e.preventDefault();
		logoutUser.SendLogoutData()
		.then(logoutUsers)
		.catch(logoutError);
	});
	
	function logoutUsers(){
		localStorage.clear();
		happenAtLogedIn();
		$("#opener").show();
	}

	function logoutError(xhr){
	console.log("error",xhr);
	}


	const viewData=new Movies();
	viewData.getMovies(0)
	.then(createMovieList)
	.catch(CreateMovieListError);
	const containElements=document.getElementById("movieListContainer");


	function createMovieList(){
		console.log(viewData.itemList);
			for(let i=0;i<viewData.itemList.length;i++){
				const item=viewData.itemList[i];
				const boxMovie = document.createElement("div");
				boxMovie.setAttribute('href',"");

				boxMovie.setAttribute('target','blank');
				boxMovie.setAttribute('class','movieBox col-md-6 col-sm-12 col-xs-12');

				boxMovie.innerHTML="<a href="+basepath+"pages/movieDetails.html?movieId="+item._id+" target='_blank'>"+
				"<img src="+item.Poster+"alt='404' width='100px'>"+"</a>"+
				"<h3>"+item.Title+"</h3>"+
				"<p>"+item.Genre+"</p>"+
				"<p>"+item.Type+"</p>"+
				"<p>"+item.Year+"</p>"+
				"<button data-id="+item._id+" class='remove'>Delete</button>";
				containElements.appendChild(boxMovie);
			}
		//delete function should be outside the for cycle
		$("#movieListContainer").delegate('.remove','click',function (){
				const id=this.getAttribute('data-id');
				//console.log(id);
				const deleteMovie=new Movie();
				deleteMovie.deleteMovie(id)
				.then(function(){
					console.log('success');
				})
				.catch(function(xhr){
					console.log('Error!:',xhr);
				});
			});
		}
		//Log In functionality
		//Submit button
		const loginButton = document.querySelector("[name='login']");
		loginButton.addEventListener("click", (event) => {
			event.preventDefault();
			console.log(event.target);
			const userName = document.querySelector("[name='uname']").value;
			const password = document.querySelector("[name='psw']").value;
			const dataUser = {
				username:userName,
				password:password,
			};
			const currentUserLogin = new User(); 
			//console.log(currentUserLogin);
			currentUserLogin.sendLoginData(dataUser).then((response) => {
				//console.log(response);
				let accessToken = response.accessToken;
				localStorage.setItem('loginToken', accessToken);
				happenAtLogedIn();
				$("#opener").hide();
			});
		})


		//Add Movie 
		const addMovieButton = document.querySelector("[name='addMovie']");
		//console.log(addMovieButton);
		addMovieButton.addEventListener("click", (event) => {
			//console.log(event.target);
			const title = document.querySelector("[name='titleCreate']").value;
			const year = document.querySelector("[name='yearCreate']").value;
			const type = document.querySelector("[name='typeCreate']").value;
			const genre = document.querySelector("[name='genreCreate']").value;
			const imageUrl = document.querySelector("[name='posterCreate']").value;


			const movieAddData = {
				Title:title,
				Year:year,
				Genre:genre,
				Type:type,
				Poster:imageUrl,
			}

			const movieAdded = new Movie();
			movieAdded.addMovie(movieAddData);
		})
		
		//register new user
		const registerBtn = document.getElementById('signupbtn');
		//console.log(registerBtn);
		registerBtn.addEventListener("click", (event) => {
			event.preventDefault();
			const usernameRegister = document.querySelector('[name="username"]').value;	
			const passwordRegister = document.querySelector('[name="pswR"]').value;
			const dataRegister = {
				username:usernameRegister,
				password:passwordRegister,
			};
			const userRegister = new User();
			userRegister.registerData(dataRegister);
		})
		//search button
		const searchBtn = document.getElementById("navbar-submit-button");
		searchBtn.addEventListener("click",(event) => {
			event.preventDefault();
			containElements.innerHTML = '';
			const searchText = document.getElementById('searchBarInput').value;
			//console.log("text search", searchText);
			viewData.searchData(searchText).then(createMovieList);
		})

		// pagination functions
		document.getElementById("first").addEventListener("click", (e) => {
			document.getElementById("thirde").classList.remove("active");
			document.getElementById("second").classList.remove("active");
			document.getElementById("first").classList.add("active");
			event.preventDefault();
			containElements.innerHTML = '';
			viewData.getMovies(0).then(createMovieList);
		});
		
		document.getElementById("second").addEventListener("click", (e) => {
			document.getElementById("first").classList.remove("active");
			document.getElementById("thirde").classList.remove("active");
			document.getElementById("second").classList.add("active");
			event.preventDefault();
		    containElements.innerHTML = '';
			viewData.getMovies(10).then(createMovieList);
		});	

		document.getElementById("thirde").addEventListener("click", (e) => {
			document.getElementById("first").classList.remove("active");
			document.getElementById("second").classList.remove("active");
			document.getElementById("thirde").classList.add("active");
			event.preventDefault();
			containElements.innerHTML = '';
			viewData.getMovies(20).then(createMovieList);
		});	
	}
	

	function CreateMovieListError(xhr){
		console.log("error",xhr);
	}

let token = localStorage.getItem("loginToken");
// console.log("global token = ", token);

 $( function() {
    $( "#login" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }
	});
 
$( "#opener" ).on( "click", function() {
      $( "#login" ).dialog( "open" );
	});

 $( function() {
    $( "#register" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }
    });
});
 
$( "#openerReg" ).on( "click", function() {
      $( "#register" ).dialog( "open" );
    });
  

 $( function() {
    $( "#addMovieContainer" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }
	});
});
 
$( "#openerAdd" ).on( "click", function() {
      $( "#addMovieContainer" ).dialog( "open" );
    });
}); 

function happenAtLogedIn () {
	const tokenForLogIn = localStorage.getItem('loginToken');
	if (tokenForLogIn) {
		document.getElementById("logout-button").classList.remove("invisible");
		document.getElementById("openerAdd").classList.remove("invisible");
		document.getElementById("editContainer").classList.remove("invisible");
	} else {
		document.getElementById("logout-button").classList.add("invisible");
		document.getElementById("openerAdd").classList.add("invisible");
		document.getElementById("editContainer").classList.add("invisible");
	};
}
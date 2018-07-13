window.onload=Onloaded;



function Onloaded(){
	
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
				//console.log(item);
				const boxMovie = document.createElement("div");
				boxMovie.setAttribute('href',basePath + 'pages/home.html.html');
				const title = document.createElement("h3");
				const anchor = document.createElement("a");
				const picture=document.createElement('img');
				const genre=document.createElement('p');
				const type=document.createElement('p');
				const year=document.createElement('p');
				const button=document.createElement('button');


				boxMovie.setAttribute('target','blank');
				boxMovie.setAttribute('class','movieBox');
				picture.setAttribute('src',item.Poster);
				picture.setAttribute('alt','404');
				picture.setAttribute('width','200px');
				button.setAttribute('data-id',item._id);
				anchor.setAttribute('href',basePath + 'pages/movieDetails.html?movieId='+item._id);
				picture.classList.add('img-size');
				button.classList.add('remove');

				title.innerHTML=item.Title+'<br>';
				genre.innerHTML=item.Genre;
				type.innerHTML=item.Type;
				year.innerHTML=item.Year;
				button.innerText="Delete";

				anchor.appendChild(picture);
				boxMovie.appendChild(anchor);
				boxMovie.appendChild(title);
				boxMovie.appendChild(genre);
				boxMovie.appendChild(type);
				boxMovie.appendChild(year);
				boxMovie.appendChild(button);

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
				console.log(response);
				let accessToken = response.accessToken;
				console.log("RESPONSE TOKEN = ",accessToken);
				localStorage.setItem('loginToken', accessToken);
				console.log("LOCAL STORAGE TOKEN = ",localStorage.loginToken);
			})
		//la logare sa apara butoanele de edit, delete, create.(daca nu e tokenul in locale storage sa fie butoanele hide)
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
		document.getElementById("prev").addEventListener("click", (e) => {
				event.preventDefault();
			    containElements.innerHTML = '';
				viewData.getMovies(10).then(createMovieList);
		});
		
		document.getElementById("current").addEventListener("click", (e) => {
			event.preventDefault();
		    containElements.innerHTML = '';
			viewData.getMovies(0).then(createMovieList);
		});	

		document.getElementById("next").addEventListener("click", (e) => {
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


window.onload=Onloaded;



function Onloaded(){
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

	const viewData=new Movies();
	viewData.getMovies()
	.then(createMovieList)
	.catch(CreateMovieListError);



	function createMovieList(){
		console.log(viewData.itemList);
		const containElements=document.getElementById("movieListContainer");
		
			for(let i=0;i<viewData.itemList.length;i++){
				const divElements=document.createElement('div');
				divElements.classList.add('item');
				containElements.appendChild(divElements);
				//containElements.firstChild.classList.add('active');

				const item=viewData.itemList[i];
				//console.log(item);

				const title=document.createElement("a");

				title.setAttribute('href','file:///C:/final-project/fiiireloaded/pages/movieDetails.html?movieId='+item._id);
				title.setAttribute('target','blank');
				title.innerHTML=item.Title+'<br>';

				const picture=document.createElement('img');
				picture.setAttribute('src',item.Poster);
				picture.setAttribute('alt','404');
				picture.setAttribute('width','200px');
				picture.classList.add('img-size');

				const genre=document.createElement('p');
				genre.innerHTML=item.Genre;

				const runtime=document.createElement('p');
				runtime.innerHTML=item.Runtime;

				const type=document.createElement('p');
				type.innerHTML=item.Type;

				const year=document.createElement('p');
				year.innerHTML=item.Year;

				const country=document.createElement('p');
				country.innerHTML=item.Country;

				const button=document.createElement('button');
				button.setAttribute('data-id',item._id);
				button.innerText="Delete";

				divElements.appendChild(picture);
				divElements.appendChild(title);
				divElements.appendChild(country);
				divElements.appendChild(genre);
				divElements.appendChild(type);
				divElements.appendChild(year);
				divElements.appendChild(runtime);
				divElements.appendChild(button);
			}
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
			const currentUserLogin = new User(dataUser); 
			console.log(currentUserLogin);
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
		const imageUrl = document.querySelector("[name='posterCreate']").value;


		const movieAddData = {
			Title:title,
			Year:year,
			Type:type,
			Poster:imageUrl,
		}

		const movieAdded = new Movie();
		movieAdded.addMovie(movieAddData);
	})

function CreateMovieListError(xhr){
	console.log("error",xhr);
}

function logoutError(xhr){
	console.log("error",xhr);
}	

	function CreateMovieListError(xhr){
		console.log("error",xhr);
	}	

}

let token = localStorage.getItem("loginToken");
console.log("global token = ", token);

function hiddenLogin() {
    var x = document.getElementById("login");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function hiddenAdd() {
    var x = document.getElementById("addMovieContainer");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function hiddenRegister() {
    var x = document.getElementById("register");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


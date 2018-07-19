/* declaring a api variable as global which takes the url as value*/
const apiUrl='https://ancient-caverns-16784.herokuapp.com/movies';
let paginationUrl = apiUrl + "?take=10&skip=";
class Movies {
	constructor(){
		this.itemList=[];
	}
/* making the get request method within the "father class" and making a new class call within*/
	getMovies(number) {
		return $.ajax('https://ancient-caverns-16784.herokuapp.com/movies?take=10&skip=' + number, {
			method:'GET',
			success:(response)=>{
				this.itemList = [];
				console.log("get response",response);
				for(let i=0;i<response.results.length;i++){
					const item=response.results[i];
					const movieModel=new Movie();
					movieModel._id = item._id;
					movieModel.Title = item.Title;
					movieModel.Year = item.Year;
					movieModel.Runtime = item.Runtime;
					movieModel.Genre = item.Genre;
					movieModel.Language = item.Language;
					movieModel.Country = item.Country;
					movieModel.Poster = item.Poster;
					movieModel.imdbRating = item.imdbRating;
					movieModel.imdbVotes = item.imdbVotes;
					movieModel.imdbID = item.imdbID;
					movieModel.Type = item.Type;
					
					this.itemList.push(movieModel);
				}
			},
			error:(xhr)=>{
				const parsedMessage = JSON.parse(xhr.responseText);
			    alert('STATUS ' + xhr.status + '. ' + parsedMessage.message);
			}
		});
	}

	searchData(text) {
		this.itemList = [];
		var e = document.getElementById("myList");
        var strUser = e.options[e.selectedIndex].value;
		return $.ajax('https://ancient-caverns-16784.herokuapp.com/movies?' + strUser + text, {
			method : 'GET',
			success : (response) => {
				console.log("methodResonse", response.results);
				for(let i = 0; i < response.results.length; i++) {
					const searchItem = response.results[i];
					const searchModel = new Movie();
					searchModel._id = searchItem._id;
					searchModel.Title = searchItem.Title;
					searchModel.Year = searchItem.Year;
					searchModel.Runtime = searchItem.Runtime;
					searchModel.Genre = searchItem.Genre;
					searchModel.Language = searchItem.Language;
					searchModel.Country = searchItem.Country;
					searchModel.Poster = searchItem.Poster;
					searchModel.imdbRating = searchItem.imdbRating;
					searchModel.imdbVotes = searchItem.imdbVotes;
					searchModel.imdbID = searchItem.imdbID;
					searchModel.Type = searchItem.Type;

					this.itemList.push(searchModel);
				}
			},
			error : (xhr) => {
				const parsedMessage = JSON.parse(xhr.responseText);
			    alert('STATUS ' + xhr.status + '. ' + parsedMessage.message);
			} 
		})
	}
	
}




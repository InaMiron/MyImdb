/* declaring a api variable as global which takes the url as value*/
const apiUrl='https://ancient-caverns-16784.herokuapp.com/movies';
class Movies {
	constructor(){
		this.itemList=[];
	}
/* making the get request method within the "father class" and making a new class call within*/
	getMovies(){
		return $.ajax(apiUrl,{
			method:'GET',
			success:(e)=>{
				//console.log(e);
				for(let i=0;i<e.results.length;i++){
					const item=e.results[i];
					const data={
						_id:item._id,
						Title:item.Title,
						Year:item.Year,
						Runtime:item.Runtime,
						Genre:item.Genre,
						Language:item.Lanfuage,
						Country:item.Country,
						Poster:item.Poster,
						imdbRating:item.imdbRating,
						imdbVotes:item.imdbVotes,
						imdbID:item.imdbID,
						Type:item.Type
					}
					//here we create the new object trough the previously created Movie class

					const movieModel=new Movie(data);
					//console.log(movieModel);
					this.itemList.push(data);
				}
			},
			error:(xhr)=>{
				const parsedMessage = JSON.parse(xhr.responseText);
			    alert('STATUS ' + xhr.status + '. ' + parsedMessage.message);
			}
		});
	}
}


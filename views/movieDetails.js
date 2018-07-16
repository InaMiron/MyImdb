window.onload=function(){
	//declaring a new object for the movie details
	const currentMovie=new MovieDetails();
	//using an id parameter from code below
	const currentPostId=getUrlParameter('movieId');
	console.log(currentPostId);
	//making the promise chain
		currentMovie.fetchData(currentPostId)
		.then(createDetails)
		.catch(errorMsg);

		function createDetails(){
			console.log(currentMovie);
			//getting the container element
			const postDetailsContainer=document.getElementById('movieDetailsContainer');
			//creating the elements for display

			const breakPoint=document.createElement('hr');
			breakPoint.setAttribute('id', 'divider');

			const postTitle=document.createElement('h3');
			postTitle.innerHTML=currentMovie.Title;

			const postPoster=document.createElement('img');
			postPoster.setAttribute('src',currentMovie.Poster);
			postPoster.classList.add('img-size');

			const postPlot=document.createElement('p');
			postPlot.innerHTML= "<span>Plot</span>:" + "&nbsp;" + currentMovie.Plot;
			
			const postActors=document.createElement('p');
			postActors.innerHTML= "<span>Actors</span>:  " + "&nbsp;" + currentMovie.Actors;
			
			const postAwards=document.createElement('p');
			postAwards.innerHTML= "<span>Awards</span>:  " + "&nbsp;" + currentMovie.Awards;

			const postRuntime=document.createElement('p');
			postRuntime.innerHTML= "<span>Runtime</span>: " + "&nbsp;" + currentMovie.Runtime;

			const postCountry=document.createElement('p');
			postCountry.innerHTML= "<span>Country</span>: " + "&nbsp;" + currentMovie.Country;

			const postProduction=document.createElement('p');
			postProduction.innerHTML= "<span>Production</span>: " + "&nbsp;" + currentMovie.Production;

			const postGenre=document.createElement('p');
			postGenre.innerHTML= "<span>Genre</span>: " + "&nbsp;" + currentMovie.Genre;

			const postLanguage=document.createElement('p');
			postLanguage.innerHTML= "<span>Language</span>: " + "&nbsp;" + currentMovie.Language;

			const postMetascore=document.createElement('p');
			postMetascore.innerHTML= "<span>Metascore</span>: " + "&nbsp;" + currentMovie.Metascore;

			const postRated=document.createElement('p');
			postRated.innerHTML= "<span>Rate</span>: " + "&nbsp;" + currentMovie.Rated;

			const postReleased=document.createElement('p');
			postReleased.innerHTML= "<span>Release Date</span>: " + "&nbsp;" + currentMovie.Released;

			const postType=document.createElement('p');
			postType.innerHTML= "<span>Genre</span>: " + "&nbsp;" + currentMovie.Type;

			const postYear=document.createElement('p');
			postYear.innerHTML= "<span>Release Date</span>: " + "&nbsp;" + currentMovie.Year;

			const postBoxOffice=document.createElement('p');
			postBoxOffice.innerHTML= "<span>BoxOffice</span>: " + "&nbsp;" + currentMovie.BoxOffice;

			const postDVD=document.createElement('p');
			postDVD.innerHTML= "<span>Dvd</span>: " + "&nbsp;" + currentMovie.DVD;

			const postimdbRating=document.createElement('p');
			postimdbRating.innerHTML= "<span>Imdb Rating</span>: " + "&nbsp;" + currentMovie.imdbRating;

			const postimdbVotes=document.createElement('p');
			postimdbVotes.innerHTML= "<span>Imdb Votes</span>: " + "&nbsp;" + currentMovie.imdbVotes;

			const postWebsite=document.createElement('a');
			postWebsite.setAttribute('href',currentMovie.Website);
			postWebsite.setAttribute('target','blank');
			postWebsite.innerHTML="<span>Movie website</span>:</a> " + "&nbsp;" + currentMovie.Website+'<br>';


			
			//attaching the created elements for display
			postDetailsContainer.appendChild(postTitle);
			postDetailsContainer.appendChild(postPoster);
			postDetailsContainer.appendChild(postPlot);
			postDetailsContainer.appendChild(postType);
			postDetailsContainer.appendChild(postActors);
			postDetailsContainer.appendChild(postAwards);
			postDetailsContainer.appendChild(postBoxOffice);
			postDetailsContainer.appendChild(postYear);
			postDetailsContainer.appendChild(postRuntime);
			postDetailsContainer.appendChild(postDVD);
			postDetailsContainer.appendChild(breakPoint);
			postDetailsContainer.appendChild(postCountry);
			postDetailsContainer.appendChild(postProduction);
			postDetailsContainer.appendChild(postGenre);
			postDetailsContainer.appendChild(postLanguage);
			postDetailsContainer.appendChild(postMetascore);
			postDetailsContainer.appendChild(postRated);
			postDetailsContainer.appendChild(postReleased);
			postDetailsContainer.appendChild(postimdbRating);
			postDetailsContainer.appendChild(postimdbVotes);
			postDetailsContainer.appendChild(postWebsite);

			//complex code for aan array to display the objects from within
			let postRates="";
			const postRatings=document.createElement('div');
			for(let i=0;i<currentMovie.Ratings.length;i++){
			postRates += "<ul>"+"<li>"+currentMovie.Ratings[i].Source+":"+
				currentMovie.Ratings[i].Value+"</li>"+"</ul>";
			}
			postRatings.innerHTML=postRates;
			postDetailsContainer.appendChild(postRatings);
				
		}		
	}

	function errorMsg(xhr){
		console.log('Something happened:',xhr);
	}

	/*** It retrieves a query (URL) parameter value** 
	It expects you to send the parameter key(before '=')* **/
	function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	const results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	};

//global api variable with api value
const dapiUrl='https://ancient-caverns-16784.herokuapp.com/movies';
/* Initiating the Movie class with its constructor
The constuctor will get the data parameter which will be given in another files class method */

class Movie {
  constructor(){
    this._id=null;
    this.Title="";
    this.Year=null;
    this.Runtime="";
    this.Genre="";
    this.Language="";
    this.Country="";
    this.Poster="";
    this.imdbRating=null;
    this.imdbVotes=null;
    this.imdbID="";
    this.Type="";
  }
  
 addMovie(data) {
    return $.ajax(dapiUrl, {
      headers: {
        'X-Auth-Token' : localStorage.getItem('loginToken'),
      },
      method:"POST",
      data: data,
      success:(response) => {
        console.log(response);
        alert("Movie was succesfully added!");
        location.reload(true);
      },
      error:(xhr) => {
        const parsedMessage = JSON.parse(xhr.responseText);
        alert('STATUS ' + xhr.status + '. ' + parsedMessage.message);
      }
    })
  }

  deleteMovie(id) {
    return $.ajax("https://ancient-caverns-16784.herokuapp.com/movies/" + id, {
      headers: {
      'X-Auth-Token' : localStorage.getItem('loginToken')},
      method:"DELETE",
      success: (response) => {
        window.location.reload(true);
      },
      error: (xhr) => {
        const parsedMessage = JSON.parse(xhr.responseText);
        alert('STATUS ' + xhr.status + '. ' + parsedMessage.message);
      }
    })
  }

}

class MovieDetails extends Movie{
  constructor(){
    super();
    this.Rated="";
    this.Released="";
    this.Writer="";
    this.Actors="";
    this.Plot="";
    this.Awards="";
    this.Ratings=[];
    this.Metascore=null;
    this.DVD="";
    this.BoxOffice="";
    this.Production="";
    this.Website="";
    this.Response="";
  }
  fetchData(id) {
      return $.ajax("https://ancient-caverns-16784.herokuapp.com/movies/" + id, {
      method:"GET",
      success: (res) => {
        console.log(res);
        this._id=res._id;
        this.Title=res.Title;
        this.Year=res.Year;
        this.Runtime=res.Runtime;
        this.Genre=res.Genre;
        this.Language=res.Language;
        this.Country=res.Country;
        this.Poster=res.Poster;
        this.imdbRating=res.imdbRating;
        this.imdbVotes=res.imdbVotes;
        this.imdbID=res.imdbID;
        this.Type=res.Type;
        this.Rated=res.Rated;
        this.Released=res.Released;
        this.Writer=res.Writer;
        this.Actors=res.Actors;
        this.Plot=res.Plot;
        this.Awards=res.Awards;
        this.Ratings=res.Ratings;
        this.Metascore=res.Metascore;
        this.DVD=res.DVD;
        this.BoxOffice=res.BoxOffice;
        this.Production=res.Production;
        this.Website=res.Website;
        this.Response=res.Response;
        },
      error: (xhr) => {
        const parsedMessage = JSON.parse(xhr.responseText);
        alert('STATUS ' + xhr.status + '. ' + parsedMessage.message);
      }
    })
  }


      editMovie(id,data) {

          return $.ajax('https://ancient-caverns-16784.herokuapp.com/movies/' + id,{
             method: "PUT",
             headers: {
             'X-Auth-Token' : localStorage.getItem('loginToken')
            },
            data: data,
            success: () => {
              window.location.reload(true);

            },
            error: (xhr) => {
              const parsedMessage = JSON.parse(xhr.responseText);
              alert('STATUS ' + xhr.status + '. ' + parsedMessage.message);
            }

          });
      }

}

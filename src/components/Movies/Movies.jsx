
import { useContext } from 'react';
import { TrendingMovies } from './../ApiStore';
export default function Movies() {
  let {trendingmovies,baseImUrl}=useContext(TrendingMovies)

  return (
    <>
      <div className="row ">
        <div className=" col-md-4">
          <div className="my-5">
            <h2>Trending</h2>
            <h2>Movies</h2>
            <h2>To watch now</h2>
            <p className=" text-muted">Most watched Movies by day</p>
          </div>
        </div>

        {trendingmovies.map((movie) => (
          <div key={movie.id} className="col-md-2 my-2 ">
            <div className="movie">
              <img
                className="w-100 mb-2"
                src={baseImUrl + movie.poster_path}
                alt="movies"
                srcset=""
              />
              <h2 className="h6">{movie.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

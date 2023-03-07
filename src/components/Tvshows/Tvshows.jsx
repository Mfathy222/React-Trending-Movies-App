
import { useContext } from 'react';
import { TrendingMovies } from './../ApiStore';
export default function Tvshows() {
 let{trendingTvshows,baseImUrl}=useContext(TrendingMovies)

  return (
    <>
     <div className="row ">
        <div className=" col-md-4">
          <div className="my-5">
            <h2>Trending</h2>
            <h2>Tv shows</h2>
            <h2>To watch now</h2>
            <p className=" text-muted">Most watched Tv shows by day</p>
          </div>
        </div>

        {trendingTvshows.map((tv) => (
          <div key={tv.id} className="col-md-2 my-2 ">
            <div className="tv">
              <img
                className="w-100 mb-2"
                src={baseImUrl + tv.poster_path}
                alt="movies"
                srcset=""
              />
              <h2 className="h6">{tv.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

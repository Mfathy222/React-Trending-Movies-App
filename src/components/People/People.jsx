
import { TrendingMovies } from './../ApiStore';
import { useContext } from 'react';

export default function People() {
let{trendingPeople,baseImUrl}=useContext(TrendingMovies)

  return (
    <>
    <div className="row ">
        <div className=" col-md-4">
          <div className="my-5">
            <h2>Trending</h2>
            <h2>person</h2>
            <h2>To watch now</h2>
            <p className=" text-muted">Most Trending person by day</p>
          </div>
        </div>

        {trendingPeople.map((person) => (
          <div key={person.id} className="col-md-2 my-2 ">
            <div className="person">
              <img
                className="w-100 mb-2"
                src={baseImUrl + person.profile_path}
                alt="person"
                srcset=""
              />
              <h2 className="h6">{person.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

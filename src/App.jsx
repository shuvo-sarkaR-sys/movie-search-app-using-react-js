// import React, { useEffect, useReducer, useState } from 'react'
// import Navbar from './components/Navbar'
// import Search from './components/Search'
// import Movie from './components/Movie'
// const movieApi = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"
// const initialState = { loading: true, movies: [], errorMessage:null};

// const reducer = (state, action) =>{
//   switch (action.type){
//     case "SEARCH_MOVIES_REQUEST":
//       return {
//         ...state, 
//         loading: true,
//         errorMessage: null
//       };
//       case "SEARCH_MOVIES_SUCCESS":
//         return {
//           ...state,
//           loading: false,
//           movies: action.payload
//         };
//         case "SEARCH_MOVIES_FAILURE":
//           return {
//             ...state,
//             loading: false,
//             errorMessage: action.error
//           };
//           default: 
//           return state;
//   }
// }

// const App = () => {
//  const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     fetch(movieApi)
//       .then(response => response.json)
//       .then(jsonResponse => {
//        dispatch({
//         type: "SEARCH_MOVIES_SUCCESS",
//         payload: jsonResponse.Search
//        });
//       });
//   }, []);
//   const search = searchValue => {
//    dispatch({
//     type: "SEARCH_MOVIES_REQUEST"
//    })
//     fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
//       .then(response => response.json())
//       .then(jsonResponse => {
//         if (jsonResponse.Response === "True") {
//           dispatch({
//             type: "SEARCH_MOVIES_SUCCESS",
//             payload: jsonResponse.Search
//         });
//         }
//         else {
//           dispatch({
//             type: "SEARCH_MOVIES_FAILURE",
//             error: jsonResponse.Error
//         });
//         }
//       })

//   }
//   const {movies, errorMessage, loading} = state;
//   return (
//     <div>
//       <Navbar />
//       <Search search={search} />
//       <p>Sharing a few of our favourite movies</p>
//       <div className='flex flex-wrap'>
//         {/* {loading && !errorMessage ? (
//           <span>loading...</span>
//         ) : errorMessage ? (
//           <div>{errorMessage}</div>
//         ) : (movies.map((movie, index) => (
//           <Movie key={`${index}-${movie.Title}`} movie={movie} />
//         ))
//         )} */}
//            {loading && !errorMessage ? (
//           <span>loading... </span>
//         ) : errorMessage ? (
//           <div className="errorMessage">{errorMessage}</div>
//         ) : (
//           movies.map((movie, index) => (
//             <Movie key={`${index}-${movie.Title}`} movie={movie} />
//           ))
//         )}
//       </div>
//     </div>
//   )
// }

// export default App
import React, { useEffect, useReducer } from 'react';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Movie from './components/Movie';

const movieApi = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";
const initialState = { loading: true, movies: [], errorMessage: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(movieApi)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.Search
        });
      })
      .catch(error => {
        dispatch({
          type: "SEARCH_MOVIES_FAILURE",
          error: "Failed to fetch movies."
        });
      });
  }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
    
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
          });
        }
      })
      .catch(error => {
        dispatch({
          type: "SEARCH_MOVIES_FAILURE",
          error: "Failed to fetch movies."
        });
      });
  };

  const { movies, errorMessage, loading } = state;
  console.log(movies)

  return (
    <div>
      <Navbar />
      <Search search={search} />
      <p>Sharing a few of our favourite movies</p>
      <div className='flex flex-wrap gap-3'>
        {loading && !errorMessage ? (
          <span>Loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;


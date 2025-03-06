import axios from 'axios'

export async function getMovies(limit: number = 0, offset: number = 0, searchFilter: string = "") {
  try {
    return axios.get("/api", {
      params: {
        limit,
        offset,
        filter: searchFilter,
        // static options that shouldn´t change over time / use
        maxDelay: 150,
        errorProbability: 0.00000000000000001,
        sortBy: "rating",
      }
    });
  }  catch (error) {
    console.error(error);
  }

}
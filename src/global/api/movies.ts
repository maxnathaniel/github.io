import { fetchit } from 'src/global';

const URL = 'https://www.omdbapi.com/';
const API_KEY = 'b9bd48a6';

export const getMovies = async (name: string, page: number) => {
  try {
    const res = await fetchit(
      `${URL}?apikey=${API_KEY}&s=${name}&type=movie&page=${page}`
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.error('Unable to retreive movies', e);
    throw 'Error';
  }
};

export const getMovieDetails = async (id: string) => {
  try {
    const res = await fetchit(`${URL}?apikey=${API_KEY}&i=${id}`);
    const data = await res.json();

    return data;
  } catch (e) {
    console.error('Unable to retreive movie details', e);
    throw 'Error';
  }
};

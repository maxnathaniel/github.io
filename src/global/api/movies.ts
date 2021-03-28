import { fetchit } from 'src/global';

const URL = 'http://www.omdbapi.com/';
const API_KEY = 'b9bd48a6';

export const getMovies = async (name: string, page: number) => {
  const res = await fetchit(
    `${URL}?apikey=${API_KEY}&s=${name}&type=movie&page=${page}`
  );
  const data = await res.json();

  return data;
};

export const getMovieDetails = async (id: string) => {
  const res = await fetchit(`${URL}?apikey=${API_KEY}&i=${id}`);
  const data = await res.json();

  return data;
};

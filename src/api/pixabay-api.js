import axios from 'axios';

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "42261128-30c11368cc5a6bd0852de3244";
const PER_PAGE = 12;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export async function fetchImages(keywords, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: keywords,
    page: page,
    per_page: PER_PAGE,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true
  });
  const url = new URL(`${BASE_URL}?${searchParams}`);

  const response = await axios.get(url, options);
  // console.log('response.data: ', response.data);
  return response.data;
}
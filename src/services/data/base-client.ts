import ky from "ky";

const BASE_URL = "http://api.weatherapi.com/v1/";
const WEATHER_API_KEY = "cca4405803f448dcab2151237231811";
export const baseClient = ky.create({
  prefixUrl: BASE_URL,
  timeout: 10000,
  searchParams: {
    key: import.meta.env.WEATHER_API_KEY || WEATHER_API_KEY,
  },
});

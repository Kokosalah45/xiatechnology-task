import { useWeather } from "@/providers/WeatherProvider";
import CurrentWeatherSection from "./CurrentWeatherSection";
import ForecastSection from "./ForecastSection";
import useGetWeatherData from "../hooks/useGetWeatherData";

export const WeatherViewer = () => {
  const { coords } = useWeather();
  const {
    isLoading: isWeatherDataLoading,
    isError: isWeatherDataError,
    isSuccess: isWeatherDataSuccess,
    data: weatherData,
  } = useGetWeatherData({
    latitude: coords.latitude,
    longitude: coords.longitude,
  });

  if (isWeatherDataLoading) return <div>Loading...</div>;
  if (isWeatherDataError) return <div>Error</div>;
  if (!isWeatherDataSuccess || !weatherData) return <div>Not found</div>;

  return (
    <main className="flex flex-1 flex-col pt-10">
      <CurrentWeatherSection weatherData={weatherData} />
      <ForecastSection weatherData={weatherData} />
    </main>
  );
};

export default WeatherViewer;

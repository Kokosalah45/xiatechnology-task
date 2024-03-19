import { useWeather } from "@/providers/WeatherProvider";
import { WeatherForecastData } from "@/services/data/weather";
import { format } from "date-fns";
import { ComponentProps } from "react";

export const CurrentWeatherSection = ({
  weatherData,
  ...props
}: ComponentProps<"section"> & { weatherData: WeatherForecastData }) => {
  const { currentTempScale } = useWeather();
  if (!weatherData) return <section>Not found</section>;

  const isCelsius = currentTempScale === "c";
  const todayForecast = weatherData.forecast.forecastday[0].day;

  const maxForecastTemp = isCelsius
    ? todayForecast.maxtemp_c
    : todayForecast.maxtemp_f;

  const minForecastTemp = isCelsius
    ? todayForecast.mintemp_c
    : todayForecast.mintemp_f;

  const currentTemp = isCelsius
    ? weatherData.current.temp_c
    : weatherData.current.temp_f;

  return (
    <section
      className="flex flex-1 flex-col md:flex-row justify-between"
      {...props}
    >
      <section className="flex-1 flex flex-col justify-center items-center md:items-start">
        <div className="mb-10 flex flex-col items-center md:items-start">
          <h2 className="text-[64px] font-bold">
            {weatherData?.location.name}
          </h2>
          <h4 className="text-[20px] font-bold">
            {format(new Date(weatherData.location.localtime), "EEEE d, yyyy")}
          </h4>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <figure>
            <img
              src={weatherData?.current.condition.icon}
              alt={weatherData?.current.condition.text}
            />
          </figure>
          <h4 className="text-[30px] font-bold">
            {weatherData?.current.condition.text}
          </h4>
        </div>
      </section>
      <section className="flex-1 flex  justify-center flex-col items-center  md:items-end">
        <h2 className="text-[144px] font-bold before:content-['°'] relative before:absolute before:-right-1/4 before:-top-1/4">
          {currentTemp}
        </h2>
        <div className="flex flex-col justify-between items-center  md:items-end  text-[48px]">
          <div className="flex space-x-2">
            <span className="font-bold before:content-['°'] relative before:absolute before:-right-1/4 before:-top-1/4">
              {maxForecastTemp}
            </span>
            <span>/</span>
            <span className="opacity-60  rtl:flex-row-reverse before:content-['°'] relative before:absolute before:-right-1/4 before:-top-1/4">
              {minForecastTemp}
            </span>
          </div>
          <p className="text-[24px] font-semibold">
            {weatherData.forecast.forecastday[0].day.condition.text}
          </p>
        </div>
      </section>
    </section>
  );
};

export default CurrentWeatherSection;

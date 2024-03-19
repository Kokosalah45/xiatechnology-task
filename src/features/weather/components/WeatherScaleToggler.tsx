import { useWeather } from "@/providers/WeatherProvider";

export const WeatherScaleToggler = () => {
  const { changeTempScale, currentTempScale, tempScales } = useWeather();
  return (
    <ul className="flex font-bold text-3xl gap-2">
      {tempScales.map((scale) => (
        <li className="align-top" key={scale}>
          <button
            onClick={() => changeTempScale(scale)}
            className={`py-2 px-7 inline-block uppercase hover:bg-white/35 transition-colors ${
              currentTempScale === scale ? "bg-white/35 border-s-2" : ""
            } `}
          >
            {scale}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default WeatherScaleToggler;

import WeatherScaleToggler from "./features/weather/components/WeatherScaleToggler";
import WeatherViewer from "./features/weather/components/WeatherViewer";
import useGeoLocation from "./hooks/useGeoLocation";
import Header from "./layout/Header";
import { WeatherProvider } from "./providers/WeatherProvider";

function App() {
  const { coords, error, status } = useGeoLocation();

  return (
    <div className="bg-hero bg-no-repeat bg-cover bg-center before:fixed before:inset-0 before:bg-black/35 before:z-0">
      <div className="z-50 relative text-white max-w-screen-lg m-auto px-10 flex flex-col min-h-screen">
        {status === "loading" && <div>Loading...</div>}
        {status === "error" && <div>Error: {error.message}</div>}
        {status === "success" && (
          <WeatherProvider coords={coords} tempScales={["c", "f"]}>
            <Header
              className="flex flex-col py-5  min-h-24 items-center justify-between md:flex-row gap-2"
              start={
                <h2 className="text-clamp-5xl font-bold uppercase tracking-wider">
                  instaweather
                </h2>
              }
              end={<WeatherScaleToggler />}
            />
            <WeatherViewer />
          </WeatherProvider>
        )}
      </div>
    </div>
  );
}

export default App;

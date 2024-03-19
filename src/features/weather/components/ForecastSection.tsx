import { useWeather } from "@/providers/WeatherProvider";
import { WeatherForecastData } from "@/services/data/weather";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { format } from "date-fns";
import { ComponentProps, useState } from "react";

type Props = {
  weatherData: WeatherForecastData;
};

const ForecastSection = ({
  weatherData,
  ...props
}: ComponentProps<"section"> & Props) => {
  const [activeTab, setActiveTab] = useState("hourly");
  const { currentTempScale } = useWeather();

  const hourlyData = weatherData.forecast.forecastday[0].hour;
  const dailyData = weatherData.forecast.forecastday;

  return (
    <Tabs
      onValueChange={(value) => {
        setActiveTab(value);
      }}
      className="flex flex-col space-y-6 flex-1"
      defaultValue="hourly"
    >
      <TabsList className="border-b border-white  border-white/50 text-2xl font-semibold ">
        <TabsTrigger
          className={` capitalize ${
            activeTab === "hourly" ? "border-b border-white" : ""
          }  p-2`}
          value="hourly"
        >
          hourly
        </TabsTrigger>
        <TabsTrigger
          className={`capitalize ${
            activeTab === "daily" ? "border-b border-white" : ""
          }  p-2`}
          value="daily"
        >
          daily
        </TabsTrigger>
      </TabsList>
      <div className="overflow-x-auto  scrollbar-thumb-white border-b min-h-36 border-white/50 scrollbar-thin py-2">
        <TabsContent className="flex space-x-7" value="hourly">
          {hourlyData.map((hour, index) => {
            const currentTime = format(new Date(Date.now()), "kk:00");
            const currentHour = format(new Date(hour.time), "kk:00");
            const formattedDate =
              currentTime === currentHour ? "Now" : currentHour;
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center text-xl"
              >
                <h3>{formattedDate}</h3>
                <figure className="w-16">
                  <img
                    width={64}
                    src={hour.condition.icon}
                    alt={hour.condition.text}
                  />
                </figure>
                <h3>{currentTempScale === "c" ? hour.temp_c : hour.temp_f}°</h3>
              </div>
            );
          })}
        </TabsContent>
        <TabsContent className="flex space-x-7" value="daily">
          {dailyData.map((day, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center "
              >
                <h3>{format(new Date(day.date), "EEEE d")}</h3>
                <img
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                />
                <h3>
                  {currentTempScale === "c"
                    ? day.day.maxtemp_c
                    : day.day.maxtemp_f}
                  °
                </h3>
              </div>
            );
          })}
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ForecastSection;

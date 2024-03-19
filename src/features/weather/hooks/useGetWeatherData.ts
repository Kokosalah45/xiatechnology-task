import { Coords, getWeatherData } from "@/services/data/weather";
import { useQuery } from "@tanstack/react-query";

export default function useGetWeatherData(coords: Coords) {
  return useQuery({
    queryKey: [
      "weather",
      { latitude: coords.latitude, longitude: coords.longitude },
    ],
    queryFn: () => getWeatherData(coords),
  });
}

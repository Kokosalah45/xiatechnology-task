import React, { createContext, useContext, useState } from "react";

type WeatherContextType = {
  coords: {
    latitude: number;
    longitude: number;
  };
  currentTempScale: TempScales;
  changeTempScale: (selectedTempScales: TempScales) => void;
  tempScales: TempScales[];
} | null;

type WeatherProviderProps = {
  children: React.ReactNode;
  coords: {
    latitude: number;
    longitude: number;
  };
  tempScales?: TempScales[];
};

export const WeatherContext = createContext<WeatherContextType>(null);

type TempScales = "c" | "f" | "k";

const WeatherProvider = ({
  children,
  coords,
  tempScales = ["c", "f", "k"],
}: WeatherProviderProps) => {
  const [currentTempScale, setTempScale] = useState<TempScales>(tempScales[0]);

  const changeTempScale = (selectedTempScales: TempScales) => {
    if (selectedTempScales === currentTempScale) return;
    if (!tempScales.includes(selectedTempScales)) return;
    setTempScale(selectedTempScales);
  };

  return (
    <WeatherContext.Provider
      value={{
        coords,
        changeTempScale,
        currentTempScale,
        tempScales,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
export { WeatherProvider, useWeather };

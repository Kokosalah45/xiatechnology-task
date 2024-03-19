import { useEffect, useReducer } from "react";

type ErrorState = {
  loading: false;
  error: GeolocationPositionError;
  coords: undefined;
  status: "error";
};

type LoadingState = {
  loading: true;
  error: undefined;
  coords: undefined;
  status: "loading";
};

type SuccessState = {
  loading: false;
  error: undefined;
  coords: {
    latitude: number;
    longitude: number;
  };
  status: "success";
};

type SetGeoLocationError = {
  type: "error";
  error: GeolocationPositionError;
};

type SetGeoLocationSuccess = {
  type: "success";
  data: GeolocationPosition["coords"];
};

type SetGeoLocationLoading = {
  type: "loading";
};

type ActionReducerTypes =
  | SetGeoLocationError
  | SetGeoLocationSuccess
  | SetGeoLocationLoading;

const createInitailState = (): LoadingState => ({
  loading: true,
  error: undefined,
  coords: undefined,
  status: "loading",
});

const reducer = (
  state: ErrorState | SuccessState | LoadingState,
  action: ActionReducerTypes
): ErrorState | SuccessState | LoadingState => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        error: undefined,
        coords: undefined,
        loading: true,
        status: "loading",
      };
    case "success":
      return {
        ...state,
        loading: false,
        coords: {
          latitude: action.data.latitude,
          longitude: action.data.longitude,
        },
        error: undefined,
        status: "success",
      };
    case "error":
      return {
        ...state,
        loading: false,
        error: action.error,
        status: "error",
        coords: undefined,
      };
    default:
      throw new Error("Invalid action type");
  }
};

export default function useGeoLocation() {
  const [state, dispatch] = useReducer(reducer, createInitailState());

  useEffect(() => {
    dispatch({ type: "loading" });
    navigator.geolocation.getCurrentPosition(
      (position) => dispatch({ type: "success", data: position.coords }),
      (error) => dispatch({ type: "error", error: error })
    );
  }, []);

  return state;
}

import { axiosClient } from "services/axios";
import { Pair } from "../interfaces/pair";

export default function publicController() {
  return {
    get24HrsTicker: (symbol: string) =>
      axiosClient.get<Pair>(`/v3/ticker/24hr`, { params: { symbol } })
  };
}

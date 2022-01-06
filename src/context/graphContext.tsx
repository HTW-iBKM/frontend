import React from "react";
import { KeyData } from "../components/graph/Graph";

export interface GraphContextInterface {
  graphs: KeyData[] | [];
  setGraphs: React.Dispatch<React.SetStateAction<KeyData[]>>;
}

export const GraphContext = React.createContext<GraphContextInterface>({} as GraphContextInterface);

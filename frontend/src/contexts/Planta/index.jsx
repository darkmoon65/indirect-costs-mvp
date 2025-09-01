import { createContext, useState, useContext } from "react";

const PlantaContext = createContext();

export const PlantaProvider = ({ children }) => {
  const [selectedPlanta, setSelectedPlanta] = useState("");

  const setPlanta = (plantaId) => {
    setSelectedPlanta(plantaId);
  };

  return (
    <PlantaContext.Provider value={{ selectedPlanta, setPlanta }}>
      {children}
    </PlantaContext.Provider>
  );
};

export const usePlanta = () => {
  const context = useContext(PlantaContext);
  if (!context) {
    throw new Error("Debe usar dentro de PlantaProvider");
  }
  return context;
};

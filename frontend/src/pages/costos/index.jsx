import { useRef, useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_PLANTAS,
  CREATE_OPERACION,
  UPDATE_OPERATION,
} from "../../grahpql/query";
import ModalCustom from "../../components/modal";
import DinamicTable from "../../components/table";
import Button from "@mui/material/Button";
import { usePlanta } from "../../contexts/Planta";

const Costos = () => {
  const modalRef = useRef();
  const [selectedOperacion, setSelectedOperacion] = useState(null);
  const [volumenes, setVolumenes] = useState([]);
  const { data, loading, error, refetch } = useQuery(GET_PLANTAS);
  const [createOperacion] = useMutation(CREATE_OPERACION);
  const [updateOperacion] = useMutation(UPDATE_OPERATION);
  const { selectedPlanta } = usePlanta();

  const handleEdit = (operacion, volumenesList) => {
    setSelectedOperacion(operacion);
    setVolumenes(volumenesList);
    modalRef.current?.openModal();
  };

  const handleCreate = () => {
    const plant = data.plantas.find((p) => p.id == selectedPlanta);
    const vols = plant.operaciones[0].costos.map((c) => {
      return {
        volumenId: parseInt(c.volumen.id),
        nombre: c.volumen.nombre,
      };
    });
    setSelectedOperacion(null);
    setVolumenes(vols);
    modalRef.current?.openModal();
  };

  const formatCostos = (costos) => {
    return Object.keys(costos).map((volumen) => ({
      volumenId: volumenes.find((v) => v.nombre === volumen)?.volumenId,
      costo: parseFloat(costos[volumen]),
    }));
  };
  const saveOperation = async (formData) => {
    const costos = formatCostos(formData.costos);
    try {
      await createOperacion({
        variables: {
          nombre: formData.nombre,
          plantaId: parseInt(selectedPlanta),
          costos,
        },
      });
      refetch();
    } catch (error) {
      console.error("Error creando la operación:", error);
    }
  };

  const editOperation = async (formData) => {
    const costos = formatCostos(formData.costos);
    try {
      await updateOperacion({
        variables: {
          id: formData.id,
          nombre: formData.nombre,
          plantaId: parseInt(selectedPlanta),
          costos,
        },
      });
      refetch();
    } catch (error) {
      console.error("Error editando la operación:", error);
    }
  };

  const handleSave = (formData) => {
    if (formData.id) {
      editOperation(formData);
    } else {
      saveOperation(formData);
    }
    modalRef.current?.closeModal();
  };

  const handleCancel = () => {
    modalRef.current?.closeModal();
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {selectedPlanta ? (
        <section className="p-6">
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            sx={{ mb: 2 }}
          >
            Crear nueva operación
          </Button>

          <DinamicTable
            handleEdit={handleEdit}
            data={data}
            selectedPlanta={selectedPlanta}
          />

          <ModalCustom
            ref={modalRef}
            operacion={selectedOperacion}
            volumenes={volumenes}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </section>
      ) : (
        <div> Selecciona una planta primero </div>
      )}
    </>
  );
};

export default Costos;

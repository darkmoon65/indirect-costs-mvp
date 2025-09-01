import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";

const OperacionForm = ({ operacion, volumenes, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: null,
    nombre: "",
    costos: {},
  });

  useEffect(() => {
    if (operacion) {
      const costos = {};
      operacion.costos.forEach((c) => {
        costos[c.volumen.nombre] = c.costo;
      });

      setFormData({
        id: operacion.id ?? null,
        nombre: operacion.nombre ?? "",
        costos,
      });
    } else {
      setFormData({
        id: null,
        nombre: "",
        costos: {},
      });
    }
  }, [operacion]);

  const handleChangeNombre = (e) => {
    setFormData((prev) => ({ ...prev, nombre: e.target.value }));
  };

  const handleCostoChange = (volumen, value) => {
    setFormData((prev) => ({
      ...prev,
      costos: {
        ...prev.costos,
        [volumen]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        {formData.id ? "Editar operación" : "Crear nueva operación"}
      </Typography>

      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <TextField
          label="Nombre de la operación"
          value={formData.nombre}
          onChange={handleChangeNombre}
          fullWidth
          required
        />
        {volumenes.map((v) => (
          <Grid key={v.volumenId}>
            <TextField
              label={`Costo - ${v.nombre}`}
              type="number"
              value={formData.costos[v.nombre] || ""}
              onChange={(e) => handleCostoChange(v.nombre, e.target.value)}
              fullWidth
              size="small"
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, display: "flex", gap: 1 }}>
        <Button type="submit" variant="contained" color="primary">
          Guardar
        </Button>
        <Button onClick={onCancel} variant="outlined">
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default OperacionForm;

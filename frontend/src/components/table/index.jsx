import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";

const DinamicTable = ({ handleEdit, data, selectedPlanta }) => {
  const planta = data.plantas.find((p) => p.id == selectedPlanta);
  const volumenes = planta.operaciones[0].costos.map((c) => {
    return {
      volumenId: parseInt(c.volumen.id),
      nombre: c.volumen.nombre,
    };
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead className="bg-black">
          <TableRow>
            <TableCell sx={{ color: "white" }}>Operación</TableCell>
            {volumenes.map((v) => (
              <TableCell sx={{ color: "white" }} key={v.volumenId}>
                {v.nombre}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {planta.operaciones.map((op) => (
            <TableRow key={op.id}>
              <TableCell>
                <button
                  className="cursor-pointer mr-2"
                  onClick={() => handleEdit(op, volumenes)}
                >
                  <EditIcon />
                </button>
                {op.nombre}
              </TableCell>
              {volumenes.map((v) => {
                const costo = op.costos.find(
                  (c) => c.volumen.nombre === v.nombre
                )?.costo;
                return <TableCell key={v.volumenId}>{costo}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DinamicTable;

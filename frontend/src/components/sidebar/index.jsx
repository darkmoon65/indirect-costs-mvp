import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GET_ONLY_PLANTAS } from "../../grahpql/query";
import { useQuery } from "@apollo/client/react";
import { usePlanta } from "../../contexts/Planta";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("/");
  const { data } = useQuery(GET_ONLY_PLANTAS);
  const { selectedPlanta, setPlanta } = usePlanta();
  const navigate = useNavigate();
  const location = useLocation();

  const handlePlantaChange = (event) => {
    setPlanta(event.target.value);
  };

  const menuItems = [
    {
      text: "1. Precios Base",
      link: "/precios-base",
    },
    {
      text: "2. Waste",
      link: "/waste",
    },
    {
      text: "3. Costos indirectos",
      link: "/costos-indirectos",
    },
    {
      text: "4. Tipo de cliente",
      link: "/tipo-cliente",
    },
  ];

  const handleClick = (link) => {
    navigate(link);
    setActiveLink(link);
  };

  useEffect(() => {
    if (location) setActiveLink(location.pathname);
  }, [location]);
  return (
    <Drawer open={true} variant="permanent">
      <Box sx={{ width: 250 }} role="presentation">
        <FormControl
          fullWidth
          style={{
            marginBottom: 20,
            marginTop: 20,
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          <InputLabel id="select-planta-label">Seleccionar planta</InputLabel>
          <Select
            labelId="select-planta-label"
            value={selectedPlanta}
            onChange={handlePlantaChange}
            label="Seleccionar planta"
          >
            <MenuItem value="">
              <em>Seleccionar planta</em>
            </MenuItem>
            {data?.plantas.map((planta) => (
              <MenuItem key={planta.id} value={planta.id}>
                {planta.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              disablePadding
              className={activeLink === item.link && "bg-[#b9dfff]"}
            >
              <ListItemButton onClick={() => handleClick(item.link)}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

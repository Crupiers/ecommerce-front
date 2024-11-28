import {AXIOS_CLIENT} from "./lib/axiosClient"
import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";


function ProductoRegistrar() {
  const [producto, setProducto] = useState({
    
  });

  const { colorId, tamanioId, categoriaId, marcaId, nombre, stock, codigoBarra, precio} = producto;

  const onInputChange = (e) => {
    if (e?.target?.name === undefined || e?.target?.value === undefined) return;
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  /**
   * Función constante para consultar al backend por una producto duplicada.
   *
   * @returns {Promise<boolean>} `true` si la producto ya existe, `false` en caso contrario.
   */

  const checkDuplicate = async () => {
    try {
      // Realizar una petición GET al backend para verificar si la producto ya existe.
      const response = await AXIOS_CLIENT.get(`/producto/existe/${nombre}`)
      return !!response.data
    } catch (error) {
      console.error("Error checking duplicate", error);

      // Tirar un error. En el ejemplo, el try/catch del `onSubmit` manejará el error si ocurriría.
      throw new Error("Error while checking duplicate");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      /** 
        const isDuplicate = await checkDuplicate();
      console.log("ESTÁ DUPLICADO: "+isDuplicate)
      if (isDuplicate) {
        alert("EL PRODUCTO YA EXISTE");
        return;
      }
      */  
      // Declarar la URL a donde se realizará la petición HTTP.
      const urlBase = "/productos";

      // Utilizar Axios para realizar una petición POST a la URL declarada, enviando la información del producto.
      await AXIOS_CLIENT.post(urlBase, producto);
      alert("PRODUCTO REGISTRADO CON ÉXITO")
    } catch (error) {
      alert("Error al obtener producto (?", error);
      console.error("Error al obtener producto", error);
    } 
  };
 
{/**------------------------------------------------------------------- */}
  const [colores, setColores] = useState([]);

  useEffect(() => {
    getColores();
  }, []);

  const getColores = async () => {
    try {
      const value = await AXIOS_CLIENT.get("/colores");
      setColores(value.data);
    } catch (error) {
      console.error("ERROR AL OBTENER COLORES", error);
    }
  };

  const [color, setColor] = useState();

  const handleSelectColor = (color) => {
    setColor(color); 
    setProducto({ ...producto, colorId: color.id });
    console.log("Color seleccionado:", color);
  };

{/**------------------------------------------------------------------- */}
const [tamanios, setTamanios] = useState([]);

useEffect(() => {
  getTamanios();
}, []);

const getTamanios = async () => {
  try {
    const value = await AXIOS_CLIENT.get("/tamanios");
    setTamanios(value.data);
  } catch (error) {
    console.error("ERROR AL OBTENER TAMAÑOS", error);
  }
};

const [tamanio, setTamanio] = useState();

const handleSelectTamanio = (tamanio) => {
  setTamanio(tamanio); 
  setProducto({ ...producto, tamanioId: tamanio.id });
  console.log("Tamaño seleccionado:", tamanio);
};

{/**------------------------------------------------------------------- */}
const [categorias, setCategorias] = useState([]);

useEffect(() => {
  getCategorias();
}, []);

const getCategorias = async () => {
  try {
    const value = await AXIOS_CLIENT.get("/categorias");
    setCategorias(value.data);
  } catch (error) {
    console.error("ERROR AL OBTENER CATEGORIAS", error);
  }
};

const [categoria, setCategoria] = useState();

const handleSelectCategoria = (categoria) => {
  setCategoria(categoria); // Actualiza la persona seleccionada
  setProducto({ ...producto, categoriaId: categoria.id });
  console.log("Categoria seleccionada:", categoria);
};
/**------------------------------------------------------------------- */
const [marcas, setMarcas] = useState([]);

useEffect(() => {
  getMarcas();
}, []);

const getMarcas = async () => {
  try {
    const value = await AXIOS_CLIENT.get("/marcas");
    setMarcas(value.data);
  } catch (error) {
    console.error("ERROR AL OBTENER MARCAS", error);
  }
};

const [marca, setMarca] = useState();

const handleSelectMarca = (marca) => {
  setMarca(marca); // Actualiza la persona seleccionada
  setProducto({ ...producto, marcaId: marca.id });
  console.log("Marca seleccionada:", marca);
};

/**------------------------------------------------------------------- */

  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3> REGISTRAR NUEVO PRODUCTO </h3>
      </div>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            NOMBRE
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            required={true}
            value={nombre}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            STOCK
          </label>
          <input
            type="text"
            className="form-control"
            id="stock"
            name="stock"
            value={stock}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="codigoBarra" className="form-label">
            CODIGO DE BARRA
          </label>
          <input
            type="text"
            className="form-control"
            id="codigoBarra"
            name="codigoBarra"
            value={codigoBarra}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">
            PRECIO
          </label>
          <input
            type="text"
            className="form-control"
            id="precio"
            name="precio"
            value={precio}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-warning btn-sm me-3">
            Agregar
          </button>
          <a href="/" className="btn btn-danger btn-sm">
            Regresar
          </a>
        </div>


{/**------------------------------------------------------------------- */}
        <div>
      <h3>COLOR</h3>
      
      <DropdownButton id="dropdown-basic-button" title={color?.nombre}>
        {colores?.map((color) => (
          <Dropdown.Item
            key={color.id} 
            onClick={() => handleSelectColor(color)}
          >
            {color.nombre}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      </div>

{/**------------------------------------------------------------------- */}
      <div>

      <h3>TAMAÑO</h3>
      
      <DropdownButton id="dropdown-basic-button" title={tamanio?.nombre}>
        {tamanios?.map((tamanio) => (
          <Dropdown.Item
            key={tamanio.id} 
            onClick={() => handleSelectTamanio(tamanio)}
          >
            {tamanio.nombre} 
          </Dropdown.Item>
        ))}
      </DropdownButton>

      </div>

{/**------------------------------------------------------------------- */}
      <div>
            
      <h3>CATEGORIA</h3>
      
      <DropdownButton id="dropdown-basic-button" title={categoria?.nombre}>
        {categorias?.map((categoria) => (
          <Dropdown.Item
            key={categoria.id} 
            onClick={() => handleSelectCategoria(categoria)}
          >
            {categoria.nombre} 
          </Dropdown.Item>
        ))}
      </DropdownButton>

     
      </div>
{/**------------------------------------------------------------------- */}
      <div>
            
      <h3>MARCA</h3>
      
      <DropdownButton id="dropdown-basic-button" title={marca?.nombre}>
        {marcas?.map((marca) => (
          <Dropdown.Item
            key={marca.id} 
            onClick={() => handleSelectMarca(marca)}
          >
            {marca.nombre} 
          </Dropdown.Item>
        ))}
      </DropdownButton>

     
      </div>

      </form>
    </div>
  );
}

export default ProductoRegistrar;
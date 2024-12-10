import React, { useState } from "react";
import { AXIOS_CLIENT } from "./lib/axiosClient";

function StockFormulario() {
  const [Producto, setProducto] = useState({
    id: "",
    motivo: "",
    cantidad: "",
  });

  const { id, motivo, cantidad } = Producto;

  const onInputChange = (e) => {
    if (e?.target?.name === undefined || e?.target?.value === undefined) return;
    setProducto({ ...Producto, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!id || !motivo || !cantidad) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const payload = {
      motivo,
      cantidad: parseInt(cantidad, 10), // Convertir cantidad a número entero
    };

    try {
      await AXIOS_CLIENT.put(`/productos/actualizarStock/${parseInt(id, 10)}`, payload);
      alert("STOCK MODIFICADO CON ÉXITO");
    } catch (error) {
      console.error("Error al modificar el stock:", error.response?.data || error.message);
      alert(`ERROR AL MODIFICAR STOCK: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container">
      <div className="container text-center">
        <h3>FORMULARIO STOCK</h3>
      </div>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">ID PRODUCTO</label>
          <input
            type="number"
            className="form-control"
            id="id"
            name="id"
            required={true}
            value={id}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cantidad" className="form-label">CANTIDAD AJUSTADA</label>
          <input
            type="number"
            className="form-control"
            id="cantidad"
            name="cantidad"
            required={true}
            value={cantidad}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="motivo" className="form-label">RAZÓN AJUSTE STOCK</label>
          <input
            type="text"
            className="form-control"
            id="motivo"
            name="motivo"
            required={true}
            value={motivo}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <button type="submit" className="btn btn-primary">MODIFICAR</button>
      </form>
    </div>
  );
}

export default StockFormulario;

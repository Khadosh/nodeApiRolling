const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
const app = express();

const gatitos = [];

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Direccionamiento / Rutas

// Ruta Raiz
router.get("/", function (req, res) {
  return res.send("Hola Rolling desde Express");
});

// Leer la lista de gatitos
router.get("/gatitos", function (req, res) {
  return res.json({ gatitos });
});

// Ingresar un gatito nuevo
router.post("/gatitos", function (req, res) {
  const name = req.body.name;

  if (!gatitos.includes(name)) {
    gatitos.push({
      name,
      color: req.body.color
    });
    return res.json({
      message: "Gatito guardado exitosamente",
    });
  }

  return res.json({
    message: "Este gatito ya existe."
  })
});

// Actualizar un gatito existente
router.put("/gatitos", function (req, res) {
  const name = req.body.name;
  const index = gatitos.findIndex(el => el.name === name);

  if (index > -1) {
    gatitos[index].name = req.body.newName;

    return res.json({
      message: "Gatito actualizado exitosamente",
    });
  }

  return res.json({
    message: `El gatito ${name} se fue por los tejados y no pudimos encontrarlo`
  })
});


// Eliminar un gatito existente
router.delete("/gatitos", function (req, res) {
  const name = req.body.name;
  const index = gatitos.findIndex(el => el.name === name);

  if (index > -1) {
    gatitos.splice(index, 1);

    return res.json({
      message: `Gatito ${name} exterminado.`,
    });
  }
  
  return res.json({
    message: `Gatito ${name} no encontrado.`
  });
});

// registramos las rutas del proyecto
app.use("/api", router);

app.listen(8080, console.log("Servidor iniciado en puerto 8080"));

const { Schema, model } = require("mongoose");

const characterSchema = new Schema(
    {
        nombre: String,
        img: String,
        edad: Number,
        equipo: String,
        tecnicas_hissatsu: [String],
        posicion: String,
        primeraAparicion: String
    },
    {
        timestamps: false,
        versionKey: false,
    }
);

module.exports = model("Character", characterSchema);
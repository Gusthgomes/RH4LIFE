import { Schema, models, model } from "mongoose";

const VagasSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: [true, "Por favor selecione uma categoria"] },
    status: { type: String, default: "Ativo" },
    benefits: { type: String, required: false},
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Vagas = models.Vagas || model("Vagas", VagasSchema);

export default Vagas;
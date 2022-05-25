const mongoose = require('mongoose');

const GameParameterSchema = mongoose.Schema({
    StageId: { type: Number, min: 1 },
    Phase: { type: Number, min: 1, max: 4 },
    Level: { type: Number, min: 1 },
    pacientId: { type: String },
    ObjectSpeedFactor: { type: mongoose.Types.Decimal128, min: 1.0, max: 4.0 },
    HeightIncrement: { type: mongoose.Types.Decimal128, min: 0.0, max: 1.0 },
    HeightUpThreshold: { type: mongoose.Types.Decimal128, min: 0.0, max: 5.0 },
    HeightDownThreshold: { type: mongoose.Types.Decimal128, min: 0.0, max: 5.0 },
    SizeIncrement: { type: mongoose.Types.Decimal128, min: 0.0, max: 1.0 },
    SizeUpThreshold: { type: mongoose.Types.Decimal128, min: 0.0, max: 5.0 },
    SizeDownThreshold: { type: mongoose.Types.Decimal128, min: 0.0, max: 5.0 },
    Loops: { type: Number, min: 1, max: 99 }
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('GameParameter', GameParameterSchema);
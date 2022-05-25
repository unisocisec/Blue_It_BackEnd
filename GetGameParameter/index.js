module.exports = async function (context, req) {
    const mongoose = require('mongoose');
    const DATABASE = process.env.MongoDbAtlas;
    mongoose.connect(DATABASE);
    mongoose.Promise = global.Promise;

    //GameParameterModel Schema
    require('../shared/GameParameter');
    const GameParameterModel = mongoose.model('GameParameter');

    const utils = require('../shared/utils');

    var isVerifiedGameToken = await utils.verifyGameToken(req.headers.gametoken, mongoose);

    if (!isVerifiedGameToken) {
        context.res = {
            status: 403,
            body: utils.createResponse(false, false, "Chave de acesso inválida.", null, 1)
        }
        context.done();
        return;
    }

    const findObj = {
        _gameToken: req.headers.gametoken
    }

    const findOptionsObj = { sort: { created_at: -1 } };

    if (req.query.pacientId)
        findObj._id = req.query.pacientId;
    if (req.query.StageId)
        findObj._id = req.query.StageId;
    if (req.query.Phase)
        findObj._id = req.query.Phase;
    if (req.query.Level)
        findObj._id = req.query.Level;
    if (req.query.ObjectSpeedFactor)
        findObj._id = req.query.ObjectSpeedFactor;
    if (req.query.HeightIncrement)
        findObj._id = req.query.HeightIncrement;
    if (req.query.HeightUpThreshold)
        findObj._id = req.query.HeightUpThreshold;
    if (req.query.HeightDownThreshold)
        findObj._id = req.query.HeightDownThreshold;
    if (req.query.SizeIncrement)
        findObj._id = req.query.SizeIncrement;
    if (req.query.SizeUpThreshold)
        findObj._id = req.query.SizeUpThreshold;    
    if (req.query.SizeDownThreshold)
        findObj._id = req.query.SizeDownThreshold;    
    if (req.query.Loops)
        findObj._id = req.query.Loops;    
    if (req.query.dataIni)
        findObj.created_at = {
            $gte: new Date(req.query.dataIni).toISOString("yyyy-MM-ddThh:mm:ss.msZ")
        };
    if (req.query.dataIni && req.query.dataFim)
        findObj.created_at = {
            $gte: new Date(`${req.query.dataIni} 00:00:00:000 UTC`).toISOString("yyyy-MM-ddThh:mm:ss.msZ"),
            $lte: new Date(`${req.query.dataFim} 23:59:59:999 UTC`).toISOString("yyyy-MM-ddThh:mm:ss.msZ")
        };
    if (req.query.limit)
        findOptionsObj.limit = parseInt(req.query.limit);
    if (req.query.skip)
        findOptionsObj.skip = parseInt(req.query.skip);
    if (req.query.sort == "asc")
        findOptionsObj.sort = { created_at: 1 };

    try {
        const GameParameterModels = await GameParameterModel.find(findObj, null, findOptionsObj);
        context.log("[DB QUERYING] - GameParameterModel Get");
        context.res = {
            status: 200,
            body: utils.createResponse(true, true, "Consulta realizada com sucesso.", GameParameterModels, null)
        }
    } catch (err) {
        context.log("[DB QUERYING] - ERROR: ", err);
        context.res = {
            status: 500,
            body: utils.createResponse(false, true, "Ocorreu um erro interno ao realizar a operação.", null, 00)
        }
    }

    context.done();
};




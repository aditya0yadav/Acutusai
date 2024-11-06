const express = require('express');
const router = express.Router();
const surveyCreateController = require('../controllers/Buyer/SurveyBuyerControllerCreate');
const surveyUpdateController = require('../controllers/Buyer/SurveyBuyerUpdateModels');
const Buyer = require('../models/BuyerModels');
const Recon = require("../controllers/Buyer/reconciliations");
const Feasibility = require("../controllers/Buyer/feasibility")
const Hook = require("../controllers/Buyer/webHook")

const BuyerAuthChecker = async (req, res, next) => {
    console.log(req.headers);
    const  ApiKey  = req.headers['authorization'];
    console.log(ApiKey);
    try {
        const BuyerData = await Buyer.findOne({ where: { ApiKey } });
        if (BuyerData) {
            next(); 
        } else {
            res.status(401).json({ message: "Unauthenticated" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

router.post('/create', surveyCreateController.surveyCreate);
router.put('/update/:id', BuyerAuthChecker, surveyUpdateController.updateSurvey);
router.post('/reconcillation/:SurveyId', BuyerAuthChecker, Recon.reconciliation);
router.get('/feasibility', Feasibility.getTierPrice);
router.post('/callback', Hook.createSurvey)
module.exports = router;

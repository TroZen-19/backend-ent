const express=require('express');

const {enquiryData,getHome, getData, sendMail} =require("./controllers/enquiryform");
const router=express.Router();


router.get("/" ,getHome)
router.get('/getData',getData)
router.post("/sendEMail",sendMail)
router.route("/register").post(enquiryData)

module.exports =router;
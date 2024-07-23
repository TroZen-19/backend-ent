
const Client=require("../models/ClientSchema");
const nodemailer = require('nodemailer');

const enquiryData=async(req,res)=>{
  
    console.log(req.body.name);
  try{
    const { name , email , mobile , nearestoffice , interestedcountry ,upcomingintake , courseinterest }= req.body

   if(!name || !email || !mobile || !interestedcountry || !nearestoffice || !upcomingintake || !courseinterest){
       res.status(400);
       throw new Error("Please Enter all the Fields");
   }

   const userExists= await Client.findOne({email});
   if(userExists){
      return res.status(400).json({success:"false"});
      
   } 

   const user = await Client.create({
    name,
    email,
    mobile,
    nearestoffice,
    interestedcountry,
    upcomingintake,
    courseinterest
     
   });
   console.log(user);
   if(user){
       res.status(201).json({success:"true"});
   }else{
       res.status(400);
       throw new Error("Failed to create user")
   }
  }catch(error){
      console.log("some error in network");
      console.log(error)
  }
    

} 


const getHome=async(req,res)=>{
    res.json({success:"true again"})
}

const getData = async (req,res)=>{
    try{
        const data = await Client.find();
        if(!data){
            throw new Error("Data not found");
        }

        return res.status(200).json({message:"Data fetched successfully",data:data});
    }

    catch(err){
        console.log(err);
        return res.status(402).json({message:"Error"})
    }
}

const sendMail = async (req,res)=>{
    const { name, email, message } = req.body;

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'demoemailhw@gmail.com', // Replace with your email
            pass: 'xpcqalgygmeyzalx' // Replace with your email password or app-specific password
        }
    });

    let mailOptions = {
        from: 'demoemailhw@gmail.com', // Replace with your email
        to: `${email}`, // Replace with the recipient's email
        subject: 'New Message from Your Website',
        text: `You have a new message from:
        
        Name: ${name}
        Email: ${email}
        Message: ${message}`
    };
    try {
        // Send mail with defined transport object
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
}

module.exports = {enquiryData , getHome, getData , sendMail};
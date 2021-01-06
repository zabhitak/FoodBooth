const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const keys = require('../../keys');



exports.getcontact = (req, res, next) => {
    res.render('contact');
  };


exports.postcontact = (req, res) => {
    
    const smtpTrans = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: keys.GMAIL_USER,
        pass: keys.GMAIL_PASS
      }
    })
    const mailOpts = {
      from: req.body.email,
      to: keys.GMAIL_USER,
      subject: 'PortFolio',
      text: `Heyy Abhinav, I am ${req.body.name} (${req.body.email}) this side ,just go through your Portfolio and wanna say: ${req.body.message}`
    }
    
    smtpTrans.sendMail(mailOpts, (error, response) => {
      if (error) {
        res.render('contact') 
        console.log(error)
      }
    })
  
  
    // const smtpTransReply = nodemailer.createTransport({
    //   host: 'smtp.gmail.com',
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: keys.GMAIL_USER,
    //     pass: keys.GMAIL_PASS
    //   }
    // })
    // const mailOpts1 = {
    //   from: keys.GMAIL_USER,
    //   to: req.body.email,
    //   subject: 'PortFolio',
    //   text: `Heyy ${req.body.name}, I am Abhinav this side, thankyou for going through my portfolio and I will surely revert back you if there is any query `
    // }
    // console.log('abhi')
    // smtpTransReply.sendMail(mailOpts1, (error, response) => {
    //   if (error) {
    //     res.render('contact') 
    //   }
    // })
  };
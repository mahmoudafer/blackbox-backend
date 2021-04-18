import '../config/config'
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
})

const sendEmail = (name, to, id) => {
    const mailOptions = {
        from: 'blackbox.meet@gmail.com',
        to,
        subject: 'Meeting Invitation',
        text: `${name} is inviting you to a Blackbox meeting.
        meeting link: https://backend-fjkv.onrender.com/meet/${id}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

export default sendEmail

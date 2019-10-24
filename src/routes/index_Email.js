const { Router } = require('express');
const router = Router();

const nodemailer = require('nodemailer');

router.post('/send-email', async(req, res) => {
    const { nombre_apellido, correo, telefono, comentatio } = req.body;

    contentHTML = `
        <h1>informacion del usuario</h1>
        <ul>
            <li>Nombre Del Usuario: ${nombre_apellido}</li>
            <li>Emai Del Usuario: ${correo}</li>
            <li>telefono Del Usuario: ${telefono}</li>
        </ul>
        <p><h1>Asunto:</h1> ${comentatio}</p>
    `;

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'merlin.pouros@ethereal.email',
            pass: 'Nx9SPmfy9eG7HNKEF8'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: `${correo}`, // sender address,
        to: 'merlin.pouros@ethereal.email ',
        subject: 'Contactenos del sitio web',
        //text: 'Hello World'
        html: contentHTML
    })

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.redirect('/');
});

module.exports = router;
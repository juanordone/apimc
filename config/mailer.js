import nodemailer from "nodemailer";

// creacion de un objeto trasportador

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true ,// verdadero para 465, falso para otros puertos
    auth: {
        user:"meetcyclist@gmail.com",
        pass:"wxutxmffoahcnonm", // generado la contraseña 
    },
    tls: {
        rejectUnauthorized: false,
    },
})
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import config from "./config/index.js";
import nodemailer from "nodemailer";

const { PRIVATE_KEY, EMAIL, PASS } = config;

//const PRIVATE_KEY= process.env.PRIVATE_KEY || "secret_key";

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

export const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '1h' })
  return token;
}

export const verifySign = (token) => {
  try {
    const credentials = jwt.verify(token, PRIVATE_KEY);
    return credentials
  } catch (error) {
    console.error("Invalid signature")
    return null
  }
}

export const registerMail = async (usuario) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: EMAIL,
      pass: PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const connection = await transporter.verify();
  if (connection) {
    const info = await transporter.sendMail({
      from: "'Prueba Backend II' <prueba@gmail.com>",
      to: `${usuario}`,
      subject: 'Registro exitoso',
      html: `<p> Usted se ha registrado correctamente en nuestra tienda!! </p>
      <p> Los datos para ingresar a la tienda son los siguientes: </p>
      <p><strong>Email: </strong> ${usuario} </p>
      <p><strong>Contraseña: </strong> La escrita por usted <p>
      <p> Muchas gracias por su preferencia! </p>
      `,
    });

    //console.log({ info });
  } else {
    console.error("Error in verify");
  }
}
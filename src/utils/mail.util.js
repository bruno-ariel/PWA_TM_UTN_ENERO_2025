import transporter from "../config/mail.config.js";
import ENVIROMENT from "../config/enviroment.js";
import express from "express";

export const sendMail = async ({ to, subject, html }) => {
    try {
        const data = await transporter.sendMail({
            from: ENVIROMENT.EMAIL_USERNAME,
            to,
            subject,
            html,
        });
        return data
    } catch (error) {
        console.error('Error al enviar email', error);
    }
};

// Operaciones de autentificacion (envidos de email)

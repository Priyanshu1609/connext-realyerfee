'use-strict';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
const app = express();

// const express = require('express')
// const cors = require('cors');
// const dotenv = require("dotenv");
// const helmet = require("helmet");
// const morgan = require("morgan");


import { create } from "@connext/sdk";
import { signer, sdkConfig } from "./config.js";
const { sdkBase } = await create(sdkConfig);


const PORT = process.env.PORT || 8800;

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


// xcall parameters
// const originDomain = "1735353714";
// const destinationDomain = "9991";

app.get("/", (req, res) => {
    res.send("Connext SDK Backend Server for Relayer Fee Estimation");
});

app.post("/", async (req, res) => {
    const { originDomain, destinationDomain } = req.body;

    try {
        // Estimate the relayer fee
        const relayerFee = (await sdkBase.estimateRelayerFee({
            originDomain,
            destinationDomain
        })).toString();
        console.error("**** DEBUG :::", relayerFee);

        res.send({
            "Relayer Fee : ": relayerFee
        })

    } catch (error) {
        res.status(500).json(err);
    }
})

app.listen(PORT, () => {
    console.log("Backend server is running!");
});
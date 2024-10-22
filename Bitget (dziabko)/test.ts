import { BitgetFuturesPublicConnector } from "./bitget-futures-public-connector";
import { onMessage } from "./bitget-datahandler";
import 'dotenv/config';
import { BitgetFuturesPrivateConnector } from "./bitget-futures-private-connector";
import CryptoJS from 'crypto-js';
import * as BitgetApi from "bitget-api-node-sdk";
// import WebSocketServer from 'ws';
import { WebSocket } from 'ws';
import * as Types from "./types"




import axios, { AxiosStatic } from 'axios';
import { connected } from "process";

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}


class ListennerObj extends BitgetApi.Listenner{
    reveice(message: string){
        console.info('>>>'+message);
    }
}


function handleMessage(data: string): void {
    const message = JSON.parse(data);
    if (message.event == 'login') {
        console.log("LOGGED IN");
    } else if (message.event == 'subscribe') {
        console.log("SUBSCRIBED TO: ", message);
    }else if (message.event == 'error') {
        console.log("ERROR: ", message);
    } else if (message.action == 'snapshot') {  // If the message is a SUSDT-FUTURES order
        console.log("SNAPSHOT: ", message);
    } else {
        console.log("Unknown event: ", message);
    }
}


export async function main() {
    console.log("Hello, world!");

    const bitgetConnector = new BitgetFuturesPrivateConnector()
    bitgetConnector.connect(onMessage)

    const order1: Types.FuturesLimitOrderRequest = {
        size: "0.004",
        side: "buy",
        orderType: "limit",
        force: "gtc",
        price: "24000",
    }
    const order2: Types.FuturesLimitOrderRequest = {
        size: "0.002",
        side: "buy",
        orderType: "limit",
        force: "gtc",
        price: "25000",
    }
    const batchOrder: Types.BatchFuturesLimitOrdersRequest = {
        symbol: 'SBTCSUSDT',
        productType: "SUSDT-FUTURES",
        marginMode: "crossed",
        marginCoin: "SUSDT",
        orderList: [order1, order2]
    }

    console.log(JSON.stringify(batchOrder));

    // Place 2 SUSDT-FUTURES limit orders on the SBTCUSDT market
    await delay(6000);
    bitgetConnector.placeOrders(batchOrder);

    const openOrderRequest: Types.OpenOrdersRequest = {
        productType: "SUSDT-FUTURES",
        symbol: "SBTCSUSDT",
    }

    // Get all active orders
    const orderStatusUpdate = await bitgetConnector.getCurrentActiveOrders(openOrderRequest);
    // Ensure that there is only 1 active order

    console.log("ORDER STATUS: ", orderStatusUpdate);

    await bitgetConnector.stop(openOrderRequest)

    console.log("End!");
}

main();
export type Serializable = string | object
export type SklEvent = "Trade" | "TopOfBook" | "Ticker" | "Version" | "Unsubscribe" | "OrderStatusUpdate" | "AllBalances"
export type SklSupportedConnectors = "MEXC" | "Coinbase" | "Deribit" | "Bitget"

export type SklSide = "Buy" | "Sell"



export interface BasicSklNotificationProps {
    event: SklEvent,
    connectorType: SklSupportedConnectors
    symbol: string,
    timestamp: number,
}

export interface BitgetEventData { 
    action: string,
    arg: {
        instType: string;
        channel: string;
        instId: string;
    },
    data: string[][],
    ts: number,
}
// export interface BitgetEventData { 
//     method: string
//     id?: SklEvent
//     result?: JSON
//     params: { 
//         id?: SklEvent
//         channel?: string
//         data: BitgetTicker | BitgetTopOfBook | BitgetTrade 
//     } 
// }

export type Spread = [string, number, number]

export interface BitgetTopOfBook {
    prev_change_id: number | null // Doesn't exists for first notification
    type: 'snapshot' | 'change';
    timestamp: number;
    instrument_name: string;
    change_id: number;
    // Array of arrays: [status, price, amount] - status [new, change or delete.]
    bids: Spread[];
    asks: Spread[];
}

export interface SklTrade extends BasicSklNotificationProps {
    price: number,
    size: number,
    side: SklSide,
}


export interface BitgetTrade {
    instType: string;  // Instrument Type
    channel: string;  // Channel name
    instId: string; // Instrument ID
    timestamp: number;  // Trade Unix timestamp in ms
    price: string;  // Trade price
    size: string;  // Trade size
    side: string; // Trade side

    // action: string;
    // arg: {
    //     instType: string;
    //     channel: string;
    //     instId: string;
    // };
    // data: string[];
    // ts: number;
}

export interface BitgetTicker {
    action: string;
    arg: {
        instType: string;
        channel: string;
        instId: string;
    };
    data: [{
        instId: string;
        last: string;
        price_change: string;
        open24h: string;
        high24h: string;
        low24h: string;
        bestBid: string;
        bestAsk: string;
        baseVolume: string;
        quoteVolume: string;
        ts: number;
        labeId: string;
        openUtc: string;
        chgUTC: string;
        bidSz: string;
        askSz: string; 
    }];
}

export interface channelRequest {
    args: string[{
            instType: "SP" | "MC", // SP - Spot, MC - Contract/futures
            channel: "ticker" | "trade",
            instId: string,
        }];

}
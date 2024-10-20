import { BitgetSpotPublicConnector } from "./bitget-spot-public-connector";
import { onMessage } from "./bitget-spot-datahandler";

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function main() {
    console.log("Hello, world!");
    // var a = new Serializable[];

    const bitgetConnector = new BitgetSpotPublicConnector()

    // Pass serializable MessageChannel to the connector and connect to the Bitget's public websocket
    bitgetConnector.connect(onMessage)

    // Wait 5 seconds for the connection to be established, and for the handlers to store some data
    await delay(5000);

    console.log("End!");
}

main();
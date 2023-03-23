import { ethers } from "ethers";
// Create a Signer and connect it to a Provider on the sending chain
const privateKey = process.env.PRIVATE_KEY;
let signer = new ethers.Wallet(privateKey);
// Use the RPC url for the origin chain
const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli");
signer = signer.connect(provider);
const signerAddress = await signer.getAddress();
const sdkConfig = {
    signerAddress: signerAddress,
    // Use `mainnet` when you're ready...
    network: "testnet",
    // Add more chains here! Use mainnet domains if `network: mainnet`.
    // This information can be found at https://docs.connext.network/resources/supported-chains
    chains: {
        1735353714: {
            providers: ["https://rpc.ankr.com/eth_goerli"],
        },
        1735356532: {
            providers: ["https://goerli.optimism.io"],
        },
    },
};
export { signer, sdkConfig };

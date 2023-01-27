import "./Mint.css";
import MintABI from "./MintABI.json";
import { ethers } from "ethers";

function Mint(props) {

    const mint = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x35F7f83F7d153e9c4A2E9B07e1302D46E259b5AD", MintABI, signer);
        const price = await contract.price();

        const tryToMint = await contract.safeMint({ value: price });
        console.log("Clicked the button");
    }

    return (
        <div>
            <button className="mintButton"><a onClick={mint} href="#">Mint</a></button>
        </div>
    );
}

export default Mint;
import { EtherscanProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Chat from './Chat.js';
import "./Homepage.css";
import Mint from "./Mint.js";
import MintABI from './MintABI.json';

function Homepage(props) {
    const [message, setMessage] = useState("");
    const [allChats, setAllChats] = useState([]);

    const sendMessage = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x35F7f83F7d153e9c4A2E9B07e1302D46E259b5AD", MintABI, signer);

        const tryToSend = await contract.addMessage(message, 0);
        console.log(message);
    }

    const getMessages = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x35F7f83F7d153e9c4A2E9B07e1302D46E259b5AD", MintABI, signer);

        const totalMessages = await contract.totalMessages();

        setAllChats([]);

        for (var i = 0; i < totalMessages; i++) {
            const currentMessage = await contract.Messages(i);
            const timeStamp = currentMessage.timestamp.toNumber();
            const date = new Date(timeStamp);
            const currentMessageArray = [...currentMessage];
            currentMessageArray[4] = currentMessageArray[4].toNumber();
            currentMessageArray[4] = new Date(currentMessageArray[4]);
            //console.log(currentMessage);
            //console.log(timeStamp);
            //console.log(currentMessage.timestamp);
            setAllChats(prevChat => [...prevChat, currentMessageArray]);
            console.log(currentMessageArray);
            console.log(allChats)
        }

    }

    useEffect(() => {
        getMessages();
    }, []);
    return (
        <div>

            <section>
                <div className="hero">
                    <div className="chatMessage">
                        {allChats.map((item =>



                            <Chat key={item} text={item.messageText} image="https://yt3.ggpht.com/ytc/AMLnZu-2DrkobCQd6ri63wO9SuMFGyTbyMhD5kQ6Up2N=s900-c-k-c0x00ffffff-no-rj" data={item.sender} />

                        ))}

                    </div>

                    <div className="Send">
                        <input
                            className="textInput"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button className="header-cta"><a onClick={sendMessage} href="#" > Send</a></button>
                    </div>
                </div>
            </section >
        </div >
    );
}

export default Homepage;
import { EtherscanProvider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Chat from './Chat.js';
import "./Homepage.css";
import Mint from "./Mint.js";
import MintABI from './MintABI.json';
import moment from 'moment';



function Homepage(props) {
    const [message, setMessage] = useState("");
    const [allChats, setAllChats] = useState([]);
    const [pagination, setPagination] = useState(0);
    const [NFT, setNFT] = useState(0);
    const [NFTlist, setNFTlist] = useState([]);
    const [noMoreMessages, setNoMoreMessages] = useState(false);

    const timeConversion = (timeStampBigNumber) => {
        const timeStampInt = timeStampBigNumber.toNumber();
        const timeStampNew = new Date(timeStampInt * 1000);
        return moment(timeStampNew).format('MM-DD-YY, HH:mm:ss a');
    }

    const sendMessage = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x35F7f83F7d153e9c4A2E9B07e1302D46E259b5AD", MintABI, signer);

        const tryToSend = await contract.addMessage(message, NFT);
        console.log(message);
    }

    const getMessages = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts");
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x35F7f83F7d153e9c4A2E9B07e1302D46E259b5AD", MintABI, signer);

        const totalMessages = await contract.totalMessages();
        setNoMoreMessages(Math.floor(totalMessages / ((pagination + 1) * 10)) <= 0 ? true : false)
        const displayPerPage = 10;
        const starting = totalMessages - (displayPerPage * pagination) - 1;

        const currentAddress = await signer.getAddress();
        const numberOfNFTsHeld = await contract.balanceOf(currentAddress);

        for (var i = 0; i < numberOfNFTsHeld; i++) {
            const currentNFT = await contract.tokenOfOwnerByIndex(currentAddress, i);
            console.log("NFT Held Id: " + currentNFT.toNumber());
            setNFTlist(old => [...old, currentNFT]);
        }

        setAllChats([]);

        for (var i = starting; i > starting - displayPerPage; i--) {
            if (i >= 0) {
                const currentMessage = await contract.Messages(i);
                const currentMessageArray = [...currentMessage];
                currentMessageArray[4] = timeConversion(currentMessageArray[4]);
                setAllChats(prevChat => [...prevChat, currentMessageArray]);
            }
        }

    }

    useEffect(() => {
        getMessages();
    }, [pagination]);

    
    return (
        <div>

            <section>
                <div className="hero">
                    <button key="Back-Button" className="header-cta"><a onClick={() => noMoreMessages ? null : setPagination((old) => old + 1) } href="#" >Back</a></button>
                    <button key="Forward-Button" className="header-cta"><a onClick={() => pagination > 0 ? setPagination((old) => old - 1) : null} href="#" >Forward</a></button>
                    <div className="chatMessage">
                        {allChats.map((item, index) => {
                            const date = item[4].toString();

                            return (
                                <Chat key={index} text={item[3]} image="https://yt3.ggpht.com/ytc/AMLnZu-2DrkobCQd6ri63wO9SuMFGyTbyMhD5kQ6Up2N=s900-c-k-c0x00ffffff-no-rj" data={date} sender={item[1]} />

                            )
                        })}

                    </div>

                    <div className="Send">
                        <select onChange={(e) => setNFT(e.target.value)} name="NFTid" id="NFTid">
                                <option key="ChooseNFT">Choose An NFT</option>
                            {NFTlist.map((item, index) => (
                                <option key={index} value={item.toString()}>{item.toString()}</option>
                            ))}

                        </select>

                        <input
                            className="textInput"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button key="Send-Button" className="header-cta"><a onClick={sendMessage} href="#" > Send</a></button>
                    </div>
                </div>
            </section >
        </div >
    );
}

export default Homepage;
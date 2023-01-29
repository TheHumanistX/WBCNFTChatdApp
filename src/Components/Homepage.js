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
        const signer = provider.getSigner();
        const contract = new ethers.Contract("0x35F7f83F7d153e9c4A2E9B07e1302D46E259b5AD", MintABI, signer);

        const totalMessages = await contract.totalMessages();

        const displayPerPage = 10;
        //console.log("Pagination from before getMessages(): " + pagination);
        const starting = totalMessages - (displayPerPage * pagination) - 1;
        //console.log("Pagination from after getMessages(): " + pagination);

        const currentAddress = await signer.getAddress();
        //console.log(currentAddress);
        const numberOfNFTsHeld = await contract.balanceOf(currentAddress);
        //console.log(numberOfNFTsHeld.toNumber());

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

    // const messagesBack = async () => {
    //     // console.log("Pagination from before Back: " + pagination);
    //     setPagination((old) => old + 1);
    //     //getMessages();
    //     //console.log("Pagination from after Back: " + pagination);
    // }

    // const messagesForward = async () => {
    //     //console.log("Pagination from before Forward: " + pagination);
    //     setPagination((old) => old - 1);
    //     //getMessages();
    //     //console.log("Pagination from after Forward: " + pagination);
    // }

    // const getNFTs = async () => {

    // }

    useEffect(() => {
        getMessages();
    }, [pagination]);
    return (
        <div>

            <section>
                <div className="hero">
                    <button className="header-cta"><a onClick={() => { setPagination((old) => old + 1); console.log("Pagination After Back Click: " + pagination) }} href="#" >Back</a></button>
                    <button className="header-cta"><a onClick={() => { setPagination((old) => old - 1); console.log("Pagination After Forward Click: " + pagination) }} href="#" >Forward</a></button>
                    <div className="chatMessage">
                        {allChats.map((item => {
                            const date = item[4].toString();

                            return (
                                <Chat key={item.id} text={item[3]} image="https://yt3.ggpht.com/ytc/AMLnZu-2DrkobCQd6ri63wO9SuMFGyTbyMhD5kQ6Up2N=s900-c-k-c0x00ffffff-no-rj" data={date} sender={item[1]} />

                            )
                        }))}

                    </div>

                    <div className="Send">
                        <select onChange={(e) => setNFT(e.target.value)} name="NFTid" id="NFTid">
                            {NFTlist.map((item) => (
                                <option key={item.id} value={item.toString()}>{item.toString()}</option>
                            ))}

                        </select>

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
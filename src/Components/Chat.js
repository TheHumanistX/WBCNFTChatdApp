function Chat(props) {
    return (

        <div className="chatText">
            <div className="chatImage">
                <img className="chatImage" src={props.image} />
            </div>

            <div className="mainWrap">
                <div className="chatBubble">
                    <p>{props.text}</p>
                </div>

                <div className="bubbleInfo">
                    <div className="bubbleTimestamp">
                        <p>{props.data}</p>
                    </div>
                    <div className="bubbleSender">
                        <p>{props.sender}</p>
                    </div>
                        
                </div>
            </div>
        </div>
    );
}

export default Chat;
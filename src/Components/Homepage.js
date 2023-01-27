import { useState } from "react";
import Chat from './Chat.js';
import "./Homepage.css";

function Homepage(props) {
    const [message, setMessage] = useState("");
    return (
        <div>

            <section>
                <div className="hero">
                    <div className="chatMessage">
                        <Chat text="YO" image="https://yt3.ggpht.com/ytc/AMLnZu-2DrkobCQd6ri63wO9SuMFGyTbyMhD5kQ6Up2N=s900-c-k-c0x00ffffff-no-rj" data="Oct 20, 2022 8:12PM" />
                        <Chat text="Chat message" image="https://yt3.ggpht.com/ytc/AMLnZu-2DrkobCQd6ri63wO9SuMFGyTbyMhD5kQ6Up2N=s900-c-k-c0x00ffffff-no-rj" data="Oct 20, 2022 8:12PM" />
                        <Chat text="This is a test" image="https://yt3.ggpht.com/ytc/AMLnZu-2DrkobCQd6ri63wO9SuMFGyTbyMhD5kQ6Up2N=s900-c-k-c0x00ffffff-no-rj" data="Oct 20, 2022 8:12PM" />
                    </div>

                    <div className="Send">
                        <input
                            className="textInput"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button class="header-cta"><a href="">Send</a></button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Homepage;
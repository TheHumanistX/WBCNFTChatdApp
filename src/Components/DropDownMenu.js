import React from 'react';

const MemoizedNFTList = ({NFTlist, setNFT}) => {
    const memoizedNFTlist = React.useMemo(() => NFTlist, [NFTlist]);

    return(
        <select onChange={(e) => setNFT(e.target.value)} name="NFTid" id="NFTid">
            <option key="ChooseAnNFT" value="ChooseAnNFT">Choose An NFT</option>
            {memoizedNFTlist.map((item, index) => (
                <option key={index} value={item.toString()}>{item.toString()}</option>
            ))}
        </select>
    );
}

export default MemoizedNFTList;
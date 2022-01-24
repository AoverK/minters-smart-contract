const ETHER = ethers.BigNumber.from(10).pow(18);
let _mintPrice = ETHER.div(100).mul(6); // 0.03 = ETH 10 to the power of 18 is an Ether 25000000000000000
module.exports = [
    1000,
    5,
    _mintPrice,
    2000,
    "0xd52A48A06D63754972F90Cd22D2b91649CFdf231",
    "0xd52A48A06D63754972F90Cd22D2b91649CFdf231",
    "0x000000000000000000000000000000000000dead",
    "MintersPass",
    "MP",
    "https://minters.mypinata.cloud/ipfs/QmXYgGfggHfDNo6GFzHs1822sfWEogZJKCb25FS986zG4U/",
];
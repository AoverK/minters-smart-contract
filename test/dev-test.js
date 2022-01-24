const { expect } = require("chai");
const { ethers } = require("hardhat");
const mintersSaleArtifact = require('../artifacts/contracts/MintersPass.sol/MintersPass.json');


describe("Minters Pass NFT Contract (ERC-721) v001", function() {
    const GWEI = ethers.BigNumber.from(10).pow(9); // 10 to the power of 9 is a GWEI
    const ETHER = ethers.BigNumber.from(10).pow(18); // 10 to the power of 18 is an ETHER
    let _supplyLimit = 1000;
    let _mintLimit = 5;
    let _mintPrice = ETHER.div(100).mul(6); // 0.03 = ETH 10 to the power of 18 is an Ether 25000000000000000
    let _devSaleShare = 2000;
    let _withdrawalWallet = "0xd52A48A06D63754972F90Cd22D2b91649CFdf231"; // Withdrawal Wallet
    let _devWallet = "0xd52A48A06D63754972F90Cd22D2b91649CFdf231"; // Dev Wallet
    let _ticketAddress = "0x000000000000000000000000000000000000dead";
    let _name = "MintersPass";
    let _ticker = "MP";
    let _baseURI = "https://minters.mypinata.cloud/ipfs/QmXYgGfggHfDNo6GFzHs1822sfWEogZJKCb25FS986zG4U/";


    //const abi = ['constructor("3", "1", "55000000000000000", "1500", "0xBB0c4c8eeB9abB4C82122D26675B0DdCF99c6302", "0xBB0c4c8eeB9abB4C82122D26675B0DdCF99c6302", "0x000000000000000000000000000000000000zero", "Minters Pass", "MP", "https://minters.mypinata.cloud/ipfs/QmeokM9gh2P7K9sxeqzXybuJ9RQjL4uw9aMstSqy1frdD7")'];
    const abi = mintersSaleArtifact.abi;
    //const abi = "0000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000c3663566a5800000000000000000000000000000000000000000000000000000000000000005dc000000000000000000000000bb0c4c8eeb9abb4c82122d26675b0ddcf99c6302000000000000000000000000bb0c4c8eeb9abb4c82122d26675b0ddcf99c6302000000000000000000000000000000000000000000000000000000000000dead0000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000000000000000000000000000000000000000000c4d696e746572732050617373000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000024d50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005268747470733a2f2f6d696e746572732e6d7970696e6174612e636c6f75642f697066732f516d656f6b4d3967683250374b39737865717a587962754a3952516a4c34757739614d73745371793166726444370000000000000000000000000000";
    const bytecode = mintersSaleArtifact.bytecode

    //it("Should return test results for the public functions, private functions and emitted events", async function() {
    it("Deploy smart contract to mainnet network", async function() {
        // Get the ContractFactory and Signers here.
        const [owner] = await ethers.getSigners();

        const MintersNFTToken = await ethers.getContractFactory(abi, bytecode, owner);
        //const MintersNFTToken = await ethers.getContractFactory(abi, bytecode);

        // Deploy the MintersSale NFT contract
        // const mintersToken = await MintersNFTToken.deploy(); // Only for contracts with no Constructors
        const mintersToken = await MintersNFTToken.deploy(_supplyLimit, _mintLimit, _mintPrice, _devSaleShare, _withdrawalWallet, _devWallet, _ticketAddress, _name, _ticker, _baseURI);

        await mintersToken.deployed();

        const tokenSupply = await mintersToken.totalSupply();

        const ownerBalance = await mintersToken.balanceOf(owner.address);
        expect(tokenSupply).to.equal(ownerBalance);
        console.log("Contract Address: ", mintersToken.address);
        console.log("Contract Tx Hash: ", mintersToken.deployTransaction.hash);
        console.log("   Owner Address: ", owner.address);
        console.log("   Owner Balance: ", ownerBalance / ETHER);
        console.log("    Total Supply: ", tokenSupply / ETHER);

    });
});
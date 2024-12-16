const main = async () => {
    //const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("1")
    });
    await waveContract.waitForDeployment();
    console.log("Contract deployed to: ", await waveContract.getAddress());
    //console.log("Contract deployed by: ", await owner.getAddress());
    let contractBalnce = await hre.ethers.provider.getBalance(waveContract.getAddress());
    console.log('Contract Balance after deployment is', hre.ethers.formatEther(contractBalnce));



    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log("Wave count:", waveCount);


    let wavetxn = await waveContract.wave("Hi there!");
    await wavetxn.wait();

    waveCount = await waveContract.getTotalWaves();
    console.log("our total waves after wave: ", waveCount);

    contractBalnce = await hre.ethers.provider.getBalance(waveContract.getAddress());
    console.log('Contract Balance after deployment is', hre.ethers.formatEther(contractBalnce));


    let allWaves = await waveContract.getAllWaves();
    console.log("All waves are", allWaves);






}

const runMain = async () => {
    try {
        await main();
        process.exit(0);

    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

runMain();
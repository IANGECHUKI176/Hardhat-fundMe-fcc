// const deployFunc=()=>{
//     console.log("hi")
// }

// module.exports.default=deployFunc
const { network, run, deployments } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
module.exports = async ({ getNamedAccounts }) => {
    const { deploy, log, get } = deployments
    const { deployer, user } = await getNamedAccounts()
    const chainId = network.config.chainId

    //when using localhost or hardhat we want to use a mock

    // if chainIf is X use Y
    // if chainId is Y use X

    // const ethUsdPriceAddress=networkConfig[chainId]["ethUsdPriceFeedAddress"]
    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregatorContract = await get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregatorContract.address
    } else {
        ethUsdPriceFeedAddress =
            networkConfig[chainId]["ethUsdPriceFeedAddress"]
    }

    const args = [ethUsdPriceFeedAddress]
    const FundMe = await deploy("FundMe", {
        from: deployer,
        args: args, //price feed adddress
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        //verify
        await verify(FundMe.address, args)
    }
    log("-----------------------------------------------------------------")
}
module.exports.tags = ["all", "fundme"]

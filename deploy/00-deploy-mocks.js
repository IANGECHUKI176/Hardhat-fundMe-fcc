const { network } = require("hardhat")
const {
    developmentChains,
    networkConfig,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")

module.exports = async ({ deployments, getNamedAccounts }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    if (developmentChains.includes(network.name)) {
        log("local network detected!Deploying mocks!!!")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })
        log("Mocks deployed")
        log("----------------------------------------------")
    }
    // const ethPriceFeedAddress=networkConfig[chainId]["ethUsdPriceAddress"]
}
module.exports.tags = ["all", "mocks"]

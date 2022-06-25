const { getNamedAccounts, ethers } = require("hardhat")

const main = async () => {
    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContract("FundMe", deployer)
    console.log("funding contract...")
    const transactionReponse = await fundMe.fund({
        value: ethers.utils.parseEther("0.1"),
    })
    await transactionReponse.wait(1)
    console.log("Funded!!!")
}
main()
    .then(() => {
        process.exit(0)
    })
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })

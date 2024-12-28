import { transactions } from "../dummyData/data.js"

const trasactionResolver = {
    Query: {
        transactions: async(_,_,context) => {
            try {
                if(!context.getUser()) throw new Error("Unauthorized")

                    const userId = await context.getUser()._id
                    const transactions = await Transaction.find({userId})
                    return transactions
            } catch (error) {
                console.log("error in geting tranasction", error)
                throw new Error(error.message || "Internal server error")
            }
        },

        transaction: async(_,_,{transactionId}) => {
            try {
                const transaction = await Transaction.findById(transactionId)
                return transaction
            } catch (error) {
                console.log("Error in getting transaction", error)
                throw new Error(error.message || "Internal server error")
            }
        }
    },
    mutation:{
        createTransaction: async(_,{input},context) => {
            try {
                const newTransaction = new Transaction({
                    ...input,
                    userId: context.getUser()._id
                })
                await newTransaction.save()
                return newTransaction
            } catch (error) {
                console.log("Error in creating Transaction", error)
                throw new Error(error.message || "Internal server error")
            }
        },
        updateTransaction: async(_,{input}) => {
            try {
                const updatedTransaction = await Transaction.findById(input.transactionId,input,{new:true})
                return updatedTransaction
            } catch (error) {
                console.log("Error in updating Transaction", error)
                throw new Error(error.message || "Internal server error")
            }
        },
        deleteTransaction: async(_,{transactionId}) => {
            try {
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId)
                return deletedTransaction
            } catch (error) {
                console.log("Error in deleting Transaction", error)
                throw new Error(error.message || "Internal server error")
            }
        }
    }
}

export default trasactionResolver
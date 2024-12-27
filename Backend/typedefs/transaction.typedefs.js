const transactionTypeDef = `#graphql
    type Transaction {
        _id: ID!,
        userId: ID!,
        description: String!,
        paymentType: String!,
        category: String!,
        location: String!,
        amount: Float!,
        date: String!
    }

    type Query {
        transactions: [Transaction!]
        transaction(transactionId: ID!): Transaction
    }

    type mutation {
        createTransaction(input: CreateTransactionInput!): Transaction!
        updateTransaction(input: UpdateTransactionInput!): Transaction!
        deleteTransaction(transactionId:ID!): Transaction!
    }

    input CreateTransactionInput {
        description: String!,
        paymentType: String!,
        category: String!,
        location: String,
        amount: Float!,
        date: String!
    }

    input UpdateTransactionInput {
        description: String,
        paymentType: String,
        category: String,
        location: String,
        amount: Float,
        date: String
    }
`

export default transactionTypeDef
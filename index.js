const server = require('./src/graphql/index')
const { initMongoDBConnection } = require('./src/database/index')

const main = async () => {
  try {
    // Init mongodb connection
    await initMongoDBConnection()

    server.listen(process.env.PORT || 4000).then(({ url }) => {
      console.log(`Server is listening at ${url}`)
    })
  } catch (e) {
    console.log(e)
  }
}

;(async () => {
  await main()
})()

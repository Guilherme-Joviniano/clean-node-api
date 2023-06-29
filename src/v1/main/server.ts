import app from './configs/app'

async function main (): Promise<void> {
  app.listen({
    port: 3333
  })
}

main().then(() => { console.log('Running on port 3333') }).catch((err) => { console.log(err) })

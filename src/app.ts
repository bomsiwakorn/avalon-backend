import express, { Application } from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import { env } from './config/environment'

import UserModule from './modules/user/user.module'

class Server {
  private app: Application
  private AVALON_LOGO: string = `
       ██   ██        ██   ██       ██         ███████   ████    ██
      ████   ██      ██   ████      ██        ██     ██  ██ ██   ██
     ██  ██   ██    ██   ██  ██     ██        ██     ██  ██  ██  ██
    ████████   ██  ██   ████████    ██        ██     ██  ██   ██ ██
   ██      ██   ████   ██      ██   ██        ██     ██  ██    ████
  ██        ██   ██   ██        ██   ███████   ███████   ██     ███
  `

  constructor() {
    this.app = express()
    this.configuration()
    this.moduleRegistry()
  }

  public start() {
    this.app.listen(env.PORT, () => {
      console.log(`Server is started at port: ${env.PORT}`)
      console.log(this.AVALON_LOGO)
    })
  }

  private configuration() {
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json())

    this.app.use(helmet())
    this.app.use(cors())
  }

  private moduleRegistry() {
    this.app.use(UserModule)
  }
}

const server = new Server()
server.start()

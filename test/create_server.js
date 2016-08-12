import Hapi from 'hapi'
import { register } from '../lib/hapi_i18n'

const HOST = process.env.HOSTNAME || '0.0.0.0'
const PORT = +process.env.PORT || 9999
const Server = module.exports = new Hapi.Server()

Server.connection({host: HOST, port: PORT})
Server.route([{
  path: '/locale',
  method: 'GET',
  handler: function (request, reply) {
    reply({ locale: request.i18n.getLocale() })
  }
}])
Server.register({
  register: register,
  options: {
    directory: './test/locales'
  }
}, (err) => {
  if (err) console.log(err)
})
Server.start(() => console.log(`Server started at [${Server.info.uri}]`))

export default Server

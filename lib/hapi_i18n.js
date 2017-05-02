import _ from 'lodash'
import { i18n as locale, locales as defaultLocale } from './i18n.js'
import Boom from 'boom'
import HeaderParser from 'accept-language-parser'
import Hoek from 'hoek'

class Hapii18n {

  constructor () {
    this.currentLocale = 'en'
    this._i18n = locale
  }

  bestMatch (requested) {
    if (!requested) return
    if (!Array.isArray(requested)) requested = [requested]

    for (let one of requested) {
      if (defaultLocale.indexOf(one) > -1) return one
    }
    return 'en'
  }

  parseHeader (request) {
    var raw = HeaderParser.parse(request.headers['accept-language'])
    var locales = raw.map(function (value) {
      return value.region ? value.code + '_' + value.region : value.code
    })
    return this.bestMatch(locales)
  }

  getLocale (request) {
    if (request.query && request.query.languageCode) {
      this.currentLocale = request.query.languageCode
      return
    }
    this.currentLocale = this.parseHeader(request)
  }

  extractDefaultLocale (allLocales) {
    if (!allLocales) {
      throw new Error('No locales defined!')
    }
    if (allLocales.length === 0) {
      throw new Error('Locales array is empty!')
    }
    return allLocales[0]
  }

  register (server, options, next) {
    var pluginOptions = {}
    if (options) {
      pluginOptions = options
    }
    this._i18n = locale.configure(pluginOptions)
    var defaultLocale = this.extractDefaultLocale(pluginOptions.locales)

    if (!pluginOptions.locales) {
      throw Error('No locales defined!')
    }
    server.ext('onPreAuth', (request, reply) => {
      if (typeof this._i18n === 'undefined') {
        this._i18n = locale
        this._i18n.configure(options)
      }
      request.i18n = this._i18n
      request.i18n.setLocale(defaultLocale)
      if (pluginOptions.languageHeaderField) {
        var languageCode = request.headers[pluginOptions.languageHeaderField]
        if (languageCode) {
          request.i18n.setLocale(languageCode)
        }
      }
      this.getLocale(request)
      if (_.includes(pluginOptions.locales, this.currentLocale) === false) {
        return reply(Boom.notFound('No localization available for ' + this.currentLocale))
      }
      this._i18n.setLocale(this.currentLocale)
      request.i18n.setLocale(this.currentLocale)
      return reply.continue()
    })

    server.ext('onPreResponse', (request, reply) => {
      if (!request.i18n || !request.response) {
        return reply.continue()
      }
      var response = request.response
      if (response.variety === 'view') {
        response.source.context = Hoek.merge(response.source.context || {}, request.i18n)
        response.source.context.languageCode = request.i18n.getLocale()
      }
      return reply.continue()
    })
    next()
  }

  get i18n () {
    if (typeof this._i18n === 'undefined') this._i18n = locale
    return this._i18n
  }

  set i18n (value) {
    this._i18n = value
  }

  get attributes () {
    return {
      name: 'hapi_i18n',
      version: '1.0.0'
    }
  }

  set attributes (o) {
    this.attributes = o
  }
}

export const i18n = new Hapii18n()
function register (server, options, next) {
  i18n.register(server, options, next)
}
register.attributes = i18n.attributes
export { register }

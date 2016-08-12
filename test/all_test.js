/* global after, before, describe, it */
import { expect } from 'chai'
import Server from './create_server'
import { i18n as Hapii18n } from '../lib/hapi_i18n'

const optionsEn = {
  json: true,
  method: 'GET',
  url: '/locale'
}
const optionsFr = {
  json: true,
  method: 'GET',
  url: '/locale?languageCode=fr'
}

const optionsFrHeader = {
  json: true,
  method: 'GET',
  headers: {
    'accept-language': 'fr_FR'
  },
  url: '/locale'
}
const enExpectedResult = {
  locale: 'en'
}

const frExpectedResult = {
  locale: 'fr'
}

describe('Localization', () => {
  it('translate `en` to `fr`', function (done) {
    const translateString_en = "All's well that ends well."
    const translateString_fr = 'Tout est bien qui finit bien.'
    const i18n = Hapii18n.i18n
    i18n.configure({
      directory: './test/locales'
    })
    i18n.setLocale('en')
    expect(i18n.__("All's well that ends well.")).to.equal(translateString_en)
    i18n.setLocale('fr')
    expect(i18n.__("All's well that ends well.")).to.equal(translateString_fr)
    done()
  })
  it('Use Hapi get locale `en`', function (done) {
    Server.inject(optionsEn, res => {
      expect(res.result).to.be.eql(enExpectedResult)
      done()
    })
  })
  it('Use Hapi get locale `fr` with query string', function (done) {
    Server.inject(optionsFr, res => {
      expect(res.result).to.be.eql(frExpectedResult)
      done()
    })
  })
  it('Use Hapi get locale `fr` with header', function (done) {
    Server.inject(optionsFrHeader, res => {
      expect(res.result).to.be.eql(frExpectedResult)
      done()
    })
  })
})

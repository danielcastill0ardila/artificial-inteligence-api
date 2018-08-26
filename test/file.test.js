'use strict'

import chai from 'chai'
import server from '../app'
import chaiHttp from 'chai-http'
import { resolve } from 'path'

const expect = chai.expect
const file = resolve('./test/img_test.png')

chai.use(chaiHttp)

describe('ValueController Test', () => {

  // it('GET api/value', (done) => {

  //   chai.request(server)
  //     .get('/api/value')
  //     .end((err, res) => {
  //       if (err) done(err)
  //       expect(res).to.have.status(200)
  //       expect(res.body).to.property('GET')
  //       done()
  //     })
  // })

})
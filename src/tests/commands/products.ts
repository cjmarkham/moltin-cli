import { expect } from 'chai'
import sinon = require('sinon')
import client from '../../helpers/client'

import products from '../../commands/products'
import { Product, ResponseError } from '../../schemas'
import { isResource } from '../../helpers/resource'

describe('commands:products', () => {
  describe('getAll', () => {
    context('success', () => {
      let stub: any

      before((done) => {
        stub = sinon.stub(client, 'get').resolves({ data: [{ id: 1 }, { id: 2 }] })
        done()
      })

      it('should return all products', async () => {
        const response: Product[] | ResponseError[] = await products.gets({})
        expect(stub.called).to.equal(true)
        expect(response).to.have.lengthOf(2)
        expect(isResource(response)).to.equal(true)
      })

      after((done) => {
        stub.restore()
        done()
      })
    })

    context('failure', () => {
      let stub: any

      before((done) => {
        stub = sinon.stub(client, 'get').rejects({errors: [{title: 'Error', detail: 'Some error'}]})
        done()
      })

      it('returns the error', async () => {
        const response: Product[] | ResponseError[] = await products.gets({})
        expect(stub.called).to.equal(true)
        expect(isResource(response)).to.equal(false)
      })

      after((done) => {
        stub.restore()
        done()
      })
    })
  })
})

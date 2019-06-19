import { expect, test } from '@oclif/test'

require('dotenv').config()

describe('products:get', () => {
  context('with ID', () => {
    test
      .stdout()
      .command(['products:get', '299ceefe-c06e-457c-9144-44a382fc8d7e'])
      .it('returns the product', (ctx) => {
        expect(ctx.stdout).to.contain('id: \'299ceefe-c06e-457c-9144-44a382fc8d7e\'')
      })
  })
})

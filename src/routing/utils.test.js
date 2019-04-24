import {
  removeUrlParameter,
  getQueryParam,
  getQueryFromUri,
  formatQueryParams,
  getHash,
} from './index'

it('getQueryFromUri', () => {
  const url = 'http://localhost:3000/groups/select?redirectTo=http%3A%2F%2Flocalhost%3A3000%2F%3Fgroup%3D24%26id%3D24&id=42&group=42'

  const url2 = 'http%3A%2F%2Flocalhost%3A3000%2F%3Fgroup%3D42%26id%3D42%26redirectTo%3D42'

  const url3 = 'http://localhost:3000/groups/select?id=42&group=42&redirectTo=http%3A%2F%2Flocalhost%3A3000%2F%3Fgroup%3D24%26id%3D24'

  expect(getQueryFromUri(url)).toEqual({
    id: '42',
    group: '42',
    redirectTo: 'http://localhost:3000/?group',
  })

  expect(getQueryFromUri(url3)).toEqual({
    id: '42',
    group: '42',
    redirectTo: 'http://localhost:3000/?group',
  })

  expect(getQueryFromUri(url)).toEqual({
    id: '42',
    group: '42',
    redirectTo: 'http://localhost:3000/?group',
  })

})

it('getQueryParam', () => {
  const url = 'http://localhost:3000/groups/select?redirectTo=http%3A%2F%2Flocalhost%3A3000%2F%3Fgroup%3D42%26id%3D5694639155707904&id=42&group=42'
  const url2 = 'http%3A%2F%2Flocalhost%3A3000%2F%3Fgroup%3D42%26id%3D42%26redirectTo%3D42'

  expect(getQueryParam('id', url)).toEqual("42")
  expect(getQueryParam('group', url)).toEqual("42")

  // the following returns null since the encoding makes to difficult to take the param

  expect(getQueryParam('id', url2)).toEqual(null)
  expect(getQueryParam('group', url2)).toEqual(null)

  expect(getQueryParam('redirecTo', url)).toEqual(null)
  expect(getQueryParam('redirecTo', url2)).toEqual(null)

  const url3 = 'http://localhost:3000/restaurant/16000106/catalog?apiConsumer=toto#r343&mode=0&tableNumber=1%23plat'
  expect(getQueryParam('tableNumber', url3)).toEqual('1')
  expect(getQueryParam('apiConsumer', url3)).toEqual('toto')
})

it('getHash', () => {
  const url = 'http://localhost:3000/#toto'
  const url2 = 'http%3A%2F%2Flocalhost%3A3000%2F%3Fgroup%3D42%26id%3D42%26redirectTo%3D42#toto'

  expect(getHash(url)).toEqual('toto')
  expect(getHash(url2)).toEqual('toto')

  const url3 = 'http://localhost:3000/restaurant/16000106/catalog?apiConsumer=toto&mode=0&tableNumber=1%23plat'
  expect(getHash(url3)).toEqual('plat')
})

it('removeUrlParameter simple', () => {
  const url = 'http://localhost:3000/groups/select?redirectTo=http%3A%2F%2Flocalhost%3A3000%2F%3Fgroup%3D42%26id%3D5694639155707904&id=42&group=42'

  const result = 'http://localhost:3000/groups/select?id=42&group=42'

  expect(removeUrlParameter(url, [ 'redirectTo', '' ])).toEqual(result)
  expect(removeUrlParameter(url, 'redirectTo')).toEqual(result)
})

// TODO: make pass
it('removeUrlParameter with encoding', () => {
  const url = 'http%3A%2F%2Flocalhost%3A3000%2F%3Fgroup%3D42%26id%3D42%26redirectTo%3D42'
  const res = 'http%3A%2F%2Flocalhost%3A3000%2F?group=42&id'

  expect(removeUrlParameter(url, [ 'redirectTo', '' ])).toEqual(res)
  expect(removeUrlParameter(url, 'redirectTo')).toEqual(res)
})


it('formatQueryParams', () => {
  const url = 'http://test.com'
  const query = {
    rGroup: 42,
    group: 42,
    redirectTo: 'http://test.com?rGroup=42&group=42',
  }

  expect(formatQueryParams(url, query))
  .toEqual(`${url}?rGroup=42&group=42&redirectTo=http://test.com?rGroup=42&group=42`)

  expect(formatQueryParams(null, query)).toEqual(null)
})

const chai = require('chai')
const supertest = require('supertest')

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Supertest de Proyecto Final', () => {
    describe('Test de session', () => {
        let cookie
        it('El endpoint de POST /api/session/login debe validar los datos y setear una cookie', async () => {
            const userMock = {
                email: 'gdelucchi@me.com',
                password: '1234'
            }

            const { statusCode, _body } = await requester.post('/api/session/login').send(userMock)

            expect(statusCode).to.be.equal(200)
            expect(_body.access_token).to.be.ok
        })
        it('El endpoint de POST /api/session/register debe crear un nuevo usuario', async () => {
            const userMock = {
                first_name: 'Pedro',
                last_name: 'Torrico',
                email: 'ptorrico@hotmail.com',
                password: '1234'
            }

            const { statusCode, _body } = await requester.post('/api/session/register').send(userMock)
            expect(statusCode).to.be.equal(200)
            expect(_body.payload._id).to.be.ok
        })
    })

    describe('Test de productos', () => {
        let cookie
        it('El endpoint de GET /api/products debe traer los productos correctamente', async () => {
            const { statusCode, _body } = await requester.get('/api/products')

            expect(statusCode).to.be.equal(200)
            expect(_body.payload).to.be.an('array')
        })
        it('El endpoint de GET /api/products/:pid debe traer el producto pedido correctamente', async () => {
            const pid = '6451cbc8457f713a70fedaa1'

            const { statusCode, _body } = await requester.get(`/api/products/${pid}`)

            expect(statusCode).to.be.equal(200)
            expect(_body.payload).to.have.an('object')
        })
        it('El endpoint de POST /api/products/ debe crear un producto correctamente', async () => {
            const userMock = {
                email: 'gdelucchi@me.com',
                password: '1234'
            }

            const resultLogin = await requester.post('/api/session/login').send(userMock)
            const cookieResult = resultLogin.headers['set-cookie'][0]
            cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1]
            }

            const productMock = {
                title: "Mesa",
                description: "Descripción de mesa",
                price: 2300,
                stock: 8,
                category: "Muebles",
                code: "Mes"
            }

            const { statusCode, _body } = await requester.post('/api/products').set('Cookie', [`${cookie.name}=${cookie.value}`]).send(productMock)

            expect(statusCode).to.be.equal(200)
            expect(_body.payload).to.have.an('object')
        })
    })

    describe('Test de carritos', () => {
        let cookie
        it('El endpoint de GET /api/carts debe traer los carritos correctamente', async () => {
            const userMock = {
                email: 'gdelucchi@me.com',
                password: '1234'
            }

            const resultLogin = await requester.post('/api/session/login').send(userMock)
            const cookieResult = resultLogin.headers['set-cookie'][0]
            cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1]
            }

            const { statusCode, _body } = await requester.get('/api/carts').set('Cookie', [`${cookie.name}=${cookie.value}`])
            expect(statusCode).to.be.equal(200)
            expect(_body.payload).to.be.an('array')
        })
        it('El endpoint de GET /api/carts/:cid debe traer el carrito pedido correctamente', async () => {
            const userMock = {
                email: 'beguiristainmelina@hotmail.es',
                password: 'Mayurimeeli12'
            }

            const resultLogin = await requester.post('/api/session/login').send(userMock)
            const cookieResult = resultLogin.headers['set-cookie'][0]
            cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1]
            }

            const cid = '6453218b1b6090ddd07d83bc'

            const { statusCode, _body } = await requester.get(`/api/carts/${cid}`).set('Cookie', [`${cookie.name}=${cookie.value}`])
            expect(statusCode).to.be.equal(200)
            expect(_body.payload).to.have.an('object')
        })
        it('El endpoint de DELETE /api/carts/:cid debe eliminar los productos dentro del carrito correctamente', async () => {
            const userMock = {
                email: 'beguiristainmelina@hotmail.es',
                password: 'Mayurimeeli12'
            }

            const resultLogin = await requester.post('/api/session/login').send(userMock)
            const cookieResult = resultLogin.headers['set-cookie'][0]
            cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1]
            }

            const cid = '6453218b1b6090ddd07d83bc'

            const { statusCode, _body } = await requester.delete(`/api/carts/${cid}`).set('Cookie', [`${cookie.name}=${cookie.value}`])
            expect(statusCode).to.be.equal(200)
            expect(_body.payload).to.be.equal('Eliminado')
        })
    })
})

import chai from 'chai'
import chaiHttp from 'chai-http';
import app from '../app';

//configure chai
chai.use(chaiHttp)
chai.should()

describe("Orders", () => {
    describe("GET /", () => {
        //Test to get all orders
        it("should get all orders data", (done) => {
            chai.request(app)
                .get('/orders')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done()
                })
        })

        //Test to get a single order
        it("should get a single order data", (done) => {
            const id = 1
            chai.request(app)
                .get(`/order/${id}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done()
                })
        })

        // Test fail to get a single order record (invalid id)
        it("should not get a single order data", (done) => {
            const id = 2919321
            chai.request(app)
                .get(`/order/${id}`)
                .end((err, res) => {
                    res.should.have.status(404)
                    done()
                })
        })
    })
})

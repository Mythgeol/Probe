const app = require('../app');
const request = require('supertest')(app);

describe('# test app.js', function () {
    it('GET / 200 test', function (done) {
        request
            .get('/')
            .expect(200, done)
    });
    it('GET /api/', function (done) {
        request
            .get('/api')
            .expect(200, done)
    });
    it('GET /api/run', function (done) {
        //http://localhost:3000
        request
            .get(`/api/run?Path=.%2Ffabric-samples%2Ftest-network%2F&BatchTimeout=1%2C2&MaxMessageCount=10&AbsoluteMaxBytes=2&PreferredMaxBytes=4&CoolDown=5&PrepareCLI=.%2FprepareConfig.sh&StartCLI=.%2Fnetwork.sh&TapeCLI=docker&ShutDownCLI=.%2Fnetwork.sh`)
            .expect(200, done)
    });
    it('GET /api/getBatchTimeout', function (done) {
        request
            .get('/api/getBatchTimeout')
            .expect(200, done)
    });
    it('GET /api/getMaxMessageCount', function (done) {
        request
            .get('/api/getMaxMessageCount')
            .expect(200, done)
    });
    it('GET /api/getAbsoluteMaxBytes', function (done) {
        request
            .get('/api/getAbsoluteMaxBytes')
            .expect(200, done)
    });
    it('GET /api/getPreferredMaxBytes', function (done) {
        request
            .get('/api/getPreferredMaxBytes')
            .expect(200, done)
    });
    it('GET /api/getTPS', function (done) {
        request
            .get('/api/getTPS')
            .expect(200, done)
    });
    it('GET / 200 result', function (done) {
        request
            .get('/result')
            .expect(200, done)
    });
});
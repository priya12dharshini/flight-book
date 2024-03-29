const express = require('express');
const router = express.Router();
const cors = require('cors')
const { test, registerUser, loginUser, getProfile, addFlight, removeFlight, getFlights } = require('../controllers/authController')


router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
);

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile',getProfile)
router.post('/add-flight',addFlight)
router.delete('/remove-flight/:flightNumber',removeFlight)
router.get('/get-flights', getFlights)

module.exports = router
const User = require('../models/user')
const Flight = require('../models/flight')
const { hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const test = (req, res) => {
    res.json('test is working')
}

const registerUser = async (req, res) => {
    try {
        const {name, email, password, userType} = req.body;
        if(!name) {
            return res.json({
                error: 'name is required'
            })
        };

        if(!password || password.length < 8) {
            return res.json({
                error: 'Password is required and should be at least 8 characters long'
            })
        };

        const exist = await User.findOne({email});
        if(exist) {
            return res.json({
                error: 'Email is taken already'
            })
        }

        if (!['Admin', 'User'].includes(userType)) {
            return res.json({
                error: 'Invalid userType. Must be either "Admin" or "User".'
            });
        }

        const hashedPassword = await hashPassword(password)

        const user = await User.create({
            name, email, password: hashedPassword, userType
        });

        return res.json(user)
    } catch (error) {
        console.log(error)
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password } = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res.json({
                error: 'No user found'
            })
        }


        if (user.userType !== 'Admin' && user.userType !== 'User') {
            return res.json({
                error: 'Invalid user type'
            });
        }
        
        const match = await comparePassword(password, user.password)
        if(match) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }
        if(!match) {
            res.json({
                error: "Passwords do not match"
            })
        }
    } catch (error) {
        console.log(error)
    }
};

const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", {}, (err, user) => {
            if(err) throw err;
            res.json(user);
        });
    } else {
        res.json(null)
    }
}

const addFlight = async (req, res) => {
    try {
        const { flightNumber, source, destination, date } = req.body;

        if (!flightNumber) {
            return res.json({
                error: 'Flight number is required'
            });
        }

        if (!source) {
            return res.json({
                error: 'Source is required'
            });
        }

        if (!destination) {
            return res.json({
                error: 'Destination is required'
            });
        }

        const flight = await Flight.create({
            flightNumber, source, destination, date
        });

        return res.json(flight);
    } catch (error) {
        console.log(error);
        return res.json('Failed to add flight');
    }
};


  const removeFlight = async (req, res) => {
    try {
      console.log(req.params);
      const { flightNumber } = req.params;
  
      const flight = await Flight.findOneAndDelete({ flightNumber });
  
      if (!flight) {
        return res.status(404).json({
          error: 'Flight not found',
        });
      }
  
      return res.json({
        message: 'Flight removed successfully',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to remove flight', details: error.message });
    }
  };
  
  
  

  const getFlights = async (req, res) => {
    try {
      const flights = await Flight.find(); 
      res.json(flights);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  


module.exports = {
    test,
    registerUser,
    loginUser, getProfile, 
    addFlight,
    removeFlight,
    getFlights,
};
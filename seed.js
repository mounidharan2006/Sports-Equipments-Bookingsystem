const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Equipment = require('./models/Equipment');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const equipment = [
    {
        name: 'Kookaburra Kahuna Cricket Bat',
        category: 'Cricket',
        description: 'Premium English Willow cricket bat suitable for advanced players.',
        totalQuantity: 10,
        availableQuantity: 10,
        image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
        name: 'SG Club Cricket Ball',
        category: 'Cricket',
        description: 'High quality leather cricket ball.',
        totalQuantity: 50,
        availableQuantity: 50,
        image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
        name: 'SS Professional Cricket Pads',
        category: 'Cricket',
        description: 'Lightweight and durable batting pads for maximum protection.',
        totalQuantity: 15,
        availableQuantity: 15,
        image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
        name: 'Nike Strike Football',
        category: 'Football',
        description: 'Standard size 5 football, perfect for match play.',
        totalQuantity: 20,
        availableQuantity: 20,
        image: 'https://images.unsplash.com/photo-1614632537197-38a4705f4585?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
        name: 'Adidas Predator Goalkeeper Gloves',
        category: 'Football',
        description: 'Professional grade goalkeeper gloves.',
        totalQuantity: 5,
        availableQuantity: 5,
        image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
        name: 'Football Training Cones',
        category: 'Football',
        description: 'Set of 50 training cones for drills.',
        totalQuantity: 30,
        availableQuantity: 30,
        image: 'https://images.unsplash.com/photo-1518605368461-1ee7c5035504?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
        name: 'Yonex Astrox 99 Badminton Racket',
        category: 'Badminton',
        description: 'Head heavy racket for powerful smashes.',
        totalQuantity: 12,
        availableQuantity: 12,
        image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
        name: 'Yonex Mavis 350 Shuttlecocks',
        category: 'Badminton',
        description: 'Nylon shuttlecocks, tube of 6.',
        totalQuantity: 40,
        availableQuantity: 40,
        image: 'https://plus.unsplash.com/premium_photo-1679913161271-6cbf298e79e6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
        name: 'Badminton Net',
        category: 'Badminton',
        description: 'Standard tournament size badminton net.',
        totalQuantity: 8,
        availableQuantity: 8,
        image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
        name: 'Spalding NBA Official Basketball',
        category: 'Basketball',
        description: 'Official size and weight basketball.',
        totalQuantity: 15,
        availableQuantity: 15,
        image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
        name: 'Wilson Evolution Basketball',
        category: 'Basketball',
        description: 'Indoor game basketball.',
        totalQuantity: 10,
        availableQuantity: 10,
        image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
        name: 'Wilson Pro Staff Tennis Racket',
        category: 'Tennis',
        description: 'Professional tennis racket.',
        totalQuantity: 8,
        availableQuantity: 8,
        image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
        name: 'Penn Championship Tennis Balls',
        category: 'Tennis',
        description: 'Can of 3 tennis balls.',
        totalQuantity: 25,
        availableQuantity: 25,
        image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    }
];

const importData = async () => {
    try {
        await Equipment.deleteMany();
        await Equipment.insertMany(equipment);
        console.log('Data Imported...');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

importData();

const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '..', 'data.json');

const defaultData = {
    users: [],
    bookings: [],
    equipment: [
        {
            _id: 'eq1', name: 'Kookaburra Kahuna Cricket Bat', category: 'Cricket', description: 'Premium English Willow cricket bat.', totalQuantity: 10, availableQuantity: 10, image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
            _id: 'eq2', name: 'SG Club Cricket Ball', category: 'Cricket', description: 'High quality leather cricket ball.', totalQuantity: 50, availableQuantity: 50, image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
            _id: 'eq3', name: 'Nike Strike Football', category: 'Football', description: 'Standard size 5 football, perfect for match play.', totalQuantity: 20, availableQuantity: 20, image: 'https://images.unsplash.com/photo-1614632537197-38a4705f4585?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
            _id: 'eq4', name: 'Spalding NBA Official Basketball', category: 'Basketball', description: 'Official size and weight basketball.', totalQuantity: 15, availableQuantity: 15, image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
            _id: 'eq5', name: 'Yonex Astrox 99 Badminton Racket', category: 'Badminton', description: 'Head heavy racket for powerful smashes.', totalQuantity: 12, availableQuantity: 12, image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        }
    ]
};

exports.initDB = () => {
    if (!fs.existsSync(dataFile)) {
        fs.writeFileSync(dataFile, JSON.stringify(defaultData, null, 2));
        console.log('JSON Database initialized.');
    }
};

exports.readDB = () => {
    const rawData = fs.readFileSync(dataFile);
    return JSON.parse(rawData);
};

exports.writeDB = (data) => {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

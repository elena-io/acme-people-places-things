const Sequelize = require('sequelize');
const { DataTypes: {STRING, INTERGER} } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/ppt_db')

const data = {
    people: ['moe', 'larry', 'lucy', 'ethyl'],
    places: ['paris', 'nyc', 'chicago', 'london'],
    things: ['foo', 'bar', 'bazz', 'quq']
  };

const Person = conn.define('person', {
    name: {
        type: STRING, 
        unique: true,
        allowNull: false
    }
})

const Place = conn.define('place', {
    name: {
        type: STRING, 
        unique: true,
        allowNull: false
    }
})

const Thing = conn.define('thing', {
    name: {
        type: STRING, 
        unique: true,
        allowNull: false
    }
})

Person.hasMany(Place);
Person.hasMany(Thing);
Place.belongsTo(Person);
Thing.belongsTo(Person);

const syncAndSeed = async() => {
    await conn.sync({ force: true });

    const people = await Promise.all(
        data.people.map(name => {
            Person.create({ name })
        })
    )  
    const places = await Promise.all(
        data.places.map(name => {
            Place.create({ name })
        })
    )
    const things = await Promise.all(
        data.things.map(name => {
            Thing.create({ name })
        })
    )
}



module.exports = {
    syncAndSeed, 
    models: {
        Person, 
        Place, 
        Thing
    }

}


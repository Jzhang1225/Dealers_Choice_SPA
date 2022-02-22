const Sequelize = require('sequelize');
const {STRING, ENUM} = Sequelize
const database = new Sequelize('postgres://localhost/banned_mtgcards', {logging:false});

const Card = database.define('card',{
    name:{
        type: STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    manaValue:{
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    cardType:{
        type: ENUM('Sorcery', 'Instant', 'Creature', 'Planeswalker', 'Artifact', 'Enchantment')
    }
})

const init = async () =>{
    await database.sync({force:true})
    console.log('CONNECTED TO DB');
    await Card.create({
        name: `Alrund's Epiphany`,
        manaValue: '5BB',
        cardType: 'Sorcery',
    })
    await Card.create({
        name: 'Paradox Engine',
        manaValue: '5',
        cardType: 'Artifact',
    })
    await Card.create({
        name: 'Divide by Zero',
        manaValue: '2B',
        cardType: 'Instant',
    })
    await Card.create({
        name: 'Oko',
        manaValue: '1GB',
        cardType: 'Planeswalker',
    })
}

module.exports = {database, init, Card}
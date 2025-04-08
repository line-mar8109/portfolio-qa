const { faker } = require('@faker-js/faker');
module.exports = {
    "firstname": faker.person.firstName('female'),
    "email": faker.internet.email(),
    "password": faker.internet.password({ length: 10 ,memorable: true }),
    "lastname": faker.person.lastName(),
    "address": faker.location.streetAddress({ useFullAddress: true }),
    "state": faker.location.state(),
    "city": faker.location.city(),
    "zipcode": faker.location.zipCode(),
    "mobile": faker.phone.number({ style: 'international' }),
    "day30": faker.number.int({ max: 30 }),
    "month": faker.date.month(),
    "year": faker.number.int({ min: 2000, max: 2010 }).toString(),
    "country":  faker.number.int({ min: 0, max: 6 })
}
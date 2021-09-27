/**
 * This script is to insert initial data inside the collection people of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */

// Insert people array
db.getCollection('people').insertMany([
  {
    photo: 'https://randomuser.me/portraits/women/59.jpg',
    firstname: 'Leanne',
    lastname: 'Woodard',
    entity: 'BIOSPAN',
    birthDate: ISODate('1974-01-01T23:00:00.000Z'),
    email: 'Leanne.Woodard@BIOSPAN.com',
    phone: '+33784112248',
    address: {
      street: 'Narrows Avenue',
      postalCode: NumberInt(70534),
      city: 'Boling',
    },
    isManager: false,
    manager: 'Erika',
  },
  {
    photo: 'https://randomuser.me/portraits/men/65.jpg',
    firstname: 'Castaneda',
    lastname: 'Salinas',
    entity: 'METROZ',
    birthDate: ISODate('1963-01-21T23:00:00.000Z'),
    email: 'Castaneda.Salinas@METROZ.com',
    phone: '+33145652522',
    address: {
      street: 'Metrotech Courtr',
      postalCode: NumberInt(53292),
      city: 'Franklin',
    },
    isManager: false,
    manager: 'Erika',
  },
  {
    photo: 'https://randomuser.me/portraits/women/74.jpg',
    firstname: 'Phyllis',
    lastname: 'Donovan',
    entity: 'PEARLESSA',
    birthDate: ISODate('1951-11-29T23:00:00.000Z'),
    email: 'Phyllis.Donovan@PEARLESSA.com',
    phone: '+33685230125',
    address: {
      street: 'Oakland Place',
      postalCode: NumberInt(40863),
      city: 'Onton',
    },
    isManager: false,
    manager: 'Erika',
  },
  {
    photo: 'https://randomuser.me/portraits/women/9.jpg',
    firstname: 'Erika',
    lastname: 'Guzman',
    entity: 'CIRCUM',
    birthDate: ISODate('1962-03-18T23:00:00.000Z'),
    email: 'Erika.Guzman@CIRCUM.com',
    phone: '+33678412587',
    address: {
      street: 'Havemeyer Street',
      postalCode: NumberInt(76154),
      city: 'Yardville',
    },
    isManager: true,
    manager: 'Mercedes',
  },
  {
    photo: 'https://randomuser.me/portraits/men/98.jpg',
    firstname: 'Moody',
    lastname: 'Prince',
    entity: 'TRIPSCH',
    birthDate: ISODate('1971-04-14T23:00:00.000Z'),
    email: 'Moody.Prince@TRIPSCH.com',
    phone: '+33662589632',
    address: {
      street: 'Russell Street',
      postalCode: NumberInt(51004),
      city: 'Coloma',
    },
    isManager: false,
    manager: 'Mercedes',
  },
  {
    photo: 'https://randomuser.me/portraits/women/81.jpg',
    firstname: 'Mercedes',
    lastname: 'Hebert',
    entity: 'QUINTITY',
    birthDate: ISODate('1947-07-19T23:00:00.000Z'),
    email: 'Mercedes.Hebert@QUINTITY.com',
    phone: '+33125878522',
    address: {
      street: 'Laurel Avenue',
      postalCode: NumberInt(85752),
      city: 'Northchase',
    },
    isManager: true,
    manager: 'Mclaughlin',
  },
  {
    photo: 'https://randomuser.me/portraits/men/39.jpg',
    firstname: 'Howell',
    lastname: 'Mcknight',
    entity: 'KRAG',
    birthDate: ISODate('1979-07-17T22:00:00.000Z'),
    email: 'Howell.Mcknight@KRAG.com',
    phone: '+33456987425',
    address: {
      street: 'Ford Street',
      postalCode: NumberInt(58545),
      city: 'Shindler',
    },
    isManager: false,
    manager: 'Mclaughlin',
  },
  {
    photo: 'https://randomuser.me/portraits/women/86.jpg',
    firstname: 'Lizzie',
    lastname: 'Morris',
    entity: 'NSPIRE',
    birthDate: ISODate('1981-11-14T23:00:00.000Z'),
    email: 'Lizzie.Morris@NSPIRE.com',
    phone: '+33662259988',
    address: {
      street: 'Hall Street',
      postalCode: NumberInt(27946),
      city: 'Waverly',
    },
    isManager: false,
    manager: 'Mclaughlin',
  },
  {
    photo: 'https://randomuser.me/portraits/men/55.jpg',
    firstname: 'Roy',
    lastname: 'Nielsen',
    entity: 'QNEKT',
    birthDate: ISODate('1951-10-20T23:00:00.000Z'),
    email: 'Roy.Nielsen@QNEKT.com',
    phone: '+33755669551',
    address: {
      street: 'Sumner Place',
      postalCode: NumberInt(36335),
      city: 'Glidden',
    },
    isManager: false,
    manager: 'Mclaughlin',
  },
  {
    photo: 'https://randomuser.me/portraits/men/70.jpg',
    firstname: 'Mclaughlin',
    lastname: 'Cochran',
    entity: 'UTARA',
    birthDate: ISODate('1973-03-18T23:00:00.000Z'),
    email: 'Mclaughlin.Cochran@undefined.com',
    phone: '+33266334856',
    address: {
      street: 'Jewel Street',
      postalCode: NumberInt(61400),
      city: 'Snelling',
    },
    isManager: true,
  },
]);

// Create an array with manager element
var data = db
  .getCollection('people')
  .find({})
  .map(function (element) {
    return {
      _id: element._id,
      firstname: element.firstname,
      manager: element.manager,
    };
  });

// For each element of the array ...
data.forEach(function (element) {
  // ... check if we have a manager
  if (!!element.manager) {
    // try to get the related manager element inside the array
    var manager = data.find(function (elt) {
      return elt.firstname.toLowerCase() === element.manager.toLowerCase();
    });

    // check if we found one
    if (!!manager) {
      // update the person with the managerId
      db.getCollection('people').updateOne(
        { _id: element._id },
        { $set: { managerId: manager._id } },
      );
    }
  }
});

// display the final initial data
db.getCollection('people').find({});

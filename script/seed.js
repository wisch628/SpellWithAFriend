const { green, red } = require('chalk');
const User = require('../server/db/models/users');
const { db } = require('../server/db');

const seed = async () => {
  try {
    await db.sync({ force: true });
    const users = await Promise.all([
      User.create({  firstName: 'Hannah', lastName: 'Wischnia', email: 'hannah@mail.com', password: 'hannah123'}),
      User.create({  firstName: 'Dom', lastName: 'Zona', email: 'dom@mail.com', password: 'dom123' }),
      User.create({  firstName: 'Brooke', lastName: 'Sterneck', email: 'brooke@mail.com', password: 'brooke123' }),
    ]);

    const [hannah, dom, brooke] = users;
  
    //ADD IN YOUR RELATIONSHIPS HERE
    //await hannah.setProjects([marketing, engineering]);
  
  return [hannah, dom, brooke];

  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}

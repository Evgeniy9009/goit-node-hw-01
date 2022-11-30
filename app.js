const { Command } = require("commander");
const program = new Command()

// const nodemon = require("nodemon")
const contacts = require('./contacts')

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
console.log(argv)

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch(action) {
        case 'list':
            const allContacts = await contacts.listContacts();
            console.table(allContacts);
            break;
        case 'get':
            const oneContact = await contacts.getContactById(id);
            console.log(oneContact);
            break;
        case 'remove':
            const deleteContact = await contacts.removeContact(id);
            console.log(deleteContact);
            break;
        case 'add':
            const newContact = await contacts.addContact({ name, email, phone });
            console.log(newContact);
            break;
        case 'update':
            const updateContact = await contacts.updateById(id, { name, email, phone });
            console.log(updateContact);
            break;
        default:
            await console.warn("\x1B[31m Unknown action type!");
            // console.log('Unknown action')
    }
}

invokeAction(argv);

// invokeAction({ action: 'list' })
// invokeAction({ action: 'get', id: '3' })
// invokeAction({
//     action: 'add',
//     name: 'Evgeniy',
//     email: 'evgeniy.gmail.com',
//     phone: '(098) 2434-177'})
// invokeAction({ action: 'remove', id: 'd061559f-1c48-44bc-8f22-c0ed8aeaadc1'})

// invokeAction({
//     action: 'update',
//     id: 'd061559f-1c48-44bc-8f22-c0ed8aeaadc1',
//     name: 'Evgeniy1111',
//     email: 'evgeniy111.gmail.com',
//     phone: '(098) 1111-177'})

// node app.js --action get --id 5
// node app.js --action add --name Mango --email mango@gmail.com --phone 322-22-22
// node app.js --action remove --id=10
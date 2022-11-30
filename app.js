// const nodemon = require("nodemon")
const contacts = require('./contacts')

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch(action) {
        case 'listContacts':
            const allContacts = await contacts.listContacts();
            console.log(allContacts);
            break;
        case 'getContactById':
            const oneContact = await contacts.getContactById(id);
            console.log(oneContact);
            break;
        case 'removeContact':
            const deleteContact = await contacts.removeContact(id);
            console.log(deleteContact);
            break;
        case 'addContact':
            const newContact = await contacts.addContact({ name, email, phone });
            console.log(newContact);
            break;
        case 'updateById':
            const updateContact = await contacts.updateById(id, { name, email, phone });
            console.log(updateContact);
            break;
        default:console.log('Unknown action')
        
    }
}
// invokeAction({ action: 'listContacts' })
// invokeAction({ action: 'getContactById', id: '3' })
// invokeAction({
//     action: 'addContact',
//     name: 'Evgeniy',
//     email: 'evgeniy.gmail.com',
//     phone: '(098) 2434-177'})
// invokeAction({ action: 'removeContact', id: 'd061559f-1c48-44bc-8f22-c0ed8aeaadc1'})

// invokeAction({
//     action: 'updateById',
//     id: 'd061559f-1c48-44bc-8f22-c0ed8aeaadc1',
//     name: 'Evgeniy1111',
//     email: 'evgeniy111.gmail.com',
//     phone: '(098) 1111-177'})
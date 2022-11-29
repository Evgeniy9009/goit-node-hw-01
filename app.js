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
            console.log(deleteContact)
            break
        case 'addContact':
            const newContact = await contacts.addContact({name, email, phone})
            console.log(newContact);
            break;
        default:console.log('Unknown action')
        
    }
}
// invokeAction({ action: 'listContacts' })
// invokeAction({ action: 'getContactById', id: '1' })
// invokeAction({
//     action: 'addContact',
//     name: 'Evgeniy',
//     email: 'evgeniy.gmail.com',
//     phone: '(098) 2434-177'})
// invokeAction({ action: 'removeContact', id: '35f76e39-cd72-4663-b95d-6ff04d185530'})

// invokeAction({ action: 'updateContact', id: '35f76e39-cd72-4663-b95d-6ff04d185530'})
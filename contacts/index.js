const fs = require("fs/promises")
// const fs = require("fs").promises
const path = require("path");
const {v4} = require("uuid")

const contactsPath = path.join(__dirname, "contacts.json");
console.log(__dirname)


const listContacts = async() => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts
}

async function getContactById(contactId) {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const result = contacts.find(item => item.id === contactId);
    if (!result) {
        throw new Error(`Contact with id ${contactId} not found`)
    }
    return result
}

async function removeContact(contactId) {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const idx = contacts.findIndex(item => item.id ===contactId)
    if (idx === -1) {
        console.log('no contact')
        return null
    }
    const [removeContact] = contacts.splice(idx, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return removeContact

    // const newContacts = contacts.filter((_, index) => index !== idx)
    // await fs.writeFile(contactsPath, JSON.stringify(contacts))
    // console.log(contacts[idx])
    // return
}


async function addContact({name, email, phone}) {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const newContact = { name, email, phone, id: v4() }
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    
    // const double = contacts.filter((item) => item[phone] === newContact[phone])
    // console.log(double);
    // if (double) {
    //     console.log('double', double)
    //     return
    // }
    return newContact
}



module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}



const fs = require("fs/promises")
// const fs = require("fs").promises
const path = require("path");
const {v4} = require("uuid")

const contactsPath = path.join(__dirname, "contacts.json");
console.log(__dirname)

const getAll = async(contacts) => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const updateContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));;
}


const listContacts = async() => {
    
    const contacts = await getAll()
    return contacts
}

async function getContactById(contactId) {
    const normalizeId = String(contactId)
    const contacts = await getAll()

    const result = contacts.find(item => item.id === normalizeId);
    if (!result) {
        throw new Error(`Contact with id ${normalizeId} not found`)
    }
    return result
}

async function removeContact(contactId) {
    const contacts = await getAll()
    const normalizeId = String(contactId)

    const idx = contacts.findIndex(item => item.id ===normalizeId)
    if (idx === -1) {
        console.log('no contact')
        return null
    }
    const [removeContact] = contacts.splice(idx, 1)
    await updateContacts(contacts);
    return removeContact

    // const newContacts = contacts.filter((_, index) => index !== idx)
    // await fs.writeFile(contactsPath, JSON.stringify(contacts))
    // console.log(contacts[idx])
    // return
}


async function addContact({name, email, phone}) {
    const contacts = await getAll();

    const newContact = {
        name,
        email,
        phone,
        id: v4()
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

async function updateById(id, data) {
    const normalizeId = String(id)
    const contacts = await getAll()

    const idx = contacts.findIndex(item => item.id === normalizeId);
    if (idx === -1) {
        return null;
    }
    contacts[idx] = { id, ...data };
    await updateContacts(contacts);
    return contacts[idx];
}



module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateById
}



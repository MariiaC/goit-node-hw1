import functions from './contacts.js';

import { Command } from 'commander';



const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
          const contacts = await functions.listContacts();
          console.table(contacts);
      break;

    case "get":
          const receivedContacts = await functions.getContactById(id);
          console.table(receivedContacts);
      break;

    case "add":
          const addedContacts = await functions.addContact({
              name, email, phone,
          });
           console.table(addedContacts);
      break;

    case "remove":
          const removedContacts = await functions.removeContact(id);
          console.table(removedContacts);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
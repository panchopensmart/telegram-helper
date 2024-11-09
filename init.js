require('dotenv').config();

const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require('input');
const fs = require('fs');

const session = new StringSession(''); // leave this empty for now
const apiId = Number(process.env.API_ID);
const apiHash = process.env.API_HASH;
const sessionFile = 'session.json';

async function init() {
    let session;

    if (fs.existsSync(sessionFile)) {
        const sessionDate = JSON.parse(fs.readFileSync(sessionFile));
        session = new StringSession(sessionDate.session);
    } else {
        session = new StringSession('')
    }

    const client = new TelegramClient(
        session,
        apiId,
        apiHash,
        { connectionRetries: 5 }
    );

    console.log('Connecting to Telegram...');

    await client.start({
        phoneNumber: async () => await input.text('Input phone number: '),
        password: async () => await input.text('Input password: '),
        phoneCode: async () => await input.text('Input telegram code: '),
        onError: (err) => console.log(err),
    });

    console.log('You are now connected.');

    fs.writeFileSync(sessionFile, JSON.stringify({ session: client.session.save() }));

    return client;
}

module.exports = {init};
const {Api} = require("telegram");
const {init} = require("./init");
const input = require('input');

async function main() {
    const client = await init();
    const resultUser = await client.invoke(
        new Api.users.GetFullUser({
            id: '@tonnymntna',
        })
    );
    console.log('Пользователь')
    console.log(resultUser);
}

main().catch(console.error);
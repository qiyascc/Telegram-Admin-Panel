const { Telegraf, Markup } = require('telegraf');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./news.db');

const bot = new Telegraf('telegram-bot-token');

// Table check and creation
db.run(`CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    summary TEXT,
    content TEXT
)`, (err) => {
    if (err) {
        console.error('Could not create table!', err.message);
    } else {
        console.log('News table checked/created.');
    }
});

let state = {};

bot.start((ctx) => {
    ctx.reply(
        'Hello, I am bot', 
        Markup.inlineKeyboard([
            [
                Markup.button.callback('Help', 'MENU'),
                Markup.button.url('Author', 't.me/qiyascc')
            ]
        ])
    );
});

bot.action('MENU', (ctx) => {
    ctx.deleteMessage();
    ctx.reply(
        'There is one command to use the bot.\n- /news\n\nType /news, then the news title, then the description, then the news content.', 
        Markup.inlineKeyboard([
            Markup.button.callback('Close', 'DELETE')
        ])
    );
});

bot.action('DELETE', (ctx) => {
    ctx.deleteMessage();
});

bot.command('news', (ctx) => {
    state = { step: 1 };
    ctx.reply('Please enter the news title.');
});

bot.on('text', (ctx) => {
    if (!state.step) return;

    if (state.step === 1) {
        state.title = ctx.message.text;
        state.step = 2;
        ctx.reply('Please enter the news summary.');
    } else if (state.step === 2) {
        state.summary = ctx.message.text;
        state.step = 3;
        ctx.reply('Please enter the news content.');
    } else if (state.step === 3) {
        state.content = ctx.message.text;
        db.run('INSERT INTO news (title, summary, content) VALUES (?, ?, ?)', [state.title, state.summary, state.content], (err) => {
            if (err) {
                ctx.reply('Error! Could not add news. Error details: ' + err.message);
            } else {
                ctx.reply('News successfully added.');
            }
        });
        state = {};
    }
});

bot.launch();

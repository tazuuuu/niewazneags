const fs = require('fs');
const Discord = require("discord.js");
const TOKEN = "NTMyMjE3MTMxMTU3MjkxMDM4.DxZRZA.29GF2Glelh8QK8uHCT8C6lkJj0o";
const glob = new require('node-localstorage').LocalStorage('global')

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

let refreshOnline = guild => {
    let count = 0
    let admCount = 0
    guild.members.forEach(member => {
        if(member.presence.status === 'online' || member.presence.status === 'dnd' || member.presence.status === 'idle'){
            count++
            if(member.roles.find('name', 'adm.'))
                admCount++
        }
    })
    if(count > parseInt(glob.getItem('maxOnline'))){
        glob.setItem('maxOnline', count)
        guild.channels.get('532216729699352577').setName('• Rekord Onlin: ' + count)
    }
    guild.channels.get('532216767888752641').setName('• Online: ' + count)
    guild.channels.get('532216782006517780').setName('• Administracja Online: ' + admCount )
}

let refreshCount = guild =>
    guild.channels.get('532216792433557536').setName('• Użytkownicy: ' + guild.memberCount)

bot.on('presenceUpdate', member => refreshOnline(member.guild))
bot.on('guildMemberAdd', member => refreshCount(member.guild))
bot.on('guildMemberRemove', member => refreshCount(member.guild))

bot.on('ready', () => {
    glob.setItem('maxOnline', 0)
    bot.guilds.first().channels.get('532216792433557536').setName('• Użytkownicy: ' + bot.guilds.first().memberCount)
    console.log('Uruchomiono na serwerze Bedwarsy.pl [BETA]!')
});

bot.on('message', message => {
    if (message.content.startsWith('ping')) {
      message.channel.send('pong');
  }
  
  
  });

  bot.on('message', message => {
    if (message.content.startsWith('!pomoc')) {
      message.channel.send('**Przydatne komendy:**\n\nWkrótce.\n\n**FAQ:**\n\nJakie jest IP waszego serwera?\n- Bedwarsy.pl\n\nJaka jest wersja waszego serwera?\n - Wersja 1.12.2\n\nCo zrobić w sytuacji kiedy domena **Bedwarsy.pl** mi nie działa?\n- Połącz się poprzez domenę **bedwarsy.maxc.pl** lub **.maxcraft.pl**');
  }
  
  
  });

  bot.on('message', message => {
    if (message.content.startsWith('!wzórgeneruj')) {
      message.channel.send('Wzór został pomyślnie wygenerowany.\n\n```Imię:\nNick:\nWiek:\nCoś o sobie:\nCo wniesiesz swoją osobą do naszego projektu:\nUmiejętność korzystania z podstawowych komend (0/10):\nWcześniejsze doświadczenie, o ile takie masz:\nInne projekty na których pełniłeś podobne stanowisko:\nSkładka (TAK/NIE):```');
  }
  
  
  });

const prefix = "przyjmij!";
bot.on ("message", (message) => {

    var msg = message.content.toLowerCase();

    if (message.author.bot) return;

    mention = message.mentions.users.first();

    if (msg.startsWith (prefix + "send")) {
        if (mention === null) { return; }
        message.delete();
        mentionMessage = message.content.slice (13);
        mention.sendMessage (mentionMessage);
        message.channel.send ("Wiadomość została poprawnie wysłana do użytkownika!");
    }
})

bot.on('message', message => {
    if(!message.content.startsWith('!')) return

    let args = message.content.substring(1).split(' ')
    let cmd = args.shift()

    switch(cmd){
        case 'say':
            if(message.author.id === '448182151230390272')
                message.channel.send(args.join(' '))
                    .then(message.delete())
            break
    }
})

bot.login(TOKEN);

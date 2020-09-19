const Discord = require("discord.js");

const ytdl = require("ytdl-core");

const Client = new Discord.Client;

const prefix = "$";

Client.on("ready", () => {
    console.log("Astrabot connecté");
});

Client.on("message", message => {
if(message.author.bot) return;

if(message.content.startsWith(prefix + "play")){
    if(message.member.voice.channel){
        message.member.voice.channel.join().then(connection => {
            let args = message.content.split(" ");

            if(!args[1]){
                message.reply("Lien de la vidéo non ou mal renseigné.");
            }
            
            let dispatcher = connection.play(ytdl(args[1], { quality: "highestaudio"}));

            dispatcher.on("finish", () => {
                dispatcher.destroy();
            });

dispatcher.on("error", err => {
    console.log("erreur du dispatcher : " + err);
});

}).catch(err =>
    message.reply("Erreur lors de la connexion : " + err));

    }
    else {
        message.reply("Connectez vous dans un salon vocal d'abord.")
    }
}
});


Client.login("NzU2MDgyMTA3MzczMTkxMTc5.X2MqVQ.8dPLEu5eBG8sLRg-l0UZGr8w7GA");
const Discord = require("discord.js");
//const DiscordIO = require('discord.io');
const client = new Discord.Client();
const settings = require("./auth.json");
const triggered = client.emojis.find("name", "smile");
const Browser = require("zombie");
var fs = require("fs");
var path = require("path");
var util = require("util");

const warnBuffer = 3;
const maxBuffer = 5;
const interval = 1000;
const warningMessage = "stop spamming or I'll whack your head off.";
const banMessage = "has been banned for spamming, anyone else?";
const maxDuplicatesWarning = 5;
const maxDuplicatesBan = 10;

const authors = [];
var warned = [];
var banned = [];
var messagelog = [];

client.on("ready", () => {
	console.log("I'm Online");
});

var prefix = "~";

client.on("guildMemberAdd", member => {
	//logs every user who joins into the console
	console.log(member.user.username);
	console.log(member.toString());
	console.log(member.id.toString());
	
	// //<<autockicks troll/spammers
	// var posuser = member.user.username.toLowerCase();
	
	// var kick = false;
	
	// if (posuser.includes("crowdkilla")) kick = true;
	// if (posuser.includes("crowd killa")) kick = true;
	
	// if (posuser.includes("colt heard")) kick = true;
	// //if (posuser.includes("buttbaby")) kick = true;
	// if (posuser.includes("nibiru emmissary")) kick = true;
	// if (posuser.includes("mirai chan")) kick = true;
	// if (posuser.includes("booch")) kick = true;
	
	// if(kick==true) {
	// 	member.user.sendMessage("GTFO");
	
	// 	member.kick("GTFO");
	// 	console.log('Kicked potential POS: '+posuser);
	
	// }
	// //autokicks some troll/spammers >>>>
});

client.on("message", message => {
	if (message.author === client.user) return;
	
	var msg = message;
	
	if (message.content.startsWith(prefix + "ping")) {
		message.channel.send("pong");
	}
	
	if (message.content.toLowerCase().includes("-lsdtolerance")) {
		// Usage -lsdtolerance [days since last trip]. calculates tolerance/extra dose needed to achieve normal effects
		
		var str = message.content;
		var res = str.split(" ");
		var x = parseFloat(res[res.length - 1]);
		var y = Math.pow(x - 14, 4) / 150 + (20 - x / 14 * 20) + 100;
		
		message.channel.send(
			"Take ~" + Math.ceil(y / 10) * 10 + "% of the drug to reach full effects."
		);
		message.react("373311440540532736"); //reacts with the lsd emoji on the 700 club.
	}
	
	//calc dxm plateau dosages. usage -dxmcalc [weight in pounds]
	if (message.content.toLowerCase().includes("-dxmcalc")) {
		var str = message.content;
		var res = str.split(" ");
		
		message.channel.send("KGB RECOMMENDS:");
		
		message.channel.send(
			parseFloat(res[res.length - 1]) * 0.8 +
			"mg to " +
			parseFloat(res[res.length - 1]) * 1.2 +
			"mg of DXM for 1st Plateau"
		);
		
		message.channel.send(
			parseFloat(res[res.length - 1]) * 1.75 +
			"mg to " +
			parseFloat(res[res.length - 1]) * 3.15 +
			"mg of DXM for 2nd Plateau"
		);
		
		message.channel.send(
			parseFloat(res[res.length - 1]) * 3.5 +
			"mg to " +
			parseFloat(res[res.length - 1]) * 6.6 +
			"mg of DXM for 3rd Plateau"
		);
		
		message.channel.send(
			parseFloat(res[res.length - 1]) * 6.6 +
			"mg to " +
			parseFloat(res[res.length - 1]) * 10 +
			"mg of DXM for 4th Plateau"
		);
		message.react("373313463226728451"); // reacts with the dxm emoji on the 700club server to the comman message
	}
	
	if (message.content.toLowerCase().includes("-info")) {
		var str = message.content;
		var res = str.split(" ");
		var _drug = str
		.toLowerCase()
		.replace("-info ", "", -1)
		.replace(/-/g, "", -1)
		.replace(/ /g, "", -1); //removes all symbols and puts everything in lower case so bot finds the images easier
		
		//spacial cases
		
		if (_drug == "dipt") _drug = "dipt";
		if (_drug == "moxy") _drug = "5meomipt";
		if (_drug == "molly") _drug = "mdma";
		if (_drug == "ecstasy") _drug = "mdma";
		
		if (_drug == "morningglory") {
			_drug = "lsa";
		}
		if (_drug == "hawaiianbabywoodrose") {
			_drug = "lsa";
		}
		
		console.log(_drug);
		
		var __drug = "https://the700club.000webhostapp.com/kgb/" + _drug + ".png"; // where all the images are hosted. images should be saved as all lowercase and without symbols (ex: 5meomipt.png)
		
		if (!isNaN(_drug.charAt(0))) {
			pw_drug = _drug
			.toUpperCase()
			.replace(/ACO/g, "-AcO-")
			.replace(/MEO/g, "-MeO-");
		} else {
			pw_drug = _drug.charAt(0).toUpperCase() + _drug.slice(1);
		}
		
		if (pw_drug.length == 3) pw_drug = pw_drug.toUpperCase();
		
		if (pw_drug == "Dipt") pw_drug = "DiPT";
		if (pw_drug == "Moxy") pw_drug = "5-MeO-MiPT";
		if (pw_drug == "Molly") pw_drug = "MDMA";
		if (pw_drug == "Mdma") pw_drug = "MDMA";
		
		message.channel.send(pw_drug + " information:", { file: __drug });
		
		setTimeout(function() {
			message.channel.send("MORE: https://psychonautwiki.org/wiki/" + pw_drug); //oppositely, the pw_drug must come out to have symbols and proper casing which is done with the code above
		}, 1000);
		
		if (message.content.toLowerCase().includes("dxm")) {
			setTimeout(function() {
				message.channel.send(
					"To calculate DXM dose for weight do:\n```-dxmcalc [weight in pounds]```"
				);
			}, 1500);
		}
	}
	
	if (message.content.toLowerCase().includes("-druglist")) {
		message.channel.send("``` - LSD\n - MDMA\n - DMT```"); //this needs updating, but it might be easily to somehow read the directory of where all the images are stored and list all the files there - the ".png"
	}
});

// Create an event listener for messages
client.on("message", message => {
	// If the message is "what is my avatar"
	if (message.content.toLowerCase().includes("what is my avatar")) {
		// Send the user's avatar URL
		message.reply(message.author.avatarURL);
	}
});

client.login(settings.token);
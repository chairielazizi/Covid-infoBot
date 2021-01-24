const Discord = require("discord.js");
const config = require("./config.json");
const covid = require("covidapi");
const covid19 = require("covid19-api");

bot = new Discord.Client({ disableEveryone: true });

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("Awak", { type: "WATCHING" });
  const data = await covid19.getReports();
  const dataMalay = await covid19.getReportsByCountries(["malaysia"]);
  console.log(data);
  console.log(data[0][0].cases);
  //   console.log(data[0][0].table);
  console.log(dataMalay);
  console.log(dataMalay[0][0].country);
});

bot.on("message", async (message) => {
  if (message.content === "!covid") {
    const data = await covid19.getReports();
    const dataMalay = await covid19.getReportsByCountries(["malaysia"]);
    // console.log(data);
    // console.log(data[0][0].cases);
    // console.log(dataMalay);
    const covidembed = new Discord.MessageEmbed().setColor("RANDOM");
  }
});

bot.login(config.token);

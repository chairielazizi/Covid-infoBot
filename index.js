const Discord = require("discord.js");
// const config = require("./config.json");
// const covid = require("covidapi");
const covid19 = require("covid19-api");

bot = new Discord.Client({ disableEveryone: true });

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("Awak", { type: "WATCHING" });
  const data = await covid19.getReports();
  const dataMalay = await covid19.getReportsByCountries(["malaysia"]);
  const deaths = await covid19.getDeaths();

  console.log(data);
  console.log(data[0][0].cases);
  //   console.log(data[0][0].table);
  console.log(dataMalay);
  console.log(dataMalay[0][0].country);
  console.log(deaths);

  const covidembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("Country", dataMalay[0][0].country)
    .addField("Cases", dataMalay[0][0].cases)
    .addField("Deaths", dataMalay[0][0].deaths)
    .addField("Recovered", dataMalay[0][0].recovered);

  setInterval(() => {
    var channel = bot.channels.cache.get("802939353453166622");
    channel.send(covidembed);
  }, "86400000");
});

bot.on("message", async (message) => {
  if (message.content === "!covid") {
    const data = await covid19.getReports();
    const dataMalay = await covid19.getReportsByCountries(["malaysia"]);
    // console.log(data);
    // console.log(data[0][0].cases);
    // console.log(dataMalay);
    const covidembedcmd = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .addField("Country", dataMalay[0][0].country)
      .addField("Cases", dataMalay[0][0].cases)
      .addField("Deaths", dataMalay[0][0].deaths)
      .addField("Recovered", dataMalay[0][0].recovered);

    setInterval(() => {
      var channel = bot.channels.cache.get("791078758572490763");
      channel.send(covidembedcmd);
    }, "5000");
    //   message.channel.send(covidembed);
  }
});

// bot.login(config.token);
bot.login(process.env.token);

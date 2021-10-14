import { config as envConfig } from "dotenv";
envConfig();

import {
  AkairoClient,
  CommandHandler,
  InhibitorHandler,
  ListenerHandler,
} from "discord-akairo";
import { HexColorString, MessageEmbed } from "discord.js";
import { version } from "../package.json";

interface Config {
  token: string;
  debug: boolean;
  prefix: string;
  guild: string;
  staffPrefix: string;
  channels: {
    joinLeaveLog: string;
    crosspostLog: string;
    moderationLog: string;
    toCrosspost: string[];
    preventDuplicates: string[];
  };
  embeds: {
    footer: string;
    color: any;
  };
  pasteEmoji: string;
  roles: {
    helper: string;
    staff: string;
  };
  owners: string[];
}

let localConfig: Config;

console.log("Attempting to use development config...");

(async () => {
  let configDev: Config | undefined = await import("../config-dev.json");
  if (!configDev) {
    console.log("Failed to find development config...trying production...");
    let configProd: Config | undefined = await import("../config-prod.json");
    if (!configProd)
      throw new Error(
        "Failed to load a production config...missing config file? Stopping.",
      );
    else {
      localConfig = configProd;
      initialize();
    }
  } else {
    localConfig = configDev;
    initialize();
  }
})();

let embedExport: MessageEmbed;
let enableMaintenanceExport: Function;
let disableMaintenanceExport: Function;
function initialize() {
  const embed = new MessageEmbed()
    .setFooter(localConfig.embeds.footer)
    .setColor(localConfig.embeds.color);

  class MainClient extends AkairoClient {
    public commandHandler: CommandHandler = new CommandHandler(this, {
      directory: "./build/src/commands/",
      prefix: localConfig.prefix,
      defaultCooldown: 5000,
      commandUtil: true,
    });

    public staffComandHandler = new CommandHandler(this, {
      directory: "./build/src/staff_commands/",
      prefix: localConfig.staffPrefix,
      defaultCooldown: 1000,
      commandUtil: true,
    });

    public staffInhibitorHandler = new InhibitorHandler(this, {
      directory: "./build/src/staff_inhibitors/",
    });

    public listenerHandler = new ListenerHandler(this, {
      directory: "./build/src/listeners",
    });

    public constructor() {
      super({
        presence: {
          status: "online",
          activities: [
            {
              name: `${localConfig.prefix}help | ${version}`,
              type: "WATCHING",
            },
          ],
        },
        intents: [
          "GUILDS",
          "GUILD_MESSAGES",
          "GUILD_PRESENCES",
          "DIRECT_MESSAGES",
          "GUILD_INTEGRATIONS",
          "GUILD_MEMBERS",
        ],
      });

      // Main Handlers
      this.commandHandler.useListenerHandler(this.listenerHandler);
      this.listenerHandler.loadAll();
      console.log(
        "Loaded main listeners: " + this.listenerHandler.modules.size,
      );
      this.commandHandler.loadAll();
      console.log("Loaded main commands: " + this.commandHandler.modules.size);

      // Staff Handlers
      this.staffComandHandler.useInhibitorHandler(this.staffInhibitorHandler);
      this.staffComandHandler.loadAll();
      console.log(
        "Loaded staff commands: " + this.staffComandHandler.modules.size,
      );
      this.staffInhibitorHandler.loadAll();
      console.log(
        "Loaded staff inhibitors: " + this.staffInhibitorHandler.modules.size,
      );
    }
  }
  console.log("Registering client...");
  const client = new MainClient();

  function enableMaintenance() {
    if (!client.user) throw "Client user is not initialized";
    client.commandHandler.removeAll();
    client.listenerHandler.removeAll();
    client.user.setPresence({
      status: "dnd",
      activities: [
        {
          name: `Offline - Back soon!`,
          type: "WATCHING",
        },
      ],
    });
  }

  function disableMaintenance() {
    if (!client.user) throw "Client user is not initialized";
    client.commandHandler.loadAll();
    client.listenerHandler.loadAll();
    client.user.setPresence({
      status: "online",
      activities: [
        {
          name: `${localConfig.prefix}help | ${version}`,
          type: "WATCHING",
        },
      ],
    });
  }

  if (localConfig.token !== "") {
    console.log("Logging in via config token...");
    client.login(localConfig.token);
  } else {
    console.log("Logging in via environment token...");
    client.login(process.env.BOT_TOKEN);
  }

  embedExport = embed;
  enableMaintenanceExport = enableMaintenance;
  disableMaintenanceExport = disableMaintenance;
}
export {
  localConfig as config,
  embedExport as embed,
  enableMaintenanceExport as enableMaintenance,
  disableMaintenanceExport as disableMaintenance,
};

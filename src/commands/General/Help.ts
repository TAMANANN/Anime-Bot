import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ICommand, IParsedArgs, ISimplifiedMessage } from "../../typings";
import { MessageType, Mimetype } from "@adiwajshing/baileys";
export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "help",
      description:
        "Displays the help menu or shows the info of the command provided",
      category: "general",
      usage: `${client.config.prefix}help (command_name)`,
      aliases: ["h"],
      baseXp: 30,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    parsedArgs: IParsedArgs
  ): Promise<void> => {
    const user = M.sender.jid;
    const chitoge =
      "https://media.tenor.com/videos/571d88ea5d66e7b95cdbc4ef6029dd95/mp4";
    if (!parsedArgs.joined) {
      const commands = this.handler.commands.keys();
      const categories: { [key: string]: ICommand[] } = {};
      for (const command of commands) {
        const info = this.handler.commands.get(command);
        if (!command) continue;
        if (!info?.config?.category || info.config.category === "dev") continue;
        if (
          !info?.config?.category ||
          (info.config.category === "nsfw" &&
            !(await this.client.getGroupData(M.from)).nsfw)
        )
          continue;
        if (Object.keys(categories).includes(info.config.category))
          categories[info.config.category].push(info);
        else {
          categories[info.config.category] = [];
          categories[info.config.category].push(info);
        }
      }
      let text = ` 💙𝙯𝙞𝙢-𝙗𝙤𝙩💙 𝙈𝙖𝙠𝙪𝙧𝙖𝙬𝙣𝙞 𝙃𝙞! *@${
        user.split("@")[0]
      }*, 𝙄'𝙢 𝙕𝙞𝙢 𝘽𝙤𝙩.\n\n𝙈𝙮 𝙥𝙧𝙚𝙛𝙞𝙭 𝙞𝙨 - "${
        this.client.config.prefix
      }"\n\n𝙏𝙝𝙚 𝙪𝙨𝙖𝙗𝙡𝙚 𝙘𝙤𝙢𝙢𝙖𝙣𝙙𝙨 𝙖𝙧𝙚 𝙡𝙞𝙨𝙩𝙚𝙙 𝙗𝙚𝙡𝙤𝙬.\n\n`;
      const keys = Object.keys(categories);
      for (const key of keys)
        text += `*ᚉᚉᚉ᚜💙 ${this.client.util.capitalize(
          key
        )} 💙᚛ᚉᚉᚉ*\n\`\`\`${categories[key]
          .map((command) => command.config?.command)
          .join(", ")}\`\`\`\n\n`;
      return void this.client.sendMessage(
        M.from,
        { url: chitoge },
        MessageType.video,
        {
          quoted: M.WAMessage,
          mimetype: Mimetype.gif,
          caption: `${text} 🔵 *Note: Dont forget ${this.client.config.prefix}to Subscribe to my channel DRIPS OFC thanks for choosing ZIM BOT*`,
          contextInfo: { mentionedJid: [user] },
        }
      );
    }
    const key = parsedArgs.joined.toLowerCase();
    const command =
      this.handler.commands.get(key) || this.handler.aliases.get(key);
    if (!command) return void M.reply(`No Command of Alias Found | "${key}"`);
    const state = await this.client.DB.disabledcommands.findOne({
      command: command.config.command,
    });
    M.reply(
      `🔵 *𝘾𝙤𝙢𝙢𝙖𝙣𝙙:* ${this.client.util.capitalize(
        command.config?.command
      )}\n🔵 *𝙎𝙩𝙖𝙩𝙪𝙨:* ${
        state ? "Disabled" : "Available"
      }\n🔵 *𝘾𝙖𝙩𝙚𝙜𝙤𝙧𝙮:* ${this.client.util.capitalize(
        command.config?.category || ""
      )}${
        command.config.aliases
          ? `\n🔵 *𝘼𝙡𝙞𝙖𝙨𝙚𝙨:* ${command.config.aliases
              .map(this.client.util.capitalize)
              .join(", ")}`
          : ""
      }\n🔵 *𝙂𝙧𝙤𝙪𝙥 𝙊𝙣𝙡𝙮:* ${this.client.util.capitalize(
        JSON.stringify(!command.config.dm ?? true)
      )}\n🔵 *𝙐𝙨𝙖𝙜𝙚:* ${command.config?.usage || ""}\n\n🔵 *𝘿𝙚𝙨𝙘𝙧𝙞𝙥𝙩𝙞𝙤𝙣:* ${
        command.config?.description || ""
      }`
    );
  };
}
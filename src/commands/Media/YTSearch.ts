import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import yts from "yt-search";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "ytsearch",
      description: "Searches YT",
      category: "media",
      aliases: ["yts"],
      usage: `${client.config.prefix}yts [term]`,
      baseXp: 20,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    if (!joined) return void M.reply("š Provide a search term");
    const term = joined.trim();
    const { videos } = await yts(term);
    if (!videos || videos.length <= 0)
      return void M.reply(`ā No Matching videos found for : *${term}*`);
    const length = videos.length < 10 ? videos.length : 10;
    let text = `š *Results for ${term}*\n`;
    for (let i = 0; i < length; i++) {
      text += `*#${i + 1}*\nšµ *Title:* ${videos[i].title}\nšµ *Channel:* ${
        videos[i].author.name
      }\n šµ *Duration:* ${videos[i].duration}\nšµ *URL:* ${videos[i].url}\n\n`;
    }
    M.reply("š Searching...");
    this.client
      .sendMessage(M.from, text, MessageType.extendedText, {
        quoted: M.WAMessage,
        contextInfo: {
          externalAdReply: {
            title: `Search Term: ${term}`,
            body: `šµ š­šš  šš¢š§ šµ`,
            mediaType: 2,
            thumbnail: await this.client.getBuffer(videos[0].thumbnail),
            mediaUrl: videos[0].url,
          },
        },
      })
      .catch((reason: any) =>
        M.reply(`š“ An error occurred, Reason: ${reason}`)
      );
  };
}

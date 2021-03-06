/** @format */

import { MessageType, Mimetype } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "git",
			description: "Displays the info",
			category: "general",
			usage: `${client.config.prefix}chitoge`,
			baseXp: 200,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		const chitoge =
			"https://media.tenor.com/videos/80f557139bc3a0857f6a705da6990fdc/mp4";
		return void this.client.sendMessage(
			M.from,
			{ url: chitoge },
			MessageType.video,
			{
				quoted: M.WAMessage,
				mimetype: Mimetype.gif,
				caption: `šµ *š­šš  šš¢š§* šµ\n\nš *ššš¦šš„šš£š§šš¢š”: A WhatsApp Bot With Cool Features Corded By Drips Memes.*\n\nš *šØš„š: https://github.com/zim-bot/Anime-Bot* \n\n š *ššØššš: https://github.com/Zim-bot/Anime-Guides* \n`,
			}
		);
	};
}

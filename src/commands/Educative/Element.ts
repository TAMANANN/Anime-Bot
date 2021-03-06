/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import pTable from "ptable";
import npt from "node-periodic-table";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "element",
			aliases: ["e"],
			description: "Gives you the info of the given element. ",
			category: "educative",
			usage: `${client.config.prefix}element [name/number/symbol]`,
			baseXp: 30,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined)
			return void M.reply("Give me an element name/number/symbol, đđĩđŧđēđļđ˛đ!");
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const chitoge: any = joined.trim();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const search = await pTable(chitoge);
		console.log(search);
		if (search === undefined) {
			return void (await M.reply(
				`*https://en.m.wikipedia.org/wiki/Periodic_table*\n\nI think this might help you.\n`
			));
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const response = await npt.getByNumber(search.number);
		let text = "";
		text += `đ *đđšđ˛đēđ˛đģđ: ${response.name}*\n`;
		text += `đˇ *đđđŧđēđļđ° đĄđđēđ¯đ˛đŋ: ${response.number}*\n`;
		text += `đĩ *đđđŧđēđļđ° đ đŽđđ: ${response.atomic_mass}*\n`;
		text += `đĩ *đĻđđēđ¯đŧđš: ${response.symbol}*\n`;
		text += `đĩ *đđŊđŊđ˛đŽđŋđŽđģđ°đ˛: ${response.apearance}*\n`;
		text += `đĩ *đŖđĩđŽđđ˛: ${response.phase}*\n`;
		text += `đĩ *đđŧđļđšđļđģđ´ đŖđŧđļđģđ: ${response.boil} K*\nī¸`;
		text += `đĩ *đ đ˛đšđđļđģđ´ đŖđŧđļđģđ: ${response.melt} K*\n`;
		text += `đĩ *đđ˛đģđđļđđ: ${response.density} g/mL*\n`;
		text += `đĩ *đĻđĩđ˛đšđšđ: ${response.shells.join(", ")}*\n`;
		text += `đĩ *đ¨đĨđ: ${response.source}*\n\n`;
		text += `đĩ *đĻđđēđēđŽđŋđ: ${response.summary}*`;
		await M.reply(text);
	};
}

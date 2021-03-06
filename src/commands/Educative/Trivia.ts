/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import axios from "axios";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "trivia",
			aliases: ["t"],
			description: "Gives you random question based on the level. ",
			category: "educative",
			usage: `${client.config.prefix}trivia [easy/medium/hard]`,
			baseXp: 30,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined) return void M.reply("Give me a level, ššµš¼šŗš¶š²š!");
		const chitoge = joined.trim();
		await axios
			.get(
				`https://opentdb.com/api.php?amount=1&difficulty=${chitoge}&type=multiple`
			)
			.then((response) => {
				// console.log(response);
				const text = `šµ *šš®šš²š“š¼šæš: ${response.data.results[0].category}*\nšµ *šš¶š³š³š¶š°šš¹šš: ${response.data.results[0].difficulty}*\nšµ *š¤šš²ššš¶š¼š»:${response.data.results[0].question}*\n\n\nš· *šš»ššš²šæ: ${response.data.results[0].correct_answer}*\n `;
				M.reply(text);
			})
			.catch((err) => {
				M.reply(` *No such level, ššµš¼šŗš¶š²š!* `);
			});
	};
}

/** @format */

import { evaluate } from 'mathjs'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { IParsedArgs, ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'calculator',
            aliases: ['calc'],
            description: 'Calculates the given value. ',
            category: 'educative',
            usage: `${client.config.prefix}calc [value]`,
            baseXp: 20
        })
    }

    run = async (M: ISimplifiedMessage, { joined }: IParsedArgs): Promise<void> => {
        if (!joined) return void M.reply('Provide the value to calculate, ππ΅πΌπΊπΆπ²π!')
        const value = joined.trim()
        const calc = evaluate(value);
				const text = `π΅β *π¦πΌπΉπππΆπΌπ» π³πΌπΏ ${value} = ${calc}*`;
        await M.reply(text)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((reason: any) => M.reply(`${reason}`))
    }
}

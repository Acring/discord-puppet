import 'dotenv/config'
import Option from "../src/interfaces/option.interface"
import options from "../src/utils/options"
import MidjourneyPuppet from "../src/midjourney.puppet"
import {EnlargeType} from "../src/enums"

/** TEST script that execute midjourney puppet **/
async function execute(words: string[], channel: string = "ai-art") {
    const config: Option = options(
        process.env.DISCORD_USERNAME as string,
        process.env.DISCORD_PASSWORD as string,
        [],
        process.env.DISCORD_USER_DATA_DIR,
        true,
        true,
    )
    const client = new MidjourneyPuppet(config)
    await client.start()
    await client.clickServer("My Art")
    await client.clickChannel(channel)

    
    // const msg1 = await client.info()
    // console.log("Midjourney Account info: ", msg1)

    function loading(url: string) {
        console.log("LOADING: ", url)
    }
    const msg2 = await client.imagine(words.join(" "), loading)
    console.log("Images: ", msg2)
    const msg3 = await client.imageEnlarge(msg2.messageId, msg2.channelId, EnlargeType.U1, loading)
    console.log("Enlarged U1 image: ", msg3)
    return msg3.imageUrl;
}

const words = ["galaxy", "kid", "house", "stars", "travel"]

const works = [{
    name: 'task 1',
    channel: 'ai-art',
    words: ['galaxy', 'kid', 'house', 'stars', 'travel']
}, {
    name: 'task 2',
    channel: 'ai-art-1',
    words: ['galaxy', 'girl', 'forest', 'stars', 'travel']
}, {
    name: 'task 3',
    channel: 'ai-art-2',
    words: ['galaxy', 'gentle man', 'forest', 'stars', 'dream']
}]

Promise.all(works.map((work, index) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            execute(work.words, work.channel).then((imageUrl) => {
                resolve(imageUrl)
            })
        }, (index + 1) * 1000)
    })
    })
).then((result) =>{
    console.log(result)
})
// execute(words).then(res => {
//     console.log("done")
// })
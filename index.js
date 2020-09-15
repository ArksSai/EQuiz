const linebot = require('linebot')
const express = require('express')
const fs = require('fs')

const bot = linebot({
    channelId: '1654900279',
    channelSecret: 'd7b45cdadbf75e8a3fd0f3c39e30172a',
    channelAccessToken: '7bOkGSRUlGugMD3xZKdeAReCjO91fB28yWfF0Rv1njGpcWs5LwmKdlFhEv0pHLaFkMLaoovsb2k33xnxYG7aDE5TE6CLd2PqQU/iK9OF1jDL64NAbSzOmif0SeMLTRAKCQuj15XlUp8V3M+TghEpPwdB04t89/1O/w1cDnyilFU=',
})

const volcabulary = JSON.parse(fs.readFileSync('./volcabulary/7000.json', 'utf8'))
const keysArray = Object.keys(volcabulary)
const keysLength = keysArray.length

let question = pickVolcabulary(keysArray, keysLength)

bot.on('message', function(event) {
    let Msg = event.message.text
    let msg = Msg.toLowerCase()
    if (msg === 'q') {
        question = pickVolcabulary(keysArray, keysLength)
        //    let reply = 'Question: ' + eraseString(question) + '\n' + volcabulary[question]['Meaning']
        let reply = '請拼出完整單字：' + eraseString(question) + '\n' + volcabulary[question]['Meaning']
        event.reply(reply)
    }
    else if (msg === 'a') {
        //    let reply = 'Ans: ' + question + '\n' + volcabulary[question]['Meaning']
        let reply = '正確解答: ' + question + '\n' + volcabulary[question]['Meaning']
        event.reply(reply)
    }
    else {
        if (volcabulary[msg]) {
            //    let reply = 'Your answer is: ' + msg + '\n' + volcabulary[msg]['Meaning']
            let reply = '你的答案是： ' + msg + '\n' + volcabulary[msg]['Meaning']
            event.reply(reply)
        }
        else {
            //    let reply = '\'' + msg + '\'' + ' is not in this 7000 volcabulary table.'
            let reply = '\'' + msg + '\'' + ' 不在這張單字表中。'
            event.reply(reply)
        }
    }
})

function pickVolcabulary(keyArray, keyLength) {
    return keyArray[Math.floor(Math.random() * keyLength)]
}


function eraseString(inputString) {
    let eraseedString = ''
    for (let i = 0; i < inputString.length; i++) {
        if ((i !== 0 && i !== inputString.length-1) && (Math.random() > 0.3)) {
            eraseedString += '_'
        }
        else {
            eraseedString += inputString[i]
        }
    }
    eraseedString = eraseedString.substr(0, 1) + '_' + eraseedString.substr(2, eraseedString.length)
    return eraseedString
}




const app = express()
const linebotParser = bot.parser()
app.post('/', linebotParser)

const server = app.listen(process.env.PORT || 8080, function() {
    const port = server.address().port
    console.log('App now running on port', port)
})

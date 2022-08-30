// Load the SDK
const AWS = require('aws-sdk')
const Fs = require('fs')
const Text = require('./text.js')

// Create an Polly client
const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
})

let params = {
    Text,
    'Engine': 'neural', // "standard" || "neural"
    'OutputFormat': 'mp3',
    'VoiceId': 'Joey',
    'LanguageCode': 'en-US'
}

Polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
        console.log(err.code)
    } else if (data) {
        if (data.AudioStream instanceof Buffer) {
            Fs.writeFile("./unicornStartup00.mp3", data.AudioStream, function(err) {
                if (err) {
                    return console.log(err)
                }
                console.log("The file was saved!")
            })
        }
    }
})

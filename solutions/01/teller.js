var jsonStream = require('duplex-json-stream')
var net = require('net')

var client = jsonStream(net.connect(3876))

client.on('data', function (msg) {
  console.log('Teller received:', msg)
})

client.end({cmd: 'balance'})

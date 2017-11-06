var jsonStream = require('duplex-json-stream')
var net = require('net')

var client = jsonStream(net.connect(3876))
var argv = process.argv.slice(2)

var command = argv[0]

client.on('data', function (msg) {
  console.log('Teller received:', msg)
})

switch (command) {
  case 'deposit':
    var amount = parseFloat(argv[1])
    client.end({cmd: 'deposit', amount: amount})
    break

  case 'balance':
    client.end({cmd: 'balance'})
    break

  case 'help':
  default:
    console.log('node teller.js [CMD]')
}

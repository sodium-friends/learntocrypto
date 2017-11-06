var jsonStream = require('duplex-json-stream')
var net = require('net')

var client = jsonStream(net.connect(3876))

var argv = process.argv.slice(2)

var command = argv[0]

switch (command) {
  case 'deposit':
    var amount = argv[1]
    send({cmd: 'deposit', amount: parseFloat(amount, 10)})
    break

  case 'withdraw':
    var amount = argv[1]
    send({cmd: 'withdraw', amount: parseFloat(amount, 10)})
    break

  case 'help':
  default:
    console.error(`
      teller [CMD] [ARGS...]

        deposit [AMOUNT]

        withdraw [AMOUNT]
    `.replace(/^      /gm, '').trim())
    client.end()
    process.exit(1)
}

function send(obj) {
  client.once('data', function (data) {
    console.log(data)
  })
  client.write(obj)
  client.end()
}

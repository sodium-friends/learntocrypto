var jsonStream = require('duplex-json-stream')
var net = require('net')

var log = []

var server = net.createServer(function (socket) {
  socket = jsonStream(socket)

  socket.on('data', function (msg) {
    console.log('Bank received:', msg)

    switch (msg.cmd) {
      case 'balance':
        socket.end({cmd: 'balance', balance: log.reduce(reduceLog, 0)})
        break
      case 'deposit':
        log.push(msg)
        socket.end({cmd: 'balance', balance: log.reduce(reduceLog, 0)})
        break
      default:
        socket.end({cmd: 'error', msg: 'Unknown command'})
        break
    }

  })
})

server.listen(3876)

function reduceLog (balance, entry) {
  return balance + entry.amount
}

var jsonStream = require('duplex-json-stream')
var net = require('net')

var server = net.createServer(function (socket) {
  socket = jsonStream(socket)

  socket.on('data', function (msg) {
    console.log('Bank received:', msg)
    socket.write({cmd: 'balance', balance: 0})
  })
})

server.listen(3876)

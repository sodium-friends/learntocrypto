var jsonStream = require('duplex-json-stream')
var net = require('net')
var sodium = require('sodium-universal')

var siginfo = require('siginfo')

var server = net.createServer(function (socket) {
  socket = jsonStream(socket)
  socket.on('data', function (msg) {
    ondata(socket, msg)
  })
})

var log = [
  {cmd: 'genesis', hash: Buffer.alloc(sodium.crypto_generichash_BYTES).toString('base64')}
]
var state = { balance: 0 }

function ondata(sock, msg) {
  switch (msg.cmd) {
    case 'deposit':
      var entry = {
        value: msg,
        hash: hashchain(log[log.length - 1], msg)
      }

      state.balance += entry.value.amount
      log.push(entry)
      sock.write({res: 'success', msg: 'Balance: ' + state.balance})
      return

    case 'withdraw':
      if (state.balance - msg.amount < 0) {
        sock.write({res: 'error', msg: 'Insufficient balance'})
        return
      }

      var entry = {
        value: msg,
        hash: hashchain(log[log.length - 1], msg)
      }

      state.balance -= entry.value.amount
      log.push(entry)
      sock.write({res: 'success', msg: 'Balance: ' + state.balance})
      return

    default:
      sock.write({res: 'error', msg: 'Unknown command'})
  }
}

function hashchain (prev, cur) {
  // Important: If two messages do not have a natrual seperation
  // it is very important to use a seperating token. Example being
  // concatting 'car' and 'pet', which without a seperator could
  // introduce a subtle security issue in using the token 'carpet'
  var inputBuf = Buffer.from(prev.hash + JSON.stringify(cur))

  // Preallocate our hash result buffer
  var hashBuf = Buffer.alloc(sodium.crypto_generichash_BYTES)
  sodium.crypto_generichash(hashBuf, inputBuf)
  return hashBuf.toString('base64')
}

siginfo(function () {
  return {
    state: state,
    log: log
  }
})

server.listen(3876)

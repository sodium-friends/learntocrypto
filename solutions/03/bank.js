var jsonStream = require('duplex-json-stream')
var net = require('net');

var log = [];

var server = net.createServer(function (socket) {
    socket = jsonStream(socket);

    socket.on('data', function (msg) {
        console.log('Bank received:', msg);

        switch (msg.cmd) {

            case 'balance':
                socket.end({cmd: 'balance', balance: log.reduce(addAmount, 0)});
                break;

            case 'withdraw':
                if (hasFounds(msg.amount)) {
                    log.push(msg);
                    socket.end({cmd: 'withdraw', balance: log.reduce(addAmount, 0)});
                } else {
                    socket.end({cmd: 'withdraw', error: 'Insufficient founds!'});
                }
                break;

            case 'deposit':
                log.push(msg);
                socket.end({cmd: 'balance', balance: log.reduce(addAmount, 0)});
                break;

            default:
                socket.end({cmd: 'error', msg: 'Unknown command'});
                break
        }

    })
});

server.listen(3876);

function addAmount(balance, entry) {
    return balance + entry.amount
}

function hasFounds(amount) {
    balance = log.reduce(addAmount,0);
    newBalance = balance - amount;
    return newBalance >= 0;
}
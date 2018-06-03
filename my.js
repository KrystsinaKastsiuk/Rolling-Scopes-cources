var socket = new WebSocket('ws://wsc.jit.su');
socket.binaryType = 'arraybuffer';
var bitNumber = false;
var sum, arr, sumValue, buffer, msg, token, calcOperands, newMsg;

socket.onopen = function (event) {
  socket.send(JSON.stringify({ msg: 'challenge_accepted', name: 'Krystsina_Kastsiuk' }));
};

socket.onmessage = function (event) {
  //if (typeof event.data === "string") {}
  buffer = JSON.parse(event.data);
  msg = buffer.msg;

  switch (msg) {
    case 'auth':
    token = msg.auth_token;
    socket.send(JSON.stringify({ msg: 'task_one', auth_token: token }));
    break;
    case 'compute':
    if (buffer.operator === '+') {
      calcOperands = buffer.operands[0] + buffer.operands[1];
    } else if(buffer.operator === '-') {
      calcOperands = buffer.operands[0] - buffer.operands[1];
    } else if (buffer.operator === '*'){
      calcOperands = buffer.operands[0] * buffer.operands[1];
    }
    socket.send(JSON.stringify({ msg: 'task_one_result', result: calcOperands, auth_token: token }));
    break;
    case 'binary_sum':
    bitNumber = buffer.bits;
    break;
    default:
    if (bitNumber = 8) {
      arr = new Uint8Array(buffer);
      sumValue = function (arr) {
        for (var i = 0; i < arr.length; i++) {
          sum += arr[i];
        }
        return sum;
      };

      socket.send(JSON.stringify({ msg: 'task_two_result', result: sumValue, auth_token: token }));
    } else if (bitNumber = 16) {
      arr = new Uint16Array(buffer);
      sumValue = function (arr) {
        for (var i = 0; i < arr.length; i++) {
          sum += arr[i];
        }
        return sum;
      };
      socket.send(JSON.stringify({ msg: 'task_two_result', result: sumValue, auth_token: token }));
    } else {
     newMsg = msg.substring( msg.indexOf("\"", -1)+1, msg.indexOf("\"", str.indexOf("\"", -1)+1) );
     socket.send(JSON.stringify({ msg: newMsg, auth_token: token }));
   }
 }
};
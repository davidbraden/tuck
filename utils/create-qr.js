var http = require('http');
var fs = require('fs');


var format = "epic-{i}";
var number = 5;
var size = 150;

console.log("Creating " + number + " qr codes with format: " + format);


createQr = function(qr) {
    var options = {
        host: 'api.qrserver.com',
        path: '/v1/create-qr-code/?size=' + size + 'x' + size + '&data={qrCode}'.replace('{qrCode}', qr)
    };
    console.log("Request to: " + options.host + options.path);

    http.request(options, function(response) {
        var file = fs.createWriteStream("qr/" + qr + ".png");
        response.pipe(file);
    }).end();
};

for (var i = 0; i< number; i++) {
    createQr(format.replace("{i}", i));
}





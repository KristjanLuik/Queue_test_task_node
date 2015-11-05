/**
 * Created by Kristjan on 18.10.2015.
 */
var amqp = require('amqplib/callback_api');
var calculator = require('./calculator');

amqp.connect('amqp://myjar:myjar@impact.ccat.eu', function(err, conn) {
    conn.createChannel(function(err, ch) {
/*        var q = 'hello';

        ch.assertQueue(q, {durable: false});
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
*/
        ch.consume('interest-queue', function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            calculate_intres(msg.content);
        }, {noAck: true});
    });
});



function calculate_intres(msg){
    var intres = calculator.validate(msg);
    if(intres){
    //The received message is versified.
    var valma = calculator.calculate(intres);
       // valma.token = 'Luik Node';
       // valma = valma.toString();
        amqp.connect('amqp://myjar:myjar@impact.ccat.eu',function(err, conn){
            //ch.assertQueue('solved-interest-queue', new Buffer(valma.toString()), {persistent: true});
            console.log('test');
            console.log( calculator.calculate({ sum: 123, days: 5 }));
            conn.createChannel(function(err, ch){
                valma.token = 'Luik node';
                console.log(valma);
                //ch.assertQueue('solved-interest-queue', new Buffer(valma));
                //ch.publish('solved-interest-queue','', new Buffer(valma.toString()));
                //ch.sendToQueue('solved-interest-queue',new Buffer(JSON.stringify(valma)),{persistent: true} );
               // console.log(new Buffer(valma.toString()));
                ch.sendToQueue('solved-interest-queue',new Buffer(JSON.stringify(valma)),{persistent: true,contentType: 'application/json'} );
                console.log(" [x] Sent %s", JSON.stringify(valma));
                console.log(err);
            });
        });
    }


}


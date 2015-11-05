/**
 * Created by Kristjan on 18.10.2015.
 */
module.exports = {

    validate: function(msg){
        //Check if the interest is passable.
        try{
            var msg_object = JSON.parse(msg.toString());
        }catch (exception) {
            return false;
        }

        //Check for null values.
        if (!msg_object.sum || !msg_object.days) {
            return false;
        }

        //Check if sum or days value is zero.
        if(msg_object.sum <= 0 || msg_object.days <= 0){
            return false;
        }

       return msg_object;
    },

    calculate: function(msg){
        var totalintrest = 0;
        for (var i = 0; i <= msg.days; i++) {
            if (i % 3 == 0 && i % 5 == 0) {
                totalintrest += parseFloat((0.03 * msg.sum).toFixed(2));
            }else if (i % 3 == 0) {
                totalintrest += parseFloat((0.01 * msg.sum).toFixed(2));
            }else if (i % 5 == 0) {
                totalintrest += parseFloat((0.02 * msg.sum).toFixed(2));
            }else {
                totalintrest += parseFloat((0.04 * msg.sum).toFixed(2));
            }
        }
        return {
            sum: msg.sum,
            days: msg.days,
            interest: totalintrest,
            totalSum: (msg.sum + totalintrest).toFixed(2)
        };
    }
};
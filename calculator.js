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

        for (var i = 1; i <= msg.days; i++) {
            precise_round(totalintrest,2);
            if (i % 3 == 0 && i % 5 == 0) {
                totalintrest += +(precise_round(0.03 * msg.sum,2));
            }else if (i % 3 == 0) {
                totalintrest += +(precise_round(0.01 * msg.sum,2));
            }else if (i % 5 == 0) {
                totalintrest += +(precise_round(0.02 * msg.sum,2));
            }else {
                totalintrest += +(precise_round(0.04 * msg.sum,2));
            }
        }
        return {
            sum: msg.sum,
            days: msg.days,
            interest: +precise_round(totalintrest,2),
            totalSum: +precise_round(msg.sum + totalintrest,2)
        };
    }
};
function precise_round(num, decimals) {
    var t=Math.pow(10, decimals);
    return (Math.round((num * t) + (decimals>0?1:0)*(Math.sign(num) * (10 / Math.pow(100, decimals)))) / t).toFixed(decimals);
}
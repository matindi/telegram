//Init a variable and set a value
var width = 10;


//A "normal" function expression.
var callback2 = function(){
    console.log(width);
};

//A function wrapped in an IIFE (Immediately Invoked Function Expression)
//Returns an object
var callback = (function(width){
    var othervar = 1;
    return {
        call: function() {
            console.log(width);
        }
    };
})(width);

//Call them both
callback.call();//Outputs 10
callback2();//Outputs 10


//Change the value of the global/external variable
width = 20;


//Call again
callback.call();//Outputs 10
callback2();//Outputs 20

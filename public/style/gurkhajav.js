function pinCodeCheck() {
  // var pinOne = [ 1, 2 ]; 
  var pinOne = [ "PE111BE", "pe111be" ]; 
  var one = pinOne.length;  
   var m = one ;
  var userPin = document.forms["pinform"];
  var finUPin = "";
  var deliveryCharge = "";
 
  finUPin = userPin.pinCode.value;

  for (var j = 0; j < m; j++) {
    if ( finUPin == pinOne[j]) {
      deliveryCharge = "FREE DELIVERY, available within a 3 mile radius for Orders over £20";
      break;
    } else {
      deliveryCharge = 'FREE DELIVERY, available within a 3 mile radius for Orders over £20'
    }
  }


  document.getElementById('pinCheck').innerHTML = deliveryCharge;
  // document.getElementById('pinCheck2').innerHTML = deliveryCharge;
  
}

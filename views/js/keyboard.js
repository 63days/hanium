 function getKey(key) {
     return document.getElementById('key_' + key);
 }
 var key_w = getKey('w'),
     key_a = getKey('a'),
     key_s = getKey('s'),
     key_d = getKey('d'),
     key_j = getKey('j'),
     key_k = getKey('k'),
     key_x = getKey('x');

 window.onkeydown = function () {
     if (event.keyCode == 87) {
         key_w.src = "image/key_w_pressed.png";
     } else if (event.keyCode == 65) {
         key_a.src = "image/key_a_pressed.png";
     } else if (event.keyCode == 83) {
         key_s.src = "image/key_s_pressed.png";
     } else if (event.keyCode == 68) {
         key_d.src = "image/key_d_pressed.png";
     } else if (event.keyCode == 74) {
         key_j.src = "image/key_j_pressed.png";
     } else if (event.keyCode == 75) {
         key_k.src = "image/key_k_pressed.png";
     } else if (event.keyCode == 88) {
         key_x.src = "image/key_x_pressed.png";
     }
 }
 window.onkeyup = function () {
     if (event.keyCode == 87) {
         key_w.src = "image/key_w_unpressed.png";
     } else if (event.keyCode == 65) {
         key_a.src = "image/key_a_unpressed.png";
     } else if (event.keyCode == 83) {
         key_s.src = "image/key_s_unpressed.png";
     } else if (event.keyCode == 68) {
         key_d.src = "image/key_d_unpressed.png";
     } else if (event.keyCode == 74) {
         key_j.src = "image/key_j_unpressed.png";
     } else if (event.keyCode == 75) {
         key_k.src = "image/key_k_unpressed.png";
     } else if (event.keyCode == 88) {
         key_x.src = "image/key_x_unpressed.png";
     }
 }

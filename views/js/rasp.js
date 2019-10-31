var chkbox = document.getElementById('chkbox');

chkbox.onclick = function() {
    if(chkbox.checked == true) {
        console.log('unchk > chk');
        socket.emit('rasp', 'o');
        
    } else {
        console.log('chk > unchk');
        socket.emit('rasp', 'f');
        
    }
}
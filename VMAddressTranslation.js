//Script to give information on a specific address in virtual mem, 
//virtual address to be used
var vAddress = 0x03d4; //Change this to fit exercise
var pageSize = 64; //Change this to fit exercise
var tblNrOfSets = 4; //Change this to fit exercise
//number of bits in virtual address
var vAddressLen = 14; //Change this to fit exercise


function translateAddress(vAddress, pageSize, tblNrOfSets, vAddressLen) {
    var p = Math.log2(pageSize);
    
    var t = Math.log2(tblNrOfSets);

    var bits = toBin(vAddress, vAddressLen);
    console.log("Bits in virtual address: " + bits);

    //Shift in order to only keep the bits needed to vpn
    var vpn = vAddress >>> p;
    console.log("VPN (HEX): " + vpn.toString(16));
    console.log("VPN (BIN): " + toBin(vpn, vAddressLen - p));

    var tlbI = (vAddress >>> p) & bitMask(t);
    console.log("TBL Index (HEX): " + tlbI.toString(16));
    console.log("TBL Index (BIN): " + toBin(tlbI, t));

    var tlbT = vAddress >>> (p + t);
    console.log("TBL Tag (HEX): " + tlbT.toString(16));
    console.log("TBL Tag (BIN): " + toBin(tlbT, p + t));

    var vpo = vAddress & bitMask(p);
    console.log("VPO (HEX): " + vpo.toString(16));
    console.log("VPO (BIN): " + toBin(vpo, p));

}

//Converts number to string of len bits, I use this to get correct length
function toBin(num, len) {
    var res = "";
    var temp = 0;
    for (var i = len - 1; i >= 0; i--) {
        temp = num & parseInt(Math.pow(2, i));
        if (temp == 0) {
            res += "0";
        } else {
            res += "1";
        }
        if (i % 4 == 0) {
            res += " ";
        }
    }
    return res;
}

//Returns a number with p ones as least significant bits, rest is zeros
function bitMask(p) {

    var mask = 0;
    for (var i = 0; i < p; i++) {
        mask += Math.pow(2, i);
    }
    return parseInt(mask);
}

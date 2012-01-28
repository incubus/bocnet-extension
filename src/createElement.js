/**
 * \u521b\u5efa\u5b89\u5168\u63a7\u4ef6\u811a\u672c
 */
function CreateControl(DivID, Form, ObjectID, mode, language) {
    var d = document.getElementById(DivID);
    typ1 = (mode == 2 ? "text" : "password");
    var func = (mode == 2 ? "" : "encrypt");
    var html = '<input type="hidden" name="' + ObjectID + '" isobj="1" />';
    html += '<input type="' + typ1 + '" class="login" onchange="' + Form + '.' + ObjectID + '.value = ' + func + '(this.value);"/>';
    d.innerHTML += html;
}

function encrypt(msg) {
    return Base64Encode(SHA1(msg));
}

// =========== SHA1 ===============
/**
 *
 *  Secure Hash Algorithm (SHA1)
 *  http://www.webtoolkit.info/
 *
 **/

function SHA1(msg) {

    function rotate_left(n, s) {
        var t4 = (n << s) | (n >>> (32 - s));
        return t4;
    };

    function lsb_hex(val) {
        var str = "";
        var i;
        var vh;
        var vl;

        for (i = 0; i <= 6; i += 2) {
            vh = (val >>> (i * 4 + 4)) & 0x0f;
            vl = (val >>> (i * 4)) & 0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };

    function cvt_hex(val, arr) {
        var str = "";
        var i;
        var v;
        var b = arr.length;

        for (i = 3; i >= 0; i--) {
            v = (val >>> (i * 8)) & 0xff;
            arr[b++] = v;
        }
        return arr;
    };


    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;

    msg = Utf8Encode(msg);

    var msg_len = msg.length;

    var word_array = new Array();
    for (i = 0; i < msg_len - 3; i += 4) {
        j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 | msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
        word_array.push(j);
    }

    switch (msg_len % 4) {
    case 0:
        i = 0x080000000;
        break;
    case 1:
        i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
        break;

    case 2:
        i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
        break;

    case 3:
        i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
        break;
    }

    word_array.push(i);

    while ((word_array.length % 16) != 14) word_array.push(0);

    word_array.push(msg_len >>> 29);
    word_array.push((msg_len << 3) & 0x0ffffffff);


    for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {

        for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
        for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;

        for (i = 0; i <= 19; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 20; i <= 39; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 40; i <= 59; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        for (i = 60; i <= 79; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }

        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;

    }

    var temp = Array();
    temp = cvt_hex(H0, temp);
    temp = cvt_hex(H1, temp);
    temp = cvt_hex(H2, temp);
    temp = cvt_hex(H3, temp);
    temp = cvt_hex(H4, temp);

    return temp;

}

// ============ Base64 =============
/**
 *
 *  Base64 encode / decode
 *  http://www.webtoolkit.info/
 *
 **/

function Base64Encode(input) {
    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {

        chr1 = input[i++];
        chr2 = input[i++];
        chr3 = input[i++];

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);

    }

    return output;
}

/**
 * \u53d6\u63a7\u4ef6\u7248\u672c\u53f7
 */
function getVersion(obj) {
	try	{
		var version = obj.Version;
		try {
			if (version == undefined)
				return 0;
		} catch(ve) {//IE5.0
			return 0;
		}
		return version;
	}
	catch(e) {
		return 0;
	}
}

/**
 * \u53d6\u63a7\u4ef6\u7248\u72b6\u6001
 */
function getState(obj) {
	try	{
		var state = obj.State;
		try {
			if (state == undefined)
				return 0;
		} catch(ve) {//IE5.0
			return 0;
		}
		return state;
	}
	catch(e) {
		return 0;
	}
}

/**
 * \u63a7\u4ef6\u68c0\u6d4b
 */
function passControlCheck(obj, mode, language) {
	return true;
}

/**
 * \u8bbe\u7f6e\u63a7\u4ef6
 */

function passInit(obj, mode, language, version) {
	obj.SetLanguage(language);
	//\u53e3\u4ee4
	if (mode == 0) {
		obj.PasswordIntensityMinLength = 1;
		obj.MaxLength = 20;
		obj.OutputValueType = 2;
		obj.PasswordIntensityRegularExpression = "^[!-~]*$";
	}
	//\u65b0\u53e3\u4ee4
	else if (mode == 1) {
		obj.PasswordIntensityMinLength = 8;
		obj.MaxLength = 20;
		obj.OutputValueType = 2;
		obj.PasswordIntensityRegularExpression = "(^[!-~]*[A-Za-z]+[!-~]*[0-9]+[!-~]*$)|(^[!-~]*[0-9]+[!-~]*[A-Za-z]+[!-~]*$)";
	}
	//\u52a8\u6001\u53e3\u4ee4
	else if (mode == 2) {
		obj.PasswordIntensityMinLength = 6;
		obj.MaxLength = 6;
		obj.OutputValueType = 1;
		obj.PasswordIntensityRegularExpression = "^[0-9]{6}$";
	}
	//\u7535\u8bdd\u94f6\u884c\u5bc6\u7801
	else if (mode == 3) {
		obj.PasswordIntensityMinLength = 6;
		obj.MaxLength = 6;
		obj.OutputValueType = 1;
		obj.PasswordIntensityRegularExpression = "^[0-9]{6}$";
	}
	//\u624b\u673a\u94f6\u884c\u5bc6\u7801
	else if (mode == 4) {
		obj.PasswordIntensityMinLength = 8;
		obj.MaxLength = 20;
		obj.OutputValueType = 1;
		obj.PasswordIntensityRegularExpression = "^[!-~]*$";
	}
}


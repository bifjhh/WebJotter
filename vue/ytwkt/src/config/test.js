var URL = window.localtion.href;
var BASE_PATH = URL.substring(0, URL.lastIndexOf('/') + 1);
var EVENT_TYPE = mobilecheck() ? 'tap' : 'click';
var _isAnimate = true;
var _isSound = true;
var CHPICE_LOOP = true;
var CHPICE2 = true;
var BTN_SHINE = true;
var BTN = true;
var CHOICETAP = true;
var FLAG = 0;
var CANVAS = $('#canvas')[0];
var CXT = CANVAS.getContext('2d');
var CANVAS2 = $('.share-canvea')[0];
var CXT2 = CANVAS2.getContext('2d');
var w = $(window).width();
var h = $(window).height();
var canvas2_w = w * 455 / 640;
var canvas2_h = canvas2_w / 455 * 984;

var _pvArr = [0, 0, 0, 0];
var __choiceText = [
    "在未来，QQ用电磁波连接地月，<br/>让通讯无界限",
    "在未来，QQ用无线电波探知环境，<br/>让盲胞出行无烦恼",
    "在未来，QQ用面部识别登录，<br/>让微笑成为智能语言",
    "在未来，QQ用虚拟光源鉴别假币，<br/>让真伪被一键识别",
    "在未来，QQ智能解读动物语言，<br/>让沟通无物种界限"
];
/**
 * 图片预加载
 */
$(function() {
    $(document).on('touchmove', function(event) {
        event.preventDefault(); //可以阻止滚动;

    });
    var loader = new PxLoader();
    fileList = [
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/share.jpg',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/loading_line.png',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/loading_qq.png',

        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/choice.png',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/share.png',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/page-btn.png',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/btn-shine.png',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/swipe-up.png',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/swipe-down.png',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/swipe-arrow.png',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/btn-flash.png',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/hom.png',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/share-down-arrow.png',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/share-up-arrow.png',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/share-wrap.png',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/share-wrapT.png',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/hom.png',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/share_title.png',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/animal.png',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/blindPerson.png',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/face.png',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/money.png',
        'http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/moon.png',

    ];
    for (var i = 0; i < 74; i++) {
        fileList.push("http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/bg/" + i + ".jpg");
    };
    for (var i = 1; i <= 25; i++) {
        fileList.push("http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/share/" + i + ".png");
    }
    //图片预加载
    for (var i = 0; i < fileList.length; i++) {
        var pxImage = new PxLoaderImage(fileList[i]);
        pxImage.imageNumnber = i + 1;
        loader.add(pxImage);
    }
    loader.addCompletionListener(function() {
        console.log('预加载图片' + fileList.length + '张');
        SOUND_LOADING.pause();
        if (_isSound) BGM.play();
        FLAG = 1;
        if (_isSound) SOUND_BEFOREBTN.play();
        setTimeout(function() {
            _isAnimate = false;
            $('.loading-container').hide();
            $('.page-container').show();
        }, 500);
    })

    loader.addProgressListener(function(e) {
        var percent = Math.round((e.completedCount / e.totalCount) * 100);
        var not = Math.round(percent / 12);
        if (nob >= 1 && nob <= 8) {
            $(".loading-Progress").css('background-position', '0%' + (nob - 1) * 10 + '%');
            $('#loading_inner').text(percent + '%');
        }
    })
    loader.start();
})
$(function() {
    function init() {
        SOUND_LOADING.play();
        btn_light();
        btn();
        canvas_init();
        canvas_img_init();
        initPvArr();
        canvas2_img_init();
        canvas2_init();
    }
})

function canvas2_init() {
    if (w < h) {
        CANVAS2.width = canvas2_w;
        CANVAS2.height = canvas2_h;
        $(".share-canvas").css({
            width: canvas2_w + "px",
            height: canvas2_h + "px"
        });
    };
}

function canvas2_img_init() {
    var first = 1;
    var last = 25;
    var html = '';
    for (var i = first; i <= last; i++) {
        html += "<img src='http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/share/" + i + ".png' id='shareImg" + i + "'/>";
    }
    $(".share-img-container").html(html);
}
/**
 * 初始化选项数量 
 */
function initPvArr() {
    var cur = Date.parse(new Date()) / 1000;
    var oneDay = 24 * 60 * 60;
    //var start=Date.parse(new Date(START_TIME))/1000;
    var start = START_TIME;
    start = start.replace(/-/g, '/ ');
    start = new Date(start).getTime() / 1000;

    if (cur < start) {
        __pvArr = [0, 0, 0, 0, 0];
    } else if (cur >= start && cur < start + oneDay * 3) {
        __pvArr[0] = Math.round((cur - start) / 60 * 7);
        __pvArr[1] = Math.round((cur - start) / 60 * 12);
        __pvArr[2] = Math.round((cur - start) / 60 * 16);
        __pvArr[3] = Math.round((cur - start) / 60 * 34);
        __pvArr[4] = Math.round((cur - start) / 60 * 53);
    } else if (cur >= start + oneDay * 3 && cur < start + oneDay * 6) {
        __pvArr[0] = Math.round(oneDay * 3 / 60 * 7) + Math.round((cur - oneDay * 3 - start) / 60 * 3);
        __pvArr[1] = Math.round(oneDay * 3 / 60 * 12) + Math.round((cur - oneDay * 3 - start) / 60 * 6);
        __pvArr[2] = Math.round(oneDay * 3 / 60 * 16) + Math.round((cur - oneDay * 3 - start) / 60 * 10);
        __pvArr[3] = Math.round(oneDay * 3 / 60 * 34) + Math.round((cur - oneDay * 3 - start) / 60 * 13);
        __pvArr[4] = Math.round(oneDay * 3 / 60 * 53) + Math.round((cur - oneDay * 3 - start) / 60 * 20);
    } else {
        __pvArr[0] = Math.round(oneDay * 3 / 60 * 7) + Math.round(oneDay * 3 / 60 * 3) + Math.round((cur - oneDay * 6 - start) / 60 * 8);
        __pvArr[1] = Math.round(oneDay * 3 / 60 * 12) + Math.round(oneDay * 3 / 60 * 6) + Math.round((cur - oneDay * 6 - start) / 60 * 9);
        __pvArr[2] = Math.round(oneDay * 3 / 60 * 16) + Math.round(oneDay * 3 / 60 * 10) + Math.round((cur - oneDay * 6 - start) / 60 * 8);
        __pvArr[3] = Math.round(oneDay * 3 / 60 * 34) + Math.round(oneDay * 3 / 60 * 13) + Math.round((cur - oneDay * 6 - start) / 60 * 7);
        __pvArr[4] = Math.round(oneDay * 3 / 60 * 53) + Math.round(oneDay * 3 / 60 * 20) + Math.round((cur - oneDay * 6 - start) / 60 * 9);
    }

}

function canvas_img_init() {
    var first = 0;
    var last = 74;
    var html = '';
    for (var i = first; i <= last; i++) {
        html += "<img src='http://sqimg.qq.com/qq_product_operations/mma/qqlab/h5/img/bg/" + i + ".jpg' id='img" + i + "'/>";
    }
    $('#canvas-img-container').html(html);
    $('#img0')[0].onload = function() {
        canvas_draw(0);
    }
}
//CANVAS BG 动画
function canvas_draw(i) {
    var w = $(window).width();
    var h = $(window).height();
    CXT.drawImage($('#img' + i)[0], 0, 0, w, w / 640 * 1136);
}

function canvas_init() {
    var w = $(window).width();
    var h = $(window).height();

    if (w < h) {
        CANVAS.width = w;
        CANVAS.height = w / 640 * 1136;
        $('#canvas').css('width', w + 'px');
        $('#canvas').css('height', w / 640 * 1136 + 'px');
    } else {
        CANVAS.width = h;
        CANVAS.height = h / 640 * 1136;
        $('#canvas').css('width', h + 'px');
        $('#canvas').css('heigth', h / 640 * 1136 + 'PX');
    }
}

function btn() {
    var i = 0;
    var btn_interval = setInterval(function() {
        $('.page-btn').css('background-position', '0%' + i / 9 * 100 + '%');
        i++;
        if (i == 10 && BTN == true) {
            i = 0;
        } else if (i == 10 && BTN == false) {
            clearInterval(btn_interval);
        }
    }, 100)
}

function btn_light() {
    var i = 0;
    var btnlight_inter = setInterval(function() {
        $('.btn-shine').css('background-position', '0%' + i / 14 * 100 + '%');
        i++;
        if (i == 10 && BTN_SHINE == true) {
            i = 0;
            if (i == 16) {
                clearInterval(btnlight_inter);
            }
        }
    }, 120)
}

function mobilecheck() {
    var check = false;
    (function(a) { if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}
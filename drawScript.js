var img_array = [];
var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var x = "black",
// y = 1;
y = 10;


function init() {

    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down',/**/ e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
    console.log(currX, currY);
    img_array.push([currX, currY]);
}

function erase() {
    ctx.clearRect(0, 0, w, h);
    var img_array = [];

}

async function save() {
    // var dataURL = canvas.toDataURL();
    // // console.log('base64', dataURL);
    // var link = document.createElement('a');
    // link.innerHTML = 'download image';
    // link.addEventListener('click', function(ev) {
    //     link.href = dataURL;
    //     link.download = "mypainting.png";
    // }, false);
    // document.body.appendChild(link);
    console.log(img_array);
    // let src = cv.imread("can");
    // console.log(src);
    // console.log('image width: ' + src.cols + '\n' +
    //             'image height: ' + src.rows + '\n' +
    //             'image size: ' + src.size().width + '*' + src.size().height + '\n' +
    //             'image depth: ' + src.depth() + '\n' +
    //             'image channels ' + src.channels() + '\n' +
    //             'image type: ' + src.type() + '\n');

    var fin_array = new Float32Array(784);

    for (var i = 0; i < img_array.length; i++) {
      var point = img_array[i];
      var x = point[0];
      var y = point[1];
      console.log(x, y);
      var pos = 28*Math.floor(y/10) + Math.floor(x/10)
      console.log('pos', pos);
      fin_array[pos]=1;
    }
    console.log(fin_array);

    document.getElementById('out').innerHTML = fin_array;
    const model = await tf.loadModel("https://raw.githubusercontent.com/piyush-kgp/Digit-Recognition-with-TFJS/master/tfjs_target_dir/model.json");
    console.log(model.predict);

}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;

        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}

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
  // const model = await tf.loadModel('tfjs_target_dir/model.json');
  // console.log(model);
  const model =  tf.loadModel("https://00e9e64bac6482d603261c27035f3af591fd62d3cc257f94b4-apidata.googleusercontent.com/download/storage/v1/b/tfjs-mnist-example/o/tfjs%2Fmodel.json?qk=AD5uMEs9i6uaEU1zXTjUe_pm4qgseu9yOUnSuNVxMk3GcnffXUCtB3LoeJnCyWbvjVjhlvBsxhn9OTPXoK0l9CXCukQAL4_ROPKUx1dz9b8h0cZhU_b54BwZ5sRQyVjLOBcVS9GUTwgzcxNvWpUJUwTZy7RzUdy-amn8F-6P7v1Hp8trMdW-5q0NrIoOgYmyInarsuqHIsVRDWzq8wwMAl5FeDppp6BmPYWQQyIL_VsSnYEFtSbBWtklnTz9-mcgVL7yqYlBeyL20FIbZO9AicTIYk4vI18NRTkRnbXiHXiyxgmFy1DQsRds793ozLzJW2zRXx_uxMsnK14llm_8HcEKO0c05wvRZq2ViJu1u5RvmuDdUitivgleI9oIR0Vi_rWhhwVSpBYwoJfEDsB53OszJgtcjBS8S1k_WBVWTyqU5kL7po2sXMm2tkUc88E6Kys7dNoIFr4tKjUny6v5Qgq6EM2TR7w-xeHlue-3KVpwfSKzm93No4FSufTLPXy0d0qEGF8s7afOctg-u1kh_zozzPDzDIYuWPE-zrS7taG-o6dQ3o_dXWsWFRoNheTk5xmjDfCKFX9_2YiR1Ej62J_o_-xc2lebXwSzR9NKE-Hjr-i8rR6XkpTBsuI_PMU_ZPdyIB_6TIpPNvvt1qqp7OALtzg5JwJvG2Y8K4e_denGSrxsIFFjlEaFJCpm9OoQwpt01WMmZGUoZk3bqoOi8N6Za6HBwP7gLvMXub0gxpH9NpalKlejsMhxVM_t_wuGEgc5aAqIYOTW9DyjgO042RsljRGrktkjNA");
  console.log(model);

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

function save() {
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

    // document.getElementById('out').innerHTML = fin_array;
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

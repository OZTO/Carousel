window.onload = function() {
    var container = document.getElementById('container');
    var list = document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    var animated = false;
    var timer;


    // 改变显示的图片的位置
    function animate(offset) {
        animated = true;
        var newLeft = parseInt(list.offsetLeft) + offset;
        var time = 300; // 总位移时间
        var interval = 10; // 位移间隔时间
        var speed = offset / (time / interval); // 每次的位移量

        function go() {
            if ((speed < 0 && parseInt(list.offsetLeft) > newLeft) || (speed > 0 && parseInt(list.offsetLeft) < newLeft)) {
                list.style.left = parseInt(list.offsetLeft) + speed + 'px';
                setTimeout(go, interval);
            } else {
                animated = false;
                list.style.left = newLeft + 'px';
                if (newLeft > -600) {
                    list.style.left = -3000 + 'px';
                }
                if (newLeft < -3000) {
                    list.style.left = -600 + 'px';
                }
            }
        }
        go();
    }

    function play() {
        timer = setInterval(function() {
            next.onclick();
        }, 2000);
    }

    function stop() {
        clearInterval(timer);
    }

    // 显示下一张
    next.onclick = function() {
        if (index == 5) {
            index = 1;
        } else {
            index += 1;
        }
        showButton();
        if (!animated) {
            animate(-600);
        }
    }

    // 显示上一张
    prev.onclick = function() {
        if (index == 1) {
            index = 5;
        } else {
            index -= 1;
        }
        showButton();
        if (!animated) {
            animate(600);
        }

    }

    // 让当前显示的图片对应的圆点亮
    function showButton() {
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
                break;
            }
        }
        buttons[index - 1].className = 'on';
    }


    // 点击下方每个原点
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            if (this.className == 'on') {
                return;
            }
            var myIndex = parseInt(this.getAttribute('index'));
            var offset = -600 * (myIndex - index);
            if (!animated) {
                animate(offset);
            }
            index = myIndex;
            showButton();
        }
    }

    container.onmouseover = stop;
    container.onmouseout = play;

    play();
}
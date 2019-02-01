//添加加载事件函数
function addLoadEvent(func) {
    let oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

//将body的点击事件设置为背景颜色渐变
function prepareScreen() {
    document.getElementById('screen').onclick = function () {
        return changeBackgroundColor('screen', '#ffffff', 30);
    }
}

addLoadEvent(prepareScreen);

//准备全局Document
function prepareDocument() {
    //设置一段时间没有操作时进行的动作
    function startTimer() {
        if (document.timer) {
            clearTimeout(document.timer);
        }
        document.timer = setTimeout(function () {
            return changeBackgroundColor('screen', '#777777', 30);
        }, 25 * 1000);//15seconds 15秒无操作则背景颜色变灰
    }

    document.onmouseout = document.onmousedown = document.onmousemove = document.onmouseover = document.onmouseup = document.onmousewheel = startTimer;
}

addLoadEvent(prepareDocument);

//获取产品特性按钮，设置点击效果，并添加计时器
function prepareFeatureButton() {
    let buttons = document.getElementById('left').getElementsByTagName('button');
    if (buttons.length == 0) {
        console.log('没有featureButton');
        return;
    }


    for (let i = 0; i < buttons.length; i++) {
        let colorDiv = buttons[i].previousElementSibling;
        let detailH3 = buttons[i].getElementsByTagName('h3')[0];
        colorDiv.style.width = '10px';
        detailH3.style.opacity = '0';
        detailH3.style.zIndex = '-1';

        buttons[i].onclick = function () {
            featureButtonStateChange(this, true, 30);
            if (this.recover) {
                clearTimeout(this.recover);
            }
            this.recover = setTimeout(function () {
                console.log('timeout');
                return featureButtonStateChange(buttons[i], false, 30);
            }, 8 * 1000);
        }
    }
}

addLoadEvent(prepareFeatureButton);

//设置configuration的点击事件
function prepareConfigureationBtn() {
    let buttons = document.getElementsByClassName('configureBtn');
    let displayDiv = document.getElementById('configureDisplay');
    //
    // buttons[1].onclick = function () {
    //     clearAllChildren('configureDisplay');
    //     let paragraph = document.createElement('p');
    //     paragraph.innerHTML = 'Clever Sensor是固定安装在监控目标环境上方，实时获取目标环境的高清图的彩色图像以及带有深度信息的3D图像。获取到的颜色信息和空间信息相辅相成，因此行为识别完全不受环境光线的影响。一方面通过彩色图像可以对事物的颜色变化进行准确识别;另一方面，通过非接触体温和心跳检测数据可以准确判断目标的情绪变化。实现了对个体行为和群体行为的高精度识别和预判。';
    //
    //     //fadeIn
    //     paragraph.style.opacity = '0';
    //     displayDiv.appendChild(paragraph);
    //     fadeIn(paragraph);
    //
    //     //计时器
    //     if (this.recover) {
    //         clearTimeout(this.recover);
    //     }
    //     this.recover = setTimeout(function () {
    //         console.log('timeout');
    //         return fadeOut(paragraph);
    //     }, 8 * 1000);
    // };
    // buttons[2].onclick = function () {
    //
    //     clearAllChildren('configureDisplay');
    //     let image = document.createElement('img');
    //     image.setAttribute('src', 'pictures/specifications.png');
    //
    //     //fadeIn
    //     image.style.opacity = '0';
    //     displayDiv.appendChild(image);
    //     fadeIn(image);
    //
    //     //计时器
    //     if (this.recover) {
    //         clearTimeout(this.recover);
    //     }
    //     this.recover = setTimeout(function () {
    //         console.log('timeout');
    //         return fadeOut(image);
    //     }, 8 * 1000);
    // }
}

addLoadEvent(prepareConfigureationBtn);

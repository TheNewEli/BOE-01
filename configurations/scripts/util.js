//背景颜色渐变
function changeBackgroundColor(elementID, final_RGB, interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    let elem = document.getElementById(elementID);
    if (elem.movement) {
        clearTimeout(elem.movement);
    }

    //如果没有获取颜色，则设置为默认色
    if (!elem.style.backgroundColor) {
        elem.style.backgroundColor = '#777777';
    }

    //解析传进来的RGB颜色
    let final_R = parseInt(final_RGB.substr(1, 2), 16);
    let final_G = parseInt(final_RGB.substr(3, 2), 16);
    let final_B = parseInt(final_RGB.substr(5, 2), 16);

    //分别获取16进制RGB颜色
    let R = parseInt(elem.style.backgroundColor.substr(4, 3));
    let G = parseInt(elem.style.backgroundColor.substr(9, 3));
    let B = parseInt(elem.style.backgroundColor.substr(14, 3));

    let dist = 0;

    if (R == final_R && G == final_G && B == final_B) {
        return true;
    }
    //判断R
    if (R < final_R) {
        dist = Math.ceil((final_R - R) / 100);
        R = R + dist;
    }
    if (R > final_R) {
        dist = Math.ceil((R - final_R) / 100);
        R = R - dist;
    }
    //判断G
    if (G < final_G) {
        dist = Math.ceil((final_G - G) / 100);
        G = G + dist;
    }
    if (G > final_G) {
        dist = Math.ceil((G - final_G) / 100);
        G = G - dist;
    }
    //判断B
    if (B < final_B) {
        dist = Math.ceil((final_B - B) / 100);
        B = B + dist;
    }
    if (B > final_B) {
        dist = Math.ceil((B - final_B) / 100);
        B = B - dist;
    }
    elem.style.backgroundColor = '#' + R.toString(16) + G.toString(16) + B.toString(16);
    let repeat = 'changeBackgroundColor("' + elementID + '","' + final_RGB + '",' + interval + ')';
    elem.movement = setTimeout(repeat, interval);
}

//设置featureButton的点击事件,传入1则focus，传入0则blur
function featureButtonStateChange(featureButton, toState, interval) {
    if (featureButton.movement) {
        clearTimeout(featureButton.movement);
    }
    //获取色块和
    let colorDiv = featureButton.previousElementSibling;
    let detailH3 = featureButton.getElementsByTagName('h3')[0];
    let finalColorDivWidth, finalOpacity;

    console.log(colorDiv.style.width + '' + detailH3.style.opacity);
    //当前状态
    let colorDivWidth = parseInt(colorDiv.style.width);
    let opacity = detailH3.style.opacity;

    //最终状态
    if (toState == true) {
        finalColorDivWidth = 50;
        finalOpacity = 1;
    } else if (toState == false) {
        finalColorDivWidth = 10;
        finalOpacity = 0;
    }


    let dist = 0;
    if (colorDivWidth == finalColorDivWidth && opacity == finalOpacity) {
        return true;
    }
    //判断colorDivWidth
    if (colorDivWidth < finalColorDivWidth) {
        dist = Math.ceil((finalColorDivWidth - colorDivWidth) / 100);
        colorDivWidth = colorDivWidth + dist;
    }
    if (colorDivWidth > finalColorDivWidth) {
        dist = Math.ceil((colorDivWidth - finalColorDivWidth) / 100);
        colorDivWidth = colorDivWidth - dist;
    }
    //判断opacity
    if (opacity < finalOpacity) {
        opacity = parseFloat(opacity) + 0.025;
    }
    if (opacity > finalOpacity) {
        opacity = parseFloat(opacity) - 0.025;
    }

    //设置值

    colorDiv.style.width = colorDivWidth + 'px';
    detailH3.style.opacity = opacity;

    featureButton.movement = setTimeout(function () {
        featureButtonStateChange(featureButton, toState, interval)
    }, interval);
}

//清空所有子节点
function clearAllChildren(elementId) {
    let elem = document.getElementById(elementId);
    let children = elem.childNodes;
    for (let i = children.length - 1; i >= 0; i--) {
        elem.removeChild(children[i]);
    }
}


//淡入
function fadeIn(elem) {
    if (elem.movement) {
        clearTimeout(elem.movement);
    }

    let opacity = elem.style.opacity;
    let finalOpacity = 1;

    let dist = 0;
    if (opacity == finalOpacity) {
        return true;
    }

    //判断opacity
    if (opacity < finalOpacity) {
        opacity = parseFloat(opacity) + 0.025;
    }
    if (opacity > finalOpacity) {
        opacity = parseFloat(opacity) - 0.025;
    }

    //设置值
    elem.style.opacity = opacity;

    elem.movement = setTimeout(function () {
        fadeIn(elem)
    }, 30);
}

//淡出
function fadeOut(elem) {
    if (elem.movement) {
        clearTimeout(elem.movement);
    }

    let opacity = elem.style.opacity;
    let finalOpacity = 0;

    let dist = 0;
    if (opacity == finalOpacity) {
        return true;
    }

    //判断opacity
    if (opacity < finalOpacity) {
        opacity = parseFloat(opacity) + 0.025;
    }
    if (opacity > finalOpacity) {
        opacity = parseFloat(opacity) - 0.025;
    }

    //设置值
    elem.style.opacity = opacity;

    elem.movement = setTimeout(function () {
        fadeOut(elem);
    }, 10);
}

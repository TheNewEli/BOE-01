//读取配置文件
$.getJSON('configurations.json', function (data) {
    configurations = data;
    if (configurations.企业名称)
        document.title = configurations.企业名称;
    generateLogo(data);
    generateFeatureBtns(data);
    generateConfigureBtns(data);
    generateCommentTextWindow(data);
});

function generateLogo(configurations) {
    if (!configurations.图标文件名称) {
        alert('未指定图标文件');
        return;
    }
    let nav = document.getElementById('nav');
    let logoImg = document.createElement('img');
    logoImg.setAttribute('id', 'logo');
    logoImg.setAttribute('src', 'pictures/' + configurations.图标文件名称);
    nav.appendChild(logoImg);
}

function generateFeatureBtns(configurations) {
    if (!configurations.产品特性按钮配置) {
        alert('未指定产品特性按钮配置');
        return;
    }

    $.each(configurations.产品特性按钮配置, function (infoIndex, aBtnInfo) {
        let leftArticle = document.getElementById('left');

        let picture, name, detail, featureBtn, colorDiv, section;
        picture = document.createElement('img');
        name = document.createElement('h2');
        detail = document.createElement('h3');
        featureBtn = document.createElement('button');
        colorDiv = document.createElement('div');
        section = document.createElement('section');

        picture.setAttribute('src', "pictures/" + aBtnInfo.按钮图标文件名称);
        name.innerText = aBtnInfo.特性名称;
        detail.innerText = aBtnInfo.特性描述;

        featureBtn.setAttribute('class', 'featureBtn');
        featureBtn.appendChild(picture);
        featureBtn.appendChild(name);
        featureBtn.appendChild(detail);

        section.appendChild(colorDiv);
        section.appendChild(featureBtn);

        leftArticle.appendChild(section);
    })
}

function generateConfigureBtns(configurations) {
    if (!configurations.右边按钮配置) {
        alert('未指定右边按钮配置');
        return;
    }

    $.each(configurations.右边按钮配置, function (infoIndex, aBtnInfo) {
        //生成按钮
        let aGeneratedBtn = generateBtn(aBtnInfo);

        let rightArticle = document.getElementById('right');
        switch (aBtnInfo.类型) {
            case '视频':
                prepareConfigureVideo(aBtnInfo, aGeneratedBtn);
                break;
            case '图片':
                prepareConfigureImage(aBtnInfo, aGeneratedBtn);
                break;
            case '文字':
                prepareConfigureText(aBtnInfo, aGeneratedBtn);
                break;
        }
    });

}

function generateBtn(BtnInfo) {
    let dot = document.createElement('img');
    let icon = document.createElement('img');
    let name = document.createElement('h2');

    dot.setAttribute('src', 'configurations/pictures/dot.png');
    dot.setAttribute('class', 'configureBtnDot');

    icon.setAttribute('src', 'pictures/' + BtnInfo.按钮图标文件名称);
    icon.setAttribute('class', 'configureBtnIcon');

    name.innerText = BtnInfo.按钮文字;

    let configureBtn = document.createElement('button');
    let section = document.createElement('section');

    configureBtn.setAttribute('class', 'configureBtn');
    configureBtn.appendChild(dot);
    configureBtn.appendChild(icon);
    configureBtn.appendChild(name);

    section.appendChild(configureBtn);

    let rightArticle = document.getElementById('right');

    rightArticle.appendChild(section);
    return configureBtn;
}

function generateCommentTextWindow(configurations) {
    let rightArticle = document.getElementById('right');

    let img = document.createElement('img');
    let marquee = document.createElement('marquee');
    let aside = document.createElement('aside');


    marquee.setAttribute('direction', 'up');
    marquee.setAttribute('scrollamount', '2');

    img.setAttribute('src', 'configurations/pictures/comment.png');

    aside.setAttribute('id', 'comment');

    if (!configurations.产品评价) {
        alert('未配置产品评价');
        return;
    }
    $.each(configurations.产品评价, function (infoIndex, paragraph) {
        p = document.createElement('p');
        p.innerText = paragraph;
        marquee.appendChild(p);
    });
    aside.appendChild(img);
    aside.appendChild(marquee);
    rightArticle.appendChild(aside);
}

function prepareConfigureVideo(BtnInfo, generatedBtn) {
    generatedBtn.setAttribute('data-src', 'pictures/' + BtnInfo.视频源);
    generatedBtn.classList.add('m-video');
    loadMVideo();

}

function prepareConfigureImage(BtnInfo, generatedBtn) {
    generatedBtn.onclick = function () {
        clearAllChildren('configureDisplay');
        let image = document.createElement('img');
        image.setAttribute('src', 'pictures/' + BtnInfo.展示图片文件名称);

        //fadeIn
        let displayDiv = document.getElementById('configureDisplay');
        image.style.opacity = '0';
        displayDiv.appendChild(image);
        fadeIn(image);

        //计时器
        if (this.recover) {
            clearTimeout(this.recover);
        }
        this.recover = setTimeout(function () {
            console.log('timeout');
            return fadeOut(image);
        }, 8 * 1000);
    }
}

function prepareConfigureText(BtnInfo, generatedBtn) {
    generatedBtn.onclick = function () {
        clearAllChildren('configureDisplay');
        let paragraph = document.createElement('p');
        paragraph.innerHTML = BtnInfo.文字内容;

        //fadeIn
        let displayDiv = document.getElementById('configureDisplay');
        paragraph.style.opacity = '0';
        displayDiv.appendChild(paragraph);
        fadeIn(paragraph);

        //计时器
        if (this.recover) {
            clearTimeout(this.recover);
        }
        this.recover = setTimeout(function () {
            console.log('timeout');
            return fadeOut(paragraph);
        }, 8 * 1000);
    }
}



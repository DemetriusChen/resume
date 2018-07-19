document.onreadystatechange = listen;//当页面加载状态改变的时调用listen方法
function listen() {
    if (document.readyState == "complete") //判断页面加载状态
    {
        siteWelcome.classList.remove('active');

    }
}

window.onload = function () {
    let scrollY = window.scrollY;
    if (scrollY > 0) {
        topNavBar.classList.add('sticky')
        // console.log(scrollY)
    } else {
        topNavBar.classList.remove('sticky')
    }
}

window.onscroll = function () {
    let scrollY = window.scrollY;
    if (scrollY > 0) {
        topNavBar.classList.add('sticky')
        // console.log(scrollY)
    } else {
        topNavBar.classList.remove('sticky')
    }

}


let liTags = document.getElementsByClassName('menuTrigger');

for (let i = 0; i <= liTags.length - 1; i++) {
    // console.log(liTags[i])
    liTags[i].onmouseenter = function (x) {
        x.currentTarget.classList.add('active')
        // console.log(liTags)

    }

    liTags[i].onmouseleave = function (x) {
        x.currentTarget.classList.remove('active')
    }

}


var aTags = document.querySelectorAll('nav.menu> ul > li > a');
for (let i = 0; i <= aTags.length - 1; i++) {
    aTags[i].onclick = function (x) {
        x.preventDefault()
        let current = x.currentTarget
        let href = current.getAttribute('href');
        // console.log(href)
        let element = document.querySelector(href)
        // console.log(element)
        let offsetTop = element.offsetTop;
        // console.log(offsetTop)

        let currentTop = window.scrollY;
        let targetTop = offsetTop - 80;
        let s = currentTop - targetTop;
        let t = Math.abs((s / 100) * 300)  //时间跟着需要滚动的距离成倍增长, 以移动100px需要300ms为单位
        if (t > 500) {
            t = 500
        }


        function animate(time) {
            requestAnimationFrame(animate);
            TWEEN.update(time);
        }

        requestAnimationFrame(animate);

        var coords = {y: currentTop}; // 设定当前的高度
        var tween = new TWEEN.Tween(coords)
            .to({y: targetTop}, t)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function () {
                // console.log(coords.y)
                window.scrollTo(0, coords.y)
            })
            .start();


    }
}


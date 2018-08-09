document.onreadystatechange = listen;//当页面加载状态改变的时调用listen方法
function listen() {
    if (document.readyState == "complete") //判断页面加载状态
    {
        siteWelcome.classList.remove('active');

    }
}

setTimeout(() => {
    loadedAnimate()
}, 500)
window.onload = function () {
    let scrollY = window.scrollY;
    if (scrollY > 0) {
        topNavBar.classList.add('sticky')
        // console.log(scrollY)
    } else {
        topNavBar.classList.remove('sticky')
    }

}

function loadedAnimate() {
    let scrollY = window.scrollY;
    if (scrollY > 0) {
        topNavBar.classList.add('sticky')
    } else {
        topNavBar.classList.remove('sticky')
    }

    let specialTagsOffset = document.querySelectorAll('[data-mark]');
    // console.log(specialTags)
    for (let i = 0; i <= specialTagsOffset.length - 1; i++) {
        specialTagsOffset[i].classList.add('offset')
    }


    let specialTags = document.querySelectorAll('[data-mark]');
    // console.log(specialTags)
    let minIndex = 0;
    for (let i = 0; i <= specialTags.length - 1; i++) {
        if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
            minIndex = i;
        }
    }

    specialTags[minIndex].classList.remove('offset')

    let id = specialTags[minIndex].id;
    let a = document.querySelector('a[href="#' + id + '"]')
    // console.log(a)
    let li = a.parentNode;
    // console.log(li)

    let broAndMe = li.parentNode.children;
    // console.log(broAndMe)
    for (let i = 0; i <= broAndMe.length - 1; i++) {
        // console.log(broAndMe)
        broAndMe[i].classList.remove('highlight')
    }
    li.classList.add('highlight')
}

window.onscroll = function () {
    let scrollY = window.scrollY;
    if (scrollY > 0) {
        topNavBar.classList.add('sticky')
        // console.log(scrollY)
    } else {
        topNavBar.classList.remove('sticky')
    }

    let specialTagsOffset = document.querySelectorAll('[data-mark]');
    // console.log(specialTags)
    for (let i = 0; i <= specialTagsOffset.length - 1; i++) {
        specialTagsOffset[i].classList.add('offset')
    }


    let specialTags = document.querySelectorAll('[data-mark]');
    // console.log(specialTags)
    let minIndex = 0;
    for (let i = 0; i <= specialTags.length - 1; i++) {
        if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
            minIndex = i;
        }
    }

    specialTags[minIndex].classList.remove('offset')
    for (var i = 0; i <= specialTags.length - 1; i++) {
        specialTags[i].classList.remove('active')
    }
    specialTags[minIndex].classList.add('active')

    let id = specialTags[minIndex].id;
    let a = document.querySelector('a[href="#' + id + '"]')
    // console.log(a)
    let li = a.parentNode;
    // console.log(li)

    let broAndMe = li.parentNode.children;
    // console.log(broAndMe)
    for (let i = 0; i <= broAndMe.length - 1; i++) {
        // console.log(broAndMe)
        broAndMe[i].classList.remove('highlight')
    }
    li.classList.add('highlight')
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
        let targetTop = offsetTop - 200;
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


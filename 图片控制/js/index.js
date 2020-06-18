!(function () {
  const btnBig = document.getElementsByClassName('btn')[0]
  const btnSmall = document.getElementsByClassName('btn')[1]
  const btnRoateS = document.getElementsByClassName('btn')[2]
  const btnRoateN = document.getElementsByClassName('btn')[3]
  const img = document.getElementsByClassName('img')[0]
  let imgSize = 1//图片放大缩小初始值
  let imgRoate = 0//图片旋转初始值
  let drag_control = false // 拖动控制
  class InterFace { //方法接口
    constructor(imgSize, imgRoate) {
      this.imgSize = imgSize
      this.imgRoate = imgRoate
    }
    changeImgBig(dom) {//放大
      this.imgRoate = 0
      if (this.imgSize >= 2) {
        alert('最大了')
        return 0
      } else {
        this.imgSize += 0.1
        dom.style.transform = `scale(${this.imgSize})`
      }
    }
    changeImgSmall(dom) {//缩小
      this.imgRoate = 0
      if (this.imgSize <= 1) {
        alert('最小了')
        return 0
      } else {
        this.imgSize -= 0.1
        dom.style.transform = `scale(${this.imgSize})`
      }
    }
    checkImgDirection(dom) { //检查图片旋转方向
      this.imgSize = 1
      dom.style = ''
      dom.style.transform = `scale(1)`
      if (Math.abs(this.imgRoate) / 90 % 2 !== 0) {
        dom.style.width = `${dom.offsetHeight}px`
        dom.style.height = `${dom.offsetWidth}px`
        dom.style.padding = `${0}px ${0}px`
      }
    }
    changeImgRoateS(dom) {//旋转 顺
      this.imgRoate += 90
      this.checkImgDirection(dom)
      dom.style.transform = `rotate(${this.imgRoate}deg)`
    }
    changeImgRoateN(dom) {//旋转 逆
      this.imgRoate -= 90
      this.checkImgDirection(dom)
      dom.style.transform = `rotate(${this.imgRoate}deg)`
    }
    imgDrag(dom) {// 拖动图片
      dom.addEventListener('mousedown', start_drag)
      function start_drag(e) { // 鼠标按下事件
        drag_control = true;
        let ev = e || event,
          disX = ev.clientX - dom.offsetLeft,
          disY = ev.clientY - dom.offsetTop;
        document.onmousemove = function (e) { // 在页面内拖动事件
          if (drag_control) {
            let L = e.clientX - disX,
              T = e.clientY - disY,
              moveW = document.documentElement.clientWidth - dom.offsetWidth,
              moveH = document.documentElement.clientHeight - dom.offsetHeight
            range_check(L, T, moveW, moveH)
          }
        }
        document.onmouseup = function () { // 鼠标松开事件
          drag_control = false;
        }
      }
      function range_check(L, T, moveW, moveH) { // 范围限制
        if (L < -920) {
          L = 0
        } else if (L > 920) {
          L = moveW
        }
        if (T < -700) {
          T = 0
        } else if (T > 700) {
          T = moveH
        }
        dom.style.left = L + 'px';
        dom.style.top = T + 'px';
      }
    }
  }

  //脚本文件加载完毕后执行windowLoadEnd入口方法
  window.addEventListener('DOMContentLoaded', windowLoadEnd)
  const interFace = new InterFace(imgSize, imgRoate)//方法接口，需要传入初始值

  function windowLoadEnd() { //入口方法
    btnBig.addEventListener('click', () => { //放大事件
      interFace.changeImgBig.call(interFace, img)
    })
    btnSmall.addEventListener('click', () => { //缩小事件
      interFace.changeImgSmall.call(interFace, img)
    })
    btnRoateS.addEventListener('click', () => { //旋转事件-顺
      interFace.changeImgRoateS.call(interFace, img)
    })
    btnRoateN.addEventListener('click', () => { //旋转事件-逆
      interFace.changeImgRoateN.call(interFace, img)
    })
    interFace.imgDrag(img) //控制图片移动，传入图片元素
  }

})()
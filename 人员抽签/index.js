!(function () {
  class interFace {
    peopleItemInitHandle(data) { //人名渲染
      const ulDom = document.createElement('ul')
      for (const item of data) {
        if (item) {
          const itemDom = document.createElement('li')
          itemDom.innerText = item
          ulDom.appendChild(itemDom)
        }
      }
      peopleWarpper.appendChild(ulDom)
    }
    valueVerify() { //人数验证
      const peopleCount = peopleNumInput.value
      if (peopleCount) {
        return true
      } else {
        return false
      }
    }
    startChosePeopleHandle() { // 确定抽出人员
      const num = parseInt(peopleNumInput.value)
      let timer = setInterval(() => {
        const currentNum = this.createRandomHandle()
        this.animationStyle(currentNum)
        if (peopleNumArr.length === num) {
          console.log(peopleNumArr.sort())
          clearInterval(timer)
        }
      }, 200)
    }
    animationStyle(num){ //抽签动画
      Array.from(peopleItem).forEach((item,index) =>{
        if(index === num){
          item.setAttribute('class','active')
        }
      })
    }
    createRandomHandle() {//创建随机数
      let num = Math.floor(Math.random() * peopleList.length)
      while (peopleNumArr.includes(num)) {
        num = Math.floor(Math.random() * peopleList.length)
      }
      peopleNumArr.push(num)
      return num
    }
    resetHandle(){ //重置处理
      peopleNumArr.splice(0)
      peopleNumInput.value = ''
      Array.from(peopleItem).forEach(item =>{
        item.setAttribute('class','')
      })
    }
    clickSureBtnHandle() { // 点击确定按钮
      if(peopleNumArr.length) {
        peopleNumInput.value = ''
        peopleNumInput.setAttribute('placeholder', '请点击重置按钮')
      } else {
        if (this.valueVerify()) {
          this.startChosePeopleHandle()
        } else {
          peopleNumInput.value = ''
          peopleNumInput.setAttribute('placeholder', '请输入抽签人数')
        }
      }
    }
    clickResetBtnHandle(){ // 点击重置按钮
      if(peopleNumArr.length) {
        this.resetHandle()
      }
    }
  }
  const peopleList = ['缑鑫', '刘国策', '张洪纲', '欧磊', '刘茂盛', '李宏恩', '谢帅', '米雪函', '王浩', '王绍波', '张国华', '米思源', '王子文', '郑高超', '李德林', '梁欣雨', '旷青鹏', '李秋玲', '缑繁', '陈东', '陈朝辉', '黄罗川', '']
  //人员列表盒子
  const peopleWarpper = document.getElementsByClassName('people-box')[0]
  //人员列表
  const peopleItem = peopleWarpper.getElementsByTagName('li')
  //开始按钮
  const sureBtn = document.getElementsByClassName('sure')[0]
  //重置按钮
  const resetBtn = document.getElementsByClassName('reset')[0]
  //人数文本框
  const peopleNumInput = document.getElementsByClassName('contorl')[0].getElementsByTagName('input')[0]
  //抽出人员
  let peopleNumArr = []

  window.addEventListener('load', winLoadEnd)
  function winLoadEnd() {
    const eventFace = new interFace()
    eventFace.peopleItemInitHandle(peopleList)
    sureBtn.addEventListener('click', () => {
      eventFace.clickSureBtnHandle()
    })
    resetBtn.addEventListener('click', () => {
      eventFace.clickResetBtnHandle()
    })
  }
})()

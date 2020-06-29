class DateReterFace {
  constructor(contentBox='',dateBox, date, tf=false) {
    try {
      if (date instanceof Date) {
        this.tf = tf
        this.contentBox = contentBox
        this.dateBox = dateBox
        this.year = date.getFullYear()
        this.month = date.getMonth()
        this.day = date.getDate()
        this.yearCopy = date.getFullYear() // 年份副本,确定后才会传给this.year
        this.monthCopy = date.getMonth() // 月份副本,确定后才会传给this.month
        this.dayCopy = date.getDate() // 号数副本,确定后才会传给this.day
        this.date = [] // 存放显示的日期
        this.yearReg = /^[1-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}$/ // 年份验证
        this.monthReg = /^0?[1-9]{1}$|^1[0-2]$/ // 月份验证
        this.tipsTimer = null // 提示计时器
        this.week = [
          {
            text: '一',
            value: '星期一',
            num: 1,
          },
          {
            text: '二',
            value: '星期二',
            num: 2,
          },
          {
            text: '三',
            value: '星期三',
            num: 3,
          },
          {
            text: '四',
            value: '星期四',
            num: 4,
          },
          {
            text: '五',
            value: '星期五',
            num: 5,
          },
          {
            text: '六',
            value: '星期六',
            num: 6,
          },
          {
            text: '日',
            value: '星期天',
            num: 7,
          },
        ]
        this.weeks = [
          {
            text: '日',
            value: '星期天',
            num: 7,
          },
          {
            text: '一',
            value: '星期一',
            num: 1,
          },
          {
            text: '二',
            value: '星期二',
            num: 2,
          },
          {
            text: '三',
            value: '星期三',
            num: 3,
          },
          {
            text: '四',
            value: '星期四',
            num: 4,
          },
          {
            text: '五',
            value: '星期五',
            num: 5,
          },
          {
            text: '六',
            value: '星期六',
            num: 6,
          },
        ] // 星期数据
        this.dateInitHandle(true)
      } else {
        throw ('日期格式错误，应为：' + new Date().toString())
      }
    } catch (err) {
      alert(err)
    }
  }
  _getMonthDay(tf) { // 得到月份日期数
    let date = []
    const day = new Date(this.yearCopy, this.monthCopy + 1, 0)
    let dayMax = day.getDate()
    let i = 1
    while (i <= dayMax) {
      let active = ''
      if (tf && i === new Date().getDate()) { //判断初始化时是否要出现选中当前日期状态
        active = 'active'
      } else {
        active = ''
      }
      date.push({
        value: i,
        month: this.monthCopy === 0 ? 11 : this.monthCopy,
        year: this.yearCopy,
        tf: true,
        active,
      })
      i++
    }
    return date
  }
  _getPreMonthDay() { // 得到上月多余日期
    let date = []
    const day = new Date(this.yearCopy, this.monthCopy, 1)
    const weekData = this.weeks[day.getDay()]
    let preMonthDay = weekData.num - 1
    let preMountDayMax = new Date(this.yearCopy, this.monthCopy, 0).getDate()
    while (preMonthDay) {
      date.push({
        value: preMountDayMax - (preMonthDay - 1),
        month: this.monthCopy === 0 ? 11 : this.monthCopy - 1,
        year: this.yearCopy,
        tf: false,
      })
      preMonthDay -= 1
    }
    return date
  }
  _getNextMonthDay() { // 得到下月多余日期
    let date = []
    let i = 1
    const nextMonthDayMax = 42 - this.date.length
    while (i <= nextMonthDayMax) {
      date.push({
        value: i,
        month: this.monthCopy === 0 ? 11 : this.monthCopy + 1,
        year: this.yearCopy,
        tf: false,
      })
      i++
    }
    return date
  }
  _dateClickHandle(e,cancelDom) { // 点击日期处理
    const date = e.target.getAttribute('data-value') || this.dayCopy
    const { value = '', tf = false } = this.date.filter(item => item.value == date && item.month == this.monthCopy)[0]
    if (tf) {
      this.dayCopy = value
      this._clickStyleHandle(date,cancelDom)
    }
  }
  _clickStyleHandle(date,cancelDom='') { // 点击日期样式处理
    const dateDom = this.dateBox.getElementsByClassName('bottom')[0].getElementsByTagName('span')
    this.date.forEach((item, index) => {
      const style = dateDom[index].getAttribute('class')
      if (item.value == date && item.tf) {
        dateDom[index].setAttribute('class', 'active yes')
      } else {
        if (style === 'active yes') {
          dateDom[index].setAttribute('class', 'yes')
        }
      }
    })
    cancelDom && this._cancelShowHandle(cancelDom)
  }
  _clickYearMonthHandle(maskDom) { // 点击年月处理
    maskDom.style.display = 'flex'
    maskDom.getElementsByTagName('input')[0].focus()
    maskDom.getElementsByTagName('input')[0].value = this.yearCopy
    maskDom.getElementsByTagName('input')[1].value = this.monthCopy + 1
  }
  _contentTypeHandle() { // 容器类型判断
    switch(this.contentBox.nodeName) {
      case 'INPUT':  this.contentBox.value = this.year+'年'+(this.month+1) +'月' + this.day + '日';break;
      default: this.contentBox.innerText = this.year+'年'+(this.month+1) +'月' + this.day + '日';
    }
  }
  _sureClickHandle(cancelDom) { // 确定按钮点击处理
    this.year = this.yearCopy || this.year
    this.month = this.monthCopy || this.month
    this.day = this.dayCopy || this.day
    this.contentBox && this._contentTypeHandle()
    cancelDom.style.display = 'none'
    this.tf && this.controlBoxShow()
  }
  _cancelClickHandle(cancelDom) { // 取消按钮点击处理
    this.yearCopy = this.year
    this.monthCopy = this.month
    this.dayCopy = this.day
    this.dateInitHandle()
    this._clickStyleHandle(this.day)
    cancelDom.style.display = 'none'
    this.tf &&  this.controlBoxShow()
  }
  _yearInputHandle(e, tipsBox, maskDom, cancelDom) { // 年份输入框处理
    if (e.keyCode === 13) {
      const value = e.target.value
      if (this.yearReg.test(value)) {
        if(this.monthReg.test(maskDom.getElementsByTagName('input')[1].value)){
          this._inputVerifySuccess(value,maskDom.getElementsByTagName('input')[1].value,maskDom, cancelDom)
        } else {
          this._inputVerifyHandle(tipsBox, '请输入正确的月份')
        }
      } else {
        this._inputVerifyHandle(tipsBox, '请输入正确的年份')
      }
    }
  }
  _monthInputHandle(e, tipsBox, maskDom, cancelDom) { // 月份输入框处理
    if (e.keyCode === 13) {
      const value = e.target.value
      if (this.monthReg.test(value)) {
        if(this.yearReg.test(maskDom.getElementsByTagName('input')[0].value)){
          this._inputVerifySuccess(maskDom.getElementsByTagName('input')[0].value,value,maskDom, cancelDom)
        } else {
          this._inputVerifyHandle(tipsBox, '请输入正确的年份')
        }
      } else {
        this._inputVerifyHandle(tipsBox, '请输入正确的月份')
      }
    }
  }
  _cancelShowHandle(cancelDom) { // 取消按钮展示处理
    if(this.year == this.yearCopy && this.month == this.monthCopy && this.day == this.dayCopy){
      cancelDom.style.display = 'none'
    } else {
      cancelDom.style.display = 'inline-block'
    }
  }
  _inputVerifySuccess(year, month, maskDom, cancelDom) { // 输入框验证通过处理
    this.yearCopy = year
    this.monthCopy = month - 1
    const tf = this.year == this.yearCopy && this.monthCopy == this.month? true:false
    this.dateInitHandle(tf)
    maskDom.style.display = 'none'
    this._cancelShowHandle(cancelDom)
  }
  _inputVerifyHandle(tipsBox, text) { //输入框验证消息处理
    if (this.tipsTimer !== null) {
      clearTimeout(this.tipsTimer)
      tipsBox.setAttribute('class', 'tips-box animate__animated animate__fadeOutUp')
      this.tipsTimer = null
    } else {
      tipsBox.innerHTML = `<span class="tips">${text}</span>`
      tipsBox.style.display = 'flex'
      tipsBox.setAttribute('class', 'tips-box animate__animated animate__fadeInDown')
      this.tipsTimer = setTimeout(() => {
        tipsBox.setAttribute('class', 'tips-box animate__animated animate__fadeOutUp')
        this.tipsTimer = null
      }, 2000)
    }
  }
  _dateDomHandle() { // 渲染DOM
    const headerHTML = this._headerDom()
    const middleHTML = this._middleDom()
    const bottomHTML = this._bottomDom()
    const btnHTML = this._btnDom()
    const maskHTML = this._maskInputDom()
    this.dateBox.innerHTML = headerHTML + middleHTML + bottomHTML + btnHTML + maskHTML
  }
  _maskShowHandle(e='', maskDom) {
    console.log()
    if(e && e.target.getAttribute('data-type') === 'mask') {
      maskDom.style.display = 'none'
    }
  }
  _clickEventHandle() { // 点击事件处理
    const headerDom = this.dateBox.getElementsByClassName('header')[0]
    const maskDom = this.dateBox.getElementsByClassName('mask')[0]
    const btnBox = document.getElementsByClassName('date-btn')[0]
    const tipsBox = document.getElementsByClassName('tips-box')[0]
    // 日期点击
    this.dateBox.getElementsByClassName('bottom')[0].addEventListener('click', (e)=>{
      this._dateClickHandle.call(this,e,btnBox.getElementsByTagName('span')[1])
    })
    //遮罩层点击
    maskDom.addEventListener('click',(e)=>{
      this._maskShowHandle.call(this,e,maskDom)
    })
    // 年月点击
    headerDom.getElementsByTagName('span')[0].addEventListener('click', this._clickYearMonthHandle.bind(this, maskDom))
    headerDom.getElementsByTagName('span')[1].addEventListener('click', this._clickYearMonthHandle.bind(this, maskDom))
    // 确定按钮
    btnBox.getElementsByTagName('span')[0].addEventListener('click', this._sureClickHandle.bind(this,btnBox.getElementsByTagName('span')[1]))
    // 取消按钮
    btnBox.getElementsByTagName('span')[1].addEventListener('click', this._cancelClickHandle.bind(this,btnBox.getElementsByTagName('span')[1]))
    document.getElementById('date-year-input').addEventListener('keydown', (e) => {
      this._yearInputHandle.call(this, e, tipsBox, maskDom, btnBox.getElementsByTagName('span')[1])
    })
    document.getElementById('date-month-input').addEventListener('keydown', (e) => {
      this._monthInputHandle.call(this, e, tipsBox, maskDom, btnBox.getElementsByTagName('span')[1])
    })
  }
  _headerDom() { // header HTML
    const headerHTML = `
      <div class="header">
        <span>${this.yearCopy} 年</span>
        <span>${this.monthCopy + 1} 月</span>
      </div>
    `
    return headerHTML
  }
  _maskInputDom() { // input HTML
    return `
      <div class="mask" data-type="mask">
        <div class="tips-box">
        </div>
        <div class="input-box">
          <div>
            <label for="date-year-input">年：</label>
            <input maxlength="4" pattern="^[1-9]{1}[0-9]{1}[0-9]{1}[0-9]{1}$" id="date-year-input" />
          </div>
          <div style="margin-left: 10px">
            <label for="date-month-input">月：</label>
            <input maxlength="2" pattern="^0?[1-9]{1}$|^1[0-2]$" id="date-month-input" />
          </div>
        </div>
      </div>
    `
  }
  _middleDom() { // middle HTML
    const item = this.week.map(item => {
      return `<span>${item.text}</span>`
    })
    const middleHTML = `
      <div class="middle">
       ${item.join('')}
      </div>
    `
    return middleHTML
  }
  _bottomDom() { // bottom HTML
    const item = this.date.map(item => {
      return `<span
        data-value=${item.value}
        class="${item.active} ${item.tf ? 'yes' : 'no'}"
        style="color: ${item.tf ? '' : '#c0c4cc'};"
        title="${new Date(item.year, item.month, item.value).getDay() === 0 ? '星期天' : '星期' + new Date(item.year, item.month, item.value).getDay()}">${item.value}</span>`
    })
    const bottomHTML = `
        <div class="bottom">
        ${item.join('')}
        </div>
      `
    return bottomHTML
  }
  _btnDom() { // btn HTML
    const btnHTML = `
      <div class="date-btn">
        <span>确定</span>
        <span style="display:none">取消</span>
      </div>
    `
    return btnHTML
  }
  controlBoxShow(tf = false) { // 不传或传false为隐藏盒子，传true即为显示盒子
    if (tf) {
      this.dateBox.style.display = 'inline-block'
      this.dateBox.setAttribute('class', 'date-box animate__animated animate__fadeInDown')
    } else {
      //this.dateBox.setAttribute('class', 'date-box animate__animated animate__fadeOutUp')
      this.dateBox.style.display = 'none'
    }
  }
  dateInitHandle(tf = false) { // 初始化
    const currentDate = this._getMonthDay(tf)
    const preDate = this._getPreMonthDay()
    this.date = preDate.concat(currentDate)
    const nextDate = this._getNextMonthDay()
    this.date = this.date.concat(nextDate)
    this._dateDomHandle()
    this._clickEventHandle()
    console.log(this.date)
  }
}

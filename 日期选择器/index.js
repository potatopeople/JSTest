class DateReterFace {
  constructor(dateBox, date) {
    try {
      if (date instanceof Date) {
        this.dateBox = dateBox
        this.year = date.getFullYear()
        this.month = date.getMonth()
        this.day = date.getDate()
        this.date = []
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
        throw('日期格式错误：格式应为：'+new Date().toString())
      }
    } catch (err) {
      alert(err)
    }
  }
  _getMonthDay(tf) { // 得到月份日期数
    let date = []
    const day = new Date(this.year, this.month + 1, 0)
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
        month: this.month === 0 ? 11 : this.month,
        year: this.year,
        tf: true,
        active,
      })
      i++
    }
    return date
  }
  _getPreMonthDay() { // 得到上月多余日期
    let date = []
    const day = new Date(this.year, this.month, 1)
    const weekData = this.weeks[day.getDay()]
    let preMonthDay = weekData.num - 1
    let preMountDayMax = new Date(this.year, this.month, 0).getDate()
    while (preMonthDay) {
      date.push({
        value: preMountDayMax,
        month: this.month === 0 ? 11 : this.month - 1,
        year: this.year,
        tf: false,
      })
      preMonthDay -= 1
      preMountDayMax -= 1
    }
    return date.sort()
  }
  _getNextMonthDay() { // 得到下月多余日期
    let date = []
    let i = 1
    const nextMonthDayMax = 42 - this.date.length
    while (i <= nextMonthDayMax) {
      date.push({
        value: i,
        month: this.month === 0 ? 11 : this.month + 1,
        year: this.year,
        tf: false,
      })
      i++
    }
    return date
  }
  _dateClickHandle(e) { //点击日期处理
    const index = e.getAttribute('data-index') || 30
    const { year = '', month = '', value = '', tf = false } = this.date[index]
    if (tf) {
      this._clickStyleHandle(index)
      this.year = year
      this.month = month
      this.day = value
      console.log(this.day)
    }
  }
  _clickStyleHandle(index) { //点击日期样式处理
    const dateDom = this.dateBox.getElementsByClassName('bottom')[0].getElementsByTagName('span')
    Array.from(dateDom).forEach((item, indexs) => {
      const style = item.getAttribute('class')
      if (parseInt(index) === indexs) {
        item.setAttribute('class', 'active yes')
      } else {
        if (style === 'active yes') {
          item.setAttribute('class', 'yes')
        }
      }
    })
  }
  _dateDomHandle() { // 渲染DOM
    const headerHTML = this._headerDom()
    const middleHTML = this._middleDom()
    const bottomHTML = this._bottomDom()
    const btnHTML = this._btnDom()
    this.dateBox.innerHTML = headerHTML + middleHTML + bottomHTML + btnHTML
  }
  _clickEventHandle(){ //点击事件处理
    this.dateBox.getElementsByClassName('bottom')[0].addEventListener('click', (e) => {
      this._dateClickHandle(e.target)
    })
  }
  _headerDom() { // header HTML
    const headerHTML = `
      <div class="header">
        <span>${this.year} 年</span>
        <span>${this.month + 1} 月</span>
      </div>
    `
    return headerHTML
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
    const item = this.date.map((item, index) => {
      return `<span
        data-index=${index}
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
        <span>取消</span>
      </div>
    `
    return btnHTML
  }
  controlBoxShow(tf = false) { // 不传或传false为隐藏盒子，传true即为显示盒子
    // this.dateBox.style.display = tf ? 'inline-block' : 'none'
    if(tf){
      this.dateBox.setAttribute('class','date-box animate__animated animate__fadeInDown')
    } else {
      this.dateBox.setAttribute('class','date-box animate__animated animate__fadeOutUp')
    }
    
    // if(!tf){

    // }
  }
  dateInitHandle(tf = false) { // 日期初始化
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

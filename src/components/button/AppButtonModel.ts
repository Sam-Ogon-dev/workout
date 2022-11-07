export default class AppButtonModel {
  click(e: MouseEvent, el: HTMLElement, action?: () => void) {
    el.style.top = e.offsetY + 'px'
    el.style.left = e.offsetX + 'px'
    el.classList.add('ripple_active')

    setTimeout(() => {
      el.classList.remove('ripple_active')

      if(action) {
        action()
      }
    }, 300)
  }
}

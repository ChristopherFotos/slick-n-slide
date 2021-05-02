/* 
TODO: 
3. arrow buttons
4. making the overflow visible. maybe just an SVG background.
*/

class Sliderize {
  constructor(sliderDiv, gutter, itemWidth, mainSlideWidth){
    this.sliderDiv   = sliderDiv
    this.sliderItems = Array.from(sliderDiv.getElementsByClassName('custom-product-slider__item'))   
    this.activeImgIndex = Math.floor(this.sliderItems.length / 2);
    this.mainSlideWidth = mainSlideWidth

    this.backButton = sliderDiv.getElementsByClassName('custom-slider__back')[0]
    this.forwardButton = sliderDiv.getElementsByClassName('custom-slider__forward')[0]

    this.setGutter(gutter)

    this.slideLength = itemWidth + gutter;
    this.incomingSlideLength = itemWidth + gutter + ((mainSlideWidth - itemWidth) / 2) 


    this.setActiveImg()
    this.intializeButtons()
    this.setOffset()
    this.applyOffset()
    

    
    // set everything back to default state on window resize. If not, things get messed up. 
    window.addEventListener('resize', ()=>{
      this.setOffset();
      this.applyOffset()
      this.activeImgIndex = Math.floor(this.sliderItems.length / 2);
      this.activeImg.classList.remove('active-img')
      this.setActiveImg()
    })

    console.log('main img rect', this.activeImg.getBoundingClientRect())

  }

  intializeButtons(){
    console.log('init btns')
    this.backButton.addEventListener('click', ()=>this.goBackward())
    this.forwardButton.addEventListener('click', ()=>this.goForward())

    this.backButton.style.width = '50px'
    this.forwardButton.style.width = '50px'
    this.backButton.style.height = '50px'
    this.forwardButton.style.height = '50px'
    this.forwardButton.style.position = 'absolute'
    this.backButton.style.position = 'absolute'
    this.forwardButton.style.zIndex = '2'
    this.backButton.style.zIndex = '2'
  }


  // Center elements
  setOffset(){
    this.offset =  
    // half the container's width
    parseInt(getComputedStyle(sliderDiv).getPropertyValue('width').split('p')[0]) / 2 
    // minus one slidelength * half the number of imgs 
    - (this.slideLength * Math.floor(this.sliderItems.length / 2 - 1)) 
    // minus an incoming slidelength
    - this.incomingSlideLength;

    //${this.activeImg.getBoundingClientRect().left - 5}

    this.backButton.style.left = `${this.sliderDiv.getBoundingClientRect().width/2 - (this.mainSlideWidth/1.65)}px`
    this.forwardButton.style.left = `${this.sliderDiv.getBoundingClientRect().width/2 + (this.mainSlideWidth/2.3)}px`
    console.log(this.forwardButton.style.left )
  }

  applyOffset(){
    this.sliderItems.forEach(element => {
      element.style.left = this.offset + 'px';
      this.sliderItems[this.activeImgIndex].style.left = this.offset + 100 + 'px'
    })
  }

  setActiveImg(){
    this.activeImg = Array.from(sliderDiv.children)[this.activeImgIndex]
    this.activeImg.classList.add('active-img')
  }

  setGutter(gutter){ 
    this.sliderDiv.style.gap = gutter + 'px'
  }

  goForward(){
    console.log(this, 'forward')
    // return if we've already reached end of the slides
    if(this.activeImgIndex === this.sliderItems.length - 1) return

    // decrease offset by slidelength
    this.offset -= this.slideLength

    // change each element's left property to equal the new offset
    this.sliderItems.forEach((item, i) => {
      if(i === this.activeImgIndex + 1){
        item.style.left = (this.offset + 100) + 'px'
        return
      }

      item.style.left = this.offset + 'px'
    })

    /* increment the active img index, remove the active-img 
    class from the current active img, change this.activeImg 
    to the img at this.activeImgIndex, then add active-img 
    class to that img. */
    this.activeImgIndex ++
    this.activeImg.classList.remove('active-img')
    this.setActiveImg()
  }

  goBackward(){
    console.log(this, 'backward')
    if(this.activeImgIndex === 0) return

    this.offset += this.slideLength

    this.sliderItems.forEach((item, i) => {
      if(i === this.activeImgIndex - 1){
        item.style.left = (this.offset + 100) + 'px'
        return
      }
      
      item.style.left = this.offset + 'px'
    })

    this.activeImgIndex --
    this.activeImg.classList.remove('active-img')
    this.setActiveImg()
  }

}

// Initialize slider
const sliderDiv = document.getElementsByClassName('custom-product-slider')[0] 
const slider = new Sliderize(sliderDiv, 86, 170, 404)
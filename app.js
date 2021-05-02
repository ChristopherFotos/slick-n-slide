/* 
TODO: 

1. all the hard-coded values need to be made dynamic and passed to the 
constructor. This should include the gutter width, the main slide's width, 
and the regular slide's width. Those values should be applied to the elements
in the constructor function. 
    - decided not to set values in the constructor. Only made gutters dynamic. 
    more trouble than it was worth, required a lot of changes 
    to the current implementation. user can simply tell the 
    slider what the values are. As it is, the user can change the widths to be whatever
    they want in css, as long as they pass that value into the constructor.

3. arrow buttons

4. making the overflow visible. maybe just an SVG background.

5. making it adjust on window resize. The logic that sets the offset in the constructor
can be extracted into a method, and then that method can be passed to a 
resize event listener.
*/

class Sliderize {
  constructor(sliderDiv, gutter, itemWidth, mainSlideWidth){
    this.sliderDiv   = sliderDiv
    this.sliderItems = Array.from(sliderDiv.children)   
    this.activeImgIndex = Math.floor(this.sliderItems.length / 2);

    this.setGutter(gutter)

    // slidelength is an item width + a gutter
    this.slideLength = itemWidth + gutter;

    // incoming slidelength is a width + a gutter + the diff between a slide and a main slide
    this.incomingSlideLength = itemWidth + gutter + ((mainSlideWidth - itemWidth) / 2) 

    this.setOffset()
    this.setActiveImg()
    this.applyOffset()
    
    // set everything back to default state on window resize. If not, things get messed up. 
    window.addEventListener('resize', ()=>{
      this.setOffset();
      this.applyOffset()
      this.activeImgIndex = Math.floor(this.sliderItems.length / 2);
      this.activeImg.classList.remove('active-img')
      this.setActiveImg()
    })
  }

  setOffset(){
    console.log('setting offset')
    this.offset =  
    // half the container's width
    parseInt(getComputedStyle(sliderDiv).getPropertyValue('width').split('p')[0]) / 2 
    // minus one slidelength * half the number of imgs 
    - (this.slideLength * Math.floor(this.sliderItems.length / 2 - 1)) 
    // minus an incoming slidelength
    - this.incomingSlideLength
  }

  applyOffset(){
    Array.from(sliderDiv.children).forEach(element => {
      element.style.left = this.offset + 'px';
      Array.from(sliderDiv.children)[this.activeImgIndex].style.left = this.offset + 100 + 'px'
    })
  }

  setActiveImg(){
    this.activeImg = Array.from(sliderDiv.children)[this.activeImgIndex]
    this.activeImg.classList.add('active-img')
    console.log(this.activeImg)
  }

  setGutter(gutter){ 
    this.sliderDiv.style.gap = gutter + 'px'
  }

  goForward(){
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

//Get slider container
const sliderDiv = document.getElementsByClassName('custom-product-slider')[0] 
const slider = new Sliderize(sliderDiv, 86, 170, 370)
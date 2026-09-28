const sliderBox=document.querySelector('#slider-box');
const sliderContainer=document.querySelector('#slider-container');
let slideNumber=1;
async function readData() {
    let response= await fetch('/data/slider.json');
    let data= await response.json();
    return data
}
function slidechange(titr,caption,btnText){
    sliderBox.style.cssText=`background-image: url("images/slide${slideNumber}.png")`;
    sliderContainer.innerHTML='';
    let slideTitrElement=document.createElement('h1');
    let slideTitrText=document.createTextNode(titr);
    let slideCaptionElement=document.createElement('span');
    let slideCaptionText=document.createTextNode(caption);
    let slideButtonElement=document.createElement('button');
    let slideButtonText=document.createTextNode(btnText);
    slideButtonElement.classList.add('buttons');

    sliderContainer.appendChild(slideTitrElement);slideTitrElement.appendChild(slideTitrText);
    sliderContainer.appendChild(slideCaptionElement);slideCaptionElement.appendChild(slideCaptionText);
    sliderContainer.appendChild(slideButtonElement);slideButtonElement.appendChild(slideButtonText);
}
readData().then((data)=>{
    slidechange(data[0].title, data[0].caption, data[0].button_text);
    sliderBox.style.cssText=`background-image: url("images/slide${0}.png")`;
    setInterval(() => {
        let slide=data[slideNumber];
        slidechange(slide.title, slide.caption, slide.button_text);
        if(slideNumber<2)
            slideNumber+=1;
        else
            slideNumber=0;
    }, 10000);
})

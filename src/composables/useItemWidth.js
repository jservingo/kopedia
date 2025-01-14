import { ref } from 'vue'
 
export default function useItemOptions() {
  const container_options = ref({})
  const item_options = ref({})
  const content_options = ref({})
  const width = ref(0)

  const getItemWidth = async (wwidth, options, eoptions, coptions) => {
    container_options.value = {}
    item_options.value = {}
    content_options.value = {}
    for(var k in options) container_options.value[k]=options[k];
    for(var k in eoptions) item_options.value[k]=eoptions[k];
    for(var k in coptions) content_options.value[k]=coptions[k];
    width.value = 0

    //Calcular container_width
    let cwidth = 0
    if (wwidth<=800) { 
      cwidth = wwidth - 90 
    } else if (wwidth<=1067) {
      cwidth = Math.floor(0.33708*(wwidth-800)+710)
    }
    else {
      cwidth = Math.floor(wwidth*0.8)
    }
    //console.log("cwidth",wwidth, cwidth)

    //Calcular factor y pendiente m
    let factor = 0
    let m = 0
    if (eoptions.hasOwnProperty('width')) {
      let ewidth = eoptions['width']
      if (ewidth.substr(ewidth.length-1=="%")) {
        let porc = ewidth.substr(0,ewidth.length-1)
        porc = Math.min(porc,95)
        //console.log("porc",porc)
        factor = porc/100
        //console.log("factor",factor)
        m = (680*factor-382)/(680-410)
      }
    }

    //Calcular width
    if (cwidth<=680) {      
      if (coptions['show']=='center') {
        item_options.value['float'] = 'none';
        item_options.value['display'] = "block"
        item_options.value['margin-left'] = "auto"
        item_options.value['margin-right'] = "auto" 
        content_options.value['float'] = 'none';
        content_options.value['margin-top'] = '6px'
        content_options.value['margin-left'] = 'auto'
        content_options.value['margin-right'] = 'auto'
        content_options.value['text-align'] = 'center'
      } else {
        //delete 
      }
      if (m!=0 && cwidth>=410) {
        width.value = Math.floor(m*(cwidth-410)+382)
        width.value = Math.min(width.value,680*factor-28)
      } else
        width.value = cwidth-28               
    }

    if (coptions.hasOwnProperty('show')) {
      if (width.value==0 && coptions['show']=='right') {
        item_options.value['float'] = 'left';
        item_options.value['display'] = "block"
        item_options.value['margin-left'] = "auto"
        item_options.value['margin-right'] = "auto" 
        content_options.value['float'] = 'right';
        content_options.value['margin-top'] = 0
        content_options.value['text-align'] = 'left'  
        width.value = Math.floor(cwidth * 0.48)-12
        content_options.value['width'] = width.value+"px"
      }

      if (width.value==0 && coptions['show']=='left') {
        item_options.value['float'] = 'right';
        item_options.value['display'] = "block"
        item_options.value['margin-left'] = "auto"
        item_options.value['margin-right'] = "auto" 
        content_options.value['float'] = 'left';
        content_options.value['margin-top'] = 0
        content_options.value['text-align'] = 'left'
        width.value = Math.floor(cwidth * 0.48)-12
        content_options.value['width'] = width.value+"px"
      }

      if (width.value==0 && coptions['show']=='center') {
        item_options.value['float'] = 'none';
        item_options.value['display'] = "block"
        item_options.value['margin-left'] = "auto"
        item_options.value['margin-right'] = "auto" 
        content_options.value['float'] = 'none';
        content_options.value['margin-top'] = '6px'
        content_options.value['margin-left'] = 'auto'
        content_options.value['margin-right'] = 'auto'
        content_options.value['text-align'] = 'center'
      } 
    }

    if (width.value==0 && eoptions.hasOwnProperty('width')) {
      width.value = Math.floor(cwidth*factor)               
    }       
           
    if (width.value==0) {
      width.value = Math.floor(cwidth*0.8)
    }
    
    //console.log("width",width.value)
    container_options.value['width'] = cwidth+"px"
    item_options.value['width'] = width.value+"px"        
  }

  return { width, container_options, item_options, content_options, getItemWidth } 
}
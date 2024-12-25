import { ref } from 'vue'
 
export default function useItemOptions() {
    const container_options = ref({})
    const item_options = ref({})
    const content_options = ref({})
    const width = ref(0)

    const getItemWidth = async (wwidth, options, eoptions, coptions) => {
        container_options.value = options.value
        item_options.value = eoptions.value
        content_options.value = coptions.value
        width.value = 0
        //Calcular container_width
        let cwidth = 0
        if (wwidth<800) { 
          cwidth = wwidth - 90 
        } else if (wwidth<=1067) {
          cwidth = Math.floor(0.33708*(wwidth-800)+710)
        }
        else {
          cwidth = Math.floor(wwidth*0.8)
        }
        if(coptions.value['show']!='none'){
          if (cwidth>=600 && coptions['show']=='right') {
            //console.log("RIGHT")
            item_options.value['float'] = 'left';
            item_options.value['display'] = "block"
            item_options.value['margin-left'] = "auto"
            item_options.value['margin-right'] = "auto" 
            content_options.value['float'] = 'right';
            content_options.value['margin-top'] = 0
            content_options.value['text-align'] = 'left'  
            width.value = Math.floor(cwidth * 0.48)-12
            content_options.value['width'] = width.value+"px"
          } else if(cwidth>=600 && coptions.value['show']=='left') {
            //console.log("LEFT")
            item_options.value['float'] = 'right';
            item_options.value['display'] = "block"
            item_options.value['margin-left'] = "auto"
            item_options.value['margin-right'] = "auto" 
            content_options.value['float'] = 'left';
            content_options.value['margin-top'] = 0
            content_options.value['text-align'] = 'left'
            width.value = Math.floor(cwidth * 0.48)-12
            content_options.value['width'] = width.value+"px"
          } else {
            //console.log("CENTER",cwidth)
            item_options.value['float'] = 'none';
            item_options.value['display'] = "block"
            item_options.value['margin-left'] = "auto"
            item_options.value['margin-right'] = "auto" 
            content_options.value['float'] = 'none';
            content_options.value['margin-top'] = '6px'
            content_options.value['margin-left'] = 'auto'
            content_options.value['margin-right'] = 'auto'
            content_options.value['text-align'] = 'center'
            //width.value = Math.floor(0.92*cwidth)
            width.value = cwidth-28 
          }
        } else {
          content_options.value['display'] = "none"
          if (cwidth<=600)
            width.value = cwidth-28
          else 
            width.value = Math.floor(0.30*(cwidth-300)+300)-12 
        }
      
        container_options.value['width'] = cwidth+"px"
        item_options.value['width'] = width.value+"px"        
    }

    return { width, container_options, item_options, content_options, getItemWidth } 
}
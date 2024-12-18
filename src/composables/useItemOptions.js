import { ref } from 'vue'
 
export default function useItemOptions() {
    const options = ref({})
    const eoptions = ref({})
    const coptions = ref({})

    const getItemOptions = async (item) => {
        //console.log("item",item)
        //options.value['color'] = "floralwhite"
        if (item.options) {
            let opts = item.options.split(';')
            for (let i=0;i<opts.length;i++) {
                let opt = opts[i].split(':')
                let key = opt[0]
                let value = opt[1]
                switch (key) {
                    case 'width':
                        options.value['width'] = value
                        break
                    case 'width-text':
                    case 'width-image':
                    case 'width-video':
                    case 'width-audio':
                        eoptions.value['width'] = value
                        break
                    case 'width-content':
                        coptions.value['width'] = value
                        break
                    case 'align':
                        switch (value) {
                            case "center":
                                options.value['display'] = "block"
                                options.value['margin-left'] = "auto"
                                options.value['margin-right'] = "auto" 
                                break;
                            case "right":
                                options.value['display'] = "block"
                                options.value['margin-left'] = "auto"
                                options.value['margin-right'] = "0" 
                                break;
                            case "left":
                                options.value['display'] = "block"
                                options.value['margin-left'] = "0" 
                                options.value['margin-right'] = "0"
                                break;
                        } 
                        break;
                    case 'align-text':
                    case 'align-image':
                    case 'align-video':
                    case 'align-audio':
                        switch (value) {
                            case "center":
                                eoptions.value['display'] = "block"
                                eoptions.value['margin-left'] = "auto"
                                eoptions.value['margin-right'] = "auto" 
                                break;
                            case "right":
                                eoptions.value['display'] = "block"
                                eoptions.value['margin-left'] = "auto" 
                                eoptions.value['margin-right'] = "0"
                                break;
                            case "left":
                                eoptions.value['display'] = "block"
                                eoptions.value['margin-left'] = "0" 
                                eoptions.value['margin-right'] = "0"
                                break;
                        } 
                        break    
                    case 'display-content':
                        switch (value) {
                            case "center":
                                coptions.value['show'] = "center"
                                coptions.value['display'] = "block"
                                coptions.value['margin-left'] = "auto"
                                coptions.value['margin-right'] = "auto" 
                                break;
                            case "right":
                                coptions.value['show'] = "right"
                                coptions.value['display'] = "block"
                                coptions.value['margin-left'] = "auto" 
                                coptions.value['margin-right'] = "0"
                                break;
                            case "left":
                                coptions.value['show'] = "left"
                                coptions.value['display'] = "block"
                                coptions.value['margin-left'] = "0" 
                                coptions.value['margin-right'] = "0"
                                break;
                            case "hide":
                            case "none":
                                coptions.value['show'] = "none"
                                coptions.value['display'] = "block"
                                coptions.value['display'] = 'none'
                                break;
                        } 
                        break    
                    case 'background':
                        options.value['background-color'] = get_color(value)                    
                        options.value['border'] = "4px solid rgb(8, 19, 51)"
                        options.value['border-radius'] = "10px"
                        options.value['padding'] = "10px" 
                        break; 
                    case 'color':
                        options.value['color'] = value  
                        break
                    default:
                        options.value[key] = value              
                }
            }
        }
        //console.log("getItemOptions", options.value)
    } 

    function get_color(color) {
        switch (color) {
            case "green":
                return"rgb(160, 230, 206)"
            case "green-dark":
                return "rgb(160, 230, 206)"
            case "blue":
                return "rgb(163, 184, 230)";
            case "blue-dark":
                return "rgb(81, 118, 192)"
            case "yellow":
                return "rgb(241, 241, 155)"
            case "yellow-dark":
                return "rgb(200, 200, 60)"
            case "red":
                return "rgb(240, 120, 120)"
            case "red-dark":
                return "rgb(185, 84, 84)"
            case "gray":
                return "rgb(180, 180, 180)"
            case "gray-dark":
                return "rgb(124, 124, 124)"
            case "white":
                return "rgb(228, 230, 236)"            
            case "black":
                return "rgb(8, 19, 51)"
            case "prueba":
                return "rgb(185, 84, 84)"
            default:
                return color
        }
    }

    return { options, eoptions, coptions, getItemOptions } 
}
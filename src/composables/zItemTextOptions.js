const options = computed(() => {
    let options = {}
    options['color'] = "floralwhite"
    if (props.item.options) {
        let opts = props.item.options.split(';')
        for (let i=0;i<opts.length;i++) {
            let opt = opts[i].split(':')
            let key = opt[0]
            let value = opt[1]
            switch (key) {
                case 'width':
                    options['width'] = value
                    break
                case 'align':
                    switch (value) {
                        case "center":
                            options['display'] = "block"
                            options['margin-left'] = "auto"
                            options['margin-right'] = "auto" 
                            break;
                        case "right":
                            options['display'] = "block"
                            options['margin-left'] = "auto" 
                            break;
                    } 
                    break               
                case 'background':
                    options['background-color'] = get_color(value)                    
                    options['border'] = "4px solid rgb(8, 19, 51)"
                    options['border-radius'] = "10px"
                    options['padding'] = "10px" 
                    break; 
                case 'color':
                    options['color'] = value  
                    break
                default:
                    options[key] = value              
            }
        }
    }
    return options
})

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
        case "yellow":
            return "rgb(241, 241, 155)"
        case "red":
            return "rgb(240, 120, 120)"
        case "red-dark":
            return "rgb(185, 84, 84)"
        case "white":
            return "rgb(228, 230, 236)"
        case "gray":
            return "rgb(180, 180, 180)"
        case "black":
            return "rgb(8, 19, 51)"
        case "prueba":
            return "rgb(185, 84, 84)"
        default:
            return color
    }
}
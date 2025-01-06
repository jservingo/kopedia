import { ref } from 'vue'
 
export default function useItemContent() {
    const content = ref({})
    const info = ref({})

    const getItemContent = async (item, btn="btn_mas") => {
        if (item.fcontent == null || item.fcontent.trim().length === 0)
            content.value = item.content
        else
            content.value = item.fcontent
        content.value = content.value.replaceAll('<title>','<span style="font-weight:700; color:rgb(38, 34, 250);">')
        content.value = content.value.replaceAll('</title>','</span>')
        content.value = content.value.replaceAll('<list>','<ul style="list-style-type:none;margin-bottom:0;padding-left:0;">')
        content.value = content.value.replaceAll('</list>','</ul>')
        content.value = content.value.replaceAll('<li>','<li style="margin-top:8px;margin-bottom:8px;">')
        content.value = content.value.replaceAll('display="block"','')
        content.value = content.value.replaceAll('<nl>','<br><br>')    
        content.value = content.value.replaceAll('<blue>','<span style="font-weight:700 !important;color:blue;">') 
        content.value = content.value.replaceAll('<black>','<span style="font-weight:700 !important;color:black;">') 
        content.value = content.value.replaceAll('<white>','<span style="font-weight:700 !important;color:white;">')     
        content.value = content.value.replaceAll('<red>','<span style="font-weight:700 !important;color:red;">') 
        content.value = content.value.replaceAll('<brown>','<span style="font-weight:700 !important;color:brown;">') 
        content.value = content.value.replaceAll('<green>','<span style="font-weight:700 !important;color:green;">') 
        content.value = content.value.replaceAll('<teal>','<span style="font-weight:700 !important;color:teal;">')
        content.value = content.value.replaceAll('<crimson>','<span style="font-weight:700 !important;color:crimson;">')
        content.value = content.value.replaceAll('<orange>','<span style="font-weight:700 !important;color:orangered;">')
        content.value = content.value.replaceAll('<purple>','<span style="font-weight:700 !important;color:purple;">')
        content.value = content.value.replaceAll('<olive>','<span style="font-weight:700 !important;color:olive;">')
        content.value = content.value.replaceAll('<steal>','<span style="font-weight:700 !important;color:stealblue;">')         
        content.value = content.value.replaceAll('</blue>','</span>')
        content.value = content.value.replaceAll('</color>','</span>')
        content.value = content.value.replaceAll('font:strong', 'font-weight:700')
        content.value = content.value.replaceAll('color:#blue', 'color:rgb(163, 184, 230)')
        if (content.value.indexOf("$latex-bold")!=-1) {
            content.value = content.value.replaceAll('MathML"','MathML" style="font-weight:700;"')
            content.value = content.value.replaceAll('$latex-bold','')
        }
        //console.log("useItemContent",content.value)

        //Info tags
        let index = 0
        let seguir = true
        while (seguir) {
            //console.log('seguir',index)
            let start = content.value.indexOf("<info>") 
            if (start != -1) {
                let end = content.value.indexOf("</info>",start)
                if (end != -1) {
                    //Extraer info string
                    let sinfo = content.value.substring(start+6,end)
                    //console.log(sinfo)
                    //Almacenar sinfo en info
                    info[index] = sinfo
                    //Crear button
                    //let button = `<a href='${index}'>show</a>`    
                    let button = `&nbsp;<a href='#'><img id="img${index}" src='/src/assets/info.png'/></a>&nbsp;`                    
                    //Añadir button a content
                    content.value = content.value.substring(0,start)+button+content.value.substring(end+7) 
                    //console.log(content.value)
                    index++
                }
                else
                    seguir = false
            }
            else
                seguir = false                    
        }

        //More tag
        if (btn=="btn_mas") {
            let start = content.value.indexOf("<more>") 
            if (start != -1) {
                //Crear button 
                let button = `&nbsp;<a href='#' id="btn_mas">ver más</a>&nbsp;`                    
                //Añadir button a content
                content.value = content.value.substring(0,start)+button
                //console.log(content.value)
            }
        } else {
            content.value = content.value.replaceAll('<more>',' ')
            //Crear button 
            let button = `&nbsp;<a href='#' id="btn_menos">ver menos</a>`
            //Añadir button a content            
            content.value = content.value+button
        }
    }

    return { content, info, getItemContent } 
}
import { ref } from 'vue'
 
export default function useItemContent() {
    const content = ref({})

    const getItemContent = async (item) => {
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
        console.log("useItemContent",content.value)

    }

    return { content, getItemContent } 
}
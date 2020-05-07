export const translate = (options, language, propertie) => {

    // recorro el array de opciones
    for(let option of options){

        // detecto donde language es language
        if(option.language.name === language){
            // retorno esa opción
            return option[propertie]
        }

    }

}
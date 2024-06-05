//diminuer la taille du texte
export const TruncateText = (str: String) =>{
    if (str.length < 25)  return str
    return str.substring(0, 25) +"...";
}
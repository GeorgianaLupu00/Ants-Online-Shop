window.onload()=function(){
for (let i=1;i<=9;i++){
    id="fig"+i
    document.getElementById(id).style.gridArea=id
    console.log(document.getElementById(id).style.gridArea=id)
}
}
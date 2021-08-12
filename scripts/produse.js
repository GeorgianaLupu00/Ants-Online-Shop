
            // window.onload = function(){
                // let v = document.getElementByClassName("val-pret")
                // console.log(v)
                // for (let elem of v){
                //     eleme.style.color="green";
                // }
            //     let boot = document.getElementById("Filtreaza");
            //     boot.onclick = function(){
            //         let elemInput= document.getElementById("dim-max"); 
            //         let dimMax = elemInput.value;
            //         console.log(dimMax);
            //         let produse = document.getElementsByClassName("produs");
            //         for(let prod of produse){
            //             prod.style.display = "none";
            //             let dimi = parseInt(prod.getElementsByClassName("val-dimensiune")[0].innerHTML);
            //             var conditie1 = dimi < dimMax;

            //             let conditieTotala = conditie1;
            //             if(conditieTotala){
            //                 prod.style.display = "block";
            //             }
            //         }
            //     }
            //     let boot = document.getElementById("Reseteaza");
            //     boot.onclick = function(){
            //         let produse = document.getElementsByClassName("produs");
            //         for(let prod of produse){
            //         prod.style.display = "block";}
            //     }
            // }

            console.log("aici");
            window.onload=function(){
                let boot= document.getElementById("filtreaza")
                boot.onclick=function(){
                    let elemInput = document.getElementById("pret-minim");
                    let pretMax = elemInput.value;
                    let elemInput2 = document.getElementById("i_text");
                    let nume2 = elemInput2.value.toString();
                    let elemInput3 = document.getElementById("i_rad1");
                    let curier = elemInput3.checked.toString();
                    let elemInput4 = document.getElementById("i_sel_simplu");
                    let categorie = elemInput4.value.toLowerCase();
                    let optiuni = document.getElementById("i_sel_multiplu").options;		
                    let sir="";
                    for(let opt of optiuni){
                            if(opt.selected)
                            sir+=opt.value+" ";
                    }
                    sir = sir.toLowerCase();
                    let elemInput6 = document.getElementById("i_check1");
                    let livraare = elemInput6.checked.toString();
                    let elemInput7 = document.getElementById("i_textarea")
                    let textaree = elemInput7.value;

                    let produse = document.getElementsByClassName("produse");
                    for (let prod of produse){
                            prod.style.display = "none";               
                            let pret = parseInt(prod.getElementsByClassName("val-pret")[0].innerHTML)
                            var conditie1 = pret < pretMax;
                            let nume1 = prod.getElementsByClassName("val-nume")[0].innerHTML.toString();
                            var conditie2 = nume1.toLowerCase().includes(nume2);
                            // let curier1 =  prod.getElementsByClassName("val-posta")[0].innerHTML.toString();
                            // var conditie3 = (curier1 == curier);
                            let categor = prod.getElementsByClassName("val-categorie")[0].innerHTML.toString();
                            var conditie4 = (categor == categorie);
                            let culor = prod.getElementsByClassName("val-culoare")[0].innerHTML.toString();
                            var conditie5 = sir.includes(culor);
                            let dimensiune =  prod.getElementsByClassName("val-dimensiune")[0].innerHTML.toString();
                            var conditie6 = (dimensiune == dimens)
                            let textareaa =  prod.getElementsByClassName("val-descriere")[0].innerHTML.toString();
                            var conditie7 = textareaa.includes(textaree)
                        
                            let conditieTotala = conditie1 && conditie2 && conditie4 && conditie5 && conditie7;
                            if (conditieTotala){
                                prod.style.display="block";}
                    }
                }

                boot = document.getElementById("reseteaza");
                boot.onclick=function(){
                    let produse = document.getElementsByClassName("produse");
                    for (let prod of produse){
                            prod.style.display = "block";   }
                }
            }

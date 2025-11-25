const p1=document.querySelector('#p1')
const first="Hello, i am Mohit";
const second="You are watching my Portfolio"
let a=true,b=0,c=false,d=false,e=0,f=false;
setInterval(function(){
        if(a==true){
            p1.innerHTML=p1.innerHTML+first[b];
            b++;
        }if(b==first.length){
            a=false;
            c=true
        }if(c==true){
            setTimeout(function(){
                p1.innerHTML=p1.innerHTML.slice(0,-1);
                b--;
                if(b==0){
                    c=false;
                    d=true;
                }
            },104)
        }if(d==true){
            p1.innerHTML=p1.innerHTML+second[e];
            e++;
        }if(e==second.length){
            d=false;
            f=true;
        }if(f==true){
            setTimeout(function(){
                p1.innerHTML=p1.innerHTML.slice(0,-1);
                e--;
                if(e==0){
                    f=false;
                    a=true;
                }
            },104)
        }
},105);



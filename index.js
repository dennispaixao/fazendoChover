
const RangeTamMin = document.querySelector("#range-tamanho-bolinha-min");
const RangeTamMax = document.querySelector("#range-tamanho-bolinha-max");
const VelocidadeQueda = document.querySelector("#range-velocidade-queda");
const VelocidadeCriacao = document.querySelector("#range-velocidade-criacao");
const min = parseInt(localStorage.getItem("minBolSize"));
const max = parseInt(localStorage.getItem("maxBolSize"));
const spCreation = localStorage.getItem("speedBolCreation");
const spFalling = localStorage.getItem("speedFalling");
RangeTamMin.value = min;
RangeTamMax.value = max;
VelocidadeCriacao.value =  parseInt(VelocidadeCriacao.getAttribute('max'))-spCreation ;
VelocidadeQueda.value =  parseInt(VelocidadeQueda.getAttribute('max'))-spFalling ;
const configuracao = {
    minBolSize: min?min:10,//tamanho minimo das bolas
    maxBolSize: max?max:10,//tamanho máximo das bolas em px
    turnos: 0, // quantidade de turnos 0 para infinito
    qtBolPerTime: 1, //quantidade de bolas criadas ao mesmo tempo
    speedBolCreation: spCreation?spCreation:100,//,//velocidade de criaçao das bolas em ms
    speedFalling:spFalling?spFalling:10,//velocidade da queda em ms
    speedWind:1,//velocidade do vento 
    windChance:10, //quanto maior o numero menor a chance de ventar
    speedBolDissapear:1000, //tempo até desaparecer depois que chega no chão
    colors:{
         //colors rgb de 0 a 255 para setar as colors das bolinhas
        r:{
            min:0,
            max:255
        },
        g:{
            min:0,
            max:255
        },
        b:{
            min:0,
            max:255
        }
    }  

}

const canvas = document.querySelector('.Canvas');

function pingoDeChuva() {
   
    var windowWidth = canvas.clientWidth;
    var windowHeight = canvas.clientHeight;


    const gota = document.createElement('div');
    gota.setAttribute('class', 'gota');
    var size = Math.floor(Math.random() * (configuracao.maxBolSize - configuracao.minBolSize) + configuracao.minBolSize);
    var maxWidth = windowWidth - size;

    var r = Math.floor(Math.random() * (configuracao.colors.r.max - configuracao.colors.r.min) + configuracao.colors.r.min);
    var g = Math.floor(Math.random() * (configuracao.colors.g.max - configuracao.colors.g.min) + configuracao.colors.g.min);
    var b = Math.floor(Math.random() * (configuracao.colors.b.max - configuracao.colors.b.min) + configuracao.colors.b.min);
   

    gota.style.width = size + 'px';
    gota.style.height = size + 'px';
    var posX = Math.floor(Math.random() * (maxWidth - 0) + 0);
    gota.style.marginLeft = posX + "px";
    gota.style.marginTop = `-${size}px`;

    canvas.appendChild(gota)

    gota.style.background = `rgb(${r},${g},${b})`;
    (async () => {

        let marginTopGota = 0;
        let marginLeftGota = 0;
        let incMarginTop = 10;
        while (await new Promise(resolve => setTimeout(() => resolve(true), configuracao.speedFalling))
            + true) {

                //para remover a gota se ultrapassar a tela a direita
            if (parseInt(gota.style.marginLeft.split('p')[0]) + marginLeftGota > maxWidth) {
                gota.remove();
            }
            //para que a gota seja se mova até exatamente o final da tela
            if(marginTopGota+size+incMarginTop>windowHeight){
                marginTopGota +=  windowHeight - (marginTopGota+size);
                gota.style.marginTop = marginTopGota + 'px';
                break;
            }else{
                marginTopGota += incMarginTop;
                gota.style.marginTop = marginTopGota + 'px';
            }
           
            //para o efeito de vento
            let v = Math.round(Math.random() * (configuracao.windChance - 0) + 0) >= 1 ? 0 : configuracao.speedWind;
            marginLeftGota += v;
            let marginLeftRight = (parseInt(gota.style['marginLeft'].split('p')[0]));
            gota.style['marginLeft'] = (marginLeftRight + marginLeftGota) + 'px';
        }

        //para sumir com a gota
        setTimeout(function(){gota.remove()}, configuracao.speedBolDissapear);

    })();





}

function criaGotas(){
    for (let i = 0; i < configuracao.qtBolPerTime; i++) {
        pingoDeChuva();
    }
}

async function chover() {
    if (configuracao.turnos == 0) {
        setInterval(function(){
            
            criaGotas()
        }, configuracao.speedBolCreation);
        
    } else {
        let i = 0;
        while (await new Promise(resolve => setTimeout(() => resolve(i++), configuracao.speedBolCreation)) < configuracao.turnos) {
           criaGotas();
        }

    }
};

chover();
RangeTamMin.addEventListener("click",()=>{
 configuracao.minBolSize = parseInt(RangeTamMin.value);

 localStorage.setItem("minBolSize", RangeTamMin.value);

})

RangeTamMax.addEventListener("click",()=>{
    configuracao.maxBolSize = parseInt(RangeTamMax.value);
    localStorage.setItem("maxBolSize", RangeTamMax.value);

   })
VelocidadeQueda.addEventListener("click",()=>{
    let velocidade =parseInt(VelocidadeQueda.value);
    let max = parseInt(VelocidadeQueda.getAttribute('max'))
    configuracao.speedFalling =max-velocidade;
    localStorage.setItem("speedFalling", max-velocidade);


   
   })
VelocidadeCriacao.addEventListener("click",()=>{
    let velocidade =parseInt(VelocidadeCriacao.value);
    let max = parseInt(VelocidadeCriacao.getAttribute('max'))
    configuracao.speedBolCreation =max-velocidade;
    localStorage.setItem("speedBolCreation", max-velocidade);

    window.location.href = '';
    
   
   })   


   


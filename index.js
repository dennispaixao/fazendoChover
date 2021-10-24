
const configuracao = {
    minBolSize: 3,//tamanho minimo das bolas
    maxBolSize: 30,//tamanho máximo das bolas em px
    turnos: 0, // quantidade de turnos 0 para infinito
    qtBolPerTime: 1, //quantidade de bolas criadas ao mesmo tempo
    speedBolCreation: 100,//velocidade de criaçao das bolas em ms
    speedFalling:100,//velocidade da queda em ms
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

function pingoDeChuva(minBolSize, maxBolSize) {
   
    var windowWidth = canvas.clientWidth;
    var windowHeight = canvas.clientHeight;


    const gota = document.createElement('div');
    gota.setAttribute('class', 'gota');
    var size = Math.floor(Math.random() * (maxBolSize - minBolSize) + minBolSize);
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
        let incMarginTop = 20;
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
            let v = Math.round(Math.random() * (configuracao.windChance - 0) + 0) >= 1 ? 0 : configuracao.speedWind;//random de 0 e 1
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
        pingoDeChuva(configuracao.minBolSize, configuracao.maxBolSize);
    }
}

(async () => {
    if (configuracao.turnos == 0) {
        setInterval(function(){criaGotas()}, configuracao.speedBolCreation);
  
    } else {
        let i = 0;
        while (await new Promise(resolve => setTimeout(() => resolve(i++), configuracao.speedBolCreation)) < configuracao.turnos) {
           criaGotas();
        }

    }
})();

s


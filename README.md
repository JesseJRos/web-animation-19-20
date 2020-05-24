# web-animation-19-20

# Kunstwerk
![](https://thomasmatthewlong.files.wordpress.com/2017/02/cassandre-lintrans-1925.jpg)

> Artist: Adolphe 'Cassandre' Mouron | Year: 1925 | Research: [Rennart.co.uk](https://www.rennart.co.uk/website.pdfs/CassandrePoster.pdf)

Deze poster werd door Cassandre ontworpen voor de Franse krant 'L'intransigeant'. De krant wilde een ontwerp met als bericht dat zij een intelligente gebundelde werk-kracht zijn die snel nieuws leveren en die mensen kunnen vertrouwen. Ik.. zie zelf toch iets minder betrouwbaar of snel en meer, een man die schreeuwt omdat hij informatie in zijn hoofd krijgt gepropt.

Het profiel shot van de man beeld een krantenjongen af die de headlines van de dag verkondigd op straat. De bruine balk en witte 'figuren' is een telegraafpaal met keramische insulatoren er aan vast. En de lijnen zijn dus telegraaflijnen die zijn verbonden met wat de krantenjongen roept. Het kunstwerk sprak mij allereerst aan omdat hij vrij creepy oogde. Ik verwachtte een grimmig propaganda-achtig verhaal hier achter. Maar dat is dus niet het geval. Dit neemt echter niet weg dat ik dit er toch van wilde maken voor deze opdracht :)

# Werkwijze
## Concept
Ik wilde met deze opdracht vooral zoveel mogelijk verschillende animaties toe passen en het hoefde van mij niet per se een verhaal te volgen of zich binden aan 1 thema. Ik heb hier en daar wel wat creepy-ish dingen er in omdat ik naar het kunstwerk bleef kijken door een 'het is propaganda!' lens

Vervolgens heb ik het artwork geopend in Illustrator en nagemaakt om hem vervolgens te exporteren als SVG. Deze heb ik toen in mijn HTML/CSS gezet en opgeschoond.

<img width="2787" alt="createSVGcode" src="https://user-images.githubusercontent.com/37974966/82752912-bdfdd780-9dc1-11ea-883e-e48be3e597e1.png">

## De omgeving
Toen de SVG eenmaal was opgeschoond en alles klaar stond in de code was de omgeving nog erg kaal. Enkel een SVG op een zwarte achtergrond. Ik wilde dit veranderen om het aantrekkelijker te maken. Ik vind dat het kunstwerk iets abstracts heeft en ik vind dat hij best past in een museum. Vandaar dus de gekozen background in de volgende iteratie van het kunstwerk. Ik heb de achtergrond, de lijst en het naam kaartje bij elkaar gezocht en compleet gemaakt in Photoshop. Ik vond de kleuren zoals ze in het oorspronkelijke kunstwerk zijn niet meer goed passen. Dus ben ik gaan spelen met verschillende kleur combinaties en ik kwam uit op dit retro-achtige kleurenpalet. Hier was ik tevreden mee en vanuit dit punt ben ik gaan werken aan animaties.

<img width="1440" alt="Screenshot 2020-05-24 at 14 10 08" src="https://user-images.githubusercontent.com/37974966/82753741-513a0b80-9dc8-11ea-9862-f361cb8437c0.png">

# Interacties
## Eye tracking
Vanuit hier ben ik eerst begonnen met de moeilijkste klus die ik voor *ogen* had. Een cursor tracking animatie. Ik wilde het oog in de SVG de muis laten volgen. Ik heb hier ongeveer 2 hele dagen aan gewerkt en aan het einde geschrapt omdat ik het simpelweg niet voor elkaar keeg en ik mij realiseerde dat het niet alleen te veel tijd vergde maar ook dat ik veel meer met JavaScript aan het doen was en niet zo zeer CSS, en dat het dus waarschijnlijk niet een groot verlies zou zijn voor dit vak als ik het niet meer zou doen.

![eyeFollowBAD](https://user-images.githubusercontent.com/37974966/82753461-1b942300-9dc6-11ea-81ae-ac3780022aad.gif)

Het oogbal bleef alleen binnen het oog oppervlakte als ik de code hieronder in de hoofd SVG plaatste als `<g>` maar dan werkte de JavaScript niet meer omdat deze niet individuele groups binnen een SVG kan targeten.

```html
<svg class="eye">
    <circle cx="225" cy="65" r="50" class="eyeball" />
    <circle cx="225" cy="65" r="30" class="pupil" />
</svg>
```

```js
var eyeBall = document.querySelector(".eyeball"),
    pupil = document.querySelector(".pupil"),
    eyeArea = eyeBall.getBoundingClientRect(),
    pupilArea = pupil.getBoundingClientRect(),
    R = eyeArea.width/20,
    r = pupilArea.width/20,
    centerX = eyeArea.left,
    centerY = eyeArea.top;

document.addEventListener("mousemove", (e)=>{
  var x = e.clientX - centerX,
      y = e.clientY - centerY,
      theta = Math.atan2(y,x),
      angle = theta*180/Math.PI + 360;
      pupil.style.transform = `translateX(${R - r +"px"}) rotate(${angle + "deg"})`;
      pupil.style.transformOrigin = `${r +"px"} center`;
});
```

Uiteindelijk heb ik er voor gekozen om het pupil te laten pulseren wanneer je er over heen gaat met je muis. Om dit effectief te doen heb ik gebruik gemaakt van de pseudo-class `:not(:hover)`. Als ik de normale `:hover` zou gebruiken wrd de animatie enkel getriggered als je muis het pupil aanraakt, dus dit zou niet mooi werken. De `:not(:hover)` zorgt er voor dat de animatie triggered wanneer de class registreert dat je er over heen hebt gehoverd, dus wanneer je hem niet meer aanraakt.

```html
<g>
  <circle class="pupil" cx="225" cy="65" r="1.3%"/>
</g>
```

```css
.pupil:not(:hover){
  animation-name: pupilEnlargement;
  animation-duration: 1s;
}

@keyframes pupilEnlargement {
  0% {
    r: 1.3%;
  }
  50% {
    r: 2%;
  }
  100% {
    r: 1.3%;
  }
}
```

In de CSS animatie `<pupilEnlargement>` heb ik gewerkt met de radius van de SVG cirkel. Deze vergroot en verkleint. Een kleine maar effectieve animatie dus.

![pupil](https://user-images.githubusercontent.com/37974966/82755956-52bf0000-9dd7-11ea-8053-a5b402bb2f33.gif)

## Drag the peeps
Ik wilde iets doen met de figuren aan de rechter kant van de bar. Mijn idee was dat deze figuren van alles vertellen aan de persoon in het artwork, vandaar dat hij schreeuwt. De lijnen lopen door de figuren naar het oor van de persoon. Dus ik bedacht om deze onderdelen van het SVG naar het oor toe te slepen en ze dan te laten verdwijnen. Dit is me gelukt met behulp van de Greensock Draggable en TweenMax libraries. Ik had nog niet eerder met libraries gewerkt dus dit vond ik interessant om te doen. In de sources onderaan mijn documentatie staat de video die me heeft geholpen om deze interactie aan de praat te krijgen. De draggable library zorgt ervoor dat SVG elementen verplaatst kunnen worden en de TweenMax library laat je animeren binnen in JavaScript functions. 

![dragThePeeps](https://user-images.githubusercontent.com/37974966/82754257-0c17d880-9dcc-11ea-9393-c760372e4ba1.gif)

Door de <draggable> class aan het path van de SVG <g> te geven en te werken met scaling, opacity en svgOrigin van de figuren lijkt het alsof ze verdwijnen in het oor van de persoon.

```html
 <g id="peopleRight dragSVG">
   <path class="draggable peopleRight1" d="M132.1,46.46V46h0a12.08,12.08,0,0,0-5.19-9.44,7,7,0,0,0,.28-2,7.34,7.34,0,0,0-14.67,0,7.08,7.08,0,0,0,.33,2.17A12.08,12.08,0,0,0,107.92,46h0V59.7h24.2V46.46Z" transform="translate(3.02 2.47)"/>
   <path class="draggable peopleRight2" d="M132.1,97v-.5h0A12.08,12.08,0,0,0,126.89,87a7,7,0,0,0,.28-2,7.34,7.34,0,0,0-14.67,0,7.08,7.08,0,0,0,.33,2.17,12.08,12.08,0,0,0-4.91,9.23h0V110.2h24.2V97Z" transform="translate(3.02 2.47)"/>
   <path class="draggable peopleRight3" d="M132.1,146.16v-.5h0a12.08,12.08,0,0,0-5.19-9.44,7,7,0,0,0,.28-2,7.34,7.34,0,0,0-14.67,0,7.08,7.08,0,0,0,.33,2.17,12.08,12.08,0,0,0-4.91,9.23h0V159.4h24.2V146.16Z" transform="translate(3.02 2.47)"/>
   <path class="draggable peopleRight4" d="M132.1,194.66v-.5h0a12.08,12.08,0,0,0-5.19-9.44,7,7,0,0,0,.28-2,7.34,7.34,0,0,0-14.67,0,7.08,7.08,0,0,0,.33,2.17,12.08,12.08,0,0,0-4.91,9.23h0V207.9h24.2V194.66Z" transform="translate(3.02 2.47)"/>
</g>
```

```js
Draggable.create(".draggable", {
     bounds:"svg",
     onDrag: function() {
         if(this.hitTest("#ear")){
             TweenLite.to(this.target, 1, {opacity:0, scale:0, svgOrigin:"195px 110px"})
         }
     }
 });
```

## Big Red Doom Button
In het kader van een duister bericht achter het kunstwerk wilde ik een 'big red button' toevoegen die de *ware aard* van het kunstwerk zou laten zien. Wanneer je op deze knop drukt verandert het kunstwerk drastisch en zie je verschillende animaties aan het werk. Allereerst moest ik een knop aanmaken met een <if> <else> statement. De knop luistert naar een <'click'> en verwijdert classes wanneer hij word triggered. Hij verwijdert de <.buttonStart> class en maakt de <.artFlames> hidden. Ik verwijderde de <.artFlames> niet omdat dit een .gif is die constant afspeelt op de website, anders zou je de gif zien starten en dat vond ik minder mooi.

![DoomArt](https://user-images.githubusercontent.com/37974966/82755090-bd6d3d00-9dd1-11ea-86bc-91f148a51ce2.gif)

```css
.buttonStart {
  filter: invert(1);
  background: linear-gradient(0deg, #ffffff, #b9927d);
  background-size: 400% 400%;
  animation: artDoomed 3s ease infinite;
}

.hidden {
  display: none;
}

.artFlames {
  position: absolute;
  width: 56%;
  margin-top: 7.9em;
  margin-left: 20em;
  animation: flames 5s ease;
  z-index: 1;
}

@keyframes artDoomed {
  0% {background-position:51% 0%;}
  50% {background-position:50% 100%}
  100% {background-position:51% 0%}
}

@keyframes flames {
  0% {opacity: 0;}
  100% {opacity: 1;}
}
```

```js
document.getElementById("redButtonClick").addEventListener("click", activateRedButton);

function activateRedButton(){
    var svgArtWork = document.getElementById("svg");
    var fire = document.getElementById("artFlames");

    if (svgArtWork.classList.contains('buttonStart')) {
        svgArtWork.classList.remove("buttonStart");
        fire.classList.add("hidden");
    } else {
        svgArtWork.classList.add("buttonStart");
        fire.classList.remove("hidden");
    }
};
```

In de <.buttonStart> heb ik voor het eerst gewerkt met het <filter> property. Ik heb gespeeld met verschillende filters zoals <grayscale>, <blur> en <sepia> maar voor het ultieme verdoemenis effect vond ik de <invert> filter toch wel het meest gepast. 
Ook zie je hier dat ik de achtergrond heb geanimeerd. De gradient op de achtergrond beweegt langzaam omhoog door middel van <background-position> 

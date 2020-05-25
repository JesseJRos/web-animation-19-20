# web-animation-19-20

# Kunstwerk
![](https://thomasmatthewlong.files.wordpress.com/2017/02/cassandre-lintrans-1925.jpg)

> Artist: Adolphe 'Cassandre' Mouron | Year: 1925 | Research: [Rennart.co.uk](https://www.rennart.co.uk/website.pdfs/CassandrePoster.pdf)

Deze poster werd door Cassandre ontworpen voor de Franse krant 'L'intransigeant'. De krant wilde een ontwerp met als bericht dat zij een intelligente gebundelde werk-kracht zijn die snel nieuws leveren en die mensen kunnen vertrouwen. Ik.. zie zelf toch iets minder betrouwbaar of snel en meer, een man die schreeuwt omdat hij informatie in zijn hoofd krijgt gepropt.

Het profiel van de persoon beeld een krantenjongen af die de headlines van de dag verkondigd op straat. De bruine balk en witte 'figuren' is een telegraafpaal met keramische insulatoren er aan vast. En de lijnen zijn dus telegraaflijnen die zijn verbonden met wat de krantenjongen roept. Het kunstwerk sprak mij allereerst aan omdat hij vrij creepy oogde. Ik verwachtte een grimmig propaganda-achtig verhaal hier achter. Maar dat is dus niet het geval. Dit neemt echter niet weg dat ik dit er toch van wilde maken voor deze opdracht :)

# Controls cheatseet
| Control | Target | Action |
| ------- |:------:| --------:|
| `1 Key` | Figure left top | Animate guy 1 |
| `2 Key` | Figure left mid | Animate guy 2 |
| `3 Key` | Figure left bottom | Animate guy 3 |
| `Click` | Big red button | Alternate art |
| `Hover` | Eyeball | Pulse the pupil |
| `Drag` | All figures right | Disappear into ear |
| `Long Press` | Facemask | Reveal his truth |
| `Hover` | All lines | Strum them all |

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

Uiteindelijk heb ik er voor gekozen om het pupil te laten pulseren wanneer je er over heen gaat met je muis. Om dit effectief te doen heb ik gebruik gemaakt van de pseudo-class `:not(:hover)`. Als ik de normale `:hover` zou gebruiken word de animatie enkel getriggered als je muis de pupil aanraakt, dus dit zou niet mooi werken. De `:not(:hover)` zorgt er voor dat de animatie triggered wanneer de class registreert dat je er over heen hebt gehoverd, dus wanneer je hem niet meer aanraakt.

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

In de CSS animatie `pupilEnlargement` heb ik gewerkt met de radius van de SVG cirkel. Deze vergroot en verkleint. Een kleine maar effectieve animatie dus.

![pupil](https://user-images.githubusercontent.com/37974966/82755956-52bf0000-9dd7-11ea-8053-a5b402bb2f33.gif)

## Drag the peeps
Ik wilde iets doen met de figuren aan de rechter kant van de bar. Mijn idee was dat deze figuren van alles vertellen aan de persoon in het artwork, vandaar dat hij schreeuwt. De lijnen lopen door de figuren naar het oor van de persoon. Dus ik bedacht om deze onderdelen van het SVG naar het oor toe te slepen en ze dan te laten verdwijnen. Dit is me gelukt met behulp van de Greensock Draggable en TweenMax libraries. Ik had nog niet eerder met libraries gewerkt dus dit vond ik interessant om te doen. In de sources onderaan mijn documentatie staat de video die me heeft geholpen om deze interactie aan de praat te krijgen. De draggable library zorgt ervoor dat SVG elementen verplaatst kunnen worden en de TweenMax library laat je animeren binnen in JavaScript functions. 

![dragThePeeps](https://user-images.githubusercontent.com/37974966/82754257-0c17d880-9dcc-11ea-9393-c760372e4ba1.gif)

Door de <draggable> class aan het path van de SVG `<g>` te geven en te werken met scaling, opacity en svgOrigin van de figuren lijkt het alsof ze verdwijnen in het oor van de persoon.

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

## 1, 2 and 3 moving guys
Omdat ik de rechter figuurtjes heb laten bewegen kan ik de linker 3 natuurlijk niet achter laten. Op deze figuren wilde ik de keyboard event toepassen. Ze hebben alle drie een andere animatie en zijn ten alle tijden te stoppen waarna ze weer terug gaan naar de originele plek. Je kunt ze besturen door de nummer toetsen **1, 2 & 3** in te drukken.

![123guys](https://user-images.githubusercontent.com/37974966/82758913-bce0a080-9de9-11ea-92c4-d1e6c38cfd2b.gif)

### Guy #1
```css
.personToggle1 {
  fill: hotpink;
  animation: wiggleBoi 0.8s infinite;
  }

@keyframes wiggleBoi {
  0% {
      transform: translateY(0) rotate(0);
      transform-origin: 50% 50%;
  }
  15% {
      transform: translateY(-30px) rotate(6deg);
  }
  30% {
      transform: translateY(15px) rotate(-6deg);
  }
  45% {
      transform: translateY(-15px) rotate(3.6deg);
  }
  60% {
      transform: translateY(9px) rotate(-2.4deg);
  }
  75% {
      transform: translateY(-6px) rotate(1.2deg);
  }
  100% {
      transform: translateY(0) rotate(0);
      transform-origin: 50% 50%;
  }
}
```
```js
var peopleLeft1 = document.querySelector('.personLeft1');

window.addEventListener("keydown", animationStart1);

function animationStart1(e) {

    var keyCode = e.keyCode;
    if (keyCode === 49) {
        peopleLeft1.classList.toggle('personToggle1');   
};
};
```
Op het bovenste figuur heb ik een animatie gezet die op en neer wiggled. Deze laat ik oneindig doorgaan en hij gaat elke keer weer terug naar zijn originele positie. In het stukje JavaScript heb ik een `addEventListener` op de `window` geplaatst omdat het niet werkte om deze op de SVG zelf te zetten. De `EventListener` luisterd naar een `keydown` en start vervolgens de `animationStart1`. In deze function zeg ik dat als de `e.keyCode`, die word herkent door de `EventListener`, gelijk is aan 49 (dit is het nummer 1) dan toggled hij tussen classes voor de class `.personLeft1`. En in deze toggle class zit de animatie die word afgespeeld. Dit is het zelfde voor figuurtje 2 en 3 dus hier laat ik enkel de CSS code van zien.

### Guy #2
```css
.personToggle2 {
  animation: spinnyBoi 5s ease-in-out;
}

@keyframes spinnyBoi {
  0% {
    transform: scale(auto);
    fill: rgb(255, 255, 98);
  }
  10% {
    transform: scale(0.25);
    transform: translateX(500);
    transform: rotate(45deg);
    fill: rgb(252, 220, 38);
  }
  20% {
    transform: scale(0.50);
    fill: rgb(195, 255, 98);
  }
  30% {
  transform: scale(0.40);
  transform: rotate(0deg);
  fill: rgb(255, 135, 98);
  }
  40% {
  transform: scale(0.60);
  fill: rgb(98, 255, 229);
  }
  50% {
  transform: scale(0.65);
  transform: rotate(90deg);
  fill: rgb(255, 98, 216);
  }
  60% {
  transform: scale(0.50);
  fill: rgb(98, 255, 137);
  }
  70% {
  transform: scale(0.75);
  fill: rgb(255, 161, 98);
  }
  80% {
  transform: scale(0.30);
  }
  90% {
  transform: scale(0.25);
  }
  100% {
    transform: scale(auto);
    fill: rgb(255, 255, 98);
  }
}
```
### Guy #3
```css
.personToggle3 {
  animation: shyBoi 5s ease-in-out;
}

@keyframes shyBoi {
  0% {
    transform: translateY(auto);
    transform: translateX(auto);
    fill: limegreen;
  }
  10% {
    transform: translateY(150px);
    transform: translateX(30px);
  }
  30% {
    transform: translateX(10px);
    transform: rotate(-2deg);
  }
  44% {
    transform: translateX(10px);
    transform: rotate(-2deg);
    transform: rotate(-6deg);
  }
  47% {
    transform: translateY(150px);
  }
  60% {
    transform: translateY(50px);
    fill: limegreen;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(auto);
    transform: translateX(auto);
    opacity: 1;
    fill:url(#linear-gradient-15);
  }
}
```

Bij deze laatste heb ik gespeeld met een beetje karakter te geven aan het figuurtje. Hij verdwijnt achter de bar, kijkt verlegen om het hoekje en verdwijnt ineens veel sneller waarna hij weer met z'n gewone kleur terug komt vanuit een andere kant. Ik heb hiervoor met de X en Y waardes gewerkt van het SVG figuur. En heb met de % alles zo goed mogelijk getimed.

## Big Red Doom Button
In het kader van een duister bericht achter het kunstwerk wilde ik een 'big red button' toevoegen die de *ware aard* van het kunstwerk zou laten zien. Wanneer je op deze knop drukt verandert het kunstwerk drastisch en zie je verschillende animaties aan het werk. Allereerst moest ik een knop aanmaken met een `if` `else` statement. 

De knop luistert naar een `'click'` en heeft uit zichzelf geen .`buttonStart` class en `.artFlames` is op hidden gezet door `.hidden`. Wanneer je op de knop klikt checked de functie `activateRedButton` of de SVG een `.buttonStart` class bevat. Als dat niet zo is voegt hij deze toe en verwijdert hij de .hidden class van `.artFlames` zodat je deze kan zien. Als je op de knop klikt en hij heeft wel de `.buttonStart` class dan verwijdert hij deze weer en zet hij de `.artFlames` weer op hidden.

Ik verwijderde de `.artFlames` niet omdat dit een .gif is die constant afspeelt op de website, anders zou je de gif zien starten en dat vond ik minder mooi.

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

In de `.buttonStart` heb ik voor het eerst gewerkt met het `filter` property. Ik heb gespeeld met verschillende filters zoals `grayscale`, `blur` en `sepia` maar voor het ultieme verdoemenis effect vond ik de `invert` filter toch wel het meest gepast. 
Ook zie je hier dat ik de achtergrond heb geanimeerd. De gradient op de achtergrond beweegt langzaam omhoog door middel van `background-position` 

## Telegraph lines
De lijnen in het kunstwerk zijn door de kunstenaar bedacht als telegraaf lijnen. Hierdoor kwam ik op het idee om ze ook zo te animeren. Ik wilde het laten lijken alsof je met je hand langs hele slappe gitaar snaren gaat en ze bungelen nog even na. 

![telegraphLines](https://user-images.githubusercontent.com/37974966/82759682-33cc6800-9def-11ea-91ad-9c58f81ddaf1.gif)

```css
.lineOver1 { 
    stroke:url(#linear-gradient-19);
    stroke-miterlimit:10;
    stroke-width:3px;
}

.lineOver2 { 
    stroke:url(#linear-gradient-21);
    stroke-miterlimit:10;
    stroke-width:3px;
}

.lineOver3 { 
    stroke:url(#linear-gradient-23);
    stroke-miterlimit:10;
    stroke-width:3px;
}

.lineOver4 { 
    stroke:url(#linear-gradient-24);
    stroke-miterlimit:10;
    stroke-width:3px;
} 

.lineOver1:not(:hover) {
  animation: wiggleLines 1.8s ease;
}

.lineOver2:not(:hover) {
  animation: wiggleLines 1.8s ease;
}

.lineOver3:not(:hover) {
  animation: wiggleLines 1.8s ease;
}

.lineOver4:not(:hover) {
  animation: wiggleLines 1.8s ease;
}

@keyframes wiggleLines {
  0% {
    transform: translateY(0) rotate(0);
    transform-origin: 50% 50%;
  }
  15% {
    transform: translateY(-1.3px) translateX(0.5px) rotate(1.2deg);
  }
  30% {
    transform: translateY(1.2px) translateX(1px) rotate(-1deg);
  }
  45% {
    transform: translateY(-1px) translateX(0.5px) rotate(0.5deg);
  }
  60% {
    transform: translateY(1px) translateX(1px) rotate(-0.6deg);
  }
  75% {
    transform: translateY(-0.5px) translateX(0.5px) rotate(0.3deg);
  }
  100% {
    transform: translateY(0) rotate(0);
    transform-origin: 50% 50%;
  }
}
```

Alle lijnen in de SVG zijn opgedeeld in `lineOver` en `lineUnder` omdat er een perspectief is met de bar die deze scheid. Ook bij deze classes heb ik de pseudo-class `:not(:hover)` gebruikt om de animaties te triggeren *nadat* je met je muis erover heen gaat. Door de X en Y as te transformen en daarbij de SVG lijnen te rotaten creeër ik dit wiggle-achtige effect waardoor het lijkt als je met je muis langs slappe draden gaat.

Ik heb een soortgelijke animatie toegepast op de lijnen die uit de mond van de persoon komen.

![mouthBeams](https://user-images.githubusercontent.com/37974966/82760351-4052bf80-9df3-11ea-9ff3-36e0b272368d.gif)

```css
.mouthBeam1 {
    stroke:url(#linear-gradient-2);
    stroke-miterlimit:10;
    stroke-width:3px;
}

.mouthBeam2 {
    stroke:url(#linear-gradient-4);
    stroke-miterlimit:10;
    stroke-width:3px;
}

.mouthBeam3 {
    stroke:url(#linear-gradient-6);
    stroke-miterlimit:10;
    stroke-width:3px;
}

.mouthBeam1:not(:hover) {
  animation: wiggleBeams 1.8s ease;
}

.mouthBeam2:not(:hover) {
  animation: wiggleBeams 1.8s ease;
}

.mouthBeam3:not(:hover) {
  animation: wiggleBeams 1.8s ease;
}

@keyframes wiggleBeams {
  0% {
            transform: translateY(0) rotate(0);
            transform-origin: 50% 50%;
            stroke-width: 3px;
  }
  15% {
            transform: translateY(-1.5px) rotate(2.5deg);
            stroke-width: 10px;
            stroke: rgba(255, 196, 0, 0.8);
  }
  30% {
            transform: translateY(2.5px) rotate(-1.5deg);
            stroke-width: 12px;
  }
  45% {
            transform: translateY(-2.5px) rotate(0.9deg);
            stroke-width: 10px;
  }
  60% {
            transform: translateY(1.75px) rotate(-0.6deg);
            stroke-width: 3px;
            stroke: rgba(255, 196, 0, 0.8);
  }
  75% {
            transform: translateY(-1.5px) rotate(0.3deg);
  }
  100% {
    transform: translateY(0) rotate(0);
    transform-origin: 50% 50%;
  }
}
```

Hier heb ik ook nog de kleur en de `stroke-width` van de lijnen laten veranderen in de animatie omdat ik deze wilde over laten komen als beams. Alsof de persoon alle informatie er uit spuwt in een soort powerbeam.

## Drop the mask
In deze interactie laat ik het ware gezicht zien van de *"onschuldige"* krantenjongen zoals Cassandre hem bedoelt had. Wanneer je op het masker klikt, en ingedrukt houd, valt het masker van het gezicht en zie je het echte gezicht van de persoon. Hieronder verschijnt een path SVG die rondbeweegt, alsof hij een soort Freddy Krueger achtig gezicht heeft. Brrr.

![faceReveal](https://user-images.githubusercontent.com/37974966/82760449-e7375b80-9df3-11ea-8fc4-f723bb930ec0.gif)

```css
.faceMask {
  fill:url(#noMaskGradient)
}

.faceMask2 {
  transform: translate(3.02px, 2.47px);
  fill:url(#maskGradient);
}

.faceMask2:active {
  transform: translate(30px, 120px) rotate(20deg);
  transition: 1s ease-in;
}

.underTheMask {
  stroke-dasharray: 50;
  animation: dash 15s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: 1000;
  }
}
```

Om dit effect voor elkaar te krijgen moest ik eerst een 2e versie van het masker maken. Ik heb de SVG laag gekopieerd en er een andere naam aan gegeven. Vervolgens heb ik deze met `transform:translate` op de juiste plek gezet en de `:active` state van dit masker een andere positie gegeven en hem 20 graden gedraaid, hier staat een 1s ease-in op endit zorgt voor het vallende effect.

Voor de rondkruipende lijnen onder het masker heb ik in Illustrator een path gemaakt die binnen de grenzen van het masker blijft. Deze heb ik vervolgens in de hoofd SVG geplaatst en de class `.underTheMask` gegeven. Omdat ik mijn path enkel met een stroke had gemaakt kon ik deze vervolgens gaan aanpassen in CSS. Met de `stroke-dasharray` zorg je voor gaps in het path en in de animatie heb ik gezegd dat hij naar `stroke-dashoffset: 1000` moet gaan waardoor hij dus rond gaat bewegen. Ik heb met de timing van de animatie gespeeld tot het naar mijn wens was.

# Responsiveness
Omdat ik een landscape kunstwerk heb vond ik het eerst vrij lastig om te bepalen hoe ik dit responsive ging maken. Ik besloot uiteindelijk om het kunstwerk 90 graden te draaien en de achtergrond te vullen met de achtergrondkleur van het kunstwerk. Het is niet helemaal wat ik wilde en er zit maar 1 breakpoint in maar, het werkt in ieder geval. Wanneer de window de rand van het kunstwerk aanraakt word het kunstwerk gedraaid met een transition en verdwijnen de mond beams terug in de mond, dit puur omdat ik deze niet mooi vond in deze positie. 

![responsiveness](https://user-images.githubusercontent.com/37974966/82760698-9a548480-9df5-11ea-9cf7-9e0bc8be027f.gif)

Ik had moeite met het scalen van de SVG zodat hij binnen het frame zou blijven die aan de muur hangt. De achtergrond heb ik als `cover` ingesteld op de `body` en dit werkt fijn en deze schaalt mee, maar de SVG kreeg ik niet perfect meegeschaald met de achtergrond. Vandaar dat de achtergrond nu wegvalt en de SVG blijft staan tot hij de rand raakt, waarna hij dus draait en geschikt voor mobile is.

Op mobile werken de meeste dingen. Je kan nog steeds de figuren draggen, op de lijnen tappen om ze te laten bewegen, het masker laten vallen en op het oog drukken om hem te laten pulseren. De dingen die zijn weggevallen zijn de rode knop en de 3 geanimeerde figuren die links van de bar staan.

# Bronnen
* [Animista](https://animista.net)
* [CSS Almanac](https://css-tricks.com/almanac/)
* [Greensock Draggable](https://greensock.com/docs/v2/Utilities/Draggable)
* [Greensock TweenMax](https://greensock.com/tweenmax/)
* [Draggable Video](https://www.youtube.com/watch?v=8yKRl-w1wfo)
* [No animations on load](https://stackoverflow.com/questions/27938900/how-to-prevent-css-keyframe-animation-to-run-on-page-load)

Draggable.create(".draggable", {
    bounds:"svg",
    onDrag: function() {
        if(this.hitTest("#ear")){
            TweenLite.to(this.target, 1, {opacity:0, scale:0, svgOrigin:"195px 110px"})
        }
    }
});
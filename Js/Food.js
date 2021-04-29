class Food {
    constructor() {
        this.image = loadImage("images/milk.png");
        this.foodStock = 0;
      this.lastFed;
    }
    display() {
        fill(255, 255, 254);
        textSize(15);
        if (lastFed>=12){
            text("Last Feed : "+ lastFed%12 + " PM", 350, 30);
       } else if(lastFed==0) {
            text("Last Feed : 12 AM", 350, 30);
        } else {
            text("Last Feed : "+ lastFed + " AM", 350, 30);
        } 
        var x=80;
        var y=100;
        imageMode(CENTER);
        if(this.foodStock!==0){
            for(var i=0; i<this.foodStock; i++) {
                if(i%10===0){
                    x=80;
                    y=y+50;
                }
                image(this.image, x, y, 50, 50);
                x=x+30;
            }
        }
    } 
    getFoodStock() {
        return this.foodStock;
    }
    updateFoodStock() {
        this.foodStock=foodStock;
    }
    deductFood() {
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }
    }
    getFedTime(lastFed){
        this.lastFed=lastFed;
    }
}
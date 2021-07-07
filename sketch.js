const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var watermelon;
var watermelonLink;
var backgroundImg,watermelonImg,rabbitImg;
var bunny;
var button;
var blink,eat,sad;

function preload(){
backgroundImg = loadImage("background.png");
watermelonImg = loadImage("melon.png");
rabbitImg = loadImage("Rabbit-01.png");
blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
blink.playing = true;
eat.playing = true;
eat.looping = false;
sad.looping = false;
sad.playing = true;
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  rope = new Rope(6,{x:245,y:30});

  var fruit_options = {
    density:0.001
  }
  watermelon = Bodies.circle(300,300,15,fruit_options);
  Matter.Composite.add(rope.body,watermelon);

  watermelonLink = new Link(rope,watermelon);

  bunny = createSprite(250,600,100,100);
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;
  bunny.addAnimation("blinking",blink);
  bunny.scale = 0.2;
  bunny.addAnimation("eating",eat);
  bunny.addAnimation("crying",sad);


  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  rectMode(CENTER);
  imageMode (CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  
  
}

function draw() 
{
   background(51);
   image(backgroundImg,width/2,height/2,500,700)
   ground.show();
   rope.show();
   if(watermelon != null){
     image(watermelonImg,watermelon.position.x,watermelon.position.y,60,60)
}
    
    if(collide(watermelon,bunny) == true){
      bunny.changeAnimation("eating");
    } 

    if(collide(watermelon,ground.body) == true){
       bunny.changeAnimation("crying");     
    }

    //d = dist(watermelon.position.x,watermelon.position.y,bunny.x,bunny.y);
   // console.log(d);

   Engine.update(engine);
  

   drawSprites();
   
}
function drop(){
   rope.break();
   watermelonLink.detach();
   watermelonLink = null;
}

function collide(body,sprite){
   if(body != null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    
   if(d <= 80){
     World.remove(engine.world,watermelon);
     watermelon = null;
     return true;
    }   
    else {
      return false;
    }
  }
}
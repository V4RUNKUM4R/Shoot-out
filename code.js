var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["8ad0c565-9463-411a-bec2-f5a251ae989a","d63757e6-ceb4-437f-9fd7-db72b6877a92","2b84f987-5cd0-4467-b410-af7445c1e0bf","002d8e67-a13e-4d4e-a4d0-947fc46b72e8","0dcc1bc0-6aec-4a6e-9590-d7cb2d540fd2"],"propsByKey":{"8ad0c565-9463-411a-bec2-f5a251ae989a":{"name":"space_1","sourceUrl":"assets/api/v1/animation-library/gamelab/qoFFPgWiydir6HZwldQy.Fmh8NmNhTI9/category_backgrounds/background_space.png","frameSize":{"x":400,"y":400},"frameCount":1,"looping":true,"frameDelay":1,"version":"qoFFPgWiydir6HZwldQy.Fmh8NmNhTI9","categories":["backgrounds"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":400},"rootRelativePath":"assets/api/v1/animation-library/gamelab/qoFFPgWiydir6HZwldQy.Fmh8NmNhTI9/category_backgrounds/background_space.png"},"d63757e6-ceb4-437f-9fd7-db72b6877a92":{"name":"animation_1","sourceUrl":null,"frameSize":{"x":398,"y":291},"frameCount":1,"looping":true,"frameDelay":12,"version":"qV3moRokZ9sKcbOpBc5XXT66WzftQCCo","loadedFromSource":true,"saved":true,"sourceSize":{"x":398,"y":291},"rootRelativePath":"assets/d63757e6-ceb4-437f-9fd7-db72b6877a92.png"},"2b84f987-5cd0-4467-b410-af7445c1e0bf":{"name":"animation_2","sourceUrl":null,"frameSize":{"x":3,"y":8},"frameCount":1,"looping":true,"frameDelay":12,"version":"fpOjpueyiXpvQBW5E3ClON6FzwOgxaHJ","loadedFromSource":true,"saved":true,"sourceSize":{"x":3,"y":8},"rootRelativePath":"assets/2b84f987-5cd0-4467-b410-af7445c1e0bf.png"},"002d8e67-a13e-4d4e-a4d0-947fc46b72e8":{"name":"ufo_1","sourceUrl":"assets/api/v1/animation-library/gamelab/1NW0s4FKF54T3qL3gQC5gOgETMnxEZZw/category_icons/ufo.png","frameSize":{"x":386,"y":267},"frameCount":1,"looping":true,"frameDelay":2,"version":"1NW0s4FKF54T3qL3gQC5gOgETMnxEZZw","categories":["icons"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":386,"y":267},"rootRelativePath":"assets/api/v1/animation-library/gamelab/1NW0s4FKF54T3qL3gQC5gOgETMnxEZZw/category_icons/ufo.png"},"0dcc1bc0-6aec-4a6e-9590-d7cb2d540fd2":{"name":"start.png_1","sourceUrl":null,"frameSize":{"x":820,"y":461},"frameCount":1,"looping":true,"frameDelay":12,"version":"IeXmC7qi2zqqlZoNLhzG3on557zxIXZ9","loadedFromSource":true,"saved":true,"sourceSize":{"x":820,"y":461},"rootRelativePath":"assets/0dcc1bc0-6aec-4a6e-9590-d7cb2d540fd2.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//creating sprites
var space = createSprite(200, 230, 10, 10);
space.setAnimation("space_1");
var laser = createSprite(200, 350, 10, 10);
laser.visible = false;
laser.setAnimation("animation_2");
var rocket = createSprite(200, 350,10,10);
rocket.setAnimation("animation_1");
rocket.scale=0.2;
var target = createSprite(200, 70,10,10);
target.setAnimation("ufo_1");
target.scale = 0.2;
var boundary1 = createSprite(200, 300,400,10);
boundary1.visible = false;
var boundary2 = createSprite(200, 30,400,10);
boundary2.visible = false;
var startkey = createSprite(200, 200);
startkey.setAnimation("start.png_1");
startkey.scale = 0.45;
//variables
var shootlaser="no";
var gamestate = "start";
var score = 0;
var life = 5;
function draw() {
  background("lightgreen");
  textSize(25);
  fill("yellow");
  stroke("blue");
  strokeWeight(3);
  text("life : "+life, 20, 25);
  text("Score : "+score,275,25);
  createEdgeSprites();
  target.bounceOff(edges);
  target.bounceOff(boundary1);
  target.bounceOff(boundary2);
  rocketmovement();
  shoot();
  lasermovement();
  points();
  gamestart();
  gameover();
  drawSprites();
}
function gamestart() {
  if (gamestate == "start") {
    if (keyDown(ENTER)) {
      move();
      gamestate = "play";
      laser.visible = true;
      startkey.visible = false;
    }
  }
}
function rocketmovement() {
  if (gamestate == "play") {
    if (keyDown("right")) {
      rocket.x = rocket.x + 3;
    } else {
      if (keyDown("left")) {
        rocket.x = rocket.x - 3;
      }
    }
  }
  
}
function shoot() {
  if (gamestate == "play") {
    if (shootlaser === "no") {
      if (keyDown("space")) {
        playSound("assets/Laser-pew-sound-effect.mp3", false);
        shootlaser = "yes";
      }
    }
  }
  
}
function lasermovement() {
  if (gamestate == "play") {
    if (shootlaser === "no") {
      laser.x=rocket.x;
      laser.y=rocket.y;
    }
    if (shootlaser == "yes") {
      laser.velocityY = -15;
      if (laser.isTouching(topEdge)) {
      shootlaser = "no";
      if (life > 0) {
        life = life - 1;
      }
      }
    }
  }
}
function points() {
  if (gamestate == "play") {
    if (shootlaser == "yes") {
      if (laser.isTouching(target)) {
        playSound("assets/mixkit-positive-interface-beep-221.mp3", false);
        target.x = randomNumber(20, 250);
        target.y = randomNumber(50, 250);
        shootlaser = "no";
        score = score + 1;
      }
    }
  }
}
function move() {
  target.velocityX = 4;
  target.velocityY = -5;
}
function gameover() {
  if (life == 0) {
    space.visible =false;
    laser.visible =false;
    rocket.visible =false;
    target.visible =false;
    boundary1.visible =false;
    boundary2.visible =false;
    gamestate = "end";
    fill("yellow");
    stroke("blue");
    textSize(60);
    text("GAME OVER!", 10, 250);
    
  }
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};

import React, { useRef, useEffect, useState } from "react";

import Grass from './hills.png';
import Sign from './overhead_sign.png';
import Cloud from './cloud.png';
import Road from './Road.png';
import Mountain from './mountains.png';
import CarInterior from './car background.png';
import SmallSign from './small_sign.png';

class Rotator {
    constructor(image, CANVAS_WIDTH, CANVAS_HEIGHT) {
        this.image = image;
        this.CANVAS_WIDTH = CANVAS_WIDTH;
        this.CANVAS_HEIGHT = CANVAS_HEIGHT;
        this.angle = 0;
    }
    update(gameFrame, speed) {
        this.angle = gameFrame/speed;

    }
    draw(context, scaleX,scaleY, x, y) {
        context.save();
        context.translate(x + this.CANVAS_WIDTH/2, y + this.CANVAS_HEIGHT/2);
        context.rotate(this.angle%360 *Math.PI / 180);
        context.scale(scaleX,scaleY)
        context.drawImage(this.image.current,-this.image.current.width/2,-this.image.current.height/2);
        context.restore();
    }
}


const Canvas = (props) => {
    const canvasRef = useRef(null);
    const [context, setContext] = useState(null);

    const [load1, setLoad1] = useState(false);
    const [load2, setLoad2] = useState(false);
    const [load3, setLoad3] = useState(false);
    const [load4, setLoad4] = useState(false);
    const [load5, setLoad5] = useState(false);
    const [load6, setLoad6] = useState(false);
    const [load7, setLoad7] = useState(false);

    let gameFrame = 0;
    let gameSpeed = 10 ;
    let scrolling = 0;
    let CANVAS_HEIGHT = window.innerHeight;
    let CANVAS_WIDTH = window.innerWidth;
    
    const grass = useRef(new Image());
   
    const sign = useRef(new Image());
    const cloud = useRef(new Image());
    const road = useRef(new Image());
    const mountain = useRef(new Image());
    const carInterior = useRef(new Image());
    const smallSign = useRef(new Image());

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d");
            canvas.width = CANVAS_WIDTH;
            canvas.height = CANVAS_HEIGHT;
            setContext(ctx);
        }
    }, []);

    useEffect(() => {
        if (context) {
            /*load image*/
            grass.current.src = Grass;
            grass.current.width = 1500;
            grass.current.height = 1500;
            grass.current.onload = () => {
                setLoad1(true); 
                
            }
            sign.current.src = Sign;
            sign.current.width = 1462;
            sign.current.height = 759;
            sign.current.onload = () => {
                setLoad2(true);
            }
            cloud.current.src = Cloud;
            cloud.current.width = 844;
            cloud.current.height = 311;
            cloud.current.onload = () => {
                setLoad3(true);
            }
            road.current.src = Road;
            road.current.width = 2000;
            road.current.height = 2000;
            road.current.onload = () => {
                setLoad4(true);
            }
            mountain.current.src = Mountain;
            mountain.current.width = 2000;
            mountain.current.height = 2000;
            mountain.current.onload = () => {
                setLoad5(true);
            }
            carInterior.current.src = CarInterior;
            carInterior.current.width = 2000;
            carInterior.current.height = 2000;
            carInterior.current.onload = () => {
                setLoad6(true);
            }
            smallSign.current.src = SmallSign;
            smallSign.current.width = 1150;
            smallSign.current.height = 1198;
            smallSign.current.onload = () => {
                setLoad7(true);
            }
        }


    }, [context]);

    useEffect(() => {
        let animationFrameId;
        if (context && load1 && load2 && load3 && load4 && load5 && load6 && load7) {
            
            window.addEventListener("wheel", event => {
                if (event.deltaY > 0) {
                    scrolling += 0.2;
                    scrolling = Math.max(scrolling, 0.5)
                } else if (event.deltaY < 0) {
                    scrolling -=0.2;
                    scrolling = Math.min(scrolling, -0.5)
                } else {
                    scrolling = 0;
                }
                
            })
            const draw = () => {
                
                context.canvas.height = window.innerHeight;
                context.canvas.width = window.innerWidth;
                let scale = 1;
                let x = -CANVAS_WIDTH*2/3;
                let y = CANVAS_HEIGHT/2;
                //context.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
                //Make clouds generative
                context.drawImage(cloud.current,100,CANVAS_HEIGHT/2 + gameFrame/2,cloud.current.width/6,cloud.current.height/6)
                context.drawImage(cloud.current,500,CANVAS_HEIGHT/4 + gameFrame/2,cloud.current.width/3,cloud.current.height/3)
                context.drawImage(cloud.current,100, 1300 + gameFrame/2,cloud.current.width/6,cloud.current.height/6)
                context.drawImage(cloud.current,500,1000 + gameFrame/2,cloud.current.width/3,cloud.current.height/3)



                context.drawImage(mountain.current,0,100 + gameFrame/30,CANVAS_WIDTH,CANVAS_HEIGHT/2)

                context.drawImage(grass.current,0,CANVAS_HEIGHT/5 + gameFrame/50,CANVAS_WIDTH,CANVAS_HEIGHT/2)
                context.fillStyle = '#56b518';
                context.fillRect(0,CANVAS_HEIGHT/2,CANVAS_WIDTH,1500);
                
                
                
                
                
                

                

                let foo = 60 - gameFrame/4;
                if (gameFrame < 0) {
                    context.fillStyle = '#434343';
                    context.fillRect(CANVAS_WIDTH*2/5 + ((Math.abs(gameFrame*2) < foo) ? gameFrame:  (gameFrame +foo/(2*10/9))*10),CANVAS_HEIGHT/2 + ((Math.abs(gameFrame*2) < foo)? gameFrame*2:-foo + -(gameFrame +foo/2)*3),foo,Math.min(foo - 2*gameFrame,Math.abs(gameFrame*2)));
                    context.font = 20 + "px Georgia";
                    context.fillStyle = 'white';
                    context.fillText("hello World!",CANVAS_WIDTH*2/5 + ((Math.abs(gameFrame*2) < foo) ? gameFrame:  (gameFrame +foo/(2*10/9))*10),CANVAS_HEIGHT/2+20 + ((Math.abs(gameFrame*2) < foo)? gameFrame*2:-foo + -(gameFrame +foo/2)*3), foo);
                    context.fillStyle = '#56b518';
                    context.fillRect(CANVAS_WIDTH*2/5-30,CANVAS_HEIGHT/2,((Math.abs(gameFrame*2) < foo) ? 500:  0),100);
                }
                context.drawImage(road.current,0,CANVAS_HEIGHT/2,CANVAS_WIDTH,CANVAS_HEIGHT/2);
                context.fillStyle = '#434343';
                for (let i = 0; i < Math.floor(CANVAS_HEIGHT/2/50); i++){
                    context.fillRect(CANVAS_WIDTH*19/40,CANVAS_HEIGHT/2 + (-gameFrame*5 + 999999 + i*50)%(CANVAS_HEIGHT/2),CANVAS_WIDTH/20,15);
            }




                foo = gameFrame%(CANVAS_HEIGHT/2);
                let speed = 2;
                let newSpeed = 5;
                let sizX = CANVAS_WIDTH/6 + (Math.abs(foo*speed) < CANVAS_HEIGHT/6 ? 0:-foo*10 - (CANVAS_HEIGHT/6)*10/speed );
                let sizY = CANVAS_HEIGHT/6+ (Math.abs(foo*speed) < CANVAS_HEIGHT/6 ? 0:-foo*3 - (CANVAS_HEIGHT/6)*3/speed );
                let posX = CANVAS_WIDTH/2 + ((Math.abs(foo*speed) < CANVAS_HEIGHT/6) ? -sizX/2: -sizX/2);
                let posY = CANVAS_HEIGHT/2 + ((Math.abs(foo*speed) < CANVAS_HEIGHT/1.5)? foo*speed : 2*foo*speed+CANVAS_HEIGHT/1.5 );
                
                context.drawImage(sign.current,(Math.floor(-gameFrame/(CANVAS_HEIGHT/2)) < 2 ? 0 : Math.floor(-gameFrame/(CANVAS_HEIGHT/2))-1)*sign.current.width,0,sign.current.width,sign.current.height,posX,posY,sizX,sizY);
                context.fillStyle = '#56b518';
                context.fillRect(0,CANVAS_HEIGHT/2,((Math.abs(foo*speed) <CANVAS_HEIGHT/6) ? CANVAS_WIDTH:  0),1500);
                //context.fillRect(CANVAS_WIDTH/2-15,CANVAS_HEIGHT/2 + gameFrame,30,5 + gameFrame/10);

                if (Math.abs(foo*2) < CANVAS_HEIGHT/6) {
                    context.drawImage(road.current,0,CANVAS_HEIGHT/2,CANVAS_WIDTH,CANVAS_HEIGHT/2);
                    context.fillStyle = '#434343';
                    for (let i = 0; i < Math.floor(CANVAS_HEIGHT/2/50); i++){
                        context.fillRect(CANVAS_WIDTH*19/40,CANVAS_HEIGHT/2 + (-gameFrame*5 + 999999 + i*50)%(CANVAS_HEIGHT/2),CANVAS_WIDTH/20,15);
                }
                }

                context.drawImage(carInterior.current,0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                /*
                fern_class.update(gameFrame,2);
                fern_class.draw(context,1,1,-CANVAS_WIDTH*2/3,CANVAS_HEIGHT/2);

                fern_class.update(-gameFrame,2);
                fern_class.draw(context,-1,1,CANVAS_WIDTH*2/3,CANVAS_HEIGHT/2);


             
                
                x = -CANVAS_WIDTH/2 + (gameFrame*10)%640;
                y = CANVAS_HEIGHT*3/7 + (gameFrame*5)%320;
                context.save();
                context.translate(x + CANVAS_WIDTH/2, y + CANVAS_HEIGHT/2);
                context.rotate(15 *Math.PI / 180);
                context.drawImage(bush.current,-640,-320);
                context.restore();
                context.save();
                context.translate(x + 640 + CANVAS_WIDTH/2, y + 320 + CANVAS_HEIGHT/2);
                context.rotate(15 *Math.PI / 180);
                context.drawImage(bush.current,-640,-320);
                context.restore();

              
                
                x = CANVAS_WIDTH/2 - (gameFrame*10)%640; 
                context.save();
                context.translate(x + CANVAS_WIDTH/2, y + CANVAS_HEIGHT/2);
                context.rotate(-15 *Math.PI / 180);
                context.drawImage(bush.current,-640,-320);
                context.restore();

                context.save();
                context.translate(x - 640 + CANVAS_WIDTH/2, y + 320  + CANVAS_HEIGHT/2);
                context.rotate(-15 *Math.PI / 180);
                context.drawImage(bush.current,-640,-320);
                context.restore();
*/
                

                gameFrame -= scrolling;
                //context.translate(x + CANVAS_WIDTH, y)
                //gameFrame--; 
                scrolling *= 0.98               
                animationFrameId = window.requestAnimationFrame(draw);
            };
            draw();
            return () => {
                window.cancelAnimationFrame(animationFrameId);
            };
        }
    }, [context, load1, load2, load3, load4, load5, load6, load7]);



    return (<div>
        <canvas ref={canvasRef} id="canvas1" {...props}/>
    </div>)
}

export default Canvas;
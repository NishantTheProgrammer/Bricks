const collusion = (bricks, ball, removeFun) => {

    const isColliding = (brickPos, ballPos) => {
        let a = Math.abs(ballPos.y - brickPos.y);
        let b = Math.abs(ballPos.x - brickPos.x);
        let c = Math.sqrt((a * a) + (b * b))
        return c;
    }

    bricks.forEach((brick, index) => {
        let accuracy = 2;      // difference to be accepted for collusion in pixels
        // return false if collusion detected then we will return this new array and replace with our state
        if(isColliding(brick, ball) < accuracy) {
            // console.log(index);
            return removeFun(index)
        }
    })
}

export default collusion;
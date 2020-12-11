const collusion = (bricks, ball, removeFun) => {

    const getAbsoluteDistance = (brickPos, ballPos) => {
        let a = Math.abs(ballPos.y - brickPos.y);
        let b = Math.abs(ballPos.x - brickPos.x);
        let c = Math.sqrt((a * a) + (b * b))
        return c;
    }
    bricks.forEach((brick, index) => {
        if(getAbsoluteDistance(brick, ball) < (ball.width + brick.width) / 2) {
            return removeFun(index)
        }
    })
}

export default collusion;
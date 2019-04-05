function triangle(a, b, c){
    let arrSidesTriangle = [a**2, b**2, c**2],
        SortArrSides = arrSidesTriangle.sort((a,b)=>{return (a-b)}),
        equality,
        sumSmallerSides = SortArrSides[0] + SortArrSides[1],
        maxSideTriangle = SortArrSides[2]
    function angleTriangle(equality){
        if(sumSmallerSides == maxSideTriangle){
            return "прямоугольный";
        }
        else if(sumSmallerSides < maxSideTriangle){
            return "тупоугольный";
        }
        else (sumSmallerSides > maxSideTriangle)
            return "остроугольный";
    };
    function existTriangle(equality){
        equality =((a + b) <= c) || ((b + c)<= a) || ((a + c)<= b)?"не существует":angleTriangle();
        return console.log(`треугольник ${equality}`);
    };
    existTriangle();
};
triangle(4, 3, 5);
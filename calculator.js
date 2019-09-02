console.log("Ready");

const result = document.querySelector('.result');

result.innerHTML = "0";

let leftVal = [];
let prevOps = [];
let operatorWasEntered = false;

const buttonContainer = document.querySelector('.button-container');
buttonContainer.addEventListener('click', function(event){
    const curButtonValue = event.target.innerText;
    if (curButtonValue === "C") {
        result.innerHTML = "0";
        leftVal = [];
        prevOps = [];
        return;
    }

    if (curButtonValue === "←") {
        if (result.innerText === "0")
            return;
        
        result.innerText = result.innerText.slice(0, result.innerText.length - 1);
        if (result.innerText.length === 0)
            result.innerText = "0";
        return;
    }

    const parsed = Number.parseInt(curButtonValue, 10);
    if (!Number.isNaN(parsed)) {
        if (result.innerText === "0") {
            result.innerText = "";
        }
        if (operatorWasEntered) {
            console.log("#operator was entered");
            operatorWasEntered = false;
            result.innerText = "";
        }
        result.innerText += curButtonValue;
    }
    else
    {
        console.log(`## Pressed button: ${curButtonValue}`);
        result.innerText = calculate(curButtonValue, result.innerText);
        operatorWasEntered = true;
    }
});

function calculate(op, rightText) {

    leftVal.push(parseInt(rightText));
    prevOps.push(op);

    const firstOp = prevOps[0];
    
    if (firstOp === "=") {
        prevOps = [];
        const left = leftVal[0];
        leftVal = [left];
        return left;
    }

    if (leftVal.length > 1) {
        const right = leftVal.pop();
        const left = leftVal.pop();

        console.log(`###@ left: ${left}   :    right: ${right}` );

        let res = left;
        switch (firstOp) {
            case "+":
                res = left + right;
                break;
            case "-":
                res = left - right;
                break;
            case "=":
                return left;
                break;
            default:
                break;
        }

        leftVal.push(res);

        console.log(`##@ res: ${res}`);
        prevOps.splice(0, 1);
        return res;
    }

    return rightText;
}


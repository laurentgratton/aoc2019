
let fs = require('fs');

let rawInput = fs.readFileSync('inputs/day7inputs.txt').toString().split(",");
let input = rawInput.map(item => parseInt(item));

let step = (data, start, inputs, outputFunc) => {
    let command = parseCommand(data[start]);
    switch(command.command){
        case 1:
            let add1 = data[start + 1];
            let add2 = data[start + 2];
            let addDestination = data[start + 3];

            if(command.modes[0] === undefined || command.modes[0] === 0){
                add1 = data[add1];
            }
            if(command.modes[1] === undefined || command.modes[1] === 0){
                add2 = data[add2];
            }

            data[addDestination] = add1 + add2;
            break;
        case 2:
            let mult1 = data[start + 1];
            let mult2 = data[start + 2];
            let multDestination = data[start + 3];

            if(command.modes[0] === undefined || command.modes[0] === 0){
                mult1 = data[mult1];
            }
            if(command.modes[1] === undefined || command.modes[1] === 0){
                mult2 = data[mult2];
            }

            data[multDestination] = mult1 * mult2;
            break;
        case 3:
            let input = inputs[0];
            inputs = inputs.slice(1);

            let destination = data[start + 1];

            data[destination] = input;
            break;
        case 4:
            let value = data[start + 1];

            if(command.modes[0] === undefined || command.modes[0] === 0){
                value = data[value]
            }

            outputFunc(value);
            break;
        case 5:
            let c5param = data[start + 1];
            if(command.modes[0] === undefined || command.modes[0] === 0){
                c5param = data[c5param];
            }
            if(c5param !== 0){
                let newPointer = data[start + 2];
                if(command.modes[1] === undefined || command.modes[1] === 0){
                    newPointer = data[newPointer];
                }
                command.offset = 0;
                start = newPointer;
            }
            break;
        case 6:
            let c6param = data[start + 1];
            if(command.modes[0] === undefined || command.modes[0] === 0){
                c6param = data[c6param];
            }
            if(c6param === 0){
                let newPointer = data[start + 2];
                if(command.modes[1] === undefined || command.modes[1] === 0){
                    newPointer = data[newPointer];
                }
                command.offset = 0;
                start = newPointer;
            }
            break;
        case 7:
            let c7param1 = data[start + 1];
            let c7param2 = data[start + 2];

            if(command.modes[0] === undefined || command.modes[0] === 0){
                c7param1 = data[c7param1];
            }
            if(command.modes[1] === undefined || command.modes[1] === 0){
                c7param2 = data[c7param2];
            }

            data[data[start + 3]] = c7param1 < c7param2 ? 1 : 0;

            break;
        case 8:
            let c8param1 = data[start + 1];
            let c8param2 = data[start + 2];

            if(command.modes[0] === undefined || command.modes[0] === 0){
                c8param1 = data[c8param1];
            }
            if(command.modes[1] === undefined || command.modes[1] === 0){
                c8param2 = data[c8param2];
            }

            data[data[start + 3]] = c8param1 === c8param2 ? 1 : 0;

            break;
        case 99:
        default:
            return data;
            break;
    }

    step(data, start + command.offset, inputs, outputFunc);
};

let parseCommand = (input) => {
    let result = {};

    result.command = input % 100;
    let modes = Math.floor(input / 100);
    result.modes = [];
    if(modes > 0){

        while(modes > 0){
            let currMode = modes % 10;
            result.modes.push(currMode);
            modes = Math.floor(modes / 10);
        }
    }
    switch(result.command){
        case 1:
            result.offset = 4;
            break;
        case 2:
            result.offset = 4;
            break;
        case 3:
            result.offset = 2;
            break;
        case 4:
            result.offset = 2;
            break;
        case 5:
            result.offset = 3;
            break;
        case 6:
            result.offset = 3;
            break;
        case 7:
            result.offset = 4;
            break;
        case 8:
            result.offset = 4;
            break;
        default:
            result.offset = 0;
            break;
    }


    return result;
};

let chainAmps = (program, inputs) => {
    let currOutput = 0;
    inputs.forEach(input => {
        step(program, 0,[input, currOutput], v => {currOutput = v});
    });

    return currOutput;
}

const permutator = (inputArr) => {
    let result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)

    return result;
}

console.log("Day 7 Part 1:");
let permutations = permutator([4,3,2,1,0]);
let totals = [];
permutations.forEach(permutation => {
    totals.push({"permutation":permutation, "value": chainAmps(input.map(c=>c), permutation)});
})
console.log(totals.sort((a,b)=>b.value - a.value)[0].value);

console.log("Day 7 Part 2:");

function* process(memory, ...inputs){
    let currPointer = 0;
    while(memory[currPointer] !== 99){
        let command = parseCommand(memory[currPointer]);

        switch(command.command){
            case 1:
                let add1 = memory[currPointer + 1];
                let add2 = memory[currPointer + 2];
                let addDestination = memory[currPointer + 3];

                if(command.modes[0] === undefined || command.modes[0] === 0){
                    add1 = memory[add1];
                }
                if(command.modes[1] === undefined || command.modes[1] === 0){
                    add2 = memory[add2];
                }

                memory[addDestination] = add1 + add2;
                break;
            case 2:
                let mult1 = memory[currPointer + 1];
                let mult2 = memory[currPointer + 2];
                let multDestination = memory[currPointer + 3];

                if(command.modes[0] === undefined || command.modes[0] === 0){
                    mult1 = memory[mult1];
                }
                if(command.modes[1] === undefined || command.modes[1] === 0){
                    mult2 = memory[mult2];
                }

                memory[multDestination] = mult1 * mult2;
                break;
            case 3:
                let tempInput = yield;
                if (tempInput != null) inputs = Array.isArray(tempInput) ? tempInput : [tempInput];
                let input = inputs.shift();

                let destination = memory[currPointer + 1];

                memory[destination] = input;
                break;
            case 4:
                let value = memory[currPointer + 1];

                if(command.modes[0] === undefined || command.modes[0] === 0){
                    value = memory[value]
                }

                yield value;
                break;
            case 5:
                let c5param = memory[currPointer + 1];
                if(command.modes[0] === undefined || command.modes[0] === 0){
                    c5param = memory[c5param];
                }
                if(c5param !== 0){
                    let newPointer = memory[currPointer + 2];
                    if(command.modes[1] === undefined || command.modes[1] === 0){
                        newPointer = memory[newPointer];
                    }
                    command.offset = 0;
                    currPointer = newPointer;
                }
                break;
            case 6:
                let c6param = memory[currPointer + 1];
                if(command.modes[0] === undefined || command.modes[0] === 0){
                    c6param = memory[c6param];
                }
                if(c6param === 0){
                    let newPointer = memory[currPointer + 2];
                    if(command.modes[1] === undefined || command.modes[1] === 0){
                        newPointer = memory[newPointer];
                    }
                    command.offset = 0;
                    currPointer = newPointer;
                }
                break;
            case 7:
                let c7param1 = memory[currPointer + 1];
                let c7param2 = memory[currPointer + 2];

                if(command.modes[0] === undefined || command.modes[0] === 0){
                    c7param1 = memory[c7param1];
                }
                if(command.modes[1] === undefined || command.modes[1] === 0){
                    c7param2 = memory[c7param2];
                }

                memory[memory[currPointer + 3]] = c7param1 < c7param2 ? 1 : 0;

                break;
            case 8:
                let c8param1 = memory[currPointer + 1];
                let c8param2 = memory[currPointer + 2];

                if(command.modes[0] === undefined || command.modes[0] === 0){
                    c8param1 = memory[c8param1];
                }
                if(command.modes[1] === undefined || command.modes[1] === 0){
                    c8param2 = memory[c8param2];
                }

                memory[memory[currPointer + 3]] = c8param1 === c8param2 ? 1 : 0;

                break;
        }
        currPointer = currPointer + command.offset;
    }
}

let getFeedbackForSequence = (program, ampSettings) => {
    let amps = ampSettings.map(p => process(program.slice(), p, 0));

    let result;
    let value, done;
    let i = 0;

    while(!done){
        ({value, done} = amps[i % ampSettings.length].next(result));
        if (value != null) result = value;
        i++;
    }

    return result;
};

let result = permutator([5, 6, 7, 8, 9]).map(s => getFeedbackForSequence(input, s));
console.log(result.sort((a,b) => b-a)[0]);

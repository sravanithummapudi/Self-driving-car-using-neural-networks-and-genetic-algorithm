class NeuralNetwork{
    constructor(neuronCounts){
        this.levels=[];
        for(let i=0;i<neuronCounts.length-1;i++){
            this.levels.push(new Level(
                // for each level specify input and output count of neurons
                neuronCounts[i],neuronCounts[i+1]
            ));
        }
    }

    static feedForward(givenInputs,network){
        let outputs=Level.feedForward(
            givenInputs,network.levels[0]);
            // looping through remaining levels
        for(let i=1;i<network.levels.length;i++){
            outputs=Level.feedForward(
                //putting the output of previous level into new level as input
                outputs,network.levels[i]);
        }
        // this makes the car to decide which direction it should move
        return outputs;
    }
}

// levels class
class Level{
    constructor(inputCount,outputCount){
        // two arrays for input newuron count and output neuron count
        this.inputs=new Array(inputCount);
        this.outputs=new Array(outputCount);
        this.biases=new Array(outputCount);
// connecting all input neurons to output neurons
        this.weights=[];
        for(let i=0;i<inputCount;i++){
            this.weights[i]=new Array(outputCount);
        }

        Level.#randomize(this);
    }
//  set random weights from input to output connections of range -1 to 1
    static #randomize(level){
        for(let i=0;i<level.inputs.length;i++){
            for(let j=0;j<level.outputs.length;j++){
                level.weights[i][j]=Math.random()*2-1;
            }
        }
// biases are set to range betweeen -1 to 1
        for(let i=0;i<level.biases.length;i++){
            level.biases[i]=Math.random()*2-1;
        }
    }
// compute output values from feed forward algorithm
    static feedForward(givenInputs,level){
        for(let i=0;i<level.inputs.length;i++){
            level.inputs[i]=givenInputs[i];
        }
// here you need to sum input values and it's multiplication with weight
        for(let i=0;i<level.outputs.length;i++){
            let sum=0
            for(let j=0;j<level.inputs.length;j++){
                sum+=level.inputs[j]*level.weights[j][i];
            }
// if sum> the bias at that level return 1 as output value else 0.
            if(sum>level.biases[i]){
                level.outputs[i]=1;
            }else{
                level.outputs[i]=0;
            } 
        }

        return level.outputs;
    }
}
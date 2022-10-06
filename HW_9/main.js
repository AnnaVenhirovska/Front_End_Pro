data = {
    addRecord: function (...args) {
        let keyArr = [];
        for (let i = 0; i < args.length; i++) {
            
            keyArr = Object.keys(args[i]);
            valueArr = Object.values(args[i]);

            for(let j = 0; j < keyArr.length; j++) {
                data[keyArr[j]] = valueArr[j];
            }
        }
    },
    p: 600,
    str: 'hello',
    y: -50
}

data.addRecord({x: 10}, {y: 20}, {z: 30, x: 50});

console.log(data);
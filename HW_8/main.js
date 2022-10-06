let A = [10, 40, 20, 30, 40, 50],
    B = [100, 1, 95, 151, 299, 423],
    C = ["555", 24, 21, 1, 42, 43, 12];

    function getMaxs(...arrays) {
        arrays = arrays.map((numbers) => {
            return numbers.filter((n) => typeof n === 'number')
        })

        let maxNumbers = [];

        for (let i = 0; i < arrays.length; i++){
            let max = arrays[i][0]

            for (let j = 0; j < arrays[i].length; j++){
                const a = arrays[i][j]

                if(a > max){
                    max = a
                }
            }
            maxNumbers.push(max)
        }
        
        return (maxNumbers.join(`, `))
    }

    console.log(getMaxs(A, B, C));
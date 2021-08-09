const outputs = [];

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
    // Ran every time a balls drops into a bucket
    outputs.push([dropPosition, bounciness, size, bucketLabel]);

}

function runAnalysis() {
    const testSetSize = 100;
    const [testSet, trainingSet] = splitDataset(outputs, testSetSize);

    // let numberCorrect = 0;
    // for (let i = 0; i < testSet.length; i++) {
    //   const bucket = knn(trainingSet, testSet[i][0]);
    //   if (bucket === testSet[i][3]) {
    //     numberCorrect++;
    //   };
    // };


    _.range(1, 20).forEach(k => {
        const accuracy = _.chain(testSet)
            .filter(testPoint => knn(trainingSet, _.initial(testPoint), k) === testPoint[3])
            .size()
            .divide(testSetSize)
            .value();

        console.log("For k of", k, "Accuracy is:", accuracy);
    });
};


function knn(data, point) {
    // Note: Point has 3 values because you want to be able to pass in features later and get a predicted value
    return _.chain(data)
        .map(row => [
            distance(_.initial(row), point),
            _.last(row)
        ])
        .sortBy(row => row[0])
        .slice(0, k)
        .countBy(row => row[1])
        .toPairs()
        .sortBy(row => row[1])
        .last()
        .first()
        .parseInt()
        .value();
};


function distance(pointA, pointB) {
    return Math.abs(pointA - pointB);
};

function splitDataset(data, testCount) {
    const shuffled = _.shuffle(data);

    const testSet = _.slice(shuffled, 0, testCount);
    const trainingSet = _.slice(shuffled, testCount);

    return [testSet, trainingSet];
};
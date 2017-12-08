const fs = require("fs")

var resultArea = document.getElementById('result')
var classify = document.getElementById('classify')
var defaultK = 3


classify.addEventListener("click", function(){

	var className = 
		['',
		'(1) The patient should be fitted with <b>hard contact lenses.</b>', 
		'(2) The patient should be fitted with <b>soft contact lenses.</b>',
		'(3) The patient should <b>not</b> be fitted with contact lenses.']

	resultArea.innerHTML = className[classificationResult()]
})


var classificationResult = function()
{
	// mendapatkan detail data baru
	var distances = []
	data = getDataFromDataset()
	var newData = []
	newData.push(' ')
	newData.push(document.getElementById('age').value)
	newData.push(document.getElementById('spectacle').value)
	newData.push(document.getElementById('astigmatic').value)
	newData.push(document.getElementById('tpr').value)

	// compute distance of the data to all data in dataset
	// and take the minimum value
	for (var i = 0; i < data.length - 1; i++)
	{
		distances.push(parseFloat(computeDistance(newData, data[i])).toFixed(2))
	}
	var newDist = distances.slice()
	var shortest = getKShortestNeighbor(newDist)
	return getClass(shortest, distances, data)
}

var getClass = function(shortest, distances, data)
{
	var classes = [0,0,0,0]
	for (var j = 0; j < shortest.length; j++)
		for (var i = 0; i < distances.length; i++)
		{
			if (shortest[j] == distances[i])
			{
				let theClass = parseInt(data[i][5])
				classes[theClass]++
				break
			}
		}
	
	var keyOfMaxValue
	var maxValue = -1
	for(var i = 0; i < classes.length; i++)
		if (maxValue < classes[i])
		{
			maxValue = classes[i]
			keyOfMaxValue = i
		}
	return keyOfMaxValue
}

var getKShortestNeighbor = function(distances)
{
	var shortestDistances = []
	distances.sort(function(a, b){return a-b})
	for (var i = 0; i < defaultK; i++)
	{
		shortestDistances.push(distances[i])
	}
	return shortestDistances
}

var computeDistance = function(newData, dataI)
{
	// distance computing with euclidean
	let d1 = Math.pow(parseFloat(newData[1]) - parseFloat(dataI[1]), 2)
	let d2 = Math.pow(parseFloat(newData[2]) - parseFloat(dataI[2]), 2)
	let d3 = Math.pow(parseFloat(newData[3]) - parseFloat(dataI[3]), 2)
	let d4 = Math.pow(parseFloat(newData[4]) - parseFloat(dataI[4]), 2)

	let result = Math.sqrt(d1 + d2 + d3 + d4)
	return result
}

var getDataFromDataset = function()
{
	var data = fs.readFileSync('dataset.txt')
	var perLine = data.toString().split('\n')
	for (var i = 0; i < perLine.length; i++)
	{
		perLine[i] = perLine[i].split(' ')
	}
	return perLine;
}

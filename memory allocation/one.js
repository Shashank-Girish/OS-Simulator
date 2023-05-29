var getValue = document.getElementById('mybtn');
selectOption  = document.getElementById('select_id');
btnCalculate = document.getElementById('btnCalculate');
selectedmethod = document.getElementById("selectedmethod");
var count=0;
var countTwo=0;
var countNumberOfClicks = 1;
var countJobs =1;
var jobBlocks = [];
var memoryBlocks = [];
var message;

// when button submit is clicked
getValue.addEventListener('click' , AddJobsBlock);
btnCalculate.addEventListener('click' , Calculate);


function Calculate(){

    if (selectedmethod.options[0].selected === true) {
      bestFit();
    } else if (selectedmethod.options[1].selected === true) {
      firstFit();
    } else if (selectedmethod.options[2].selected === true) {
      worstFit();
    } else {
      var getValue = document.getElementsByClassName(".alert-btn");
      getValue.setAttribute("display ", "none");
    }


}

function firstFit() {
    var geTable = document.getElementById('mainTable');
    var sum = 0;

    for (var i = 0; i < Math.min(jobBlocks.length, memoryBlocks.length); i++) {
        var jobSize = parseInt(jobBlocks[i]);
        var allocated = false;

        for (var j = 0; j < memoryBlocks.length; j++) {
            var memorySize = parseInt(memoryBlocks[j]);

            if (jobSize <= memorySize) {
                var difference = memorySize - jobSize;
                sum += difference;
                geTable.innerHTML += '<tr> ' + '<td>' + 'Job ' + (i + 1) + '</td>' + '<td>' + 'Block ' + j + '</td>' + '<td>' + difference + '</td>' + '<td>Calculated</td>' + '</tr>';
                memoryBlocks[j] = difference; // Update the memory block size
                allocated = true;
                break;
            }
        }

        if (!allocated) {
            geTable.innerHTML += '<tr> ' + '<td>' + 'Job ' + (i + 1) + '</td>' + '<td>' + 'Block -' + '</td>' + '<td>' + 0 + '</td>' + '<td>Job Size cannot fit</td>' + '</tr>';
        }
    }

    geTable.innerHTML += '<tr> ' + '<td></td>' + '<td></td>' + '<td>Total =' + sum + '</td>' + '<td></td>' + '</tr>';
    geTable.lastChild.classList.add('last');
}
 // end of fisrt fit


 function bestFit() {
   var geTable = document.getElementById('mainTable');
   var sum = 0;

   for (var i = 0; i < jobBlocks.length; i++) {
     var minFragment = Infinity;
     var minIndex = -1;

     for (var j = 0; j < memoryBlocks.length; j++) {
       var fragment = memoryBlocks[j] - jobBlocks[i];

       if (fragment >= 0 && fragment < minFragment) {
         minFragment = fragment;
         minIndex = j;
       }
     }

     if (minIndex !== -1) {
       var allocatedBlock = memoryBlocks[minIndex];
       sum += minFragment;

       message = 'Allocated';
       geTable.innerHTML += '<tr> ' + '<td>' + 'Job ' + (i + 1) + '</td>' + '<td>' + 'Block ' + minIndex + '</td>' + '<td>' + minFragment + '</td>' + '<td>' + message + '</td>' + '</tr>';

       // Update the memory block by subtracting the allocated job size
       memoryBlocks[minIndex] -= jobBlocks[i];
     } else {
       message = 'Job cannot fit';
       geTable.innerHTML += '<tr> ' + '<td>' + 'Job ' + (i + 1) + '</td>' + '<td>' + 'N/A' + '</td>' + '<td>' + 0 + '</td>' + '<td>' + message + '</td>' + '</tr>';
     }
   }

   geTable.innerHTML += '<tr> ' + '<td>' + '</td>' + '<td>' + '</td>' + '<td>' + 'Total = ' + sum + '</td>' + '<td>' + '</td>' + '</tr>';
   geTable.lastChild.classList.add('last');
 }


// end of Best fit


function worstFit() {
    var geTable = document.getElementById('mainTable');
    var difference;
    var maxValue;
    var maxIndex;

    for (var index = 0; index < jobBlocks.length; index++) {
        maxValue = -1;
        maxIndex = -1;

        for (var i = 0; i < memoryBlocks.length; i++) {
            if (memoryBlocks[i] > maxValue) {
                maxValue = memoryBlocks[i];
                maxIndex = i;
            }
        }

        if (maxValue >= jobBlocks[index]) {
            difference = maxValue - jobBlocks[index];
            memoryBlocks[maxIndex] = -1;
            message = 'Job can fit';
            geTable.innerHTML += '<tr> ' + '<td>' + 'Job ' + (index + 1) + '</td>' + '<td>' + 'Block ' + (maxIndex + 1) + '</td>' + '<td>' + difference + '</td>' + '<td>' + message + '</td>' + '</tr>';
        } else if(difference < 0){
            difference = 0;
            message = 'Job cannot fit';
            geTable.innerHTML += '<tr> ' + '<td>' + 'Job ' + (index + 1) + '</td>' + '<td>' + 'Block ' + (index + 1) + '</td>' + '<td>' + difference + '</td>' + '<td>' + message + '</td>' + '</tr>';
        }

    }
}


// create the table
function AddJobsBlock(e){
    e.preventDefault();
    var geTable =  document.getElementById('myBody');
    var geTableTwo =  document.getElementById('myBodyTwo');
    var getValue = document.getElementById('mytxt').value;
    var clearText = document.getElementById('mytxt');
// check to see if the first option is selected
    if(selectOption.options[0].selected === true){
        count++;
        for(var i = 0 ; i< count ;i++ ){
            if(count === count ){
                geTable.innerHTML +='<tr> ' + '<td>' +count+ '</td>' + '<td>' + getValue + ' Kb'+'</td>' + ' </tr>' ;
                jobBlocks.push(getValue);
                clearText.value = "";
                console.log('option1');
                break;
            }
        }
    }

// check to see if the second option is selected
    if(selectOption.options[1].selected === true){
        countTwo++;
        for(var i = 0 ; i< countTwo ;i++ ){
            if(countTwo === countTwo ){
                geTableTwo.innerHTML +='<tr> ' + '<td>' +countTwo+ '</td>' + '<td>' + getValue + ' Kb'+'</td>' + ' </tr>' ;
                memoryBlocks.push(getValue);
                clearText.value = "";
                console.log('option2');
                break;
            }
        }
    }
} // end of block
